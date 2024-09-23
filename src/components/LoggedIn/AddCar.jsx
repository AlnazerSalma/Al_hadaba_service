import React, { useContext, useState } from "react";
import "../../styles/add-car.css";
import { toast } from "react-hot-toast";
import { Globalstate } from "../../context/GlobalState";
import { Button, Box } from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta";

function AddCar() {
  const state = useContext(Globalstate);
  const [refetch, setRefetch] = state.refetch;
  const [carDetails, setCarDetails] = useState({
    carCode: "",
    carName: "",
    carModel: "",
    carYear: "",
    carDescription: "",
    buyPrice: "",
    MSRP: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(carDetails);
    if (handleFormValidation()) {
      try {
        await fetch("http://localhost:8080/api/auth/cars", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(carDetails),
        });

        setCarDetails({
          carCode: "",
          carName: "",
          carModel: "",
          carYear: "",
          carDescription: "",
          buyPrice: "",
          MSRP: "",
        });
        setRefetch(!refetch);
        toast.success("Car added successfully.");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const handleFormValidation = () => {
    const {
      carCode,
      carName,
      carModel,
      carYear,
      carDescription,
      buyPrice,
      MSRP,
    } = carDetails;
    let errors = {};
    let formIsValid = true;

    if (!carCode) {
      formIsValid = false;
      errors["carCode"] = "car code is required.";
    }
    if (!carName) {
      formIsValid = false;
      errors["carName"] = "car name is required.";
    }
    if (!carModel) {
      formIsValid = false;
      errors["carModel"] = "car model is required.";
    }
    
    if (!carYear || !/^\d{4}$/.test(carYear)) {
      formIsValid = false;
      errors["carYear"] = "Please enter a valid car year.";
    } else if (parseInt(carYear) > 2023) {
      formIsValid = false;
      errors["carYear"] = "Car year cannot be greater than 2023.";
  }
    if (!carDescription) {
      formIsValid = false;
    }

    if (!buyPrice || !/^\d+$/.test(buyPrice)) {
      formIsValid = false;
      errors["buyPrice"] = "Buy price is required and should be an integer.";
    }
    
    if (!MSRP || !/^\d+$/.test(MSRP)) {
      formIsValid = false;
      errors["MSRP"] = "MSRP is required and should be an integer.";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevCarDetails) => ({
      ...prevCarDetails,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageName = file.name;
    setCarDetails((prevCarDetails) => ({
      ...prevCarDetails,
      imageURL: imageName,
    }));
    setSelectedImage(URL.createObjectURL(file)); // Set the selected image URL
  };

  const {
    carCode,
    carName,
    carModel,
    carYear,
    carDescription,
    buyPrice,
    MSRP,
  } = carDetails;

  const {
    carCode: carCodeErr,
    carName: carNameErr,
    carModel: carModelErr,
    carYear: carYearErr,
    buyPrice: buyPriceErr,
    MSRP:MSRPErr,
  } = formErrors;

  return (
    <div className="formDiv w-75 m-auto p-5">
      <h3 style={{ textAlign: "center" }}>Add Car Form </h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="carCode">Car Code</label>
            <input
              type="text"
              name="carCode"
              value={carCode}
              onChange={handleChange}
              placeholder="carCode.."
              className={`${carCodeErr ? "showError" : ""} form-control p-2`}
            />
            {carCodeErr && (
              <div style={{ color: "red" }}>{carCodeErr}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="carName">Car Name</label>
            <input
              type="text"
              name="carName"
              value={carName}
              onChange={handleChange}
              placeholder="carName.."
              className={`${carNameErr ? "showError" : ""} form-control p-2`}
            />
            {carNameErr && (
              <div style={{ color: "red" }}>{carNameErr}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="carModel">Car Model</label>
            <input
              type="text"
              name="carModel"
              value={carModel}
              onChange={handleChange}
              placeholder="carModel.."
              className={`${carModelErr ? "showError" : ""} form-control p-2`}
            />
            {carModelErr && (
              <div style={{ color: "red" }}>{carModelErr}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="carYear">Car Year</label>
            <input
              type="text"
              name="carYear"
              value={carYear}
              onChange={handleChange}
              placeholder="carYear.."
              className={`${carYearErr ? "showError" : ""} form-control p-2`}
            />
            {carYearErr && (
              <div style={{ color: "red" }}>{carYearErr}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="carDescription">Car Description</label>
            <textarea
              name="carDescription"
              value={carDescription}
              onChange={handleChange}
              placeholder="carDescription.."
              className="form-control p-2"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="buyPrice">Buy Price</label>
            <input
              type="text"
              name="buyPrice"
              value={buyPrice}
              onChange={handleChange}
              placeholder="buyPrice.."
              className={`${buyPriceErr ? "showError" : ""} form-control p-2`}
            />
            {buyPriceErr && (
              <div style={{ color: "red" }}>{buyPriceErr}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="MSRP">MSRP</label>
            <input
              type="text"
              name="MSRP"
              value={MSRP}
              onChange={handleChange}
              placeholder="MSRP.."
              className="form-control p-2"
            />
            {MSRPErr && (
              <div style={{ color: "red" }}>{MSRPErr}</div>
            )}
          </div>
          <div className="mb-3">
            <Box component="span" sx={{ marginRight: "10px" }}>
              <input
                type="file"
                accept="image/*"
                name="imageURL"
                onChange={handleImageUpload}
                className="form-control p-2"
              />
            </Box>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ marginTop: "10px", maxWidth: "50%" }}
              />
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            startIcon={<DriveEtaIcon />}
          >
            Add Car
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddCar;

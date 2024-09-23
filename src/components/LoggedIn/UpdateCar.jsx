import React, { useState, useEffect, useContext } from "react";
import "../../styles/add-car.css";
import { toast } from "react-hot-toast";
import { getCarByCarCode } from "../../utils/carUtils";
import { useParams } from "react-router-dom";
import { Globalstate } from "../../context/GlobalState";

function UpdateCar() {
  const state = useContext(Globalstate);
  const [cars] = state.cars;
  const [refetch, setRefetch] = state.refetch;
  const [carDetails, setCarDetails] = useState({
    carName: "",
    carModel: "",
    carYear: "",
    carDescription: "",
    buyPrice: "",
    MSRP: "",
    imageURL: "",
  });
  const { code } = useParams();
  const [formErrors, setFormErrors] = useState({});
  const [reqStatus, setReqStatus] = useState("loading");
  const fetchCarData = async () => {
    try {
      // setReqStatus("loading");
      const response = await fetch("http://localhost:8080/api/auth/cars/" + code);
      const data = await response.json();
      // const carDetails = data.data;
      setCarDetails({ ...data });
      setReqStatus("success");
    } catch (error) {
      toast.error("Error fetching car details");
      console.error("Error fetching car data:", error);
      setReqStatus("error");
    }
  };
  useEffect(() => {
    // Fetch car data and update state
    fetchCarData();
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleFormValidation()) {
      console.log("Submit")
      try {
        const res = await fetch("http://localhost:8080/api/auth/cars/" + code, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carDetails),
        });
        toast.success("Car updated successfully.");
        setRefetch(!refetch);
      } catch (error) {
        console.log("Error", error);
        toast.error("Something went wrong");
      }
    }
  };

  const handleFormValidation = () => {
    const {
      carName,
      carModel,
      carYear,
      buyPrice,
    } = carDetails;
    let errors = {};
    let formIsValid = true;

    if (!carName) {
      formIsValid = false;
      errors["carName"] = "Car name is required.";
    }
    if (!carModel) {
      formIsValid = false;
      errors["carModel"] = "Car model is required.";
    }
    if (!carYear || !/^\d{4}$/.test(carYear)) {
      formIsValid = false;
      errors["carYear"] = "Please enter a valid car year.";
    }

    if (!buyPrice) {
      formIsValid = false;
      errors["buyPrice"] = "Buy price is required.";
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

  const {
    carName,
    carModel,
    carYear,
    carDescription,
    buyPrice,
    MSRP,
    imageURL,
  } = carDetails;

  const {
    carName: carNameErr,
    carModel: carModelErr,
    carYear: carYearErr,
    buyPrice: buyPriceErr,
  } = formErrors;

  return reqStatus === "loading" ? (
    <h2 className="text-center mt-5">Loading...</h2>
  ) : reqStatus === "success" ? (
    <div className="formDiv w-75 m-auto p-5">
      <h3 style={{ textAlign: "center" }}>Update Car Form</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="carName">Car Name</label>
            <input
              type="text"
              name="carName"
              value={carName}
              onChange={handleChange}
              placeholder="Car Name.."
              className={`${carNameErr ? "showError" : ""} form-control p-2`}
            />
            {carNameErr && (
              <div style={{ color: "red", paddingBottom: 10 }}>
                {carNameErr}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="carModel">Car Model</label>
            <input
              type="text"
              name="carModel"
              value={carModel}
              onChange={handleChange}
              placeholder="Car Model.."
              className={`${carModelErr ? "showError" : ""} form-control p-2`}
            />
            {carModelErr && (
              <div style={{ color: "red", paddingBottom: 10 }}>
                {carModelErr}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="carYear">Car Year</label>
            <input
              type="text"
              name="carYear"
              value={carYear}
              onChange={handleChange}
              placeholder="Car Year.."
              className={`${carYearErr ? "showError" : ""} form-control p-2`}
            />
            {carYearErr && (
              <div style={{ color: "red", paddingBottom: 10 }}>
                {carYearErr}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="carDescription">Car Description</label>
            <input
              type="text"
              className="form-control p-2"
              name="carDescription"
              value={carDescription}
              onChange={handleChange}
              placeholder="Car Description.."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="buyPrice">Buy Price</label>
            <input
              type="text"
              name="buyPrice"
              value={buyPrice}
              onChange={handleChange}
              placeholder="Buy Price.."
              className={`${buyPriceErr ? "showError" : ""} form-control p-2`}
            />
            {buyPriceErr && (
              <div style={{ color: "red", paddingBottom: 10 }}>
                {buyPriceErr}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="MSRP">MSRP</label>
            <input
              className="form-control p-2"
              type="text"
              name="MSRP"
              value={MSRP}
              onChange={handleChange}
              placeholder="MSRP.."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imageURL">Image URL</label>
            <input
              type="text"
              className="form-control p-2"
              name="imageURL"
              value={imageURL}
              onChange={handleChange}
              placeholder="Image URL.."
            />
          </div>
          <br />
          <div style={{ textAlign: "center" }} className="mb-3">
            <button
              type="submit"
              className="btn btn-success w-100"
              onClick={handleSubmit}
            >
              Update Car
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <h2 className="text-center mt-5">No Data Found...</h2>
  );
}

export default UpdateCar;
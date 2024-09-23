import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getCartCarList } from "../utils/carUtils";
import { clearCart, getCart } from "../utils/cart";
import { Globalstate } from "../context/GlobalState";

const Order = () => {
  const state = useContext(Globalstate);
  const [cars] = state.cars;
  const [cartCarList, setCartCarList] = useState([]);
  const [formData, setFormData] = useState({
    contactFirstName: "",
    contactLastName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    requiredDate: "",
    shippingDate: "",
    comments: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isFormValid()) {
        toast.error(
          "Please fill in all required fields and provide a valid phone number."
        );
        return;
      }

      const customerData = {
        contactFirstName: formData.contactFirstName,
        contactLastName: formData.contactLastName,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      };

      const customerResponse = await axios.post(
        "http://localhost:8080/api/auth/customers",
        customerData
      );

      console.log(customerResponse.data);

      if (customerResponse?.data?.customerNumber) {
        const customerNumber = customerResponse.data.customerNumber;

        const orderData = {
          orderDate: new Date().toISOString().slice(0, 10),
          requiredDate: formData.requiredDate,
          status: "Pending",
          shippingDate: formData.shippingDate,
          comments: formData.comments,
          customerNumber: customerNumber,
          cars: getCartCarList(getCart(), cars),
        };

        const orderResponse = await axios.post(
          "http://localhost:8080/api/auth/orders",
          orderData
        );

        console.log(orderResponse.data);
        const orderNumber = orderResponse.data.orderNumber;
        clearCart();
        toast.success("Your order has been placed");

        // Update quantity in stock of the cars in the order to 0
        const updatedCars = cars.map((car) => {
          const cartCar = cartCarList.find((item) => item.carCode === car._carCode);
          if (cartCar) {
            const updatedCar = { ...car };
            updatedCar.quantityInStock = 0;
            return updatedCar;
          }
          return car;
        });

        state.cars[1](updatedCars);

        // Redirect to a success page or display the order number to the user
      }
    } catch (error) {
      toast.error("Error");
      console.error(error);
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const isFormValid = () => {
    const {
      contactFirstName,
      contactLastName,
      phone,
      addressLine1,
      city,
      state,
      postalCode,
      country,
    } = formData;

    const phonePattern = /^\d{10}$/;

    const requiredFields = {
      contactFirstName,
      contactLastName,
      phone,
      addressLine1,
      city,
      state,
      postalCode,
      country,
    };

    let isValid = true;
    let errors = {};

    for (const key in requiredFields) {
      if (!requiredFields[key]) {
        errors[key] = "This field is required";
        isValid = false;
      }
    }

    if (!phone.match(phonePattern)) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };

  useEffect(() => {
    setCartCarList(getCartCarList(getCart(), cars));
  }, [cars]);

  return (
    <div style={{ margin: "80px" }}>
      <h1>Reserve Page</h1>
      {currentStep === 1 && (
        <form onSubmit={handleNextStep}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="contactFirstName"
              value={formData.contactFirstName}
              onChange={handleChange}
              required
            />
            {errors.contactFirstName && (
              <p style={{ color: "red" }}>{errors.contactFirstName}</p>
            )}
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="contactLastName"
              value={formData.contactLastName}
              onChange={handleChange}
              required
            />
            {errors.contactLastName && (
              <p style={{ color: "red" }}>{errors.contactLastName}</p>
            )}
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && (
              <p style={{ color: "red" }}>{errors.phone}</p>
            )}
          </div>
          <div>
            <label>Address Line 1</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
            />
            {errors.addressLine1 && (
              <p style={{ color: "red" }}>{errors.addressLine1}</p>
            )}
          </div>
          <div>
            <label>Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errors.city && (
              <p style={{ color: "red" }}>{errors.city}</p>
            )}
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            {errors.state && (
              <p style={{ color: "red" }}>{errors.state}</p>
            )}
          </div>
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            {errors.postalCode && (
              <p style={{ color: "red" }}>{errors.postalCode}</p>
            )}
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
            {errors.country && (
              <p style={{ color: "red" }}>{errors.country}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>
            Next
          </button>
        </form>
      )}

      {currentStep === 2 && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Required Date</label>
            <input
              type="text"
              name="requiredDate"
              value={formData.requiredDate}
              onChange={handleChange}
              required
            />
            {errors.requiredDate && (
              <p style={{ color: "red" }}>{errors.requiredDate}</p>
            )}
          </div>
          <div>
            <label>Received Date</label>
            <input
              type="text"
              name="shippingDate"
              value={formData.shippingDate}
              onChange={handleChange}
              required
            />
            {errors.shippingDate && (
              <p style={{ color: "red" }}>{errors.shippingDate}</p>
            )}
          </div>
          <div>
            <label>Comments</label>
            <input
              type="text"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handlePrevStep} style={{ marginTop: "10px", marginRight: "10px" }}>
            Previous
          </button>
          <button type="submit" className="btn btn-primary" style={{ marginTop: "10px", backgroundColor: "green" }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Order;
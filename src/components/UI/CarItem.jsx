import React from "react";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/car-item.css";
import { addToCart, clearCart, getCart } from "../../utils/cart";

const CarItem = (props) => {
  const { carCode, carName, carModel, carYear, buyPrice, imageURL, orderNumber } = props.item;
  const navigate = useNavigate();

  // Define the static image URL from the Spring Boot database
  const imagePath = "http://localhost:8080/image/";

  const isSoldOut = orderNumber !== null;

  // Check if user is logged in
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleAddToCart = () => {
    if (!isAdmin) {
      addToCart(carCode);
    } else {
      alert("Admins are not allowed to add items to the cart.");
    }
  };

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item-container">
        <div className="car__item">
          <div className="car__img">
            <img src={imagePath + imageURL} alt={carName} className="car__img-content" />
          </div>

          <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{carName}</h4>
            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
              <span className="d-flex align-items-center gap-1">
                <i className="ri-car-line"></i> {carModel}
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="ri-calendar-2-line"></i> {carYear}
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="ri-money-dollar-circle-line"></i> {buyPrice}
              </span>
            </div>

            <button
              disabled={isSoldOut || isAdmin}
              className="w-50 car_item-btn car_btn-rent text-black bg-primary"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

            <button
              className="w-50 car_item-btn car_btn-details text-black bg-secondary"
              onClick={(e) => navigate(`/cars/${carCode}`)}
            >
              Details
            </button>

            {isSoldOut && (
              <div className="text-center text-danger">
                <strong>Sold Out</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;

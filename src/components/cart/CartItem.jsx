import React from "react";
import { Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartItem = ({ car, removeItem = () => {} }) => {
  if (!car) return null;

  const imagePath = "http://localhost:8080/image/";

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <div className="car__img-container">
        <img
          src={imagePath + car.imageURL}
          alt="cart-img"
          className="car__img-content"
          style={{ width: "230px", height: "120px", borderRadius: "50%" }}
        />
      </div>
      <div className="me-auto">
        <div style={{ fontWeight: "bold", fontStyle: "italic" }}>{car?.carName}</div>
        <div className="text-muted" style={{ fontSize: "1.25rem", textTransform: "uppercase" }}>{car?.buyPrice}</div>
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        style={{ width: "25px", height: "25px", padding: "0" }} // Adjust the width, height, and padding values for a smaller button
        onClick={() => removeItem(car?.carCode)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;

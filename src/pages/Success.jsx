import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div>
      <h1>Order Success</h1>
      <p>Your order has been placed successfully.</p>
      <p>Order Number: {orderNumber}</p>
    </div>
  );
};

export default Success;

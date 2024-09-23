import React from "react";
import "./Card.css";

const Card = (props) => {
  return <div className="card m-auto my-2">{props.children}</div>;
};

export default Card;

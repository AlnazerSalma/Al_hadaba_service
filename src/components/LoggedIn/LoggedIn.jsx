import React from "react";
import "./LoggedIn.css";
import CarList from "./CarList";
const LoggedIn = ({ setIsLoggedIn }) => {
  const handleLogOut = () => {
    localStorage.removeItem("isAdmin");
    window.location.reload();
  };

  return (
    <>
      <div className="header">
        <CarList />
      </div>
    </>
  );
};

export default LoggedIn;

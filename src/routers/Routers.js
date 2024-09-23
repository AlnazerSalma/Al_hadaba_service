import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import LogIn from "../pages/LogIn";
import AddCar from "../components/LoggedIn/AddCar";
import UpdateCar from "../components/LoggedIn/UpdateCar";
import Order from "../pages/Order";
import Success from "../pages/Success";
import Orders from "../components/LoggedIn/Orders";
import Customers from "../components/LoggedIn/Customers";
import Details from "../components/LoggedIn/Details";
import CarList from "../components/LoggedIn/CarList";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/cars/:carName/:carYear" element={<CarListing />} />
      <Route path="/order" element={<Order />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/add-car" element={<AddCar />} />
      <Route path="/update/:code" element={<UpdateCar />} />
      <Route path="/success" element={<Success />} />
      <Route path="/show-orders" element={<Orders />} />
      <Route path="/show-customers" element={<Customers />} />
      <Route path="/admin-details/:slug" element={<Details />} />
      <Route path="/admin-carlist" element={<CarList />} />
    </Routes>
  );
};

export default Routers;

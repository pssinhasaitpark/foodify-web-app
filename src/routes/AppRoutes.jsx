import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import RestaurantDetail from "../pages/RestaurantDetail";
import Cart from "../pages/Cart";
import OrderStatus from "../pages/OrderStatus";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";
import OrderTrack from "../pages/OrderTrack";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-status/:id" element={<OrderStatus />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/orders/:id/track" element={<OrderTrack />} />
    </Routes>
  );
};

export default AppRoutes;

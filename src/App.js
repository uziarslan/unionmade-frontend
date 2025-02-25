import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Assets/css/styles.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Forgot from "./Components/Forgot";
import Code from "./Components/Code";
import NewPassword from "./Components/NewPassword";
import Homepage from "./Components/Homepage";
import Contact from "./Components/Contact";
import Product from "./Components/Product";
import Dashboard from "./Components/Dashboard";
import Cart from "./Components/Cart";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";
import Loader from "./Components/Loader";
import { AuthContext } from "./Context/AuthContext";
import Shop from "./Components/Shop";

function App() {
  const { isLoading } = useContext(AuthContext);
  return (
    <div className="App">
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/verify-code" element={<Code />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App;

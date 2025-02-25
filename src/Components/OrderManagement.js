import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStage, setCurrentStage] = useState(0);
  const [orders, setOrders] = useState([]);

  const stages = ["Mockup", "Pre-production", "Production", "Shipped"];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase().trim());
  };

  useEffect(() => {
    const fetchPersonOrders = async () => {
      try {
        const { status, data } = await axiosInstance.get(
          "/api/auth/user-orders"
        );
        if (status === 200) {
          setOrders(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPersonOrders();
  }, []);

  const handleChange = (event) => {
    const id = event.target.value;
    const selectedOrder = orders.find(({ _id }) => _id === id);
    console.log(selectedOrder);
    if (selectedOrder) {
      const statusIndex = stages.indexOf(selectedOrder.status);
      setCurrentStage(statusIndex + 1);
    }
  };

  return (
    <>
      <div className="progress-container">
        <div className="tableTopSection">
          <div className="tableTopHeadingContainer">
            <h3>Order status</h3>
            <p>Order name and number</p>
          </div>
          <select defaultValue="Order Name" onChange={handleChange}>
            <option disabled>Order Name</option>
            {orders.map((order) => (
              <option key={order._id} value={order._id}>
                {order.product.productName}
              </option>
            ))}
          </select>
        </div>
        <div className="progress-bar">
          <div className="progress-text">
            {stages.map((stage, index) => (
              <span key={index}>{stage}</span>
            ))}
          </div>
          <div className="progress-line">
            {stages.map((_, index) => (
              <div
                key={index}
                className={`progress-point ${
                  index < currentStage ? "active" : ""
                }`}
              ></div>
            ))}
            <div
              className="progress-connector"
              style={{
                width: `${((currentStage - 1) / (stages.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="tableTopSection mt-5">
        <div className="tableTopHeadingContainer">
          <h3>
            Purchased items <span>(total 03)</span>
          </h3>
        </div>
        <input
          type="text"
          placeholder="Search products"
          onChange={handleSearchChange}
        />
      </div>
      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>
                Total <span>inc tax</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) =>
                [
                  order.product.productName,
                  order.product.productCode,
                  order.quantity.toString(),
                  order.product.productPrice.toString(),
                  order.totalAmount.toString(),
                  order.paymentMethod.type,
                  order.paymentMethod.paymentStatus,
                ].some(
                  (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().trim().includes(searchTerm)
                )
              )
              .map((order) => (
                <tr key={order._id}>
                  <td className="productContainer">
                    <div className="productThumbnail">
                      <img
                        src={order.product.images[0].path}
                        alt="Product Thumbnail"
                      />
                    </div>
                    <div className="productInfo">
                      <Link to={`/product/${order.product._id}`}>
                        <p className="productTitle">
                          {order.product.productName}
                        </p>
                      </Link>
                      <p className="productCode">
                        Code: {order.product.productCode}
                      </p>
                    </div>
                  </td>
                  <td>X{order.quantity}</td>
                  <td>${order.product.productPrice}</td>
                  <td>{order.paymentMethod.type.toUpperCase()}</td>
                  <td className={order.paymentMethod.paymentStatus}>
                    {order.paymentMethod.paymentStatus.toUpperCase()}
                  </td>
                  <td>${order.totalAmount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

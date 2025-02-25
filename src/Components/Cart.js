import React, { useContext } from "react";
import Navbar from "./Navbar";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
export default function Cart() {
  const { cart, removeFromCart, updateQty, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleQuantityChange = (id, increment) => {
    updateQty(id, increment);
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item?.product.productPrice);
    return sum + price * item?.qty;
  }, 0);

  const handleOrder = async () => {
    try {
      const { status } = await axiosInstance.post("/api/v1/process-order", {
        cart,
        totalPrice,
      });

      if (status === 201) {
        navigate("/payment-success?success=true");
      }
    } catch ({ response }) {
      navigate("/payment-cancel?canceled=true");
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/create-checkout-session",
        {
          cart,
        }
      );
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!cart && !cart.length) return null;

  return (
    <>
      <Navbar />
      <div className="cart-page max-width mx-auto">
        <h2>Shopping Cart</h2>
        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map(({ product, qty, size }) => (
              <div key={product?._id} className="cart-item">
                <Link to={`/product/${product?._id}`}>
                  <img
                    src={product?.images[0].path}
                    alt={product?.productName}
                  />
                </Link>
                <div className="item-details">
                  <Link to={`/product/${product?._id}`}>
                    <h3>{product?.productName}</h3>
                  </Link>
                  <p>
                    <strong>Price: </strong>$
                    {parseInt(product?.productPrice).toFixed(2)}
                  </p>
                  <div>
                    <p>
                      <strong>Size: </strong>
                      {size}
                    </p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(product?._id, -1)}
                      className="negativeButton"
                    >
                      -
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => handleQuantityChange(product?._id, +1)}
                      className="positiveButton"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="remove-btn"
                  >
                    <i className="bx bxs-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <button
                onClick={
                  user?.credits >= totalPrice ? handleOrder : handleCheckout
                }
                className="checkout-btn"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import Flash from "./Flash";
import { AuthContext } from "../Context/AuthContext";

export default function Success() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const hasPostedRef = useRef(false);

  const { emptyCart, cart } = useContext(AuthContext);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");
      const query = new URLSearchParams(window.location.search);

      if (hasPostedRef.current) {
        return;
      }

      if (query.get("success")) {
        setMessage({
          success: "Order placed! You will receive an email confirmation.",
        });
      }

      try {
        const response = await axiosInstance.post("/api/v1/checkout-success", {
          sessionId,
          cart,
        });
        if (response.status === 200) {
          hasPostedRef.current = true;
        }
      } catch (error) {
        console.error("Error processing success:", error);
      }
    };

    if (location.search && !hasPostedRef.current && cart.length) {
      fetchSessionDetails();
    }
  }, [location.search, cart]);

  setTimeout(() => {
    navigate("/");
    emptyCart();
  }, 5000);

  return (
    <>
      <div className="successBackground">
        <Flash message={message} />
        <div className="middleContent">
          <svg
            width="156"
            height="112"
            viewBox="0 0 156 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_401_296)">
              <path
                d="M104.071 39.7019L96.965 43.9798C77.223 58.0778 73.888 86.5003 89.7861 104.831H17.5156C10.4139 104.831 0 95.2057 0 88.0411V39.7019H104.071ZM26.0984 72.348C20.3235 73.3177 20.2963 81.9188 26.0984 83.0382C33.2728 82.4037 42.9189 84.1756 49.8024 83.0971C55.5137 82.2043 55.8318 73.7482 50.0887 72.3389C42.8371 72.9824 33.0547 71.1788 26.0984 72.3434V72.348Z"
                fill="#FFC13D"
              />
              <path
                d="M141.483 28.844H0V16.8034C0 9.45758 9.83235 0.267368 17.2157 0.0543799L123.3 0C132.487 0.466761 141.483 9.62978 141.483 18.8381V28.844Z"
                fill="#FFC13D"
              />
              <path
                d="M117.266 43.5311C147.095 40.6717 166.805 72.8147 149.585 97.4715C134.818 118.616 102.286 116.21 90.6222 93.3114C79.9811 72.4205 93.7391 45.7879 117.266 43.5311ZM130.501 65.8903C129.906 66.0218 128.888 66.774 128.425 67.2136L117.847 80.4007C116.334 79.1862 114.617 76.4763 112.668 76.0775C107.724 75.0579 104.099 79.5488 106.443 83.9807C107.165 85.3448 114.921 93.0259 116.234 93.5516C118.138 94.3129 120.142 94.1317 121.764 92.7994L137.117 73.5126C139.13 68.845 135.513 64.7756 130.497 65.8949L130.501 65.8903Z"
                fill="#FFC13D"
              />
            </g>
            <defs>
              <clipPath id="clip0_401_296">
                <rect width="156" height="112" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h1 className="middleContentMainHeading">Thank You</h1>
          <p className="paymentStatusText">Payment Done Successfully</p>
          <p className="redirectText">
            You will be redirected to home page shortly or click here to return
            to home page
          </p>
          <Link to="/">
            <button
              onClick={() => emptyCart()}
              type="button"
              className="paymentStatusHomeButton"
            >
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

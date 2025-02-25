import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Flash from "./Flash";

export default function Cancel() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("canceled")) {
      setMessage({
        success:
          "Order canceled -- continue to shop around and checkout when you're ready.",
      });
    }
  }, []);

  setTimeout(() => {
    navigate("/");
  }, 5000);

  return (
    <>
      <div className="successBackground">
        <Flash message={message} />
        <div className="middleContent">
          <svg
            width="156"
            height="138"
            viewBox="0 0 156 138"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_401_324)">
              <path
                d="M156 58.8721V87.0801C133.225 61.2538 90.355 79.3397 93.9275 113.725L93.4809 114.246H19.3511C19.3511 114.246 18.7557 113.948 18.3092 113.874C9.97328 112.981 0 106.208 0 96.979V58.8721H156ZM23.2214 66.2405C17.937 67.1336 17.5649 74.6508 22.7004 75.9905C25.0076 76.5859 37.2137 76.5859 39.8187 76.2137C45.4008 75.4695 45.7729 67.729 40.6374 66.3893C38.479 65.7939 25.6775 65.7939 23.2214 66.2405ZM20.3187 93.5553C20.9886 94.2252 22.626 94.9695 23.5191 95.0439C33.5668 94.2252 45.4008 96.1603 55.2252 95.0439C61.1794 94.374 61.4771 85.7405 54.8531 84.9962C45.0286 85.666 33.8645 84.0286 24.2634 84.9962C22.626 85.145 21.2863 85.5916 20.2443 86.9313C18.8302 88.792 18.6813 91.9179 20.3931 93.6298L20.3187 93.5553Z"
                fill="#FF2D55"
              />
              <path d="M156 27.8359H0V50.4618H156V27.8359Z" fill="#FF2D55" />
              <path
                d="M156 19.5H0C0 9.00572 8.55916 0.446565 18.979 0H138.063C148.036 0.967557 156.074 9.45229 156.074 19.5H156Z"
                fill="#FF2D55"
              />
              <path
                d="M125.633 83.3588C145.952 81.2748 161.358 100.254 154.288 119.679C147.217 139.105 119.679 143.347 107.101 126.08C94.5224 108.813 105.463 85.4427 125.633 83.3588ZM139.179 100.105C135.458 96.3836 131.513 100.179 129.057 103.082C126.526 100.179 122.805 96.3836 118.935 99.9561C115.064 103.529 118.935 107.92 121.912 110.227C119.158 112.832 115.213 116.181 118.786 119.977C122.358 123.773 126.526 120.349 129.057 117.372C131.513 120.2 135.383 123.624 139.03 120.349C142.826 116.851 139.179 112.683 136.202 110.227C139.03 107.92 142.603 103.529 139.179 100.105Z"
                fill="#FF2D55"
              />
            </g>
            <defs>
              <clipPath id="clip0_401_324">
                <rect width="156" height="137.095" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <h1 className="middleContentMainHeading">Thank You</h1>
          <p className="paymentStatusText">Payment cancled Successfully</p>
          <p className="redirectText">
            You will be redirected to home page shortly or click here to return
            to home page
          </p>
          <Link to="/">
            <button type="button" className="paymentStatusHomeButton">
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

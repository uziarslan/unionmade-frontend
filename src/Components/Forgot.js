import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authImage from "../Assets/images/auth.png";
import axiosInstance from "../services/axiosInstance";
import Flash from "./Flash";
import { AuthContext } from "../Context/AuthContext";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [message, setMessage] = useState({});

  const navigate = useNavigate();

  const { setIsLoading } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({});
    setIsLoading(true);

    const formData = {
      username: email,
    };

    try {
      const { status, data } = await axiosInstance.post(
        "/api/auth/forgot-password",
        formData
      );

      if (status === 200) {
        setMessage(data);
        setTimeout(() => {
          navigate(`/verify-code?id=${data.id}`);
        }, 6000);
      }
    } catch ({ response }) {
      setMessage(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  return (
    <>
      <div className="background">
        <Flash message={message} />
        <div className="max-width mx-auto">
          <div className="authWrapper">
            <div className="imageHolder">
              <img alt="Authentication" src={authImage} />
            </div>
            <div className="formHolder">
              <Link to="/login">
                <i className="bx bx-left-arrow-alt fontSize"></i>
              </Link>
              <form onSubmit={handleSubmit} className="formContent">
                <div className="textContentHolder">
                  <h2 className="authHeading">Forgot password</h2>
                  <p className="authSubHeading">Enter your email</p>
                </div>
                <div className="inputContainer mb-5">
                  <i className="bx bxs-envelope"></i>
                  <input
                    onChange={handleEmailChange}
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                  />
                  {isEmailValid && (
                    <svg
                      width="16"
                      height="12"
                      className="mt-1"
                      viewBox="0 0 16 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.7"
                        d="M14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L6.6875 10.7188C6.3125 11.125 5.65625 11.125 5.28125 10.7188L1.28125 6.71875C0.875 6.34375 0.875 5.6875 1.28125 5.3125C1.65625 4.90625 2.3125 4.90625 2.6875 5.3125L5.96875 8.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125Z"
                        fill="#218F40"
                      />
                    </svg>
                  )}
                </div>
                <button
                  type="submit"
                  className="d-flex justify-content-between align-items-center mt-3"
                >
                  Submit
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

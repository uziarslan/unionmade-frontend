import React, { useState, useEffect, useContext } from "react";
import authImage from "../Assets/images/auth.png";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import Flash from "./Flash";
import { AuthContext } from "../Context/AuthContext";

export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfrim] = useState(false);
  const [message, setMessage] = useState({});
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { setIsLoading } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({});
    setIsLoading(true);

    if (formData.newPassword !== formData.confirmPassword)
      return setMessage({ error: "Password does not match." });

    try {
      const { status, data } = await axiosInstance.post(
        `/api/auth/new-password/${id}`,
        formData
      );

      if (status === 201) {
        setMessage(data);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch ({ response }) {
      setMessage(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  if (!id) return null;
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
              <i className="bx bx-left-arrow-alt fontSize"></i>
              <form onSubmit={handleSubmit} className="formContent">
                <div className="textContentHolder">
                  <h2 className="authHeading">New password</h2>
                  <p className="authSubHeading">
                    Enter your new password for login
                  </p>
                </div>
                <div className="inputContainer">
                  <i className="bx bxs-key"></i>
                  <input
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                  />
                  <svg
                    onClick={() => setShowPassword(!showPassword)}
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.7"
                      d="M5.6875 3.90625C7.09375 2.84375 8.84375 2 11 2C13.5 2 15.5312 3.15625 17 4.53125C18.4688 5.875 19.4375 7.5 19.9062 8.625C20 8.875 20 9.15625 19.9062 9.40625C19.5 10.4062 18.6562 11.8438 17.4062 13.0938L20.6875 15.6875C21.0312 15.9375 21.0938 16.4062 20.8125 16.7188C20.5625 17.0625 20.0938 17.125 19.7812 16.8438L1.28125 2.34375C0.9375 2.09375 0.875 1.625 1.15625 1.3125C1.40625 0.96875 1.875 0.90625 2.1875 1.1875L5.6875 3.90625ZM7.96875 5.6875L10.7812 7.90625C10.9062 7.625 11 7.34375 11 7C11 6.65625 10.875 6.3125 10.7188 6.03125C10.8125 6.03125 10.9062 6 11 6C12.6562 6 14 7.34375 14 9C14 9.4375 13.9062 9.84375 13.7188 10.2188L14.9375 11.1562C15.2812 10.5312 15.5 9.78125 15.5 9C15.5 6.53125 13.4688 4.5 11 4.5C9.8125 4.5 8.75 4.96875 7.96875 5.6875ZM11 16C8.46875 16 6.4375 14.875 4.96875 13.5C3.5 12.125 2.53125 10.5 2.0625 9.40625C1.96875 9.15625 1.96875 8.875 2.0625 8.625C2.375 7.90625 2.875 7 3.59375 6.0625L6.53125 8.375C6.5 8.59375 6.5 8.8125 6.5 9C6.5 11.5 8.5 13.5 11 13.5C11.5625 13.5 12.125 13.4062 12.6562 13.1875L14.9375 15C13.7812 15.625 12.4688 16 11 16Z"
                      fill="#6D6D6D"
                    />
                  </svg>
                </div>
                <div className="inputContainer mb-5 mt-3">
                  <i className="bx bxs-key"></i>
                  <input
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Confirm password"
                  />
                  <svg
                    onClick={() => setShowPasswordConfrim(!showPasswordConfirm)}
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.7"
                      d="M5.6875 3.90625C7.09375 2.84375 8.84375 2 11 2C13.5 2 15.5312 3.15625 17 4.53125C18.4688 5.875 19.4375 7.5 19.9062 8.625C20 8.875 20 9.15625 19.9062 9.40625C19.5 10.4062 18.6562 11.8438 17.4062 13.0938L20.6875 15.6875C21.0312 15.9375 21.0938 16.4062 20.8125 16.7188C20.5625 17.0625 20.0938 17.125 19.7812 16.8438L1.28125 2.34375C0.9375 2.09375 0.875 1.625 1.15625 1.3125C1.40625 0.96875 1.875 0.90625 2.1875 1.1875L5.6875 3.90625ZM7.96875 5.6875L10.7812 7.90625C10.9062 7.625 11 7.34375 11 7C11 6.65625 10.875 6.3125 10.7188 6.03125C10.8125 6.03125 10.9062 6 11 6C12.6562 6 14 7.34375 14 9C14 9.4375 13.9062 9.84375 13.7188 10.2188L14.9375 11.1562C15.2812 10.5312 15.5 9.78125 15.5 9C15.5 6.53125 13.4688 4.5 11 4.5C9.8125 4.5 8.75 4.96875 7.96875 5.6875ZM11 16C8.46875 16 6.4375 14.875 4.96875 13.5C3.5 12.125 2.53125 10.5 2.0625 9.40625C1.96875 9.15625 1.96875 8.875 2.0625 8.625C2.375 7.90625 2.875 7 3.59375 6.0625L6.53125 8.375C6.5 8.59375 6.5 8.8125 6.5 9C6.5 11.5 8.5 13.5 11 13.5C11.5625 13.5 12.125 13.4062 12.6562 13.1875L14.9375 15C13.7812 15.625 12.4688 16 11 16Z"
                      fill="#6D6D6D"
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  Continue
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

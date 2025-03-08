import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authImage from "../Assets/images/auth.png";
import Flash from "./Flash";
import { AuthContext } from "../Context/AuthContext";
import axiosInstance from "../services/axiosInstance";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default function Signup() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState({});
  const [organizations, setOrganizations] = useState([]); // New state for orgs
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    organization: "", // Will hold the selected organization ID
    image: null,
  });

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch organizations on mount
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const { data } = await axiosInstance.get("/api/v1/get-orgs");
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error.response?.data);
      }
    };
    fetchOrganizations();
  }, []);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setFormData({ ...formData, username: emailValue });
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFormData({ ...formData, image: file });
    } else {
      setFileName("");
      setFormData({ ...formData, image: null });
    }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setMessage({});

    if (formData.password !== formData.confirmPassword) {
      return setMessage({ error: "Password does not match." });
    }

    try {
      const submitFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "image") {
          submitFormData.append(key, formData[key]);
        }
      });

      if (formData.image) {
        submitFormData.append("image", formData.image);
      }

      const { data } = await register(submitFormData);
      setMessage(data);
      setFormData({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        organization: "",
        image: null,
      });
      setIsEmailValid(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data);
      }
    }
  };

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
              <Link to="/">
                <i className="bx bx-left-arrow-alt fontSize"></i>
              </Link>
              <form onSubmit={handleSubmitForm} className="formContent">
                <div className="textContentHolder my-5">
                  <h2 className="authHeading">Welcome</h2>
                  <p className="authSubHeading">Sign up to continue</p>
                </div>
                <div className="inputContainer mb-3">
                  <i className="bx bxs-user"></i>
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="inputContainer">
                  <i className="bx bxs-envelope"></i>
                  <input
                    value={formData.username}
                    onChange={handleEmailChange}
                    type="email"
                    placeholder="Enter your email"
                    required
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
                <div className="inputContainer my-3">
                  <i className="bx bxs-key"></i>
                  <input
                    value={formData.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
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
                <div className="inputContainer">
                  <i className="bx bxs-key"></i>
                  <input
                    value={formData.confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <svg
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                <div className="inputContainer my-3">
                  <select
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled>
                      Select Organization
                    </option>
                    {organizations.map((org) => (
                      <option key={org._id} value={org._id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                </div>
                <label htmlFor="document" className="docUpload mb-3">
                  <i className="bx bxs-file-doc"></i>
                  <p className="m-0 p-0">
                    {fileName || "Union membership verification document"}
                  </p>
                  <svg
                    width="13"
                    height="15"
                    viewBox="0 0 13 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_11_309)">
                      <path
                        d="M2.63219 15C0.102562 14.6772 -0.10538 12.5721 0.031962 10.4153C0.0759422 9.72388 0.494911 9.23673 1.21827 9.41985C2.41731 9.72349 1.56895 11.8576 2.0022 12.6961C2.13452 12.9524 2.42657 13.103 2.70357 13.1269H10.3006C12.0775 12.9348 10.2986 9.77827 11.8082 9.41359C12.4378 9.26138 12.9212 9.65619 12.9714 10.2987C13.0323 11.0809 13.0154 12.6491 12.7245 13.3601C12.3464 14.2835 11.4066 14.9202 10.429 15.0008H2.63219V15Z"
                        fill="#FFC13D"
                      />
                      <path
                        d="M7.42566 3.22577V9.39128C7.42566 10.6317 5.57734 10.5655 5.57734 9.44998V3.22577C5.49169 3.30872 5.38907 3.37837 5.30227 3.45937C4.69233 4.02791 4.13062 4.78622 3.4987 5.32033C2.62372 6.06026 1.56897 5.31133 1.99141 4.26033C3.25141 2.83057 4.64218 1.49198 6.00132 0.15573C6.40525 -0.09665 6.79605 -0.0297398 7.15214 0.266856L10.8341 4.0013C11.6593 4.94274 10.5259 6.18234 9.53363 5.34968C8.87084 4.79366 8.28559 3.98604 7.64325 3.40068C7.57497 3.33846 7.49511 3.28642 7.42605 3.22577H7.42566Z"
                        fill="#FFC13D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_11_309">
                        <rect width="13" height="15" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </label>
                <input
                  id="document"
                  className="d-none"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  required
                  onChange={handleFileChange}
                />
                <button
                  type="submit"
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  Sign up
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
                <div className="d-flex justify-content-center">
                  <p className="m-0 bottomText">
                    Already have an account? <a href="/login">Login</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

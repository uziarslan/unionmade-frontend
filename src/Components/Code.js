import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import authImage from "../Assets/images/auth.png";
import axiosInstance from "../services/axiosInstance";
import Flash from "./Flash";
import { AuthContext } from "../Context/AuthContext";

export default function Code() {
  const inputRefs = [useRef(null), useRef(null), useRef(null)];
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState({});
  const [searchParams] = useSearchParams();

  const { setIsLoading } = useContext(AuthContext);

  const id = searchParams.get("id");
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    e.target.value = value;

    const updatedOtpArray = inputRefs.map((ref, i) =>
      i === index ? value : ref.current.value
    );

    const updatedOtp = updatedOtpArray.join("");
    setOtp(updatedOtp);

    if (value.length === 2 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({});
    setIsLoading(true);

    try {
      const { status, data } = await axiosInstance.post(
        `/api/auth/verify-code/${id}`,
        { otp }
      );

      if (status === 201) {
        setMessage(data);
        setTimeout(() => {
          navigate(`/new-password?id=${id}`);
        }, 3000);
      }
    } catch ({ response }) {
      setMessage(response.data);
    }

    setIsLoading(false);
  };

  const resendOtp = async () => {
    setMessage({});
    setIsLoading(true);

    try {
      const { status, data } = await axiosInstance.post(
        "/api/auth/resend-otp",
        { id }
      );

      if (status === 200) {
        setMessage(data);
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
              <Link to="/forgot-password">
                <i className="bx bx-left-arrow-alt fontSize"></i>
              </Link>
              <form onSubmit={handleSubmit} className="formContent">
                <div className="textContentHolder">
                  <h2 className="authHeading">Forgot password</h2>
                  <p className="authSubHeading">
                    6 digit code sent to your email
                  </p>
                </div>
                <div className="otpContainer mb-3">
                  {inputRefs.map((ref, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="2"
                      ref={ref}
                      onChange={(e) => handleInputChange(e, index)}
                      className="otpInput"
                      placeholder="XX"
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-center">
                  <p className="m-0 resendCodeBottomText">
                    I did not receive the code,{" "}
                    <span onClick={resendOtp} className="resendCodeButton">
                      Resend the code
                    </span>
                  </p>
                </div>
                <button
                  type="submit"
                  className="d-flex justify-content-between align-items-center mt-5"
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

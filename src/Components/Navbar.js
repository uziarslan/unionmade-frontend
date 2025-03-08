import React, { useState, useEffect, useContext } from "react";
import logo from "../Assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, user } = useContext(AuthContext);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Union Made Apparel Logo" />
            </Link>
          </div>
          <div className="burger-menu" onClick={toggleMenu}>
            <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          </div>
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">All Products</Link>
            </li>
            <li>
              <Link to="/#usa">USA</Link>
            </li>
            <li>
              <Link to="/#aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/#testimonials">Testimonials</Link>
            </li>
            <div className="nav-buttons-drop">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <button type="button" className="loginBtn">
                      Dashboard
                    </button>
                  </Link>
                  <Link to="#">
                    <button type="outline" className="signupBtn">
                      {user.credits} Credits
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button type="button" className="loginBtn">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button type="outline" className="signupBtn">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
              {cart.length ? (
                <Link to="/cart" className="cartIcon">
                  <i className="bx bxs-shopping-bag"></i>
                  <p className="numberOfItems">{cart.length}</p>
                  <div className="backgroundForCartItems"></div>
                </Link>
              ) : (
                <Link to="/#getQuote" className="quote-link">
                  GET A QUOTE
                </Link>
              )}
            </div>
          </ul>
          <div className="nav-buttons">
            {user ? (
              <>
                <Link to="/dashboard">
                  <button type="button" className="loginBtn">
                    Dashboard
                  </button>
                </Link>
                <Link to="#">
                  <button type="outline" className="signupBtn">
                    {user.credits} Credits
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button type="button" className="loginBtn">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button type="outline" className="signupBtn">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
            {cart.length ? (
              <Link to="/cart" className="cartIcon">
                <i className="bx bxs-shopping-bag"></i>
                <p className="numberOfItems">{cart.length}</p>
                <div className="backgroundForCartItems"></div>
              </Link>
            ) : (
              <Link to="/#getQuote" className="quote-link">
                GET A QUOTE
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

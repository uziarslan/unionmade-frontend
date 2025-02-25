import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <section className="heroSectionSecondary">
        <h1 className="contactText">CONTACT US</h1>
      </section>
      <section className="sendMessageSection">
        <h2 className="sendMessageHeading">Send Us A Message</h2>
        <div className="sendMessageFormWrapper">
          <div className="formInputs">
            <input type="text" placeholder="Enter your name" />
            <input type="text" placeholder="Company name" />
            <input type="text" placeholder="Company position" />
            <input type="email" placeholder="Enter you email address" />
            <textarea placeholder="Tell what you need" />
          </div>
          <div className="d-flex justify-content-center">
            <button type="button" className="sendCta">
              Send
            </button>
          </div>
        </div>
      </section>
      <section className="contactDetailsSection">
        <h2 className="contactDetailsHeading">Contact Details</h2>
        <div className="contactDetialsWrap">
          <div className="contactDetailsContent">
            <h3 className="DetailsHeading">Canada Head Office</h3>
            <div className="detailBlock">
              <h4 className="detailTitle">Address:</h4>
              <p className="detail">
                592 Gordon Baker Rd Toronto, Ontario M2H 3B4
              </p>
            </div>
            <div className="detailBlock">
              <h4 className="detailTitle">Email:</h4>
              <p className="detail">wilson@unionmade.net</p>
            </div>
          </div>
          <div className="googleMapSection">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.512942977059!2d-79.343321!3d43.810662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d373ce6b5fb7%3A0x8aac63f8d45942af!2s592%20Gordon%20Baker%20Rd%2C%20Toronto%2C%20ON%20M2H%203B4%2C%20Canada!5e0!3m2!1sen!2sus!4v1702900000000!5m2!1sen!2sus"
              height="450"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <hr />
      </section>
      <Footer />
    </>
  );
}

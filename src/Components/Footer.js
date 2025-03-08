import React from "react";

export default function Footer() {
  return (
    <>
      <footer>
        <section className="max-width mx-auto">
          <div className="footerBlock">
            <h3 className="secHeading">Work With Us</h3>
            <ul className="subHeadingWrapper">
              <li className="subHeading">
                Union Made Apparel is here to serve your needs and we are
                available during these hours.
              </li>
              <li className="subHeading">Mon-Fri - 9:00 - 18:00</li>
              <li className="subHeading">Sat-Sun - CLOSED</li>
            </ul>
          </div>
          <div className="footerBlock">
            <h3 className="secHeading">Contact Us</h3>
            <ul className="subHeadingWrapper">
              <li className="subHeading">
                592 Gordon Baker Road Toronto, Ontario M2H 3B4
              </li>
              <li className="subHeading">wilson@unionmade.net</li>
            </ul>
          </div>
          <div className="footerBlock">
            <h3 className="secHeading">Privacy & Terms</h3>
            <ul className="subHeadingWrapper">
              <li className="subHeading">
                This website may collect personal information through various
                means, such as user input during account creation or form
                submission, cookies and tracking technologies, and interactions
                with third-party services. If you don't want any information
                collected, please contact us.
              </li>
            </ul>
          </div>
        </section>
        <hr />
        <div className="copyRightContainer">
          <p className="copyText">Copyright &copy; 2024 Union Made Apparel</p>
        </div>
      </footer>
    </>
  );
}

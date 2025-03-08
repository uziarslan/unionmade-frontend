import React, { useContext, useState } from "react";
import adminImage from "../Assets/images/admin.jpeg";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function DashNav({ setActiveTab }) {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCurrentDate = () => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      year: "numeric",
    });
    return formatter.format(new Date());
  };

  if (!user) return null;

  return (
    <>
      <div className="navBg">
        <nav className="navbarDash">
          <button
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="bx bx-menu"></i>
          </button>
          <div className={`navContent ${isMenuOpen ? "open" : ""}`}>
            <div className="completeDetails">
              <div className="adminDetails">
                <div className="displayWrapper">
                  <img src={adminImage} alt="Admin Profile" />
                </div>
                <div className="userDetails">
                  <p className="username">{user.name}</p>
                  <p className="email">{user.username}</p>
                </div>
              </div>
              <div className="adminNavButtonWrapper">
                <button type="button" className="pointsButton">
                  {user.credits} Credits
                </button>
              </div>
            </div>
            <div className="otherNavContent">
              <div className="dateAndMembership">
                <p className="date">{getCurrentDate()}</p>
                <p className="date">Your Membership ID : 12345</p>
              </div>
              <div className="navIcons">
                <div
                  className="iconWrapper"
                  onClick={() => setActiveTab("notifications")}
                >
                  <span className="redDot"></span>
                  <svg
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_40_47)">
                      <path
                        d="M7.66116 18.9871C7.56045 18.9772 7.32947 18.9157 7.21924 18.8865C6.1505 18.601 5.26164 17.6989 5.07324 16.6144H10.924C10.7321 17.7004 9.84974 18.6 8.778 18.8865C8.66777 18.9157 8.43678 18.9772 8.33607 18.9871C8.16471 19.0045 7.83202 19.0045 7.66116 18.9871Z"
                        fill="#202D45"
                      />
                      <path
                        d="M7.83828 0.0129514C8.16997 -0.0430577 8.48213 0.0868043 8.66701 0.362389C8.91653 0.734627 8.69708 1.24862 8.82084 1.65605C10.6366 1.89992 12.2941 3.12865 13.0677 4.76184C14.3725 7.51719 12.5562 10.2681 14.9923 12.9075C15.2854 13.2252 15.6847 13.4512 15.8686 13.8576C16.3075 14.8291 15.5865 15.8239 14.5443 15.8373H1.41483C0.753944 15.8165 0.0940628 15.3367 0.0138949 14.6636C-0.112369 13.6063 0.648724 13.359 1.2089 12.6646C3.37293 9.98209 1.60523 7.26837 3.02821 4.56357C3.83439 3.03051 5.43575 1.89199 7.17539 1.65605C7.25806 1.60054 7.1784 0.752967 7.2285 0.559165C7.28913 0.323232 7.59276 0.0545866 7.83828 0.0129514Z"
                        fill="#202D45"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_40_47">
                        <rect width="16" height="19" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <Link to="/">
                  <div className="iconWrapper">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_40_53)">
                        <path
                          d="M13.8158 25.9999H12.1919L10.6093 25.7807C5.17563 24.7704 0.836188 20.2373 0.118488 14.7359C0.0784651 14.4304 0.0872837 14.0957 0.00995124 13.8031C0.0330153 13.2654 -0.0212531 12.7128 0.00995124 12.1771C0.689663 0.540363 15.4554 -4.36281 23.0021 4.68247C29.802 12.8322 24.3073 25.3855 13.8165 25.9999H13.8158ZM12.1308 4.36609C6.67818 4.81282 3.108 10.4995 4.76658 15.6729C6.62256 21.4607 13.978 23.604 18.6111 19.5957C25.0243 14.0468 20.6279 3.67019 12.1308 4.36609Z"
                          fill="#202D45"
                        />
                        <path
                          d="M15.441 11.1608L15.5447 12.6571L15.441 14.8195H10.5677L10.4639 13.3232L10.5677 11.1608H15.441Z"
                          fill="#202D45"
                        />
                        <path
                          d="M15.2375 9.83961H10.7705C10.9652 8.72211 11.2915 7.40635 11.9475 6.46944C12.6835 5.41847 13.3245 5.41847 14.0605 6.46944C14.7165 7.40635 15.0428 8.72143 15.2375 9.83961Z"
                          fill="#202D45"
                        />
                        <path
                          d="M15.2375 16.1407C15.0428 17.2582 14.7165 18.5739 14.0605 19.5109C13.3245 20.5618 12.6835 20.5618 11.9475 19.5109C11.2915 18.5739 10.9652 17.2589 10.7705 16.1407H15.2375Z"
                          fill="#202D45"
                        />
                        <path
                          d="M9.19738 11.1608V14.8195H5.97451C5.84427 14.5866 5.78796 14.2451 5.75269 13.9749C5.63398 13.074 5.65636 12.0013 5.97451 11.1608H9.19738Z"
                          fill="#202D45"
                        />
                        <path
                          d="M16.8105 14.8195V11.1608H20.0334C20.3455 11.9959 20.3665 13.0312 20.2552 13.924C20.2193 14.2139 20.1752 14.5697 20.0334 14.8195H16.8105Z"
                          fill="#202D45"
                        />
                        <path
                          d="M19.5516 9.83963H16.6076C16.4692 8.88303 16.2182 7.94476 15.8709 7.04518L15.415 6.0784C16.8776 6.59642 18.161 7.5761 19.0341 8.85791C19.2308 9.14645 19.4743 9.5022 19.551 9.83963H19.5516Z"
                          fill="#202D45"
                        />
                        <path
                          d="M19.5519 16.1407C19.6293 16.2147 19.1178 17.0016 19.035 17.1224C18.1545 18.4069 16.8847 19.3812 15.416 19.9019L16.1649 18.1109L16.6079 16.1407H19.5519Z"
                          fill="#202D45"
                        />
                        <path
                          d="M6.45624 9.83963C6.36467 9.7534 7.00164 8.80291 7.09525 8.67528C7.96355 7.48513 9.2063 6.57469 10.5929 6.0784L9.84395 7.8694L9.40098 9.83963H6.45692H6.45624Z"
                          fill="#202D45"
                        />
                        <path
                          d="M9.40042 16.1407C9.5388 17.0973 9.78979 18.0356 10.1371 18.9351L10.593 19.9019C9.13246 19.3825 7.8463 18.4029 6.97394 17.1224C6.77722 16.8339 6.53369 16.4781 6.45703 16.1407H9.40109H9.40042Z"
                          fill="#202D45"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_40_53">
                          <rect width="26" height="26" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

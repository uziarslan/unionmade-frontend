import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Sidebar({ activeTab, setActiveTab }) {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <div className="col sidebar">
        <Link
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.63636 7.5V1.66667H4.90909V3.33333H6.54627V7.5H1.63636ZM6.54545 0H1.63636C0.733909 0 0 0.748333 0 1.66667V7.5C0 8.41833 0.733909 9.16667 1.63636 9.16667H6.54545C7.44791 9.16667 8.18182 8.41833 8.18182 7.5V1.66667C8.18182 0.748333 7.44791 0 6.54545 0ZM11.4545 7.5V1.66667H14.7273V3.33333H16.3645V7.5H11.4545ZM16.3636 0H11.4545C10.5521 0 9.81818 0.748333 9.81818 1.66667V7.5C9.81818 8.41833 10.5521 9.16667 11.4545 9.16667H16.3636C17.2661 9.16667 18 8.41833 18 7.5V1.66667C18 0.748333 17.2661 0 16.3636 0ZM1.63636 18.3333V12.5H4.90909V14.1667H6.54627V18.3333H1.63636ZM6.54545 10.8333H1.63636C0.733909 10.8333 0 11.5817 0 12.5V18.3333C0 19.2517 0.733909 20 1.63636 20H6.54545C7.44791 20 8.18182 19.2517 8.18182 18.3333V12.5C8.18182 11.5817 7.44791 10.8333 6.54545 10.8333ZM11.4545 18.3333V12.5H14.7273V14.1667H16.3645V18.3333H11.4545ZM16.3636 10.8333H11.4545C10.5521 10.8333 9.81818 11.5817 9.81818 12.5V18.3333C9.81818 19.2517 10.5521 20 11.4545 20H16.3636C17.2661 20 18 19.2517 18 18.3333V12.5C18 11.5817 17.2661 10.8333 16.3636 10.8333Z"
            />
          </svg>
          Dashboard
        </Link>
        <Link onClick={logout}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.8108 20H2.16216C0.972973 20 0 19.01 0 17.7752V2.20195C0 0.978336 0.972973 0 2.16216 0H10.8108C12 0 12.973 0.978336 12.973 2.20195V6.66259H10.8108V2.19083H2.16216V17.7975H10.8108V13.3369H12.973V17.7752C12.973 18.9989 12 20 10.8108 20ZM20 9.99972L15.6757 14.4492V11.1121H7.02703V8.88734H15.6757V5.55021L20 9.99972Z"
            />
          </svg>
          Logout
        </Link>
      </div>
      <div className="col sidebar-mobile">
        <Link
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.63636 7.5V1.66667H4.90909V3.33333H6.54627V7.5H1.63636ZM6.54545 0H1.63636C0.733909 0 0 0.748333 0 1.66667V7.5C0 8.41833 0.733909 9.16667 1.63636 9.16667H6.54545C7.44791 9.16667 8.18182 8.41833 8.18182 7.5V1.66667C8.18182 0.748333 7.44791 0 6.54545 0ZM11.4545 7.5V1.66667H14.7273V3.33333H16.3645V7.5H11.4545ZM16.3636 0H11.4545C10.5521 0 9.81818 0.748333 9.81818 1.66667V7.5C9.81818 8.41833 10.5521 9.16667 11.4545 9.16667H16.3636C17.2661 9.16667 18 8.41833 18 7.5V1.66667C18 0.748333 17.2661 0 16.3636 0ZM1.63636 18.3333V12.5H4.90909V14.1667H6.54627V18.3333H1.63636ZM6.54545 10.8333H1.63636C0.733909 10.8333 0 11.5817 0 12.5V18.3333C0 19.2517 0.733909 20 1.63636 20H6.54545C7.44791 20 8.18182 19.2517 8.18182 18.3333V12.5C8.18182 11.5817 7.44791 10.8333 6.54545 10.8333ZM11.4545 18.3333V12.5H14.7273V14.1667H16.3645V18.3333H11.4545ZM16.3636 10.8333H11.4545C10.5521 10.8333 9.81818 11.5817 9.81818 12.5V18.3333C9.81818 19.2517 10.5521 20 11.4545 20H16.3636C17.2661 20 18 19.2517 18 18.3333V12.5C18 11.5817 17.2661 10.8333 16.3636 10.8333Z"
            />
          </svg>
        </Link>
        <Link onClick={logout}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.8108 20H2.16216C0.972973 20 0 19.01 0 17.7752V2.20195C0 0.978336 0.972973 0 2.16216 0H10.8108C12 0 12.973 0.978336 12.973 2.20195V6.66259H10.8108V2.19083H2.16216V17.7975H10.8108V13.3369H12.973V17.7752C12.973 18.9989 12 20 10.8108 20ZM20 9.99972L15.6757 14.4492V11.1121H7.02703V8.88734H15.6757V5.55021L20 9.99972Z"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}

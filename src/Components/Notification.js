import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function Notification({ setMessage }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const { status, data } = await axiosInstance.get(
          "/api/v1/user-notifications"
        );
        if (status === 200) setNotifications(data);
      } catch ({ response }) {
        console.error(response.data.error);
      }
    };
    fetchNotification();
  }, [notifications]);

  const formatDate = (timestamp) => {
    const notificationDate = new Date(timestamp);
    const today = new Date();

    if (
      notificationDate.getDate() === today.getDate() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = days[notificationDate.getDay()];
    const date = notificationDate.getDate();
    const month = months[notificationDate.getMonth()];
    const year = notificationDate.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const groupedNotifications = notifications.reduce((acc, noti) => {
    if (noti.status === "show") {
      const date = formatDate(noti.createdAt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(noti);
      return acc;
    }
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedNotifications).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    return new Date(b) - new Date(a);
  });

  const handleStatus = async (id) => {
    try {
      const { status, data } = await axiosInstance.post(
        `/api/v1/set-status/${id}`
      );

      if (status === 201) {
        setMessage(data);
      }
    } catch ({ response }) {
      setMessage(response.data);
    }
  };

  return (
    <>
      <div className="notificationContainer">
        {sortedDates.map((date) => (
          <div className="datedCombination" key={date}>
            <h6 className="dateRealizer">{date}</h6>
            {groupedNotifications[date].map((noti) => (
              <div className="notificationHolder" key={noti.id}>
                <div className="notificationBody">
                  <div className="completeNotification">
                    <div className="iconHolder">
                      <svg
                        width="16"
                        height="19"
                        viewBox="0 0 16 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_43_1380)">
                          <path
                            d="M7.66018 18.9871C7.55947 18.9772 7.32849 18.9157 7.21826 18.8865C6.14952 18.601 5.26066 17.6989 5.07227 16.6144H10.923C10.7311 17.7004 9.84877 18.6 8.77702 18.8865C8.66679 18.9157 8.43581 18.9772 8.3351 18.9871C8.16374 19.0045 7.83104 19.0045 7.66018 18.9871Z"
                            fill="#FFC13D"
                          />
                          <path
                            d="M7.83828 0.0129514C8.16997 -0.0430577 8.48213 0.0868043 8.66701 0.362389C8.91653 0.734627 8.69708 1.24862 8.82084 1.65605C10.6366 1.89992 12.2941 3.12865 13.0677 4.76184C14.3725 7.51719 12.5562 10.2681 14.9923 12.9075C15.2854 13.2252 15.6847 13.4512 15.8686 13.8576C16.3075 14.8291 15.5865 15.8239 14.5443 15.8373H1.41483C0.753944 15.8165 0.0940628 15.3367 0.0138949 14.6636C-0.112369 13.6063 0.648724 13.359 1.2089 12.6646C3.37293 9.98209 1.60523 7.26837 3.02821 4.56357C3.83439 3.03051 5.43575 1.89199 7.17539 1.65605C7.25806 1.60054 7.1784 0.752967 7.2285 0.559165C7.28913 0.323232 7.59276 0.0545866 7.83828 0.0129514Z"
                            fill="#FFC13D"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_43_1380">
                            <rect width="16" height="19" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="notificationTextHolder">
                      <p className="notificationHeading">{noti.title}</p>
                      <p className="notificationSummary">{noti.description}</p>
                    </div>
                  </div>
                  <svg
                    onClick={() => handleStatus(noti._id)}
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      <path
                        d="M20.1916 5.23C18.6487 5.07 17.1058 4.95 15.5533 4.86V4.85L15.3424 3.55C15.1987 2.63 14.9879 1.25 12.7454 1.25H10.2345C8.0016 1.25 7.79077 2.57 7.63744 3.54L7.43619 4.82C6.54494 4.88 5.65369 4.94 4.76244 5.03L2.80744 5.23C2.40494 5.27 2.11744 5.64 2.15577 6.05C2.1941 6.46 2.5391 6.76 2.9416 6.72L4.8966 6.52C9.91827 6 14.9783 6.2 20.0574 6.73C20.0862 6.73 20.1054 6.73 20.1341 6.73C20.4983 6.73 20.8145 6.44 20.8529 6.05C20.8816 5.64 20.5941 5.27 20.1916 5.23Z"
                        fill="#292D32"
                      />
                      <path
                        d="M18.4294 8.14C18.1994 7.89 17.8832 7.75 17.5573 7.75H5.44399C5.11816 7.75 4.79232 7.89 4.57191 8.14C4.35149 8.39 4.22691 8.73 4.24607 9.08L4.84024 19.34C4.94566 20.86 5.07982 22.76 8.42441 22.76H14.5769C17.9215 22.76 18.0557 20.87 18.1611 19.34L18.7552 9.09C18.7744 8.73 18.6498 8.39 18.4294 8.14ZM13.0915 17.75H9.90024C9.50732 17.75 9.18149 17.41 9.18149 17C9.18149 16.59 9.50732 16.25 9.90024 16.25H13.0915C13.4844 16.25 13.8102 16.59 13.8102 17C13.8102 17.41 13.4844 17.75 13.0915 17.75ZM13.8965 13.75H9.10482C8.71191 13.75 8.38607 13.41 8.38607 13C8.38607 12.59 8.71191 12.25 9.10482 12.25H13.8965C14.2894 12.25 14.6152 12.59 14.6152 13C14.6152 13.41 14.2894 13.75 13.8965 13.75Z"
                        fill="#292D32"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

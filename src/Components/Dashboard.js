import React, { useState } from "react";
import OrderManagement from "./OrderManagement";
import DashNav from "./DashNav";
import Sidebar from "./Sidebar";
import Notification from "./Notification";
import "../Assets/css/dashboard.css";
import Flash from "./Flash";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [message, setMessage] = useState({});

  return (
    <>
      <DashNav setActiveTab={setActiveTab} />
      <Flash message={message} />
      <div className="contentScreen">
        <div className="row max-width mx-auto">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="col p-0">
            <div className="content">
              {activeTab === "dashboard" && <OrderManagement />}
              {activeTab === "notifications" && (
                <Notification setMessage={setMessage} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

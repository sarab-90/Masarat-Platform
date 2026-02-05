import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar.jsx";
import "./Home.css";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <UserSidebar isOpen={isSidebarOpen} />

      <div className={`main-content ${isSidebarOpen ? "" : "sidebar-closed"}`}>
        <div className="top-bar">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? "☰" : "☰"}
          </button>
          <h2>Welcome to User Dashboard</h2>
        </div>
      </div>
    </div>
  );
}
export default Home;
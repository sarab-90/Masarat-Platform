import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import toast from "react-hot-toast";
import UserSidebar from "./UserSidebar.jsx";
import "./Home.css";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await api.get("/get/centers");
        setCenters(res.data.centers || []);
      } catch (error) {
        toast.error("Failed to load centers");
        console.log(error);
      }
    };
    fetchCenters();
  }, []);

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

        {/* Centers List */}
        <div className="centers-list">
          <h3>Explore Centers</h3>
          {centers.length === 0 ? (
            <p>No centers available.</p>
          ) : (
            <div className="cards-grid">
              {centers.slice(0, 6).map(center => (
                <div
                  key={center._id}
                  className="card"
                  onClick={() => navigate(`/user/activities/${center._id}`)}
                >
                  <h4>{center.name}</h4>
                  <p>{center.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
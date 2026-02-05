// AdminDashboard.jsx
import { useState, useEffect } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar.jsx";
import "./Dashboard.css";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    categories: 0,
    activities: 0,
    pendingActivities: 0,
  });
  const [pendingActivitiesList, setPendingActivitiesList] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await api.get("/get/all/users");
        const categoriesRes = await api.get("/get/categories");
        const activitiesRes = await api.get("/get/Activity");

        const allActivities = activitiesRes.data.activities || [];
        const pendingActivities = allActivities.filter(a => a.status === "pending");

        setStats({
          users: usersRes.data.length || 0,
          categories: categoriesRes.data.categories?.length || 0,
          activities: allActivities.length,
          pendingActivities: pendingActivities.length,
        });

        setPendingActivitiesList(pendingActivities);
      } catch (error) {
        toast.error("Failed to load dashboard stats");
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar isOpen={isSidebarOpen} />

      <div className={`admin-content ${isSidebarOpen ? "" : "sidebar-closed"}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? "☰" : "☰"}
          </button>
        </div>

        {/* Dashboard Stats */}
        <h2>Welcome Admin!</h2>
        <div className="stats-overview">
          <div className="stat-card"><h3>Users</h3><p>{stats.users}</p></div>
          <div className="stat-card"><h3>Categories</h3><p>{stats.categories}</p></div>
          <div className="stat-card"><h3>Activities</h3><p>{stats.activities}</p></div>
          <div className="stat-card"><h3>Pending Activities</h3><p>{stats.pendingActivities}</p></div>
        </div>

        {/* Latest Pending Activities */}
        <div className="latest-activities">
          <h3>Latest Pending Activities</h3>
          {pendingActivitiesList.length === 0 ? (
            <p>No pending activities.</p>
          ) : (
            <ul>
              {pendingActivitiesList.slice(0, 5).map(activity => (
                <li key={activity._id}>
                  {activity.name} - {new Date(activity.startDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
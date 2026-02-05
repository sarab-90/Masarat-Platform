import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const providerInfo = localStorage.getItem("Provider");
  const provider = providerInfo ? JSON.parse(providerInfo) : null;

  const handleLogout = () => {
    localStorage.removeItem("Provider");
    localStorage.removeItem("User");
    localStorage.removeItem("Admin");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h3>Welcome, {provider?.name}</h3>
        <p>{provider?.email}</p>
      </div>
      <ul className="sidebar-list">
        <li><button onClick={() => navigate("/provider/dashboard")}>Dashboard</button></li>
        <li><button onClick={() => navigate("/provider/activities")}>My Activities</button></li>
        <li><button onClick={() => navigate("/provider/profile")}>Profile</button></li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default Sidebar;
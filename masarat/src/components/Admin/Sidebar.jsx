import { useNavigate } from "react-router-dom"; 
import api from "../../api";
import toast from "react-hot-toast";
import "./Sidebar.css";

function SideBar({ isOpen }) {
  const navigate = useNavigate();

  // Get user info
  const userInfo = localStorage.getItem("User");
  const user = userInfo ? JSON.parse(userInfo) : null;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged Out Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed");
      console.log(error);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
        {user && (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        )}
      </div>
      <div className="sidebar-list">
        <ul>
          <li><button onClick={() => navigate("/admin")}>Dashboard</button></li>
          <li><button onClick={() => navigate("/admin/displayUsers")}>Users</button></li>
          <li><button onClick={() => navigate("/admin/categories")}>Categories</button></li>
          <li><button onClick={() => navigate("/admin/activitiesStatus")}>Activities</button></li>
          <li><button onClick={() => navigate("/admin/profile")}>Profile</button></li>
          <li><button onClick={() => navigate("/admin/pending/activities")}>Pending Activities</button></li>
        </ul>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
export default SideBar;
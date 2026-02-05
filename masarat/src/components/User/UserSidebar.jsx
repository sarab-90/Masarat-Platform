import { useNavigate } from "react-router-dom";
import api from "../../api";
import toast from "react-hot-toast";
import './UserSidebar.css';

function UserSidebar({ isOpen }) {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("User");
  const user = userInfo ? JSON.parse(userInfo) : null;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged Out Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h3>Welcome</h3>
        {user && (
          <>
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
          </>
        )}
      </div>
      <div className="sidebar-list">
        <ul>
          <li><button onClick={() => navigate("/user/home")}>Home</button></li>
          <li><button onClick={() => navigate("/user/activities")}>Activities</button></li>
          <li><button onClick={() => navigate("/user/my-bookings")}>My Bookings</button></li>
        </ul>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default UserSidebar;
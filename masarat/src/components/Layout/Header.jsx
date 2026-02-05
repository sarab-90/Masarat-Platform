import { useNavigate } from "react-router-dom";
import api from "../../api";
import toast from "react-hot-toast";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("An error occurred");
    }
  };

  return (
    <header className="header">
      <h2 className="logo" onClick={() => navigate("/")}>
        Tracks
      </h2>

      <nav className="nav-links">
        <button onClick={() => navigate("/centers")}>Centers</button>
        <button onClick={() => navigate("/activities")}>Activities</button>
        <button onClick={() => navigate("/my-bookings")}>My Bookings</button>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;

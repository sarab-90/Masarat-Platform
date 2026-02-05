import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo" onClick={() => navigate("/")}>
          MASARAT
        </h2>
      </div>

      <div className="navbar-right">
        <button className="nav-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="nav-btn primary"
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
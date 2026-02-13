import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">

        <div className="logo">Masarat</div>

        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/activities" onClick={() => setIsOpen(false)}>Activities</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
          <NavLink to="/login" className="nav-btn" onClick={() => setIsOpen(false)}>
            Login
          </NavLink>
        </nav>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>
    </header>
  );
}

export default Navbar;

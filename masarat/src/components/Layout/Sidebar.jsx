import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaTasks, FaUser } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ role, isOpen }) {
  const linksByRole = {
    admin: [
      { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
      { name: "Users", path: "/users", icon: <FaUsers /> },
      { name: "Activities", path: "/activities", icon: <FaTasks /> },
      { name: "Profile", path: "/profile", icon: <FaUser /> },
    ],
    organizer: [
      { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
      { name: "My Activities", path: "/activities", icon: <FaTasks /> },
      { name: "Profile", path: "/profile", icon: <FaUser /> },
    ],
    user: [
      { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
      { name: "Available Activities", path: "/activities", icon: <FaTasks /> },
      { name: "Profile", path: "/profile", icon: <FaUser /> },
    ],
  };

  const links = linksByRole[role] || [];

  return (
    <nav className={`sidebar ${isOpen ? "active" : ""}`} aria-label="Sidebar Navigation">
      <div className="sidebar-logo">Masarat</div>
      <ul className="sidebar-links">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink 
              to={link.path} 
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <span className="icon">{link.icon}</span>
              <span className="link-text">{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;

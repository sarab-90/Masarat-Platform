import { useState } from "react";
// import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children, role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="layout">
      <Sidebar role={role} isOpen={sidebarOpen} />
      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
export default Layout;
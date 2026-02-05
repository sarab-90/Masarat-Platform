import { useState } from "react";
import Sidebare from "./Sidebar.jsx";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="provider-dashboard">
      <Sidebare isOpen={sidebarOpen} />
      <div className="main-content">
        <h2>Provider Dashboard</h2>
        <p>Welcome to your dashboard! Here you can manage your activities and profile.</p>
        {/* يمكن إضافة إحصائيات أو بطاقات نشاطات */}
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import "./PendingActivities.css";

function PendingActivities() {
  const [activities, setActivities] = useState([]);

  const fetchPendingActivities = async () => {
    try {
      const res = await api.get("/get/Activity");
      const pending = res.data.activities.filter(
        (a) => a.status === "pending" || !a.status
      );
      setActivities(pending);
    } catch (error) {
      toast.error("Failed to fetch pending activities");
      console.log(error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/update/status/${id}`, { status });
      toast.success(res.data.message);
      fetchPendingActivities();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchPendingActivities();
  }, []);

  return (
    <div className="pending-container">
      <h2>Pending Activities</h2>

      {activities.length === 0 ? (
        <p className="empty-text">No pending activities.</p>
      ) : (
        <div className="activities-grid">
          {activities.map((a) => (
            <div className="activity-card" key={a._id}>
              <div className="card-header">
                <h3>{a.name}</h3>
                <span className="status pending">Pending</span>
              </div>

              <p className="location">{a.location}</p>
              <p className="date">
                {new Date(a.startDate).toLocaleDateString()} –{" "}
                {new Date(a.endDate).toLocaleDateString()}
              </p>

              <div className="card-info">
                <span>Price: {a.price || "-"}</span>
                <span>Capacity: {a.capacity || "-"}</span>
                <span>Category: {a.category}</span>
              </div>

              <div className="card-actions">
                <button
                  className="approve"
                  onClick={() => handleUpdateStatus(a._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="reject"
                  onClick={() => handleUpdateStatus(a._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
  );
}
export default PendingActivities;
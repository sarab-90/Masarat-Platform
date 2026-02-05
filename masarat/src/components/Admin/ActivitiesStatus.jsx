import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api.js";
import "../Admin/ActivitiesStatus.css";

function ActivitiesStatus() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const res = await api.get("/get/Activity");
      setActivities(res.data.activities || []);
    } catch (error) {
      toast.error("Failed to fetch activities");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/update/status/${id}`, { status });
      toast.success(res.data.message);
      fetchActivities();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) {
    return <p className="loading">Loading activities...</p>;
  }

  return (
    <div className="admin-activities-page">
      <h2 className="page-title">Activities Management</h2>
      <p className="page-subtitle">
        Review and approve or reject submitted activities
      </p>

      <div className="activities-grid">
        {activities.length === 0 ? (
          <p className="empty-text">No activities found</p>
        ) : (
          activities.map((a) => (
            <div className="activity-card" key={a._id}>
              <div className="card-header">
                <h3>{a.name}</h3>
                <span className={`status ${a.status || "pending"}`}>
                  {a.status || "pending"}
                </span>
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
                {a.status !== "approved" && (
                  <button
                    className="approve"
                    onClick={() =>
                      handleUpdateStatus(a._id, "approved")
                    }
                  >
                    Approve
                  </button>
                )}
                {a.status !== "rejected" && (
                  <button
                    className="reject"
                    onClick={() =>
                      handleUpdateStatus(a._id, "rejected")
                    }
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default ActivitiesStatus;
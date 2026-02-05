import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import toast from "react-hot-toast";
import "./ActivitiesList.css";

function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.get("/get/Activity"); 
        setActivities(res.data.activities || []);
      } catch (error) {
        toast.error("Failed to load activities");
        console.log(error);
      }
    };
    fetchActivities();
  }, []);

  const handleBooking = (activityId) => {
    navigate(`/user/booking/${activityId}`);
  };

  return (
    <div className="activities-list">
      <h2>Available Activities</h2>
      {activities.length === 0 ? (
        <p>No activities available.</p>
      ) : (
        <div className="cards-grid">
          {activities.map((activity) => (
            <div key={activity._id} className="card">
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
              <p><strong>Location:</strong> {activity.location}</p>
              <p><strong>Price:</strong> ${activity.price}</p>
              <p><strong>Capacity:</strong> {activity.capacity}</p>
              <button className="book-btn" onClick={() => handleBooking(activity._id)}>
                Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActivitiesList;

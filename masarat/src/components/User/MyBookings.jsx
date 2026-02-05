import { useState, useEffect } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/user/bookings"); // API لجلب حجوزات المستخدم
        setBookings(res.data.bookings || []);
      } catch (error) {
        toast.error("Failed to load bookings");
        console.log(error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.activityName}</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>${b.price}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;

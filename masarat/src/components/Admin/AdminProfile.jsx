import React from "react";
import "./AdminProfile.css";

function AdminProfile() {
  const userInfo = localStorage.getItem("User");
  const user = userInfo ? JSON.parse(userInfo) : null;

  if (!user) {
    return <p className="profile-error">No user data found</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <span>{user.name.charAt(0).toUpperCase()}</span>
        </div>

        <h2>{user.name}</h2>
        <p className="profile-role">{user.role}</p>

        <div className="profile-info">
          <div>
            <label>Email</label>
            <span>{user.email}</span>
          </div>

          <div>
            <label>Role</label>
            <span>{user.role}</span>
          </div>
        </div>

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
}
export default AdminProfile;
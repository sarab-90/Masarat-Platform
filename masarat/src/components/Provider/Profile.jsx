import { useState } from "react";

function Profile() {
  const providerInfo = localStorage.getItem("Provider");
  const provider = providerInfo ? JSON.parse(providerInfo) : null;

  const [formData, setFormData] = useState({
    name: provider?.name || "",
    email: provider?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // هنا يمكن عمل API لتحديث بيانات البروفايدر
    console.log("Saved:", formData);
  };

  return (
    <div className="provider-profile">
      <h2>Profile</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
export default Profile;
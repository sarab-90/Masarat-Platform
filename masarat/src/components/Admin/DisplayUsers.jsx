import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api";
import "../Admin/DisplayUsers.css";

function DisplayUsers() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // fetch users
  const getUsers = async () => {
    try {
      const res = await api.get("/get/all/users");

      if (!res.data.users || res.data.users.length === 0) {
        toast.error(res.data?.message || "no users found");

        setUsers([]);
        return;
      }
      setUsers(res.data.users);
    } catch (error) {
      toast.error("Failed To Fetch Users");
      console.log(error);
    }
  };
  // delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await api.delete(`/delete/user/${userId}`);

      if (res.status === 200) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Failed To Delete User");
      console.log(error);
    }
  };
  // add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", newUser);

      if (res.status !== 201) {
        toast.error(res.data.message);
        return;
      }
      setUsers((prev) => [...prev, newUser]);
      toast.success("User Added Successfully");
      setShowForm(false);
      getUsers();
    } catch (error) {
      toast.error("Failed to add user");
      console.log(error);
    }
  };

  // fetch users
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users-page">
      <h3>Users Management</h3>

      <button className="add-user-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New User"}
      </button>

      {showForm && (
        <form className="add-user-form" onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={newUser.confirmPassword}
            onChange={(e) =>
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
            required
          />

          <button type="submit">Save User</button>
        </form>
      )}

      <div className="users-list">
        {users.map((user) => (
          <div className="user-row" key={user._id}>
            <div className="user-info">
              <strong>{user.name}</strong>
              <p>{user.email}</p>
            </div>

            <span className={`role ${user.role}`}>{user.role}</span>

            <button
              className="delete-btn"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DisplayUsers;

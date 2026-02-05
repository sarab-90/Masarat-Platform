import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api.js";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    ageRange: "",
    price: "",
    capacity: "",
    category: "",
    images: "",
  });

  const [editId, setEditId] = useState(null);
  const [editActivity, setEditActivity] = useState({});

  // Fetch Activities 
  const fetchActivities = async () => {
    try {
      const res = await api.get("/get/Activity"); 
      if (!res.data.Activity || res.data.Activity.length === 0) {
        toast.error("No activities found");
        return;
      }
      setActivities(res.data.Activity);
    } catch (error) {
      toast.error("Failed to fetch activities");
      console.log(error);
    }
  };

  //  Add Activity 
  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/add/Activity", newActivity);
      if (res.status === 201) {
        toast.success("Activity added successfully");
        setShowForm(false);
        setNewActivity({
          name: "",
          description: "",
          location: "",
          startDate: "",
          endDate: "",
          ageRange: "",
          price: "",
          capacity: "",
          category: "",
          images: "",
        });
        fetchActivities();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add activity");
      console.log(error);
    }
  };

  //  Delete Activity 
  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/delete/Activity/${id}`);
      if (res.status === 200) {
        setActivities((prev) => prev.filter((a) => a._id !== id));
        toast.success(res.data.message || "Activity deleted");
      }
    } catch (error) {
      toast.error("Failed to delete activity");
      console.log(error);
    }
  };

  //  Save Edit 
  const handleSaveEdit = async (id) => {
    try {
      const res = await api.put(`/update/Activity/${id}`, editActivity);
      if (res.status === 200) {
        setActivities((prev) =>
          prev.map((a) => (a._id === id ? { ...a, ...editActivity } : a))
        );
        toast.success("Activity updated");
        setEditId(null);
        fetchActivities();
      }
    } catch (error) {
      toast.error("Failed to update activity");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      <h3>Activities</h3>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Activity"}
      </button>

      {showForm && (
        <form onSubmit={handleAddActivity}>
          <input
            type="text"
            placeholder="Name"
            value={newActivity.name}
            onChange={(e) =>
              setNewActivity({ ...newActivity, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newActivity.description}
            onChange={(e) =>
              setNewActivity({ ...newActivity, description: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newActivity.location}
            onChange={(e) =>
              setNewActivity({ ...newActivity, location: e.target.value })
            }
            required
          />
          <input
            type="date"
            value={newActivity.startDate}
            onChange={(e) =>
              setNewActivity({ ...newActivity, startDate: e.target.value })
            }
            required
          />
          <input
            type="date"
            value={newActivity.endDate}
            onChange={(e) =>
              setNewActivity({ ...newActivity, endDate: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Age Range"
            value={newActivity.ageRange}
            onChange={(e) =>
              setNewActivity({ ...newActivity, ageRange: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newActivity.price}
            onChange={(e) =>
              setNewActivity({ ...newActivity, price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newActivity.capacity}
            onChange={(e) =>
              setNewActivity({ ...newActivity, capacity: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Category ID"
            value={newActivity.category}
            onChange={(e) =>
              setNewActivity({ ...newActivity, category: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Images URL"
            value={newActivity.images}
            onChange={(e) =>
              setNewActivity({ ...newActivity, images: e.target.value })
            }
          />
          <button type="submit">Add Activity</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Start</th>
            <th>End</th>
            <th>Age Range</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a, index) => {
            const isEditing = editId === a._id;
            return (
              <tr key={a._id}>
                <td>{index + 1}</td>
                <td>
                  {isEditing ? (
                    <input
                      value={editActivity.name}
                      onChange={(e) =>
                        setEditActivity({ ...editActivity, name: e.target.value })
                      }
                    />
                  ) : (
                    a.name
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={editActivity.description}
                      onChange={(e) =>
                        setEditActivity({
                          ...editActivity,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    a.description
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={editActivity.location}
                      onChange={(e) =>
                        setEditActivity({ ...editActivity, location: e.target.value })
                      }
                    />
                  ) : (
                    a.location
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editActivity.startDate}
                      onChange={(e) =>
                        setEditActivity({
                          ...editActivity,
                          startDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    new Date(a.startDate).toLocaleDateString()
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editActivity.endDate}
                      onChange={(e) =>
                        setEditActivity({
                          ...editActivity,
                          endDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    new Date(a.endDate).toLocaleDateString()
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={editActivity.ageRange}
                      onChange={(e) =>
                        setEditActivity({ ...editActivity, ageRange: e.target.value })
                      }
                    />
                  ) : (
                    a.ageRange
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editActivity.price}
                      onChange={(e) =>
                        setEditActivity({ ...editActivity, price: e.target.value })
                      }
                    />
                  ) : (
                    a.price
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editActivity.capacity}
                      onChange={(e) =>
                        setEditActivity({ ...editActivity, capacity: e.target.value })
                      }
                    />
                  ) : (
                    a.capacity
                  )}
                </td>
                <td>{a.category}</td>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => handleSaveEdit(a._id)}>Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditId(a._id);
                        setEditActivity({
                          name: a.name,
                          description: a.description,
                          location: a.location,
                          startDate: a.startDate,
                          endDate: a.endDate,
                          ageRange: a.ageRange,
                          price: a.price,
                          capacity: a.capacity,
                          category: a.category,
                        });
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDelete(a._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default Activities;
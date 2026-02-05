import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api.js"; 
import "./Categories.css"; 

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState(
    { name: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [editCategory, setEditCategory] = useState({});

  // fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/get/categories");
      if (!res.data.categories || res.data.categories.length === 0) {
        toast.error(res.data.message || "No categories found");
        return;
      }
      setCategories(res.data.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.log(error);
    }
  };
  // add category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/add/category", newCategory);
      if (res.status === 201) {
        setCategories((prev) => [...prev, res.data.Category]);
        toast.success("Category added successfully");
        setShowForm(false);
        setNewCategory({ name: "", description: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
      console.log(error);
    }
  };
  // delete category
  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/delete/category/${id}`);
      if (res.status === 200) {
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
      console.log(error);
    }
  };
  // update category
  const handleSaveEdit = async (id) => {
    try {
      const res = await api.put(`/update/category/${id}`, editCategory);
      if (res.status === 200) {
        setCategories((prev) =>
          prev.map((cat) => (cat._id === id ? res.data.category : cat))
        );
        toast.success(res.data.message || "Category updated successfully");
        setEditId(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update category");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* <Header /> */}
      <div className="categories-container">
        <h3>Manage Categories</h3>
        <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add New Category"}
        </button>

        {showForm && (
          <form className="category-form" onSubmit={handleAddCategory}>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category Description"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />
            <button type="submit">Add</button>
          </form>
        )}

        <table className="categories-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => {
              const isEditing = editId === cat._id;
              return (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editCategory.name}
                        onChange={(e) =>
                          setEditCategory({ ...editCategory, name: e.target.value })
                        }
                      />
                    ) : (
                      cat.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editCategory.description}
                        onChange={(e) =>
                          setEditCategory({ ...editCategory, description: e.target.value })
                        }
                      />
                    ) : (
                      cat.description || "-"
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <button onClick={() => handleSaveEdit(cat._id)}>Save</button>
                        <button onClick={() => setEditId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditId(cat._id);
                            setEditCategory({
                              name: cat.name,
                              description: cat.description,
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDelete(cat._id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Categories;
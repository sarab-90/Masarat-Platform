import Category from "../models/category.Model.js";

export const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    // تحقق من الاسم
    if (!name) {
      return res.status(400).json({ message: "Category Name Is Required" });
    }
    // منع تكرارالاسم
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({ message: "Category Already Exists" });
    }
    // انشاء Category
    const category = await Category.create({
      name,
      description,
    });
    return res.status(201).json({
      Category: category,
      message: "Category created Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ status: "active" }); // fetch only active categoies

    if (categories.length === 0) {
      return res.status(404).json({ message: "Categories Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Categories Fetched Successfully", categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetched Categories", error: error.message });
  }
};
// get Category By Id
export const getCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryById = await Category.findById(id);
    if (!categoryById) {
      return res.status(404).json({
        message: "Category Not Found",
      });
    }
    return res.status(200).json({
      message: "Category Fetched Successfully",
      category: categoryById,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetched Category", error: error.message });
  }
};
// delete Category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryToDelete = await Category.findByIdAndDelete(id);
    if (!categoryToDelete) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    return res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleted Category", error: error.message });
  }
};
// update Category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const categoryToUpdate = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true },
    );
    if (!categoryToUpdate) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    return res
      .status(200)
      .json({
        category: categoryToUpdate,
        message: "Category Updated Successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Updated Category", error: error.message });
  }
};
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,  // لعدم تكرار اسم تصنيف
      trim: true,  // ينظف فراغات
      required: true,
    },
    description: {
      type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
  },
  {
    timestamps: true,
  },
);
const Category = mongoose.model("Category", categorySchema);

export default Category;

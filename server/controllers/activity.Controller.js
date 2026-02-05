import Activity from "../models/activity.Model.js";
import Category from "../models/category.Model.js";

// create activity
export const addActivity = async (req, res) => {
  const {
    name,
    description,
    location,
    startDate,
    endDate,
    ageRange,
    price,
    capacity,
    category,
    images,
  } = req.body;
  try {
    // تحقق من الحقول الاساسية
    if (
      !name ||
      !description ||
      !location ||
      !startDate ||
      !endDate ||
      !category
    ) {
      return res
        .status(400)
        .json({
          message:
            "Name, Description, Category, Location, StartDate, EndDate Are Required",
        });
    }
    // تحقق من تصنيف موجود
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    // تحقق من تاريخ
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        message: "Invalid Dates",
      });
    }
    if (end <= start) {
      return res.status(400).json({
        message: "EndDate Must Be After StartDate",
      });
    }
    // تحقق من ان سعر = رقم
    const numberPrice = Number(price);
    if (isNaN(numberPrice)) {
      return res.status(400).json({ message: "Price Must Be Number" });
    }
    // تحقق من سعة مقاعد
    const numberCapacity = Number(capacity);
    if (isNaN(numberCapacity) || numberCapacity <= 0) {
      return res
        .status(400)
        .json({ message: "Capacity Must Be Greater Than 0" });
    }
    // إنشاء نشاط
    const newActivity = await Activity.create({
      name,
      description,
      location,
      startDate,
      endDate,
      ageRange,
      category,
      images,
      capacity: numberCapacity,
      price: numberPrice,
      provider: req.user.id, // provider = الحالي / من token
    });
    return res.status(201).json({
      Activity: newActivity,
      message: "Activity Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
// get all Activity
export const getAllActivity = async (req, res) => {
  try {
    let activities;

    if (req.user.role === "provider") {
      // يرى انشطته
      activities = await Activity.find({ provider: req.user.id });
    } else {
      //الادمن يرى كل الانشطه
    activities = await Activity.find();
    }
    return res
      .status(200)
      .json({ message: "Activity Fetched Successfully", activities: activities || [] });
  } catch (error) {
    return res.status(500).json({ message: "Error Fetched Activity", error });
  }
};
// get Activity By id
export const getActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const activityById = await Activity.findById(id);
    if (!activityById) {
      return res.status(404).json({ message: "Activity Not Found" });
    }
    //  كل Provider  يرى انشطته فقط
    if (
      req.user.role === "provider" &&
      activityById.provider.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access Denied" });
    }

    return res
      .status(200)
      .json({
        message: "Activity Fetched Successfully",
        Activity: activityById,
      });
  } catch (error) {
    return res.status(500).json({ message: "Error Fetched Activity", error });
  }
};
// delete Activity By Id
export const deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const activityToDelete = await Activity.findByIdAndDelete(id);
    if (!activityToDelete) {
      return res.status(404).json({ message: "Activity Not Found" });
    }
    return res.status(200).json({ message: "Activity Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error Fetched Activity", error });
  }
};
// Update Activity
export const updateActivity = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    location,
    startDate,
    endDate,
    ageRange,
    price,
    capacity,
    images,
    category,
  } = req.body;
  try {
    // تاكد من وجود نشاط
    const activityToUpdate = await Activity.findByIdAndUpdate(
      id,
      {
        name,
        description,
        location,
        startDate,
        endDate,
        ageRange,
        price,
        capacity,
        images,
        category,
      },
      { new: true },
    );
    if (!activityToUpdate) {
      return res.status(404).json({ message: "Activity Not Found" });
    }
    return res
      .status(200)
      .json({
        message: "Activity Updated Successfully",
        activity: activityToUpdate,
      });
  } catch (error) {
    return res.status(500).json({ message: "Error Update Activity", error });
  }
};
// موافقة او الرفض على النشاط من الادمن
export const updateActivityStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log("id", id, "status", status);

  try {
    // سماح بالقيم محددة
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status Must Be Approved Or Rejected",
      });
    }
    // update status
    const activity = await Activity.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!activity) {
      return res.status(404).json({ message: "Activity Not Found" });
    }
    return res.status(200).json({
      message: `Activity ${status} Successfully`,
      activity,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Updating Activity Status",
      error: error.message,
    });
  }
};

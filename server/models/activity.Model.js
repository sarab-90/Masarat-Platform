import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        name:{
            type : String ,
            required:true
        },
        description:{
            type: String, 
            required: true
        },
        category:{
            // ربط نشاط بلتصنيف
            type: mongoose.Schema.Types.ObjectId,
             ref: "Category", // يكون نفس اسم model في category
            required: true
        },
        // جهة التي اضافت نشاط
        provider:{
            type: mongoose.Schema.Types.ObjectId,
            ref : "user", 
            required: true
        },
        location:{
            type: String, 
            required: true
        },
        startDate:{
            type: Date, 
            required: true
        },
        endDate:{
            type: Date, 
            required: true
        },
        ageRange:{
            type: String, 
        },
        price:{
            type: Number,
            default: 0, 
        },
        // capacity >> عدد مقاعد -سعة
        capacity:{
            type: Number, 
        },
        // حالة الموافقة من الادمن
        status :{
            type: String, 
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        images:{
            type: [String], 
            // قد يحتوي اكثر من صورة
            default: [],
        },
    },
    {
        timestamps:true
    }
)
const Activity = mongoose.model("Activity", activitySchema)
export default Activity;
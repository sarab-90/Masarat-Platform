import jwt from "jsonwebtoken";
import User from "../models/user.Models.js";
// authenticate = مصادقة  middleware للتحقق من صحة  token
export const protect = async (req, res, next) => {
  // cookies من token  قراءة
  let token = req.cookies.token;
  
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not Authorized, No Token Provided" });
  }
  try {
    // jwt.verify = فك تشفير  token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // جلب مستخدم من قاعدة بدون كلمة سر
    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(401).json({message: "User Not Found"});
    }
    req.user = currentUser;  // يحتوي بيانات المستخدم 
    console.log("current User:", req.user);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Not Authorized, Invalid Token" });
  }
};

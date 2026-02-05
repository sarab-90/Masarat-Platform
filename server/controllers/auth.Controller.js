import user from "../models/user.Models.js";
// تشفير password
import bcrypt from "bcrypt";
//token jwt
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "ALL Fields are required" });
    }
    // تأكد من email مسجل او لا
    const existingUser = await user.findOne({ email });
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User Already exists, Try To Register" });
    }
    // cheak password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password Must contain At Least One Number And One Special Character",
      });
    }
    // تشفير password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashPassword,
      role: "user",
    });
    return res
      .status(201)
      .json({ message: "User Registered Successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "ALL Fields are required" });
    }
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User Not found, Please Register" });
    }
    //مقارنة password المدخل مع password  المشفر
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials, Please Try Again" });
    }
    // create token jwt
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }, // مدة صلاحية التوكن
    );
    // تخزين token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    return res
      .status(200)
      .json({ message: "Login Successful", user: existingUser , token});
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
// get current user
export const getCurrentUser = async (req, res) => {
  // get current user from id in token
  try {
    const currentUser = await user.findById(req.user.id).select("-password");
    console.log(" currentUser:", currentUser);
    if (!currentUser) {
      return res.status(404).json({message: "User Not Found"});
    }
    return res
      .status(200)
      .json({ user: currentUser });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// logout
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logout Successful"
  });
}
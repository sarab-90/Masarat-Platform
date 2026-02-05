import dotenv from "dotenv";
import path from "path"
dotenv.config({
  path: path.resolve(process.cwd(), "utils/.env"),
});
import express from "express";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./config/db.js";
import userRouters from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import activityRoute from "./routes/activityRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();

// Middleware
app.use(helmet());

// connect to front end
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

// API routers
app.use("/api", userRouters);
app.use("/api", authRoute);
app.use("/api", activityRoute);
app.use("/api", categoryRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
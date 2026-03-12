import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import aiRoute from "./routes/ai.route.js";
import interviewRoute from "./routes/interview.route.js";
import roadmapRoute from "./routes/roadmap.route.js";
import codeRoute from "./routes/code.route.js"


import express from "express";
import cors from "cors";
dotenv.config({});

// call database connection here
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization","x-api-key", "Accept-Language","X-Requested-With"],
  })
);
//apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/ai", aiRoute);
app.use("/api/v1/interview", interviewRoute);
app.use("/api/v1/roadmap", roadmapRoute);
app.use("/api/v1/code", codeRoute);


app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});

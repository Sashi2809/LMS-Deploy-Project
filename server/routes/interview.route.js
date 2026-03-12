import express from "express";
import { 
  startInterview, 
  submitAnswer,
  getResults
} from "../controllers/interview.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/start", isAuthenticated, startInterview);
router.post("/submit", isAuthenticated, submitAnswer);
router.get("/results/:id", isAuthenticated, getResults);

export default router;
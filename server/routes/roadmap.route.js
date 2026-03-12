import express from "express";
import { roadmapHandler } from "../controllers/roadmap.controller.js";

const router = express.Router();
router.post("/generate-roadmap", roadmapHandler);

export default router;
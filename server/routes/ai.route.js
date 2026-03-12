import express from "express";
import {getResponseHandler} from "../controllers/ai.controller.js"; // Ensure correct file extension

const router = express.Router();

router.post("/get-review", getResponseHandler);

export default router;

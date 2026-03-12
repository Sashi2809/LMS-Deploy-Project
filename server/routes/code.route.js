

import express from "express";
import { runCodeHandler} from "../controllers/code.controller.js"; // Ensure correct file extension

const router = express.Router();

router.post("/run", runCodeHandler);

export default router;
import express from "express";
import { summarizeDocument } from "../controllers/ai.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/summary", authMiddleware, summarizeDocument);

export default router;
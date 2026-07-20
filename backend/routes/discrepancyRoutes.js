import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getDiscrepancies } from "../controllers/discrepancyController.js";

const router = express.Router();

router.get("/", authMiddleware, getDiscrepancies);

export default router;

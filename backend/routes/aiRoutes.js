import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { explainDiscrepancy } from "../controllers/aiController.js";

const router = express.Router();

router.get("/:id/explain", authMiddleware, explainDiscrepancy);

export default router;

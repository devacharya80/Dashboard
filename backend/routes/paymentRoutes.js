import express from "express";
import {
  getPayments,
  deletePayments,
} from "../controllers/paymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getPayments);
router.delete("/", authMiddleware, deletePayments);

export default router;

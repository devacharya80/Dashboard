import express from "express";
import { getOrders, deleteOrders } from "../controllers/orderController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getOrders);
router.delete("/", authMiddleware, deleteOrders);

export default router;

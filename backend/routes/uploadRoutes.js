import express from "express";
import upload from "../config/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadFiles } from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "orders", maxCount: 1 },
    { name: "payments", maxCount: 1 },
  ]),
  uploadFiles,
);

export default router;

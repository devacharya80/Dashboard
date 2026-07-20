import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import discrepancyRoutes from "./routes/discrepancyRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

console.log(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/discrepancies", discrepancyRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// async function test() {
//   console.log("Gemini Key:", process.env.GEMINI_API_KEY);
//   console.log("Key Length:", process.env.GEMINI_API_KEY?.length);
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//     const model = genAI.getGenerativeModel({
//       model: "gemini-3.5-flash",
//     });

//     const result = await model.generateContent("Say hello in one sentence.");

//     console.log(result.response.text());
//   } catch (error) {
//     console.error(error);
//   }
// }

// test();

import { GoogleGenerativeAI } from "@google/generative-ai";
import Discrepancy from "../models/Discrepancy.js";

export const explainDiscrepancy = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const userId = req.user._id;
    const { id } = req.params;

    const discrepancy = await Discrepancy.findOne({
      _id: id,
      user: userId,
    });

    if (!discrepancy) {
      return res.status(404).json({
        success: false,
        message: "Discrepancy not found",
      });
    }

        const model = genAI.getGenerativeModel({
          model: "gemini-3.5-flash",
        });

        const prompt = `
    You are a financial reconciliation assistant.

    Explain this discrepancy in simple English.

    ${JSON.stringify(discrepancy.toObject(), null, 2)}

    Return:
    1. What happened
    2. Why it probably happened
    3. Suggested action

    Keep it under 150 words.
    `;

        const result = await model.generateContent(prompt);
        const explanation = result.response.text();

    // const model = genAI.getGenerativeModel({
    //   model: "gemini-3.5-flash",
    // });

    // const result = await model.generateContent(
    //   "Reply with exactly the word: SUCCESS",
    // );

    // console.log(result.response.text());

    // return res.json({
    //   success: true,
    //   text: result.response.text(),
    // });

    res.status(200).json({
      success: true,
      discrepancy,
      explanation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Discrepancy from "../models/Discrepancy.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalOrders = await Order.countDocuments({ user: userId });
    const totalPayments = await Payment.countDocuments({ user: userId });

    const discrepancies = await Discrepancy.find({ user: userId }).sort({
      createdAt: -1,
    });

    const summary = {
      totalOrders,
      totalPayments,
      totalDiscrepancies: discrepancies.length,

      missingPayments: discrepancies.filter((d) => d.type === "MISSING_PAYMENT")
        .length,

      orphanPayments: discrepancies.filter((d) => d.type === "ORPHAN_PAYMENT")
        .length,

      amountMismatches: discrepancies.filter(
        (d) => d.type === "AMOUNT_MISMATCH",
      ).length,

      duplicateOrders: discrepancies.filter((d) => d.type === "DUPLICATE_ORDER")
        .length,

      duplicatePayments: discrepancies.filter(
        (d) => d.type === "DUPLICATE_PAYMENT",
      ).length,
    };

    res.status(200).json({
      success: true,
      summary,
      discrepancies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

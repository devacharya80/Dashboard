import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Discrepancy from "../models/Discrepancy.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId });
    const payments = await Payment.find({ user: userId });

    const discrepancies = await Discrepancy.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    const totalOrders = orders.length;
    const totalPayments = payments.length;

    // Total value of all orders
    const totalOrderValue = orders.reduce(
      (sum, order) => sum + (order.netAmount || 0),
      0,
    );

    // Total value of all payments
    const totalPaymentValue = payments.reduce(
      (sum, payment) => sum + (payment.amount || 0),
      0,
    );

    // Total value reconciled
    const totalValueReconciled = Math.min(totalOrderValue, totalPaymentValue);

    // Total value in dispute
    let totalValueInDispute = 0;

    // Money at risk
    let moneyAtRisk = 0;

    for (const discrepancy of discrepancies) {
      switch (discrepancy.type) {
        case "MISSING_PAYMENT":
          totalValueInDispute += discrepancy.orderAmount || 0;
          moneyAtRisk += discrepancy.orderAmount || 0;
          break;

        case "ORPHAN_PAYMENT":
          totalValueInDispute += discrepancy.paymentAmount || 0;
          moneyAtRisk += discrepancy.paymentAmount || 0;
          break;

        case "AMOUNT_MISMATCH":
          totalValueInDispute += Math.abs(
            (discrepancy.orderAmount || 0) - (discrepancy.paidAmount || 0),
          );

          moneyAtRisk += Math.abs(
            (discrepancy.orderAmount || 0) - (discrepancy.paidAmount || 0),
          );

          break;

        default:
          break;
      }
    }

    const summary = {
      totalOrders,
      totalPayments,

      totalDiscrepancies: discrepancies.length,

      totalValueReconciled,

      totalValueInDispute,

      moneyAtRisk,

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

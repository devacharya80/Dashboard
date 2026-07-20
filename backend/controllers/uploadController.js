import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

import parseOrders from "../utils/parseOrders.js";
import parsePayments from "../utils/parsePayment.js";
import reconcile from "../utils/reconcile.js";

export const uploadFiles = async (req, res) => {
  try {
    const ordersFile = req.files?.orders?.[0];
    const paymentsFile = req.files?.payments?.[0];

    if (!ordersFile || !paymentsFile) {
      return res.status(400).json({
        success: false,
        message: "Both orders.csv and payments.csv are required.",
      });
    }

    const userId = req.user._id;

    // Parse CSV files
    const orders = await parseOrders(ordersFile.buffer, userId);
    const payments = await parsePayments(paymentsFile.buffer, userId);

    // Remove previous uploaded data
    await Order.deleteMany({ user: userId });
    await Payment.deleteMany({ user: userId });

    // Insert new data
    await Order.insertMany(orders);
    await Payment.insertMany(payments);

    const discrepancies = await reconcile(userId);

    res.status(200).json({
      success: true,
      message: "Data uploaded successfully.",
      ordersImported: orders.length,
      paymentsImported: payments.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: `Internal Server Error, Message: ${error.message}`,
    });
  }
};

import Payment from "../models/Payment.js";

export const getPayments = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // Fetch payments belonging to this user, sorted by newest processing date first
    const payments = await Payment.find({ user: userId }).sort({ processedAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deletePayments = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // Perform the bulk deletion operation for this user
    const result = await Payment.deleteMany({ user: userId });

    res.status(200).json({
      success: true,
      message: "All your payments have been cleared successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error clearing payments:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Could not clear payments.",
    });
  }
};
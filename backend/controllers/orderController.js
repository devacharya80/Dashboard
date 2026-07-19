import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteOrders = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // 1. Perform the bulk deletion operation
    const result = await Order.deleteMany({ user: userId });

    // 2. You MUST return a response so the client knows the operation ended successfully
    res.status(200).json({
      success: true,
      message: "All your orders have been cleared successfully.",
      deletedCount: result.deletedCount, 
    });
  } catch (error) {
    console.error("Error clearing orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Could not clear orders.",
    });
  }
};

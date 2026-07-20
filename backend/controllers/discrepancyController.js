import Discrepancy from "../models/Discrepancy.js";

export const getDiscrepancies = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;

    const filter = { user: userId };

    if (type) {
      filter.type = type;
    }

    const discrepancies = await Discrepancy.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: discrepancies.length,
      discrepancies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

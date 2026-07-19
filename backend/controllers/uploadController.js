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

    res.status(200).json({
      success: true,
      message: "Files uploaded successfully.",
      files: {
        orders: ordersFile.originalname,
        payments: paymentsFile.originalname,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

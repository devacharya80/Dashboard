import mongoose from "mongoose";

const discrepancySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "MISSING_PAYMENT",
        "ORPHAN_PAYMENT",
        "AMOUNT_MISMATCH",
        "DUPLICATE_ORDER",
        "DUPLICATE_PAYMENT",
      ],
    },

    severity: {
      type: String,
      required: true,
      enum: ["LOW", "MEDIUM", "HIGH"],
    },

    orderId: String,

    orderReference: String,

    orderAmount: Number,

    paymentAmount: Number,

    paidAmount: Number,

    occurrences: Number,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Discrepancy", discrepancySchema);

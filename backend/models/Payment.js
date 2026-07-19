import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    transactionRef: {
      type: String,
      required: true,
    },

    processedAt: {
      type: Date,
      required: true,
    },

    orderReference: {
      type: String,
      required: true,
    },

    currency: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    fee: {
      type: Number,
      required: true,
    },

    netSettled: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["charge", "refund"],
      required: true,
    },

    status: {
      type: String,
      enum: ["settled", "pending", "failed"],
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

paymentSchema.index(
  {
    user: 1,
    transactionRef: 1,
  },
  {
    unique: true,
  },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

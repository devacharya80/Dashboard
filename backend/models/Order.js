import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
    },
    orderDate: {
      type: Date,
      required: [true, "Order date is required"],
      default: Date.now,
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      trim: true,
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "USD",
    },
    grossAmount: {
      type: Number,
      required: [true, "Gross amount is required"],
    },
    discount: {
      type: Number,
      required: [true, "Discount is required"],
      default: 0,
    },
    netAmount: {
      type: Number,
      required: [true, "Net amount is required"],
    },
    status: {
      type: String,
      enum: ["completed", "cancelled"],
      required: [true, "Status must be either completed or cancelled"],
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

orderSchema.index({ user: 1, orderId: 1 }, { unique: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;

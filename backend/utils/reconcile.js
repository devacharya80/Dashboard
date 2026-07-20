import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

const reconcile = async (userId) => {
  const discrepancies = [];

  // Fetch all orders and payments
  const orders = await Order.find({ user: userId });
  const payments = await Payment.find({ user: userId });

  // ---------------- Payment Map ----------------
  const paymentMap = new Map();

  for (const payment of payments) {
    if (!paymentMap.has(payment.orderReference)) {
      paymentMap.set(payment.orderReference, []);
    }

    paymentMap.get(payment.orderReference).push(payment);
  }

  // ---------------- Order Map ----------------
  const orderMap = new Map();

  for (const order of orders) {
    if (!orderMap.has(order.orderId)) {
      orderMap.set(order.orderId, []);
    }

    orderMap.get(order.orderId).push(order);
  }

  // ---------------- Missing Payments + Amount Mismatch ----------------
  for (const order of orders) {
    const paymentList = paymentMap.get(order.orderId);

    if (!paymentList) {
      discrepancies.push({
        type: "MISSING_PAYMENT",
        severity: "HIGH",
        orderId: order.orderId,
        orderAmount: order.netAmount,
      });
      continue;
    }

    const totalPaid = paymentList.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    if (Math.abs(totalPaid - order.netAmount) > 0.01) {
      discrepancies.push({
        type: "AMOUNT_MISMATCH",
        severity: "HIGH",
        orderId: order.orderId,
        orderAmount: order.netAmount,
        paidAmount: totalPaid,
      });
    }
  }

  // ---------------- Orphan Payments ----------------
  for (const payment of payments) {
    if (!orderMap.has(payment.orderReference)) {
      discrepancies.push({
        type: "ORPHAN_PAYMENT",
        severity: "HIGH",
        orderReference: payment.orderReference,
        paymentAmount: payment.amount,
      });
    }
  }

  // ---------------- Duplicate Orders ----------------
  for (const [orderId, orderList] of orderMap) {
    if (orderList.length > 1) {
      discrepancies.push({
        type: "DUPLICATE_ORDER",
        severity: "MEDIUM",
        orderId,
        occurrences: orderList.length,
      });
    }
  }

  // ---------------- Duplicate Payments ----------------
  for (const [orderReference, paymentList] of paymentMap) {
    if (paymentList.length > 1) {
      discrepancies.push({
        type: "DUPLICATE_PAYMENT",
        severity: "MEDIUM",
        orderReference,
        occurrences: paymentList.length,
      });
    }
  }

  // ---------------- Summary ----------------
  console.log("==================================");
  console.log("Reconciliation Summary");
  console.log("==================================");

  console.log("Orders:", orders.length);
  console.log("Payments:", payments.length);

  console.log(
    "Missing Payments:",
    discrepancies.filter((d) => d.type === "MISSING_PAYMENT").length
  );

  console.log(
    "Orphan Payments:",
    discrepancies.filter((d) => d.type === "ORPHAN_PAYMENT").length
  );

  console.log(
    "Amount Mismatches:",
    discrepancies.filter((d) => d.type === "AMOUNT_MISMATCH").length
  );

  console.log(
    "Duplicate Orders:",
    discrepancies.filter((d) => d.type === "DUPLICATE_ORDER").length
  );

  console.log(
    "Duplicate Payments:",
    discrepancies.filter((d) => d.type === "DUPLICATE_PAYMENT").length
  );

  console.log("==================================");

  return discrepancies;
};

export default reconcile;
import csv from "csv-parser";
import { Readable } from "stream";

const parseOrders = (fileBuffer, userId) => {
  return new Promise((resolve, reject) => {
    const orders = [];

    Readable.from(fileBuffer)
      .pipe(csv())
      .on("data", (row) => {
        if (
          !row.order_id ||
          !row.order_date ||
          !row.customer_email ||
          !row.net_amount
        ) {
          return;
        }
        orders.push({
          orderId: row.order_id,
          orderDate: new Date(row.order_date),
          customerEmail: row.customer_email,
          currency: row.currency,
          grossAmount: Number(row.gross_amount),
          discount: Number(row.discount),
          netAmount: Number(row.net_amount),
          status: row.status.toLowerCase(),
          user: userId,
        });
      })
      .on("end", () => resolve(orders))
      .on("error", reject);
  });
};

export default parseOrders;

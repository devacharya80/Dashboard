import csv from "csv-parser";
import { Readable } from "stream";

const parseDate = (dateString) => {
  const [date, time] = dateString.split(" ");
  const [day, month, year] = date.split("/");

  return new Date(`${year}-${month}-${day}T${time}:00`);
};

const parsePayments = (fileBuffer, userId) => {
  return new Promise((resolve, reject) => {
    const payments = [];

    Readable.from(fileBuffer)
      .pipe(csv())
      .on("data", (row) => {
        if (!row.transaction_ref || !row.order_reference || !row.amount) {
          return;
        }

        payments.push({
          transactionRef: row.transaction_ref,
          processedAt: parseDate(row.processed_at),
          orderReference: row.order_reference,
          currency: row.currency,
          amount: Number(row.amount),
          fee: Number(row.fee),
          netSettled: Number(row.net_settled),
          type: row.type.toLowerCase(),
          status: row.status.toLowerCase(),
          user: userId,
        });
      })
      .on("end", () => resolve(payments))
      .on("error", reject);
  });
};

export default parsePayments;

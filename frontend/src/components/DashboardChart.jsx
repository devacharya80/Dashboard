import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardChart({ summary }) {
  const data = {
    labels: [
      "Missing Payments",
      "Orphan Payments",
      "Amount Mismatches",
      "Duplicate Orders",
      "Duplicate Payments",
    ],

    datasets: [
      {
        data: [
          summary.missingPayments,
          summary.orphanPayments,
          summary.amountMismatches,
          summary.duplicateOrders,
          summary.duplicatePayments,
        ],

        backgroundColor: [
          "#EF4444", // Red
          "#F97316", // Orange
          "#EAB308", // Yellow
          "#3B82F6", // Blue
          "#22C55E", // Green
        ],

        borderColor: "#ffffff",

        borderWidth: 2,

        hoverOffset: 15,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",

        labels: {
          font: {
            size: 14,
          },
        },
      },

      title: {
        display: true,
        text: "Discrepancy Distribution",
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div
          style={{
            width: "600px",
            height: "450px",
            margin: "0 auto",
          }}
        >
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;

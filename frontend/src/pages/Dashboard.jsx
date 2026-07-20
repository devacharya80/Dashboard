import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import UploadForm from "../components/UploadForm";
import DashboardChart from "../components/DashboardChart";
import DiscrepancyTable from "../components/DiscrepancyTable";

import api from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalPayments: 0,
    totalDiscrepancies: 0,
    missingPayments: 0,
    orphanPayments: 0,
    amountMismatches: 0,
    duplicateOrders: 0,
    duplicatePayments: 0,
  });

  const [discrepancies, setDiscrepancies] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/dashboard");

      setSummary(data.summary);
      setDiscrepancies(data.discrepancies);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-md-3">
            <SummaryCard title="Orders" value={summary.totalOrders} />
          </div>

          <div className="col-md-3">
            <SummaryCard title="Payments" value={summary.totalPayments} />
          </div>

          <div className="col-md-3">
            <SummaryCard
              title="Discrepancies"
              value={summary.totalDiscrepancies}
            />
          </div>

          <div className="col-md-3">
            <SummaryCard
              title="Missing Payments"
              value={summary.missingPayments}
            />
          </div>
        </div>

        <div className="mt-5">
          <UploadForm onUploadSuccess={fetchDashboard} />
        </div>

        <div className="mt-5">
          <DashboardChart summary={summary} />
        </div>

        <div className="mt-5">
          <DiscrepancyTable discrepancies={discrepancies} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

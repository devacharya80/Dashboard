import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import UploadForm from "../components/UploadForm";
import DashboardChart from "../components/DashboardChart";
import DiscrepancyTable from "../components/DiscrepancyTable";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-md-3">
            <SummaryCard title="Orders" value="0" />
          </div>

          <div className="col-md-3">
            <SummaryCard title="Payments" value="0" />
          </div>

          <div className="col-md-3">
            <SummaryCard title="Discrepancies" value="0" />
          </div>

          <div className="col-md-3">
            <SummaryCard title="Money At Risk" value="$0" />
          </div>
        </div>

        <div className="mt-5">
          <UploadForm />
        </div>

        <div className="mt-5">
          <DashboardChart />
        </div>

        <div className="mt-5">
          <DiscrepancyTable />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

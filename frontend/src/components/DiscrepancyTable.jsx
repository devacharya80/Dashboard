import { useState } from "react";
import api from "../services/api";
import ExplanationModal from "./ExplanationModal";

function DiscrepancyTable({ discrepancies }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [explanation, setExplanation] = useState("");

  const handleExplain = async (id) => {
    try {
      setShowModal(true);
      setLoadingAI(true);

      const { data } = await api.get(`/ai/${id}/explain`);

      setExplanation(data.explanation);
    } catch (error) {
      setExplanation("Unable to generate explanation.");
    } finally {
      setLoadingAI(false);
    }
  };

  const filtered = discrepancies.filter((item) => {
    const order = (item.orderId || item.orderReference || "").toLowerCase();

    const matchesSearch = order.includes(search.toLowerCase());

    const matchesFilter = filter === "" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "HIGH":
        return "bg-danger";

      case "MEDIUM":
        return "bg-warning text-dark";

      case "LOW":
        return "bg-success";

      default:
        return "bg-secondary";
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "MISSING_PAYMENT":
        return "bg-danger";

      case "ORPHAN_PAYMENT":
        return "bg-primary";

      case "AMOUNT_MISMATCH":
        return "bg-warning text-dark";

      case "DUPLICATE_ORDER":
        return "bg-info text-dark";

      case "DUPLICATE_PAYMENT":
        return "bg-success";

      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">📋 Discrepancy Report</h4>
        </div>

        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6 mb-2">
              <input
                className="form-control"
                placeholder="🔍 Search Order ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-2">
              <select
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All Types</option>

                <option value="MISSING_PAYMENT">Missing Payment</option>

                <option value="ORPHAN_PAYMENT">Orphan Payment</option>

                <option value="AMOUNT_MISMATCH">Amount Mismatch</option>

                <option value="DUPLICATE_ORDER">Duplicate Order</option>

                <option value="DUPLICATE_PAYMENT">Duplicate Payment</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Type</th>

                  <th>Severity</th>

                  <th>Order</th>

                  <th>AI</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      ✅ No discrepancies found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <span className={`badge ${getTypeBadge(item.type)}`}>
                          {item.type.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${getSeverityBadge(item.severity)}`}
                        >
                          {item.severity}
                        </span>
                      </td>

                      <td>{item.orderId || item.orderReference}</td>

                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleExplain(item._id)}
                        >
                          🤖 Explain
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ExplanationModal
        show={showModal}
        loading={loadingAI}
        explanation={explanation}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default DiscrepancyTable;

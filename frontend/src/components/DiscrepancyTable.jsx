import { useState } from "react";

function DiscrepancyTable({ discrepancies }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = discrepancies.filter((item) => {
    const matchesSearch = (item.orderId || item.orderReference || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="card shadow">
      <div className="card-body">
        <h4 className="mb-4">Discrepancies</h4>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Search Order..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>

              <option value="MISSING_PAYMENT">Missing Payment</option>

              <option value="ORPHAN_PAYMENT">Orphan Payment</option>

              <option value="AMOUNT_MISMATCH">Amount Mismatch</option>

              <option value="DUPLICATE_ORDER">Duplicate Order</option>

              <option value="DUPLICATE_PAYMENT">Duplicate Payment</option>
            </select>
          </div>
        </div>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Type</th>

              <th>Severity</th>

              <th>Order</th>

              <th>Explain</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item._id}>
                <td>{item.type}</td>

                <td>{item.severity}</td>

                <td>{item.orderId || item.orderReference}</td>

                <td>
                  <button className="btn btn-primary btn-sm">Explain</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DiscrepancyTable;

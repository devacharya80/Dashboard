import { useState } from "react";
import api from "../services/api";

function UploadForm({ onUploadSuccess }) {
  const [ordersFile, setOrdersFile] = useState(null);
  const [paymentsFile, setPaymentsFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!ordersFile || !paymentsFile) {
      alert("Please select both CSV files.");
      return;
    }

    const formData = new FormData();

    formData.append("orders", ordersFile);
    formData.append("payments", paymentsFile);

    try {
      setLoading(true);

      const { data } = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(data.message);

      setOrdersFile(null);
      setPaymentsFile(null);

      if (onUploadSuccess) {
        await onUploadSuccess();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="mb-4">Upload CSV Files</h4>

        <div className="mb-3">
          <label className="form-label">Orders CSV</label>

          <input
            type="file"
            accept=".csv"
            className="form-control"
            onChange={(e) => setOrdersFile(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payments CSV</label>

          <input
            type="file"
            accept=".csv"
            className="form-control"
            onChange={(e) => setPaymentsFile(e.target.files[0])}
          />
        </div>

        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={handleUpload}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default UploadForm;

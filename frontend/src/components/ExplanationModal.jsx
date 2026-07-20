import Loader from "./Loader";

function ExplanationModal({ show, onClose, loading, explanation }) {
  if (!show) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(explanation);
      alert("Explanation copied!");
    } catch (error) {
      alert("Failed to copy explanation.");
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow-lg">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">🤖 AI Discrepancy Explanation</h5>

            <button
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div
            className="modal-body"
            style={{
              minHeight: "250px",
            }}
          >
            {loading ? (
              <Loader text="Gemini is analyzing the discrepancy..." />
            ) : (
              <div
                className="p-3 rounded"
                style={{
                  background: "#f8f9fa",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.8",
                  fontSize: "16px",
                }}
              >
                {explanation}
              </div>
            )}
          </div>

          <div className="modal-footer">
            {!loading && (
              <button className="btn btn-success" onClick={handleCopy}>
                📋 Copy
              </button>
            )}

            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplanationModal;

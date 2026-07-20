function ExplanationModal({ show, onClose, loading, explanation }) {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">AI Explanation</h5>

            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status"></div>

                <p className="mt-3">Gemini is analyzing...</p>
              </div>
            ) : (
              <div style={{ whiteSpace: "pre-wrap" }}>{explanation}</div>
            )}
          </div>

          <div className="modal-footer">
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

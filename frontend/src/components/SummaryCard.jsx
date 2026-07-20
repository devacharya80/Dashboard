function SummaryCard({ title, value }) {
  const getIcon = () => {
    switch (title) {
      case "Orders":
        return "📦";

      case "Payments":
        return "💳";

      case "Reconciled Value":
        return "💰";

      case "Money At Risk":
        return "🚨";

      case "Discrepancies":
        return "⚠️";

      default:
        return "📊";
    }
  };

  const getBorder = () => {
    switch (title) {
      case "Orders":
        return "primary";

      case "Payments":
        return "success";

      case "Reconciled Value":
        return "info";

      case "Money At Risk":
        return "danger";

      case "Discrepancies":
        return "warning";

      default:
        return "secondary";
    }
  };

  return (
    <div
      className={`card shadow-sm border-start border-5 border-${getBorder()} h-100`}
      style={{
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>

            <h2 className="fw-bold mb-0">{value}</h2>
          </div>

          <div
            style={{
              fontSize: "2.5rem",
            }}
          >
            {getIcon()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;

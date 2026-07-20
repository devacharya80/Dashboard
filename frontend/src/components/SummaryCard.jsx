function SummaryCard({ title, value }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h6 className="text-secondary">{title}</h6>

        <h2 className="fw-bold">{value}</h2>
      </div>
    </div>
  );
}

export default SummaryCard;

function Loader({ text = "Loading..." }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <div
        className="spinner-border text-primary"
        style={{
          width: "3rem",
          height: "3rem",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      <h5 className="mt-3 text-secondary">{text}</h5>
    </div>
  );
}

export default Loader;

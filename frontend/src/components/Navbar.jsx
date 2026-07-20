import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-4">
        {/* Brand */}
        <a className="navbar-brand fw-bold fs-4" href="/dashboard">
          📊 Financial Reconciliation Dashboard
        </a>

        {/* User Info */}
        <div className="d-flex align-items-center">
          <div className="text-end me-4">
            <div className="text-white fw-semibold">{user?.name}</div>

            <small className="text-light">{user?.email}</small>
          </div>

          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

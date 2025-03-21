import { Link, useNavigate } from "react-router-dom";
import { logout, getLoggedInUser } from "../utils/storage";
import "./Navbar.css";

function Navbar() {
  const user = getLoggedInUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <h2>Agile Track System</h2>
      {user ? (
        <div>
          <Link to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}>Dashboard</Link>
          <Link to="/profiles">Profiles</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;

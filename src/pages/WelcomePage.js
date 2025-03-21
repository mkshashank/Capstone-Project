import { Link } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div className="container">
      <h1 className="title">Welcome to Agile Track System</h1>
      <p className="subtitle">Manage your scrum teams efficiently.</p>
      <div className="button-container">
        <Link to="/login?role=employee">
          <button className="btn user-btn">Login as User</button>
        </Link>
        <Link to="/login?role=admin">
          <button className="btn admin-btn">Login as Admin</button>
        </Link>
        <Link to="/signup">
          <button className="btn signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;

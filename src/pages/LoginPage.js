import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsers, setLoggedInUser } from "../utils/storage";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedRole = params.get("role");
    if (!selectedRole) {
      navigate("/");
    } else {
      setRole(selectedRole);
    }
  }, [location, navigate]);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Both fields are required!");
      return;
    }
    if (!email.includes("@")) {
      alert("Please include an '@' in the email address.");
      return;
    }

    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password && u.role === role);

    if (user) {
      setLoggedInUser(user);
      navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login as {role === "admin" ? "Admin" : "User"}</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="login-btn" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;

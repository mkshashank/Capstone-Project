import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/storage";
import "./SignUpPage.css";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!name || !email || !password || !role) {
      alert("All fields are required!");
      return;
    }

    if (!email.includes("@")) {
      alert("Please include an '@' in the email address.");
      return;
    }

    const success = addUser({ name, email, password, role });
    if (success) {
      alert("Sign up successful!");
      navigate("/login?role=" + role);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <label>Select Role:</label>
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUpPage;

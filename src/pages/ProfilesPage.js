import { useEffect, useState } from "react";
import { getUsers, addUser, getScrumTeams } from "../utils/storage";

function ProfilesPage() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleCreateUser = () => {
    const { name, email, password, role } = newUser;
    if (!name || !email || !password || !role) {
      alert("All fields are required!");
      return;
    }

    if (!email.includes("@")) {
      alert("Please include an '@' in the email.");
      return;
    }

    const success = addUser(newUser);
    if (success) {
      alert("User created!");
      setUsers(getUsers());
      setShowForm(false);
      setNewUser({ name: "", email: "", password: "", role: "employee" });
    }
  };

  const handleGetHistory = (email, name) => {
    const teams = getScrumTeams();
    const history = [];

    teams.forEach((team) => {
      team.tasks?.forEach((task) => {
        if (task.assignedTo === email) {
          history.push({
            team: team.name,
            title: task.title,
            description: task.description,
            status: task.status,
          });
        }
      });
    });

    setShowHistory({ name, tasks: history });
  };

  return (
    <div className="profiles-container">
      <h2>User Profiles</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New User"}
      </button>

      {showForm && (
        <div className="form-container">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleCreateUser}>Create User</button>
        </div>
      )}

      <ul>
        {users.map((user, idx) => (
          <li key={idx}>
            <strong>{user.name}</strong> ({user.email}) - {user.role}
            <button onClick={() => handleGetHistory(user.email, user.name)}>Get History</button>
          </li>
        ))}
      </ul>

      {showHistory && (
        <div className="history-container">
          <h3>Tasks Worked By {showHistory.name}</h3>
          {showHistory.tasks.length > 0 ? (
            <ul>
              {showHistory.tasks.map((task, idx) => (
                <li key={idx}>
                  <strong>Team:</strong> {task.team} <br />
                  <strong>Title:</strong> {task.title} <br />
                  <strong>Description:</strong> {task.description} <br />
                  <strong>Status:</strong> {task.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks assigned to this user.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilesPage;

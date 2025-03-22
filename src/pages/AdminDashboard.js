import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getScrumTeams, addScrumTeam, getUsers } from "../utils/storage";

function AdminDashboard() {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scrumName, setScrumName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [assignedUser, setAssignedUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTeams(getScrumTeams());
    setUsers(getUsers());
  }, []);

  const handleAddScrum = () => {
    if (!scrumName || !taskTitle || !taskDescription || !assignedUser) {
      alert("All fields are required!");
      return;
    }

    addScrumTeam({
      name: scrumName,
      tasks: [{ title: taskTitle, description: taskDescription, status: taskStatus, assignedTo: assignedUser }]
    });

    setTeams(getScrumTeams());
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Scrum Teams</h2>
      <button onClick={() => setShowForm(!showForm)} className="add-btn">
        {showForm ? "Cancel" : "Add New Scrum"}
      </button>

      {showForm && (
        <div className="form-container">
          <input type="text" placeholder="Scrum Name" onChange={(e) => setScrumName(e.target.value)} />
          <input type="text" placeholder="Task Title" onChange={(e) => setTaskTitle(e.target.value)} />
          <textarea placeholder="Task Description" onChange={(e) => setTaskDescription(e.target.value)}></textarea>
          <select onChange={(e) => setTaskStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select onChange={(e) => setAssignedUser(e.target.value)}>
            <option value="">Assign To</option>
            {users.map((user, index) => (
              <option key={index} value={user.email}>{user.name} ({user.email})</option>
            ))}
          </select>
          <button onClick={handleAddScrum}>Create Scrum</button>
        </div>
      )}

      {teams.length > 0 ? (
        <ul>
          {teams.map((team, index) => (
            <li key={index}>
              {team.name} <Link to={`/scrum/${index}`}>Get Details</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Scrum Teams available.</p>
      )}
    </div>
  );
}

export default AdminDashboard;

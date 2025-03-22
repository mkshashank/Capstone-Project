import { useParams } from "react-router-dom";
import { getScrumTeams, getUsers, getLoggedInUser, setLoggedInUser } from "../utils/storage";
import { useEffect, useState } from "react";

function ScrumDetails() {
  const { id } = useParams();
  const [scrum, setScrum] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const currentUser = getLoggedInUser();

  useEffect(() => {
    const teams = getScrumTeams();
    const selected = teams[id];
    setScrum(selected);
    setAllUsers(getUsers());
  }, [id]);

  const handleStatusChange = (taskIndex, newStatus) => {
    const teams = getScrumTeams();
    teams[id].tasks[taskIndex].status = newStatus;
    localStorage.setItem("scrumTeams", JSON.stringify(teams));
    setScrum({ ...teams[id] });
  };

  if (!scrum) return <p>Loading Scrum...</p>;

  const teamUsers = allUsers.filter((u) =>
    scrum.tasks.some((t) => t.assignedTo === u.email)
  );

  return (
    <div className="scrum-container">
      <h2>Scrum Details for {scrum.name}</h2>

      <h3>Tasks</h3>
      <ul>
        {scrum.tasks?.map((task, idx) => (
          <li key={idx}>
            <strong>Title:</strong> {task.title} <br />
            <strong>Description:</strong> {task.description} <br />
            <strong>Status:</strong>{" "}
            {currentUser.role === "admin" ? (
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(idx, e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            ) : (
              task.status
            )}
          </li>
        ))}
      </ul>

      <h3>Users</h3>
      <ul>
        {teamUsers.map((u, i) => (
          <li key={i}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScrumDetails;

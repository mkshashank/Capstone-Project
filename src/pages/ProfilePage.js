import { getLoggedInUser, getScrumTeams } from "../utils/storage";
import { useEffect, useState } from "react";

function ProfilePage() {
  const user = getLoggedInUser();
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    const teams = getScrumTeams();
    const tasks = [];

    teams.forEach((team) => {
      if (Array.isArray(team.tasks)) {
        team.tasks.forEach((task) => {
          if (task.assignedTo === user.email) {
            tasks.push({ ...task, teamName: team.name });
          }
        });
      }
    });

    setMyTasks(tasks);
  }, [user]);

  return (
    <div className="profile-container">
      <h2>User Profiles</h2>
      <h3>Tasks Worked By {user.name}</h3>
      {myTasks.length > 0 ? (
        <ul>
          {myTasks.map((task, index) => (
            <li key={index}>
              <strong>Team:</strong> {task.teamName} <br />
              <strong>Title:</strong> {task.title} <br />
              <strong>Description:</strong> {task.description} <br />
              <strong>Status:</strong> {task.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  );
}

export default ProfilePage;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getScrumTeams } from "../utils/storage";

function UserDashboard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(getScrumTeams());
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Scrum Teams</h2>
      {teams.length > 0 ? (
        <ul>
          {teams.map((team, index) => (
            <li key={index}>
              {team.name}{" "}
              <Link to={`/scrum/${index}`}>
                <button>Get Details</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Scrum Teams available.</p>
      )}
    </div>
  );
}

export default UserDashboard;

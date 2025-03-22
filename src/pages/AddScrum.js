import { useState } from "react";
import { addScrumTeam } from "../utils/storage";

function AddScrum() {
  const [scrumName, setScrumName] = useState("");

  const handleAddScrum = () => {
    addScrumTeam({ name: scrumName });
    alert("Scrum Team Added!");
  };

  return (
    <div>
      <h2>Add New Scrum</h2>
      <input type="text" placeholder="Scrum Name" onChange={(e) => setScrumName(e.target.value)} />
      <button onClick={handleAddScrum}>Create Scrum</button>
    </div>
  );
}

export default AddScrum;

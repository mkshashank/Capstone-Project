// ========== USER FUNCTIONS ==========
export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const addUser = (user) => {
  const users = getUsers();
  const exists = users.some((u) => u.email === user.email);
  if (exists) {
    alert("User already exists!");
    return false;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};

// ========== SCRUM FUNCTIONS ==========
export const getScrumTeams = () => JSON.parse(localStorage.getItem("scrumTeams")) || [];

export const addScrumTeam = (team) => {
  const teams = getScrumTeams();
  teams.push(team);
  localStorage.setItem("scrumTeams", JSON.stringify(teams));
};

export const updateScrumTeam = (index, updatedTeam) => {
  const teams = getScrumTeams();
  teams[index] = updatedTeam;
  localStorage.setItem("scrumTeams", JSON.stringify(teams));
};

// ========== SESSION FUNCTIONS ==========
export const getLoggedInUser = () => JSON.parse(sessionStorage.getItem("loggedInUser"));

export const setLoggedInUser = (user) => {
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const logout = () => {
  sessionStorage.removeItem("loggedInUser");
};

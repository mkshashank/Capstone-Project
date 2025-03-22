import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "./storage";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = getLoggedInUser();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return element;
};

export default ProtectedRoute;

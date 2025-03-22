import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import ProfilesPage from "./pages/ProfilesPage";
import ScrumDetails from "./pages/ScrumDetails";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute element={<UserDashboard />} allowedRoles={["employee"]} />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute element={<ProfilesPage />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<ProfilePage />} allowedRoles={["employee"]} />
          }
        />
        <Route
          path="/scrum/:id"
          element={
            <ProtectedRoute element={<ScrumDetails />} allowedRoles={["admin", "employee"]} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

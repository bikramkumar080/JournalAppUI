import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./LoginUsage/sign-in/SignIn";
import SignUp from "./LoginUsage/sign-in/SignUp";
import ResetPassword from "./LoginUsage/sign-in/components/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import GoogleCallback from "./pages/GoogleCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
      </Routes>
    </Router>
  );
}

export default App;

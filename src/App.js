import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Heder";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Forgotpassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EditProfile from "./pages/EditProfile";
import AdminEditProfile from "./pages/AdminEditProfile";



function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
            <Route path="/user-dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/admin-edit-profile" element={<AdminEditProfile />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

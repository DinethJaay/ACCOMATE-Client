import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Heder";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Forgotpassword";
import Dashboard from "./pages/User/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditProfile from "./pages/User/EditProfile";
import AdminEditProfile from "./pages/Admin/AdminEditProfile";
import AdManagement from "./pages/Admin/AdManagement";
import UserManagement from "./pages/Admin/UserManagement";
import MyAds from "./pages/User/MyAds";



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
            <Route path="/user/user-dashboard" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/user/edit-profile" element={<EditProfile />} />
            <Route path="/admin/edit-profile" element={<AdminEditProfile />} />
            <Route path="/admin/ad-management" element={<AdManagement />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/user/my-ads" element={<MyAds />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

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
import FavouriteAds from "./pages/User/FavouriteAds";
import SearchAds from "./pages/User/SearchAds";
import AccomadationListing from "./pages/User/AccomadationListing";
//import AddListing from "./pages/User/AddListing";
import PostAdForm from "./pages/User/AddListing";
import AccommodationSearch from "./pages/User/AccommodationSearch";
import Rooms from "./pages/Rooms";
import Annex from "./pages/Annex";
import House from "./pages/House";



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
          <Route path="/user/favourite-ads" element={<FavouriteAds />} />
          <Route path="/user/search-ads" element={<SearchAds />} />
          <Route path="/accommodation/:id" element={<AccomadationListing />} />
          <Route path="/user/add-listing" element={<PostAdForm />} />
          <Route path="/user/predict" element={<AccommodationSearch />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/annex" element={<Annex />} />
          <Route path="/house" element={<House />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

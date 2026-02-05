import "./App.css";
import LandingPage from "./components/Layout/LandingPage.jsx";
import { Toaster } from "react-hot-toast";
import Register from "./components/Auth/Register/Register.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import Logout from "./components/Layout/Logout.jsx";
import AdminDashboard from "./components/Admin/Dashboard.jsx";
import DisplayUsers from "./components/Admin/DisplayUsers.jsx";
import Activities from "./components/Provider/Activities.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Categories from "./components/Admin/Categories.jsx";
import AdminActivities from "./components/Admin/ActivitiesStatus.jsx";
import AdminProfile from "./components/Admin/AdminProfile.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PendingActivities from "./components/Admin/PendingActivities.jsx";
import Home from "./components/User/Home.jsx";
import ActivitiesList from "./components/User/ActivitiesList.jsx";
import MyBookings from "./components/User/MyBookings.jsx";
import Dashboard from "./components/Provider/Dashboard.jsx";
import Profile from "./components/Provider/Profile.jsx";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Admin Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/displayUsers" element={<DisplayUsers />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/activitiesStatus" element={<AdminActivities />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route
            path="/admin/pending/activities"
            element={<PendingActivities />}
          />
          <Route path="/admin/categories" element={<Categories />} />

          {/* User Route */}
          <Route path="/user/home" element={<Home />} />
          <Route path="/user/activitiesList" element={<ActivitiesList />} />
          <Route path="/user/my-bookings" element={<MyBookings />} />
          <Route path="/user/activities" element={<ActivitiesList />} />

          {/* Provider Routes */}
          <Route path="/provider/dashboard" element={<Dashboard />} />
          <Route path="/provider/activities" element={<Activities />} />
          <Route path="/provider/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

import './App.css';
import Navbar from './Components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Report from './pages/Report';
import Appoiment from './pages/Appoiment';
import AboutUs from './pages/About';
import Services from './pages/Services';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Notifications from './pages/Notifications';
import BookmarkedDoctors from './pages/BookmarkedDoctors';
import TermCondition from './pages/TermCondition';
import HelpSupport from './pages/HelpSupport';
import HealthRecords from './pages/HealthRecords';
import EditProfile from "./pages/EditProfile";
import Footer from './Components/Footer';
import TestPage from '../src/pages/TestsCheckup';
import ChooseCheckupType from './pages/ChooseCheckupType';
import History from './pages/History';

import ComingSoon from './pages/ComingSoon';

import BookAppointment from "./pages/BookAppointment"; // ✅ Add this
import MyAppointments from "./pages/MyAppointments"; // ✅ Add this

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HealthCheckupSlot from '../src/pages/HealthCheckupSlot';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);

    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    const interval = setInterval(checkUser, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <Router>
      <Navbar user={user} logoSrc={"https://developer.bitmaxtest.com/public/storage/logos/1765534593_logo_logo.png"} />

      <div className="pt-16 min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<Report />} />
          <Route path="/appointment" element={<Appoiment />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookmarked" element={<BookmarkedDoctors />} />
          <Route path="/terms" element={<TermCondition />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/test-page" element={<TestPage />} />
          <Route path="/choose-checkup-type" element={<ChooseCheckupType />} />
          <Route path="/health-checkup-slots" element={<HealthCheckupSlot />} />
          <Route path="/history" element={<History />} />
          
          <Route path="/coming-soon" element={<ComingSoon />} />

          {/* ✅ Booking Flow Routes */}
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

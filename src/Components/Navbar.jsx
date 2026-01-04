import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaShieldAlt,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaCalendarCheck,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaFileAlt,
  FaStethoscope,
  FaEnvelope,
  FaHistory,
  FaCalendarPlus,
} from "react-icons/fa";

import useOrganizationInfo from "../hooks/useOrganizationInfo";

const API_BASE = "https://developer.bitmaxtest.com";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [auth, setAuth] = useState(null);

  /* ================= ORG DATA ================= */
  const { orgData, loading } = useOrganizationInfo();

  // ✅ SAFE LOGO URL (absolute + relative)
  const logoSrc = orgData?.logo
    ? orgData.logo.startsWith("http")
      ? orgData.logo
      : `${API_BASE}${orgData.logo}`
    : null;

  /* ================= AUTH ================= */
  const isLoggedIn = auth?.token || auth?.isLoggedIn;

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    setAuth(storedAuth);

    const syncAuth = () =>
      setAuth(JSON.parse(localStorage.getItem("auth")));

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= MENU ================= */
  const publicMenu = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaInfoCircle />, label: "About", path: "/about" },
    { icon: <FaStethoscope />, label: "Services", path: "/services" },
    { icon: <FaShieldAlt />, label: "Privacy", path: "/privacy-policy" },
  ];

  const privateMenu = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaCalendarCheck />, label: "Appointments", path: "/my-appointments" },
    { icon: <FaFileAlt />, label: "Reports", path: "/report" },
    { icon: <FaHistory />, label: "Test History", path: "/history" },
    // Bookmarked removed
    { icon: <FaUser />, label: "Profile", path: "/profile" }, // Profile added here
  ];

  const currentMenu = isLoggedIn ? privateMenu : publicMenu;
  const isActive = (path) => location.pathname === path;

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b shadow z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* ================= LOGO ================= */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-36 h-10 flex items-center">
              {loading ? (
                <FaStethoscope className="text-teal-600 text-xl animate-pulse" />
              ) : logoSrc ? (
                <img
                  src={logoSrc}
                  alt={orgData?.name || "Hospital"}
                  className="w-full h-full object-contain"
                />
              ) : (
                <FaStethoscope className="text-teal-600 text-xl" />
              )}
            </div>
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-8">
            {currentMenu.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition ${
                  isActive(item.path)
                    ? "bg-teal-500 text-white"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* ================= AUTH ================= */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-xl font-semibold hover:bg-teal-600 hover:text-white"
                >
                  <FaSignInAlt className="inline mr-1" />
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 bg-teal-600 text-white rounded-xl font-semibold"
                >
                  <FaUserPlus className="inline mr-1" />
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/appointment")}
                  className="px-4 py-2 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 flex items-center gap-2"
                >
                  <FaCalendarPlus className="text-sm" />
                  Book Appointment
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-teal-50"
                  >
                    <img
                      src={auth?.user?.image || "https://via.placeholder.com/40"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-400"
                    />
                    <span className="font-semibold">
                      {auth?.user?.full_name || "User"}
                    </span>
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border py-2">
                      <button
                        onClick={() => navigate("/profile")}
                        className="w-full px-4 py-3 text-left hover:bg-teal-50 flex gap-3"
                      >
                        <FaUser /> My Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex gap-3"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-teal-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="p-4 space-y-2">
              {currentMenu.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left hover:bg-teal-50"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="h-0" />
    </>
  );
};

export default Navbar;
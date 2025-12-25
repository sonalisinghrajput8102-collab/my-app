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
  FaHeart,
  FaHistory, // ← New icon added for History
} from "react-icons/fa";

import useOrganizationInfo from "../hooks/useOrganizationInfo";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [auth, setAuth] = useState(null);

  // ✅ Organization API data
  const orgHook = useOrganizationInfo();
  const orgData = orgHook ? orgHook.orgData : null;
  const loading = orgHook ? orgHook.loading : false;

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isLoggedIn = auth && (auth.token || auth.isLoggedIn);

  // Safe logo source (fallback to placeholder) and helpful alt text
  const PLACEHOLDER = "https://via.placeholder.com/44";
  const logoSrc = (orgData && orgData.logo) || PLACEHOLDER;
  const logoAlt = (orgData && orgData.name) || "Hospital Logo";

  const [logoSrcState, setLogoSrcState] = useState(null);

  useEffect(() => {
    if (orgData && orgData.logo) {
      setLogoSrcState(orgData.logo);
      return;
    }
  }, [orgData, loading]);

  const loadAuth = () => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    setAuth(storedAuth);
  };

  useEffect(() => {
    loadAuth();
    window.addEventListener("storage", loadAuth);

    const bookmarks =
      JSON.parse(localStorage.getItem("bookmarkedDoctors")) || [];
    setBookmarkCount(bookmarks.length);

    return () => window.removeEventListener("storage", loadAuth);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const publicMenu = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaInfoCircle />, label: "About", path: "/about" },
    { icon: <FaStethoscope />, label: "Services", path: "/services" },
    { icon: <FaEnvelope />, label: "Contact", path: "/contact" },
    { icon: <FaShieldAlt />, label: "Privacy", path: "/privacy-policy" },
  ];

  // ← Added "Test History" menu item only for logged-in users
  const privateMenu = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaCalendarCheck />, label: "Appointments", path: "/my-appointments" },
    { icon: <FaFileAlt />, label: "Reports", path: "/report" },
    { icon: <FaHistory />, label: "Test History", path: "/history" }, // ← New item
    { icon: <FaHeart />, label: "Bookmarked", path: "/bookmarked" },
    { icon: <FaUser />, label: "Profile", path: "/profile" },
  ];

  const currentMenu = isLoggedIn ? privateMenu : publicMenu;
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.dispatchEvent(new Event("storage"));
    setMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-lg border-b z-50">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo + Hospital Name */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-25 h-11 overflow-hidden flex items-center justify-center">
            {loading ? (
              <FaStethoscope className="text-teal-600 text-xl" />
            ) : (
              <img
                src={logoSrcState || logoSrc}
                alt={logoAlt}
                title={logoAlt}
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const current = e.target && e.target.src;
                  if (current && current !== PLACEHOLDER) {
                    console.error("Failed to load org logo:", current, e);
                    setLogoSrcState(PLACEHOLDER);
                    e.target.src = PLACEHOLDER;
                  } else {
                    e.target.onerror = null;
                  }
                }}
              />
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">
            {loading
              ? "Loading..."
              : (orgData && orgData.name) || "Hospital"}
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {currentMenu.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition ${
                isActive(item.path)
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 border-2 border-teal-600 text-teal-600 rounded-xl font-semibold hover:bg-teal-600 hover:text-white"
              >
                <FaSignInAlt className="inline mr-2" />
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold"
              >
                <FaUserPlus className="inline mr-2" />
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 p-2 hover:bg-teal-50 rounded-xl"
              >
                <img
                  src={
                    (auth && auth.user && auth.user.image) ||
                    (auth && auth.user && auth.user.profile_photo) ||
                    "https://via.placeholder.com/40"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-300"
                />
                <span className="font-semibold hidden lg:block">
                  {(auth && auth.user && auth.user.full_name) || "User"}
                </span>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border py-2">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full px-5 py-3 text-left hover:bg-teal-50 flex items-center gap-3"
                  >
                    <FaUser className="text-teal-600" />
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-3 hover:bg-teal-50 rounded-xl"
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {currentMenu.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-5 py-3 rounded-xl flex items-center gap-3 text-left font-medium transition ${
                  isActive(item.path)
                    ? "bg-teal-500 text-white"
                    : "text-gray-700 hover:bg-teal-50"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-5 py-3 border-2 border-teal-600 text-teal-600 rounded-xl font-semibold"
                >
                  <FaSignInAlt className="inline mr-2" />
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-5 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-semibold"
                >
                  <FaUserPlus className="inline mr-2" />
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-teal-50 flex items-center gap-3"
                >
                  <FaUser className="text-teal-600" />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="w-full px-5 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
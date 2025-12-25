// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiMenu,
  FiMoreVertical,
  FiSearch,
  FiBell,
  FiUser,
} from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineSun,
  HiOutlineMoon
} from "react-icons/hi";

const Header = ({
  title,
  subtitle,
  onBack,
  onMenuClick,
  rightAction,
  showShadow = true,
  gradient = "tealToCyan",
  transparent = false,
  sticky = false,
  elevated = false,
  showSearch = false,
  showNotifications = false,
  showProfile = false,
  centerAligned = false,
  animated = true,
  theme = "light",
  onThemeToggle,
  className = ""
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  // Scroll effect
  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  // Gradient classes
  const gradientClasses = {
    tealToCyan: "bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500",
    blueToPurple: "bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600",
    orangeToRed: "bg-gradient-to-r from-orange-500 via-red-400 to-red-500",
    gradientDark: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
    gradientLight: "bg-gradient-to-r from-white to-gray-100 border-b border-gray-200",
    premiumGold: "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600",
    oceanBlue: "bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-700",
  };

  const textColorClass = theme === "dark" || gradient === "gradientDark"
    ? "text-white"
    : gradient === "gradientLight"
      ? "text-gray-800"
      : "text-white";

  const headerBaseClasses = `
    ${transparent ? 'bg-transparent' : gradientClasses[gradient] || gradientClasses.tealToCyan}
    ${textColorClass}
    px-4 md:px-6 py-3 md:py-4
    ${showShadow ? 'shadow-lg' : ''}
    ${sticky ? 'sticky top-0 z-50' : ''}
    ${animated ? 'transition-all duration-300 ease-out' : ''}
    ${elevated ? 'shadow-2xl' : ''}
    ${scrolled && sticky ? 'backdrop-blur-sm bg-opacity-95' : ''}
    ${className}
  `.trim();

  // Brand show karna hai ya nahi? Sirf jab koi back/menu nahi hai
  const showBrand = !onBack && !onMenuClick;

  return (
    <header className={headerBaseClasses}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Left Section */}
        <div className={`flex items-center ${centerAligned ? 'flex-1' : ''}`}>

          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="group relative flex items-center gap-2 p-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Go back"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:bg-white/30 transition"></div>
                <div className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition">
                  <FiChevronLeft className="text-xl" />
                </div>
              </div>
              <span className="hidden sm:block text-sm font-medium opacity-0 group-hover:opacity-100 transition-all ml-1 group-hover:ml-2">
                Back
              </span>
            </button>
          )}

          {/* Menu Button */}
          {onMenuClick && !onBack && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-full hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
              aria-label="Open menu"
            >
              <FiMenu className="text-2xl" />
            </button>
          )}

          {/* Brand/Logo - Sirf first screen par */}
          {showBrand && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-md">
                <HiOutlineSparkles className="text-white text-xl" />
              </div>
              <span className="font-bold text-xl hidden sm:block">MediBook</span> 
            </div>
          )}
        </div>

        {/* Center - Title */}
        <div className={`${centerAligned ? 'text-center flex-1' : 'flex-1 text-center'}`}>
          <h1 className="text-xl md:text-2xl font-bold truncate drop-shadow-sm tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm opacity-80 mt-1 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Section */}
        <div className={`flex items-center justify-end gap-3`}>
          {/* Theme Toggle */}
          {onThemeToggle && (
            <button onClick={onThemeToggle} className="p-2 rounded-full hover:bg-white/20 transition-all">
              {theme === "dark" ? <HiOutlineSun className="text-xl" /> : <HiOutlineMoon className="text-xl" />}
            </button>
          )}

          {/* Notifications */}
          {showNotifications && (
            <button className="relative p-2 rounded-full hover:bg-white/20 transition-all">
              <FiBell className="text-xl" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
            </button>
          )}

          {/* Profile */}
          {showProfile && (
            <button className="p-2 rounded-full hover:bg-white/20 transition-all">
              <FiUser className="text-xl" />
            </button>
          )}

          {/* Custom Right Action or More */}
          {rightAction ? rightAction : (
            <button className="p-2 rounded-full hover:bg-white/20 transition-all">
              <FiMoreVertical className="text-xl" />
            </button>
          )}
        </div>
      </div>

      {/* Optional shimmer */}
      {!transparent && (
        <div className="h-1 w-full overflow-hidden mt-3">
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </header>
  );
};

export default Header;
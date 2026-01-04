// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import {
  User,
  Edit2,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Cake,
  UserCheck,
  FileText,
  Heart,
  Calendar,
  FileCheck,
  Shield,
  Headphones,
  ChevronRight,
  Lock,
  RefreshCw,
  Star,
  Clock,
  Activity,
  CheckCircle,
  Users,
  PhoneCall,
  Droplets,
  ArrowLeft,
  Settings,
  Bell,
  CreditCard,
  Shield as ShieldIcon,
  Globe,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [activeSection, setActiveSection] = useState("personal");

  const [user, setUser] = useState({
    profilePhoto: null,
    fullName: "User",
    username: "",
    email: "",
    mobile: "Not provided",
    age: "Not provided",
    gender: "Not provided",
    address: "Not provided",
    fatherSpouse: "Not provided",
    alternateNo: "Not provided",
    bloodGroup: "Not provided",
  });

  const formatValue = (val, defaultValue) =>
    val === null || val === undefined || val === "" ? defaultValue : val;

  const loadFromLocal = () => {
    const auth = JSON.parse(localStorage.getItem("auth")) || {};
    const data = auth.user || {};

    const updatedUser = {
      profilePhoto: data.image || null,
      fullName: formatValue(data.full_name, "User"),
      username: formatValue(data.username, ""),
      email: formatValue(data.email, ""),
      mobile: formatValue(data.mobile_no, "Not provided"),
      age: formatValue(data.age, "Not provided"),
      gender: formatValue(data.gender, "Not provided"),
      address: formatValue(data.full_address, "Not provided"),
      fatherSpouse: formatValue(data.father_spouse_name, "Not provided"),
      alternateNo: formatValue(data.alternate_no, "Not provided"),
      bloodGroup: formatValue(data.blood_group, "Not provided"),
    };

    setUser(updatedUser);
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const fetchProfile = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth?.token) {
      navigate("/login");
      return;
    }

    setRefreshing(true);

    fetch("https://developer.bitmaxtest.com/api/profile", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data || {};

        const updatedUser = {
          profilePhoto: data.image || null,
          fullName: formatValue(data.full_name, "User"),
          username: formatValue(data.username, ""),
          email: formatValue(data.email, ""),
          mobile: formatValue(data.mobile_no, "Not provided"),
          age: formatValue(data.age, "Not provided"),
          gender: formatValue(data.gender, "Not provided"),
          address: formatValue(data.full_address, "Not provided"),
          fatherSpouse: formatValue(data.father_spouse_name, "Not provided"),
          alternateNo: formatValue(data.alternate_no, "Not provided"),
          bloodGroup: formatValue(data.blood_group, "Not provided"),
        };

        setUser(updatedUser);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: data })
        );
        window.dispatchEvent(new Event("storage"));
      })
      .catch((e) => console.error("Profile API error:", e))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    loadFromLocal();
    fetchProfile();

    window.addEventListener("profileUpdated", loadFromLocal);
    window.addEventListener("storage", loadFromLocal);

    return () => {
      window.removeEventListener("profileUpdated", loadFromLocal);
      window.removeEventListener("storage", loadFromLocal);
    };
  }, []);

  const handleRefresh = () => {
    fetchProfile();
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-700 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-gray-600 mt-1">Manage your account and personal information</p>
          </div>
          
          {lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <RefreshCw size={14} />
              <span>Last updated: {lastUpdated}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {/* Profile Header Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40 mb-6">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="relative group mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                        {user.profilePhoto ? (
                          <img
                            src={user.profilePhoto}
                            alt="Profile"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center">
                            <User size={48} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-1">{user.fullName}</h2>
                    <p className="text-teal-100 text-sm">@{user.username}</p>
                    
                    {/* Verification Badge */}
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mt-3">
                      <CheckCircle size={14} className="text-white" />
                      <span className="text-sm text-white">Verified Profile</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <StatCard 
                      icon={<Activity size={18} />} 
                      value="98%" 
                      label="Complete" 
                      color="teal"
                    />
                    <StatCard 
                      icon={<Star size={18} />} 
                      value="4.8" 
                      label="Rating" 
                      color="amber"
                    />
                    <StatCard 
                      icon={<Clock size={18} />} 
                      value="Active" 
                      label="Status" 
                      color="green"
                    />
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <Link
                      to="/edit-profile"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Edit2 size={18} />
                      Edit Profile
                    </Link>
                    
                    <button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="w-full flex items-center justify-center gap-2 border-2 border-teal-200 hover:border-teal-300 text-teal-600 hover:text-teal-700 py-3 rounded-xl transition-all duration-300 disabled:opacity-70"
                    >
                      {refreshing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                          Refreshing...
                        </>
                      ) : (
                        <>
                          <RefreshCw size={18} />
                          Refresh Data
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40 p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-teal-600" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <ActivityItem 
                    time="Today"
                    action="Profile viewed"
                    icon={<UserCheck size={16} />}
                  />
                  <ActivityItem 
                    time="Yesterday"
                    action="Updated personal info"
                    icon={<Edit2 size={16} />}
                  />
                  <ActivityItem 
                    time="2 days ago"
                    action="Checked appointments"
                    icon={<Calendar size={16} />}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Profile Sections Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                <TabButton 
                  active={activeSection === "personal"} 
                  onClick={() => setActiveSection("personal")}
                  icon={<User size={16} />}
                  label="Personal Info"
                />
                <TabButton 
                  active={activeSection === "medical"} 
                  onClick={() => setActiveSection("medical")}
                  icon={<Heart size={16} />}
                  label="Medical"
                />
                <TabButton 
                  active={activeSection === "account"} 
                  onClick={() => setActiveSection("account")}
                  icon={<Settings size={16} />}
                  label="Account"
                />
                <TabButton 
                  active={activeSection === "security"} 
                  onClick={() => setActiveSection("security")}
                  icon={<ShieldIcon size={16} />}
                  label="Security"
                />
              </div>
            </div>

            {/* Personal Information Section */}
            {activeSection === "personal" && (
              <div className="space-y-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40">
                  <div className="border-b border-gray-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                      <User className="text-teal-600" size={24} />
                      Personal Information
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InfoCard 
                        icon={<UserCheck size={20} />}
                        label="Username"
                        value={user.username}
                        verified={true}
                      />
                      <InfoCard 
                        icon={<Mail size={20} />}
                        label="Email Address"
                        value={user.email}
                        verified={true}
                      />
                      <InfoCard 
                        icon={<Phone size={20} />}
                        label="Mobile Number"
                        value={user.mobile}
                      />
                      <InfoCard 
                        icon={<Cake size={20} />}
                        label="Age"
                        value={user.age}
                      />
                      <InfoCard 
                        icon={<User size={20} />}
                        label="Gender"
                        value={user.gender}
                      />
                      <InfoCard 
                        icon={<Users size={20} />}
                        label="Father/Spouse"
                        value={user.fatherSpouse}
                      />
                      <InfoCard 
                        icon={<PhoneCall size={20} />}
                        label="Alternate Number"
                        value={user.alternateNo}
                      />
                      <InfoCard 
                        icon={<Droplets size={20} />}
                        label="Blood Group"
                        value={user.bloodGroup}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40">
                  <div className="border-b border-gray-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                      <MapPin className="text-teal-600" size={24} />
                      Address Information
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="text-teal-600" size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Current Address</p>
                          <p className="font-medium text-gray-800">{user.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Management Section */}
            <div className="space-y-8">
              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <QuickActionCard 
                  to="/history"
                  icon={<FileText size={24} />}
                  title="Health Records"
                  description="View medical history"
                  color="teal"
                />
                <QuickActionCard 
                  to="/bookmarked"
                  icon={<Heart size={24} />}
                  title="Saved Doctors"
                  description="Bookmarked specialists"
                  color="pink"
                />
                <QuickActionCard 
                  to="/appointment"
                  icon={<Calendar size={24} />}
                  title="Appointments"
                  description="Manage visits"
                  color="blue"
                />
              </div>

              {/* Settings Sections */}
              <div className="space-y-6">
                {/* Account Section */}
                {/* <Section title="Account Settings" icon={<Settings size={20} />}>
                  <MenuItem
                    to="/billing"
                    icon={<CreditCard size={20} />}
                    title="Billing & Payments"
                    subtitle="Manage subscriptions"
                  />
                  <MenuItem
                    to="/notifications"
                    icon={<Bell size={20} />}
                    title="Notifications"
                    subtitle="Configure alerts"
                    badge="3 new"
                    border
                  />
                  <MenuItem
                    to="/preferences"
                    icon={<Globe size={20} />}
                    title="Preferences"
                    subtitle="Language & theme"
                    border
                  />
                </Section> */}

                {/* Support Section */}
                <Section title="Support & Legal" icon={<Shield size={20} />}>
                  <MenuItem 
                    to="/terms" 
                    icon={<FileCheck size={20} />} 
                    title="Terms & Conditions" 
                  />
                  <MenuItem 
                    to="/privacy-policy" 
                    icon={<Lock size={20} />} 
                    title="Privacy Policy" 
                    border 
                  />
                  <MenuItem 
                    to="/help" 
                    icon={<Headphones size={20} />} 
                    title="Help & Support" 
                    subtitle="24/7 customer care"
                    border 
                  />
                </Section>
              </div>

              {/* Logout Section */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Account Actions</h3>
                    <p className="text-sm text-gray-600">Manage your account security</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate("/edit-profile")}
                      className="px-6 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-300"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({ icon, value, label, color }) => {
  const colorClasses = {
    teal: 'from-teal-100 to-cyan-100 text-teal-600',
    amber: 'from-amber-100 to-orange-100 text-amber-600',
    green: 'from-green-100 to-emerald-100 text-green-600',
    blue: 'from-blue-100 to-indigo-100 text-blue-600',
    pink: 'from-pink-100 to-rose-100 text-pink-600',
  };

  return (
    <div className="text-center">
      <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center mx-auto mb-2`}>
        {icon}
      </div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
};

const ActivityItem = ({ time, action, icon }) => (
  <div className="flex items-center gap-3 p-3 hover:bg-teal-50 rounded-xl transition-colors">
    <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center">
      <div className="text-teal-600">{icon}</div>
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-800">{action}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg' 
        : 'bg-white/80 text-gray-700 hover:bg-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const InfoCard = ({ icon, label, value, verified = false }) => (
  <div className="flex gap-4 p-4 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-teal-200 transition-all">
    <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
      <div className="text-teal-600">{icon}</div>
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <p className="text-sm text-gray-500">{label}</p>
        {verified && (
          <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full">Verified</span>
        )}
      </div>
      <p className="font-medium">{value !== "" ? value : "Not provided"}</p>
    </div>
  </div>
);

const QuickActionCard = ({ to, icon, title, description, color }) => {
  const colorClasses = {
    teal: 'from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600',
    pink: 'from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
    blue: 'from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
  };

  return (
    <Link
      to={to}
      className="group block"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-center text-teal-600 text-sm">
          <span>View details</span>
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

const Section = ({ title, icon, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
      <div className="text-teal-600">{icon}</div>
      {title}
    </h3>
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden border border-white/40">
      {children}
    </div>
  </div>
);

const MenuItem = ({ to, icon, title, subtitle, border, badge }) => (
  <Link
    to={to}
    className={`flex items-center justify-between p-5 hover:bg-teal-50 transition-all duration-300 group ${
      border ? "border-t border-gray-100" : ""
    }`}
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <div className="text-teal-600">{icon}</div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-gray-800">{title}</h4>
          {badge && (
            <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full">{badge}</span>
          )}
        </div>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
    <ChevronRight className="text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
  </Link>
);

export default Profile;
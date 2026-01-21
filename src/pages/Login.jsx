import { useState } from "react";
import { LogIn, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveAuth } from "../utils/auth";
import logo from "../assets/Hospital-icon.png";

export default function HospitalLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username,
        password,
      };

      const response = await fetch(
        "https://developer.bitmaxtest.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Invalid credentials");
      }

      // ✅ SAVE TOKEN (CENTRALIZED)
      saveAuth({
        token: result.token,
        user: result.data,
      });

      // 🔄 FETCH FULL PROFILE DATA (including image)
      try {
        const profileResponse = await fetch(
          "https://developer.bitmaxtest.com/api/profile",
          {
            headers: {
              Authorization: `Bearer ${result.token}`,
              Accept: "application/json",
            },
          }
        );

        if (profileResponse.ok) {
          const profileResult = await profileResponse.json();
          if (profileResult.data) {
            // Update auth with full profile data
            saveAuth({
              token: result.token,
              user: profileResult.data,
            });
          }
        }
      } catch (profileErr) {
        console.warn("Failed to fetch profile after login:", profileErr);
      }

      toast.success(`Welcome ${result.data.full_name}`, {
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-800 flex items-center justify-center p-3">
      <ToastContainer />

      <div className="w-full max-w-4xl grid lg:grid-cols-2 rounded-xl overflow-hidden shadow-2xl bg-white">
        {/* LEFT SIDE - Compact Version */}
        <div className="bg-gradient-to-br from-teal-800 to-teal-900 p-6 text-white flex flex-col relative">
          {/* Logo and Badge - Compact */}
          <div className="flex items-center justify-between mb-4">
            <img src={logo} alt="Hospital Logo" className="w-10 h-10 rounded-full border-2 border-teal-300" />
            <div className="bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold">
              DOWNLOAD NOW!
            </div>
          </div>

          {/* Main Content - Compact */}
          <div className="mb-6">
            <div className="text-xs mb-1 opacity-90">
              Login screen for a charity based quality hospital
            </div>
            <div className="text-xs mb-6 opacity-90">
              Supporting quality health care in our community since 1993
            </div>
            
            {/* Hospital Name - Smaller */}
            <div className="mb-4">
              <div className="text-4xl font-black leading-tight">
                HOSPITAL
              </div>
              <div className="text-sm text-teal-300 font-semibold mt-1">
                Excellence in Healthcare
              </div>
            </div>

            {/* Quick Stats - Compact */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-teal-700/50 p-3 rounded-lg">
                <div className="text-lg font-bold">500+</div>
                <div className="text-xs opacity-80">Expert Doctors</div>
              </div>
              <div className="bg-teal-700/50 p-3 rounded-lg">
                <div className="text-lg font-bold">25+</div>
                <div className="text-xs opacity-80">Years Experience</div>
              </div>
            </div>

            {/* Services List - Compact */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-8">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                <span>24/7 Emergency</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                <span>ICU Facilities</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                <span>Operation Theaters</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                <span>Health Records</span>
              </div>
            </div>
          </div>

          {/* Testimonial - Smaller */}
          <div className="bg-teal-700/40 p-3 rounded-lg mb-6">
            <div className="flex items-start gap-2">
              <Heart className="w-6 h-6 text-teal-300 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs italic opacity-90 leading-tight">
                  "Trusted by over 50,000 patients annually."
                </div>
                <div className="text-xs mt-1 opacity-70">
                  - Dr. Sarah Johnson
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-0.5 w-16 bg-teal-400 mb-1"></div>
                <div className="text-xs font-medium">
                  Your health, our commitment
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-70">ISO Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Login Form (Compact) */}
        <div className="bg-white p-8 flex flex-col justify-center">
          {/* Welcome Section - Smaller */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome Back!
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Please login to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username/Email */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                Username/Email Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="youremail@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-100 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***************"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-100 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-700 text-sm"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 border border-gray-400 rounded focus:ring-teal-500"
                />
                <span className="text-sm text-gray-800">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  <span>Login to Continue</span>
                  <LogIn className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Additional Links - Smaller */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-gray-600">
              <div className="mb-3">
                <span className="text-sm">New to our hospital?</span>
                <button className="ml-1 text-sm font-medium text-teal-700 hover:text-teal-800">
                  Register here
                </button>
              </div>
              <div className="text-xs text-gray-500">
                Need help? <span className="font-medium">support@hospital.com</span>
              </div>
            </div>
          </div>

          {/* Contact Info - Smaller */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-600">
              <span className="font-bold">Emergency:</span>
              <span className="ml-1 font-medium">+1-800-HELP-NOW</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              © 2024 HOSPITAL. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
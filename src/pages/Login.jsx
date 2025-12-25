import { useState } from "react";
import {
  Hospital,
  User,
  Lock,
  Stethoscope,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveAuth } from "../utils/auth";

export default function HospitalLogin() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("patient");
  const [username, setUsername] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔐 LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password || (userType === "patient" && !username) || (userType === "employee" && !employeeCode)) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username: userType === "patient" ? username : employeeCode,
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
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center p-4">
      <ToastContainer />

      <div className="w-full max-w-3xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
        {/* LEFT IMAGE */}
        <div className="hidden lg:block relative">
          <img
            src="/assest/image/Serviices1.jpg"
            className="w-full h-full object-cover"
            alt="Hospital"
          />
          <div className="absolute inset-0 bg-teal-900/70" />
          <div className="absolute top-10 left-6 text-white">
            <h2 className="text-2xl font-bold">Your Health, Our Priority</h2>
            <p className="mt-2">Smart Healthcare Solutions</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-8">
          <div className="text-center mb-8">
            <Hospital className="w-12 h-12 mx-auto text-teal-600" />
            <h2 className="text-2xl font-bold mt-2">Login</h2>
          </div>

          {/* USER TYPE */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setUserType("patient")}
              className={`flex-1 py-2 rounded ${
                userType === "patient"
                  ? "bg-white shadow text-teal-600"
                  : ""
              }`}
            >
              <User className="inline w-4 h-4 mr-1" />
              Patient
            </button>

            <button
              type="button"
              onClick={() => setUserType("employee")}
              className={`flex-1 py-2 rounded ${
                userType === "employee"
                  ? "bg-white shadow text-teal-600"
                  : ""
              }`}
            >
              <Stethoscope className="inline w-4 h-4 mr-1" />
              Employee
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* USERNAME / EMPLOYEE CODE */}
            <div>
              <label className="text-sm font-medium">
                {userType === "patient" ? "Username" : "Employee Code"}
              </label>
              <input
                type="text"
                value={userType === "patient" ? username : employeeCode}
                onChange={(e) =>
                  userType === "patient"
                    ? setUsername(e.target.value)
                    : setEmployeeCode(e.target.value)
                }
                className="w-full mt-1 px-4 py-3 border rounded-lg"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-3 border rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? "Logging in..." : <><LogIn /> Login</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

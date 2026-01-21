// pages/Signup.jsx
import { useState } from 'react';
import { User, Camera, CheckCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/Hospital-icon.png";

export default function HospitalSignup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', age: '', gender: '', address: '',
    username: '', email: '', mobile_no: '',
    password: '', confirmPassword: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (!termsAccepted) {
      return toast.warn("Please accept the terms and conditions");
    }
    if (!formData.mobile_no || formData.mobile_no.length < 10) {
      return toast.error("Please enter a valid mobile number");
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("full_name", formData.fullName);
      data.append("email", formData.email);
      data.append("mobile_no", formData.mobile_no);
      data.append("age", formData.age);
      data.append("gender", formData.gender);
      data.append("full_address", formData.address);
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("registered_through", "email");
      data.append("type", "online");

      if (profileImage) data.append("image", profileImage);

      const response = await fetch("https://developer.bitmaxtest.com/api/register", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Registration failed");
      }

      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);
      toast.success(`OTP (testing): ${newOtp}`, { autoClose: 8000 });
      setStep(2);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp !== generatedOtp) {
      return toast.error("Invalid OTP");
    }

    // Success flow...
    toast.success("Registration successful! Redirecting to login...");
    setTimeout(() => navigate('/login'), 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-800 flex items-center justify-center p-4">
      <ToastContainer position="top-right" theme="colored" />

      <div className="w-full max-w-4xl grid lg:grid-cols-2 rounded-xl overflow-hidden shadow-2xl bg-white">

        {/* LEFT - Very Compact Info Section */}
        <div className="bg-gradient-to-br from-teal-800 to-teal-900 p-5 text-white flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border-2 border-teal-300" />
            <div className="bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold">
              DOWNLOAD NOW!
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs opacity-90">Charity based quality hospital</p>
            <p className="text-xs opacity-80">Since 1993</p>
          </div>

          <h2 className="text-4xl font-black leading-tight mb-1">HOSPITAL</h2>
          <p className="text-sm text-teal-300 mb-4">Excellence in Healthcare</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-teal-700/50 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">500+</div>
              <div className="text-xs opacity-80">Doctors</div>
            </div>
            <div className="bg-teal-700/50 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">25+</div>
              <div className="text-xs opacity-80">Years</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-5">
            <div>• 24/7 Emergency</div>
            <div>• ICU Facilities</div>
            <div>• Operation Theatres</div>
            <div>• Digital Records</div>
          </div>

          <div className="mt-auto bg-teal-700/40 p-3 rounded-lg text-xs italic">
            "Trusted by over 50,000 patients annually."
            <div className="text-right mt-1 opacity-80">- Dr. Sarah Johnson</div>
          </div>
        </div>

        {/* RIGHT - Form Section */}
        <div className="bg-white p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {step === 1 ? "Create Account!" : "Verify OTP"}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {step === 1
                ? "Join our healthcare community today"
                : "Enter the OTP sent to your mobile"}
            </p>
          </div>

          {step === 1 && (
            <>
              {/* Profile Photo */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-teal-100 overflow-hidden bg-gray-100">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-teal-600 p-2 rounded-full cursor-pointer hover:bg-teal-700">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-teal-600 mt-2">
                  {imagePreview ? 'Change Photo' : 'Upload Profile Photo'}
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">FULL NAME</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-sm"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">AGE</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-sm"
                      placeholder="Your age"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">GENDER</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-sm"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">ADDRESS</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-sm"
                      placeholder="Full address"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">USERNAME</label>
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-sm"
                      placeholder="Choose username"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-sm"
                      placeholder="youremail@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">MOBILE</label>
                    <input
                      type="tel"
                      name="mobile_no"
                      value={formData.mobile_no}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-sm"
                      placeholder="Enter mobile number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1">PASSWORD</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-sm"
                      placeholder="********"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1">CONFIRM PASSWORD</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 text-sm"
                    placeholder="********"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    className="h-4 w-4 text-teal-600"
                  />
                  <span className="text-sm text-gray-700">I agree to Terms & Conditions</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 rounded-lg mt-2 transition"
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <div className="text-center">
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-400 rounded-lg">
                <p className="text-sm font-semibold text-yellow-800 mb-2">
                  Your OTP (testing mode):
                </p>
                <p className="text-4xl font-mono font-bold text-teal-700">
                  {generatedOtp}
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-center gap-3">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[i] = e.target.value;
                        setOtp(newOtp.join(''));
                        if (e.target.value && i < 5) e.target.nextSibling?.focus();
                      }}
                      className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 rounded-lg transition"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button className="text-teal-700 font-medium hover:underline" onClick={() => navigate('/login')}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
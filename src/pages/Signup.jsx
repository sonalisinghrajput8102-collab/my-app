// pages/Signup.jsx
import { useState } from 'react';
import { Hospital, User, Lock, MapPin, Calendar, Camera, CheckCircle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HospitalSignup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    address: '',
    username: '',
    email: '',
    mobile_no: '',
    password: '',
    confirmPassword: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(''); // Frontend OTP (testing ke liye)
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
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 6-digit OTP generate karne ka function (testing ke liye)
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!termsAccepted) {
      toast.warn("Please accept the terms and conditions");
      return;
    }

    if (!formData.mobile_no || formData.mobile_no.length < 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();

      // Sabhi fields append karo
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

     
      if (profileImage) {
        data.append("image", profileImage); // yeh line sabse important hai
        console.log("Image selected:", profileImage.name, profileImage.size, profileImage.type);
      } else {
        console.log("No image selected");
      }

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

      console.log(`OTP for ${formData.mobile_no}: ${newOtp}`);

     
      toast.success(
        <div className="text-left">
          <p className="font-bold text-2xl mb-2">OTP Generated!</p>
          <p className="text-4xl font-mono tracking-widest text-yellow-300 my-4">
            <strong>{newOtp}</strong>
          </p>
          <p className="text-sm opacity-90">
            (Testing mode – enter this OTP to proceed)
          </p>
        </div>,
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          theme: "colored",
          style: {
            background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }
        }
      );

      setStep(2);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
     
      if (otp === generatedOtp) {
        localStorage.setItem('user', JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile_no: formData.mobile_no,
          profilePhoto: imagePreview || null,
          isLoggedIn: false
        }));

        window.dispatchEvent(new Event('storage'));

        toast.success(
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-lg text-white">Registration Successful!</h4>
              <p className="text-sm text-white/90">
                Welcome, {formData.fullName}! Please login.
              </p>
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: 4000,
            theme: "colored",
            style: {
              background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
            }
          }
        );

        setTimeout(() => {
          setIsLoading(false);
          navigate('/login');
        }, 2500);
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      toast.error(error.message || "Invalid OTP!");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar theme="colored" />

      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-0 items-stretch rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative h-full">
          <img
            src="../../public/assest/image/Serviices1.jpg"
            alt="Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/50 to-transparent" />
          <div className="absolute top-10 left-0 p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Your Health, Our Priority</h1>
            <p className="text-lg mb-6 opacity-90">Join the best healthcare community today.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-lg">
                <div className="w-7 h-7 rounded-full bg-teal-400 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                24/7 Emergency Services
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-3xl lg:rounded-l-none lg:rounded-r-3xl shadow-2xl p-8 lg:p-12 overflow-y-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4 mx-auto">
              <Hospital className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              {step === 1 ? "Create Account" : "Verify OTP"}
            </h2>
            <p className="text-gray-600 mt-2">
              {step === 1 ? "Join our healthcare community today" : "Enter the OTP shown above"}
            </p>
          </div>

          {/* Step 1 - Registration Form */}
          {step === 1 && (
            <>
              {/* Profile Photo Upload */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-teal-100 overflow-hidden bg-gray-100 shadow-xl">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-teal-600 p-3 rounded-full cursor-pointer hover:bg-teal-700 transition shadow-lg">
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-teal-600 mt-3 cursor-pointer hover:underline">
                  {imagePreview ? 'Change Profile Photo' : 'Upload Profile Photo'}
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-5">
                {/* Full Name & Age */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      placeholder="Enter full name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      placeholder="Your age" min="1" required />
                  </div>
                </div>

                {/* Gender & Address */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      placeholder="Full address" required />
                  </div>
                </div>

                {/* Username & Email */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      placeholder="Choose a username" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      placeholder="Enter email" required />
                  </div>
                </div>

                {/* Mobile & Password */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                    <input type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      placeholder="Enter mobile number" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                        placeholder="Create password"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      placeholder="Confirm password"
                      required
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-center gap-3 mt-4">
                  <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)}
                    className="w-5 h-5 text-teal-600 rounded" />
                  <label className="text-sm text-gray-600">
                    I agree to the <span className="text-teal-600 font-medium">Terms of Service</span> and <span className="text-teal-600 font-medium">Privacy Policy</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg mt-6
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:scale-[1.02]'}`}>
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span>Send OTP</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Step 2 - OTP Verification */}
          {step === 2 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h3>
              <p className="text-gray-600 mb-4">
                Enter the 6-digit OTP shown above
              </p>

              {/* OTP box */}
              <div className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl text-center">
                <p className="text-lg font-semibold text-yellow-800 mb-3">
                  Your OTP (for {formData.mobile_no}):
                </p>
                <p className="text-5xl font-mono font-bold tracking-widest text-teal-700">
                  {generatedOtp}
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-center gap-4">
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

                <button type="submit" disabled={isLoading || otp.length !== 6}
                  className={`w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg
                    ${isLoading || otp.length !== 6 ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:scale-[1.02]'}`}>
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span>Verify OTP</span>
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-gray-600">
                Didn't receive OTP?{' '}
                <button onClick={() => { setStep(1); setGeneratedOtp(''); }}
                  className="text-teal-600 font-semibold hover:underline">
                  Resend OTP
                </button>
              </p>
            </div>
          )}

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-teal-600 font-semibold hover:underline">
              LogIn
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
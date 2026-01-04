// src/pages/EditProfile.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Camera, 
  CheckCircle, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Users, 
  PhoneCall, 
  Droplets,
  ArrowLeft,
  Upload,
  Save,
  ChevronDown
} from "lucide-react";
import { getToken, saveAuth } from "../utils/auth";

const EditProfile = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    age: "",
    gender: "",
    address: "",
    fatherSpouse: "",
    alternateNo: "",
    bloodGroup: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeField, setActiveField] = useState(null);

  /* =========================
     LOAD DATA FROM STORAGE
  ========================= */
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const user = auth?.user;

    if (!auth?.token || !user) {
      navigate("/login");
      return;
    }

    setFormData({
      username: user.username || "",
      email: user.email || "",
      mobile: user.mobile_no || "",
      age: user.age || "",
      gender: user.gender || "",
      address: user.full_address || "",
      fatherSpouse: user.father_spouse_name || "",
      alternateNo: user.alternate_no || "",
      bloodGroup: user.blood_group || "",
    });

    setPreviewImage(
      user.image
        ? user.image
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    );
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = getToken();
      const form = new FormData();

      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("mobile_no", formData.mobile);
      form.append("age", formData.age);
      form.append("gender", formData.gender);
      form.append("full_address", formData.address);
      form.append("father_spouse_name", formData.fatherSpouse);
      form.append("alternate_no", formData.alternateNo);
      form.append("blood_group", formData.bloodGroup);

      if (imageFile) {
        form.append("image", imageFile);
      }

      const res = await fetch(
        "https://developer.bitmaxtest.com/api/update-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const result = await res.json();

      if (!result.status) throw new Error(result.message || "Profile update failed");

      saveAuth({ token, user: result.data });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/profile");
        window.dispatchEvent(new Event("profileUpdated"));
      }, 2000);
    } catch (err) {
      alert(err.message || "Profile update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm bg-opacity-90">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <CheckCircle className="text-teal-500" size={18} />
            </div>
            <div>
              <p className="font-semibold">Profile Updated!</p>
              <p className="text-sm text-teal-100">Redirecting to profile...</p>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/profile")}
            className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-x-1"
          >
            <ArrowLeft size={20} />
            <span>Back to Profile</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="relative group mb-4">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                        <img
                          src={previewImage}
                          alt="Profile"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <button
                        onClick={() => fileRef.current.click()}
                        className="absolute bottom-0 right-0 bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
                      >
                        <Camera size={20} />
                      </button>
                      
                      <input
                        ref={fileRef}
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-1">{formData.username || "Username"}</h2>
                    <p className="text-teal-100 text-sm">{formData.email || "email@example.com"}</p>
                  </div>
                </div>

                {/* Profile Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gradient-to-b from-teal-50 to-white rounded-xl border border-teal-100">
                      <div className="text-lg font-bold text-teal-600">85%</div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-b from-teal-50 to-white rounded-xl border border-teal-100">
                      <div className="text-lg font-bold text-teal-600">12</div>
                      <div className="text-xs text-gray-500">Fields</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-b from-teal-50 to-white rounded-xl border border-teal-100">
                      <div className="text-lg font-bold text-teal-600">9</div>
                      <div className="text-xs text-gray-500">Filled</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => fileRef.current.click()}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Upload size={18} />
                      Upload Photo
                    </button>
                    
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full border-2 border-teal-200 hover:border-teal-300 text-teal-600 hover:text-teal-700 py-3 rounded-xl transition-all duration-300"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40 p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  Quick Tips
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-teal-400 rounded-full mt-2"></div>
                    Use a clear profile photo for better recognition
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-teal-400 rounded-full mt-2"></div>
                    Keep your information accurate and up to date
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-teal-400 rounded-full mt-2"></div>
                    All fields are securely saved to your account
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-2/3">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40">
              {/* Form Header */}
              <div className="border-b border-gray-100 p-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Edit Profile
                </h1>
                <p className="text-gray-600 mt-2">Update your personal information and settings</p>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username */}
                    <FormField
                      icon={<User size={20} />}
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={() => setActiveField('username')}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === 'username'}
                      placeholder="Enter your username"
                    />

                    {/* Email */}
                    <FormField
                      icon={<Mail size={20} />}
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === 'email'}
                      placeholder="Enter your email"
                    />

                    {/* Mobile */}
                    <FormField
                      icon={<Phone size={20} />}
                      label="Mobile Number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onFocus={() => setActiveField('mobile')}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === 'mobile'}
                      placeholder="Enter mobile number"
                    />

                    {/* Age */}
                    <FormField
                      icon={<Calendar size={20} />}
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      onFocus={() => setActiveField('age')}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === 'age'}
                      placeholder="Enter your age"
                    />

                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <div className="p-2 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg">
                          <User size={16} className="text-teal-600" />
                        </div>
                        Gender
                      </label>
                      <div className="relative group">
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full p-4 pl-12 bg-gradient-to-b from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none transition-all appearance-none cursor-pointer group-hover:border-teal-300"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>

                    {/* Father/Spouse */}
                    <FormField
                      icon={<Users size={20} />}
                      label="Father/Spouse Name"
                      name="fatherSpouse"
                      value={formData.fatherSpouse}
                      onChange={handleChange}
                      onFocus={() => setActiveField('fatherSpouse')}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === 'fatherSpouse'}
                      placeholder="Enter father or spouse name"
                    />

                    {/* Alternate Number */}
                    <FormField
                      icon={<PhoneCall size={20} />}
                      label="Alternate Number"
                      name="alternateNo"
                      value={formData.alternateNo}
                      onChange={handleChange}
                      onFocus={() => setActiveField('alternateNo')}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === 'alternateNo'}
                      placeholder="Enter alternate number"
                    />

                    {/* Blood Group */}
                    <FormField
                      icon={<Droplets size={20} />}
                      label="Blood Group"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      onFocus={() => setActiveField('bloodGroup')}
                      onBlur={() => setActiveField(null)}
                      isActive={activeField === 'bloodGroup'}
                      placeholder="Enter blood group"
                    />
                  </div>

                  {/* Address Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <div className="p-2 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg">
                        <MapPin size={16} className="text-teal-600" />
                      </div>
                      Address
                    </label>
                    <div className="relative group">
                      <textarea
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        onFocus={() => setActiveField('address')}
                        onBlur={() => setActiveField(null)}
                        className={`w-full p-4 pl-12 bg-gradient-to-b from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none transition-all resize-none group-hover:border-teal-300 ${
                          activeField === 'address' 
                            ? 'border-teal-400' 
                            : 'border-gray-200'
                        }`}
                        placeholder="Enter your complete address"
                      />
                      <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Saving Changes...</span>
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          <span>Save All Changes</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => navigate("/profile")}
                      className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

// Enhanced FormField Component
const FormField = ({ icon, label, isActive, type = "text", ...props }) => (
  <div className="space-y-2 group">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <div className={`p-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-teal-500 to-cyan-500' 
          : 'bg-gradient-to-r from-teal-50 to-cyan-50'
      }`}>
        <div className={isActive ? 'text-white' : 'text-teal-600'}>
          {icon}
        </div>
      </div>
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        {...props}
        className={`w-full p-4 pl-12 bg-gradient-to-b from-gray-50 to-white border-2 rounded-xl focus:ring-2 focus:outline-none transition-all duration-300 ${
          isActive 
            ? 'border-teal-400 ring-teal-200' 
            : 'border-gray-200 focus:border-teal-400 focus:ring-teal-200'
        }`}
      />
      <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-teal-500 to-cyan-500' 
          : 'bg-gradient-to-r from-teal-100 to-cyan-100'
      }`}>
        <div className={isActive ? 'text-white' : 'text-teal-600'}>
          {icon}
        </div>
      </div>
    </div>
  </div>
);

export default EditProfile;
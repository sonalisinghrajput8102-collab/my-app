// src/HomeComponent/HeroSection.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Calendar, Shield, Clock, ChevronRight, Star, Award, Users, Sparkles, MapPin } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState({
    doctors: 150,
    patients: 50000,
    successRate: 98,
    years: 25
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsLoggedIn(user?.isLoggedIn === true);
    
    // Animate stats on load
    const timer = setTimeout(() => {
      setStats(prev => ({
        ...prev,
        doctors: 158,
        patients: 51234,
        successRate: 98.5,
        years: 26
      }));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBookAppointment = () => {
    if (isLoggedIn) {
      navigate("/appointment");
    } else {
      navigate("/login");
    }
  };

  const handleEmergencyCall = () => {
    if (isLoggedIn) {
      window.location.href = "tel:+919876543210";
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Main Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/assest/image/banner3.jpg')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/30"></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="text-white">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 px-5 py-2.5 rounded-full mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span className="text-sm font-medium tracking-wide">EXCELLENCE IN HEALTHCARE SINCE 1998</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-teal-100 to-cyan-100 bg-clip-text text-transparent">
                  World-Class
                </span>
                <br />
                <span className="text-white">
                  Medical <span className="text-teal-300">Care</span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light">
                Advanced multispeciality hospital delivering precision healthcare with cutting-edge technology and compassionate care.
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="font-semibold">NABH Accredited</p>
                    <p className="text-sm text-gray-400">Highest Standards</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold">24/7 Emergency</p>
                    <p className="text-sm text-gray-400">Always Available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold">AI Diagnostics</p>
                    <p className="text-sm text-gray-400">Advanced Technology</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Expert Team</p>
                    <p className="text-sm text-gray-400">150+ Specialists</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={handleBookAppointment}
                  className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-lg rounded-xl shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Calendar className="relative z-10 w-6 h-6" />
                  <span className="relative z-10">
                    {isLoggedIn ? "Book Appointment Now" : "Book Appointment"}
                  </span>
                  <ChevronRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </button>

                <button
                  onClick={handleEmergencyCall}
                  className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100"></div>
                  <Phone className="relative z-10 w-6 h-6" />
                  <span className="relative z-10">
                    {isLoggedIn ? "Emergency Call" : "Emergency Help"}
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-300">4.9/5 Rating</span>
                </div>
                <div className="h-4 w-px bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-gray-300">Mumbai • Delhi • Bangalore</span>
                </div>
              </div>
            </div>

            {/* Right Side - Stats & Additional Info */}
            <div className="relative">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{stats.doctors}+</div>
                      <div className="text-sm text-gray-400">Expert Doctors</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{stats.patients.toLocaleString()}+</div>
                      <div className="text-sm text-gray-400">Patients Treated</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{stats.successRate}%</div>
                      <div className="text-sm text-gray-400">Success Rate</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{stats.years}+</div>
                      <div className="text-sm text-gray-400">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card */}
              <div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-500/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-300 italic mb-4">
                    "The medical team provided exceptional care during my surgery. Their expertise and compassionate approach made all the difference."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"></div>
                    <div>
                      <p className="font-semibold text-white">Dr. Priya Sharma</p>
                      <p className="text-sm text-gray-400">Cardiology Department</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Quick Access */}
              <div className="mt-6 bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">Emergency Services</p>
                    <p className="text-sm text-gray-300">Immediate assistance available</p>
                  </div>
                  <button
                    onClick={handleEmergencyCall}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
      
      {/* Floating Contact Card */}
      <div className="fixed bottom-8 right-8 z-20 hidden lg:block">
        <div className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white p-4 rounded-2xl shadow-2xl shadow-teal-500/30 animate-bounce-slow">
          <div className="text-center">
            <p className="text-sm font-semibold">Need Help?</p>
            <p className="text-2xl font-bold">1800-123-456</p>
            <p className="text-xs opacity-90">24/7 Helpline</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
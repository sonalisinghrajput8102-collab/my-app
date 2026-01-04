import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaAward, FaHeartbeat, FaUserMd } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { getToken } from "../utils/auth.js";

const Gallery = () => {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const colors = [
    { color: "from-cyan-500 to-blue-600", iconColor: "text-cyan-500" },
    { color: "from-emerald-500 to-green-600", iconColor: "text-emerald-500" },
    { color: "from-rose-500 to-pink-600", iconColor: "text-rose-500" },
    { color: "from-amber-500 to-orange-600", iconColor: "text-amber-500" }
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://developer.bitmaxtest.com/api/doctors');
        const data = await response.json();
        if (data.success) {
          const mappedDoctors = data.data.map((doctor, index) => {
            const speciality = doctor.specialities[0] || {};
            const qualification = doctor.qualifications[0] || {};
            const colorIndex = index % colors.length;
            return {
              id: doctor.id,
              name: doctor.name,
              title: speciality.skill || "Specialist",
              experience: `${speciality.years_of_experience || 0}+ Years`,
              detail: `${qualification.degree || ""} from ${qualification.institution || ""}`.trim() || "Qualified Professional",
              image: doctor.image,
              icon: <FaUserMd />,
              color: colors[colorIndex].color,
              iconColor: colors[colorIndex].iconColor
            };
          });
          setSpecialists(mappedDoctors);
        } else {
          setError("Failed to fetch doctors");
        }
      } catch {
        setError("Error fetching doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewProfile = () => {
    if (getToken()) {
      navigate('/book-appointment');
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm mb-6">
            <MdLocalHospital className="text-blue-500 text-xl" />
            <span className="text-blue-600 font-semibold">Medical Experts</span>
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Specialist Doctors</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Our team of board-certified specialists combines years of experience with cutting-edge medical technology to provide exceptional care.
          </p>
        </div>
        
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialists.map((doctor, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full transform group-hover:-translate-y-2">
                {/* Gradient Top Bar */}
                <div className={`h-2 bg-gradient-to-r ${doctor.color}`}></div>
                
                {/* Image Section */}
                <div className="relative px-6 pt-8 pb-4">
                  <div className="relative">
                    {/* Image Container with Gradient Border */}
                    <div className={`relative w-40 h-40 mx-auto rounded-full p-1.5 bg-gradient-to-r ${doctor.color}`}>
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    
                    {/* Experience Badge */}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100">
                        <FaAward className={`text-lg ${doctor.iconColor}`} />
                        <span className="font-bold text-gray-800">{doctor.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Doctor Info */}
                <div className="px-6 pb-8 pt-8 text-center">
                  {/* Name and Title */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-full mb-3">
                      <div className={`p-1.5 rounded-full bg-white shadow-sm ${doctor.iconColor}`}>
                        {doctor.icon}
                      </div>
                      <span className="font-semibold text-gray-700">{doctor.title}</span>
                    </div>
                  </div>
                  
                  {/* Specialty Detail */}
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-gray-700 font-medium flex items-center justify-center gap-2">
                      <FaHeartbeat className="text-rose-500" />
                      {doctor.detail}
                    </p>
                  </div>
                </div>

                {/* View Profile Button - Hidden until hover */}
                <div className="px-6 pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <button onClick={handleViewProfile} className="w-full bg-gradient-to-r from-gray-900 to-slate-800 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <span>View Profile</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            <FaUserMd className="text-xl" />
            <div className="text-left">
              <p className="font-bold text-lg">Book Appointment with Specialist</p>
              <p className="text-blue-100 text-sm">Consult with our experts today</p>
            </div>
          </div>
        </div> */}
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-10 w-6 h-6 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-10 w-8 h-8 bg-cyan-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </section>
  );
};

export default Gallery;
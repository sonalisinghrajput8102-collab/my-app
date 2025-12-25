// pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaVideo, FaFlask, FaAmbulance } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getUser } from '../utils/auth';  // ← Yeh naya import add kiya

export default function Home() {
  const navigate = useNavigate();
  
  // 🔥 FIXED: Ab sahi se user check ho raha hai
  const user = getUser();  // Yeh tumhare auth.js se direct user object deta hai

  const services = [
    {
      title: 'Book Appointment',
      description: '200+ specialists. Same-day slots available.',
      icon: <FaCalendarCheck className="text-5xl text-teal-600" />,
      path: '/appointment',
      gradient: 'from-teal-50 to-cyan-50',
      hoverGradient: 'from-teal-100 to-cyan-100',
    },
    {
      title: 'Online Consultation',
      description: 'Instant video call with top doctors.',
      icon: <FaVideo className="text-5xl text-purple-600" />,
      path: '/appointment',
      gradient: 'from-purple-50 to-pink-50',
      hoverGradient: 'from-purple-100 to-pink-100',
    },
    {
      title: 'Tests & Health Checkup',
      description: 'Reports in 24 hours. Free home collection.',
      icon: <FaFlask className="text-5xl text-green-600" />,
      path: '/test-page',
      gradient: 'from-green-50 to-emerald-50',
      hoverGradient: 'from-green-100 to-emerald-100',
    },
    {
      title: 'Emergency Care',
      description: '24/7 critical support. Zero wait time.',
      icon: <FaAmbulance className="text-5xl text-red-600" />,
      path: '/coming-soon',
      gradient: 'from-red-50 to-orange-50',
      hoverGradient: 'from-red-100 to-orange-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Clean White Background */}
      <div className="relative bg-white text-center py-24 md:py-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-teal-700 mb-6"
          >
            Your Health Gateway
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex justify-center items-center gap-4 mb-8"
          >
            <div className="h-1.5 w-24 bg-red-400 rounded-full"></div>
            <p className="text-xl md:text-2xl font-medium text-gray-700">
              Book, consult, test, and get emergency care — all in one place.
            </p>
            <div className="h-1.5 w-24 bg-red-400 rounded-full"></div>
          </motion.div>
        </div>
      </div>

      {/* Services Cards */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.9 }}
              whileHover={{ scale: 1.06, y: -12 }}
              onClick={() => {
                if (user) {
                  navigate(service.path);
                } else {
                  navigate('/login');
                }
              }}
              className={`group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer`}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} group-hover:${service.hoverGradient} transition-all duration-700`}
              ></div>

              {/* Content */}
              <div className="relative p-10 text-center z-10">
                <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-teal-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-700 font-medium group-hover:text-gray-800 transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
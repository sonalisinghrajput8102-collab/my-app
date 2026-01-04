// pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaVideo, FaFlask, FaAmbulance, FaHeartbeat } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getUser } from '../utils/auth';

export default function Home() {
  const navigate = useNavigate();
  const user = getUser();

  const services = [
    {
      title: 'Book Appointment',
      description: '200+ specialists. Same-day slots available.',
      icon: <FaCalendarCheck className="text-5xl" />,
      path: '/appointment',
      color: 'teal',
      gradient: 'from-teal-100/50 to-cyan-100/50',
      hoverGradient: 'from-teal-100 to-cyan-100',
      borderColor: 'border-teal-200',
      iconBg: 'bg-gradient-to-br from-teal-500 to-cyan-500',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Online Consultation',
      description: 'Instant video call with top doctors.',
      icon: <FaVideo className="text-5xl" />,
      path: '/appointment',
      color: 'purple',
      gradient: 'from-purple-100/50 to-pink-100/50',
      hoverGradient: 'from-purple-100 to-pink-100',
      borderColor: 'border-purple-200',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Tests & Health Checkup',
      description: 'Reports in 24 hours. Free home collection.',
      icon: <FaFlask className="text-5xl" />,
      path: '/test-page',
      color: 'green',
      gradient: 'from-emerald-100/50 to-green-100/50',
      hoverGradient: 'from-emerald-100 to-green-100',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-green-500',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Emergency Care',
      description: '24/7 critical support. Zero wait time.',
      icon: <FaAmbulance className="text-5xl" />,
      path: '/coming-soon',
      color: 'red',
      gradient: 'from-red-100/50 to-orange-100/50',
      hoverGradient: 'from-red-100 to-orange-100',
      borderColor: 'border-red-200',
      iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-gray-50/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20">
        <div className="absolute inset-0 bg-grid-blue-100/20 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Animated Heart Icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-50 to-pink-50 mb-6 shadow-lg"
            >
              <FaHeartbeat className="text-3xl text-red-500" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              <span className="text-gray-900">Your Health </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-500">
                Gateway
              </span>
            </motion.h1>

            {/* Divider Line */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="mx-4">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              </div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-semibold">
                Book, consult, test
              </span>
              , and get emergency care — all in one trusted platform.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Services Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-32 -mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.9 }}
              whileHover={{ scale: 1.05, y: -8 }}
              onClick={() => {
                if (user) {
                  navigate(service.path);
                } else {
                  navigate('/login');
                }
              }}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border ${service.borderColor} bg-white/80 backdrop-blur-sm`}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-50"></div>
              
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${service.iconBg}`}></div>

              {/* Content */}
              <div className="relative p-8 text-center z-10">
                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className={`w-28 h-28 mx-auto rounded-2xl ${service.iconBg} p-2 shadow-xl`}>
                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                      <div className={`p-4 rounded-lg ${service.iconColor}`}>
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Circle */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white/80 shadow-lg backdrop-blur-sm flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full ${service.iconBg} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">+</span>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed group-hover:text-gray-700 transition-colors">
                  {service.description}
                </p>

                {/* Hover Indicator */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`h-1 w-24 mx-auto rounded-full ${service.iconBg}`}></div>
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
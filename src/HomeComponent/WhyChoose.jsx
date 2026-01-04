// components/WhyChoose.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaClock, FaMicroscope, FaHeart } from 'react-icons/fa';

const WhyChoose = () => {
  const features = [
    {
      icon: <FaUserMd className="text-6xl text-white drop-shadow-lg" />,
      title: '200+ Expert Doctors',
      description:
        'Board-certified super-specialists with 15–30 years of experience in Cardiology, Oncology, Neurology, Orthopedics, Gastroenterology, and more.',
    },
    {
      icon: <FaClock className="text-6xl text-white drop-shadow-lg" />,
      title: '24/7 Critical Care',
      description:
        'Fully equipped Emergency Department, Level-1 Trauma Center, 50+ ICU beds, dedicated ambulance fleet.',
    },
    {
      icon: <FaMicroscope className="text-6xl text-white drop-shadow-lg" />,
      title: 'Advanced Technology',
      description:
        '128-Slice CT, 3T MRI, Digital X-Ray, Cath Labs, Robotic Surgery (Da Vinci), Modular OTs with HEPA filters, in-house NABL-accredited labs.',
    },
    {
      icon: <FaHeart className="text-6xl text-white drop-shadow-lg" />,
      title: 'Patient-Centric Care',
      description:
        'Personalized treatment plans, dedicated care coordinators, multilingual support, cashless insurance, and empathy at every step of your journey.',
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6"
          >
            Why Patients Choose MediCare
          </motion.h2>

          <div className="flex justify-center items-center gap-6 my-8">
            <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
            <p className="text-2xl font-semibold text-gray-800">
              Patient-Centric Excellence
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            We combine medical expertise, cutting-edge technology, and compassionate care to deliver outcomes that matter — every single time.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
            >
              {/* Gradient Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 to-cyan-500"></div>

              {/* Icon Circle with Glow */}
              <div className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 p-12 flex justify-center">
                <div className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></div>
                <div className="relative z-10">
                  {feature.icon}
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full blur-xl bg-teal-400 opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>

              {/* Bottom subtle accent */}
              <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
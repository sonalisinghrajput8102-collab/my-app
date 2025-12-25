// components/WhyChoose.jsx (ya Home/About page mein daal dena)
import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaClock, FaMicroscope, FaHeart } from 'react-icons/fa';

const WhyChoose = () => {
  const features = [
    {
      icon: <FaUserMd className="text-5xl text-white" />,
      title: '200+ Expert Doctors',
      description:
        'Board-certified super-specialists with 15–30 years of experience in Cardiology, Oncology, Neurology, Orthopedics, Gastroenterology, and more.',
    },
    {
      icon: <FaClock className="text-5xl text-white" />,
      title: '24/7 Critical Care',
      description:
        'Fully equipped Emergency Department, Level-1 Trauma Center, 50+ ICU beds, dedicated ambulance fleet.',
    },
    {
      icon: <FaMicroscope className="text-5xl text-white" />,
      title: 'Advanced Technology',
      description:
        '128-Slice CT, 3T MRI, Digital X-Ray, Cath Labs, Robotic Surgery (Da Vinci), Modular OTs with HEPA filters, in-house NABL-accredited labs.',
    },
    {
      icon: <FaHeart className="text-5xl text-white" />,
      title: 'Patient-Centric Care',
      description:
        'Personalized treatment plans, dedicated care coordinators, multilingual support, cashless insurance, and empathy at every step of your journey.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-6">
            Why Patients Choose MediCare
          </h2>
          <div className="flex justify-center items-center gap-4">
            <div className="h-1 w-24 bg-red-400 rounded-full"></div>
            <p className="text-xl md:text-2xl font-medium text-gray-700">
              Patient-Centric Care
            </p>
            <div className="h-1 w-24 bg-red-400 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 mt-6 max-w-4xl mx-auto">
            We combine medical expertise, cutting-edge technology, and compassionate care to deliver outcomes that matter — every single time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Icon Circle */}
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-10 flex justify-center">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
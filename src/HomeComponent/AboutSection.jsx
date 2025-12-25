// components/AboutSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="py-20 lg:py-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-teal-700 mb-6">
            Welcome to MediCare Multispeciality Hospital
          </h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <div className="h-1.5 w-28 bg-red-400 rounded-full"></div>
            <p className="text-lg md:text-xl font-medium text-gray-700 px-4">
              NABH-accredited 500-bed super-speciality hospital trusted by over 50,000 patients.
            </p>
            <div className="h-1.5 w-28 bg-red-400 rounded-full"></div>
          </div>

          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Equipped with advanced ICUs, modular OTs, robotic surgery systems, and a dedicated team of 200+ expert doctors.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image - Left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="../../public/assest/image/About.jpg"
                alt="MediCare Hospital Surgery"
                className="w-full h-auto max-h-96 lg:max-h-[560px] object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </motion.div>

          {/* Text - Right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 flex items-center gap-4">
              <span className="h-12 w-1.5 bg-teal-600 rounded-full"></span>
              Why MediCare Stands Apart
            </h3>

            <p className="text-lg text-gray-700 mb-10 leading-relaxed">
              Established in 2008, MediCare Hospital has grown into a leading healthcare destination offering comprehensive medical services under one roof. Our state-of-the-art infrastructure includes 50+ ICU beds, 12 modular operation theatres, in-house blood bank, 24/7 pharmacy, and advanced diagnostic labs.
            </p>

            <div className="space-y-6">
              {[
                "NABH Accredited & ISO 9001:2015 Certified",
                "15+ Years of Clinical Excellence & Patient Trust",
                "98.7% Patient Satisfaction Score (Verified)",
                "Da Vinci Robotic Surgery System for Precision",
                "50,000+ Successful Surgeries & Procedures",
                "24/7 Cardiac Cath Lab & Stroke Unit"
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-5 group cursor-pointer"
                >
                  <div className="w-11 h-11 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 transition-all duration-300">
                    <svg className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-800 group-hover:text-teal-700 transition-colors">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
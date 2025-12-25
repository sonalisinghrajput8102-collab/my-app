import React from "react";
import drSharma from "../../public/assest/image/doctor-01.jpg";
import drVerma from "../../public/assest/image/doctor-02.jpg";
import drGupta from "../../public/assest/image/doctor-07.jpg";
import drPatel from "../../public/assest/image/doctor-10.jpg";
import { FaStethoscope, FaBrain, FaBaby, FaBone } from "react-icons/fa";

const Gallery = () => {
  const specialists = [
    {
      name: "Dr. A. Sharma",
      title: "Chief Cardiologist",
      experience: "18+ yrs",
      detail: "5,000+ Angiographies",
      image: drSharma,
      icon: <FaStethoscope className="text-blue-500" />
    },
    {
      name: "Dr. R. Verma",
      title: "Senior Neurologist",
      experience: "15+ yrs",
      detail: "Stroke & Epilepsy Expert",
      image: drVerma,
      icon: <FaBrain className="text-green-500" />
    },
    {
      name: "Dr. S. Gupta",
      title: "Pediatric Surgeon",
      experience: "12+ yrs",
      detail: "3,000+ Neonatal Cases",
      image: drGupta,
      icon: <FaBaby className="text-pink-500" />
    },
    {
      name: "Dr. K. Patel",
      title: "Orthopedic Surgeon",
      experience: "20+ yrs",
      detail: "Joint Replacement Specialist",
      image: drPatel,
      icon: <FaBone className="text-orange-500" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Super-Specialists</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our team of highly experienced specialists is dedicated to providing world-class medical care with compassion and expertise.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialists.map((doctor, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-teal-400"></div>
              
              {/* Image container with better styling */}
              <div className="relative mb-6">
                <div className="w-36 h-36 mx-auto rounded-full p-2 bg-gradient-to-r from-blue-50 to-teal-50 group-hover:from-blue-100 group-hover:to-teal-100 transition-all duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Icon badge */}
                <div className="absolute bottom-4 right-10 bg-white rounded-full p-3 shadow-lg">
                  <div className="text-2xl">
                    {doctor.icon}
                  </div>
                </div>
              </div>
              
              {/* Doctor info */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {doctor.name}
              </h3>
              
              <div className="mb-3">
                <p className="font-semibold text-blue-600 text-lg">{doctor.title}</p>
              </div>
              
              {/* Experience badge */}
              <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                {doctor.experience} Experience
              </div>
              
              {/* Specialty detail */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-gray-700 font-medium">{doctor.detail}</p>
              </div>
              
              {/* Hover effect button */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {/* <button className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  View Profile
                </button> */}
              </div>
            </div>
          ))}
        </div>
        
       
      </div>
    </section>
  );
};

export default Gallery;
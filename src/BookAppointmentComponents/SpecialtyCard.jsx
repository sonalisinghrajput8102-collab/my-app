// src/components/SpecialtyCard.jsx
import React from 'react';

const SpecialtyCard = ({ name, img, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-3xl p-6 text-center cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border-2 border-transparent hover:border-teal-600 relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition"></div>
    <img src={img} alt={name} className="w-20 h-20 mx-auto mb-4 object-contain group-hover:scale-110 transition" />
    <div className="font-bold text-base bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
      {name}
    </div>
  </div>
);

export default SpecialtyCard;
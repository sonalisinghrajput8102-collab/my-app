// src/components/DoctorCard.jsx
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const DoctorCard = ({ doctor, onClick }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // check already bookmarked or not
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedDoctors")) || [];
    setIsBookmarked(bookmarks.some((d) => d.name === doctor.name));
  }, [doctor.name]);

  const toggleBookmark = (e) => {
    e.stopPropagation(); // card click se bachane ke liye

    let bookmarks = JSON.parse(localStorage.getItem("bookmarkedDoctors")) || [];

    if (isBookmarked) {
      bookmarks = bookmarks.filter((d) => d.name !== doctor.name);
    } else {
      bookmarks.push(doctor);
    }

    localStorage.setItem("bookmarkedDoctors", JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border-2 border-gray-200 hover:border-teal-600 transition-all cursor-pointer flex flex-col items-center text-center"
    >
      {/* Bookmark Icon */}
      <button
        onClick={toggleBookmark}
        className="absolute top-4 right-4"
      >
        <Heart
          className={`w-6 h-6 ${
            isBookmarked ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-teal-600">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-bold text-lg">{doctor.name}</h3>
      <p className="text-teal-600 font-medium">
        {doctor.qual} • {doctor.spec}
      </p>
      <p className="text-gray-600 text-sm mt-1">Exp: {doctor.exp} yrs</p>
      <p className="text-gray-600 text-sm">
        {doctor.clinic} • {doctor.dist}
      </p>
      <p className="text-teal-600 font-bold mt-2">Next: {doctor.next}</p>

      <button className="mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
        Book Now
      </button>
    </div>
  );
};

export default DoctorCard;

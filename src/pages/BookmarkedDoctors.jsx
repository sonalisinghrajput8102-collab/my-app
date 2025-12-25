// src/pages/BookmarkedDoctors.jsx
import React, { useState, useEffect } from 'react';
import DoctorCard from '../BookAppointmentComponents/DoctorCard';

const BookmarkedDoctors = () => {
  const [bookmarkedDoctors, setBookmarkedDoctors] = useState([]);

  // Load bookmarked doctors from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarkedDoctors') || '[]');
    setBookmarkedDoctors(saved);
  }, []);

  // Optional: Listen to storage changes (if bookmark done on another tab/page)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = JSON.parse(localStorage.getItem('bookmarkedDoctors') || '[]');
      setBookmarkedDoctors(saved);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-800 text-center mb-16">
          My Bookmarked Doctors ({bookmarkedDoctors.length})
        </h1>

        {bookmarkedDoctors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <p className="text-2xl text-gray-600 mb-4">No doctors bookmarked yet.</p>
            <p className="text-teal-600 text-lg font-medium">
              ❤️ Go to the doctors list and tap the heart icon to save your favorites here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bookmarkedDoctors.map((doctor, index) => (
              <DoctorCard
                key={index}
                doctor={doctor}
                onClick={() => {
                  // Optional: doctor details page खोलने के लिए
                  console.log("Selected doctor:", doctor.name);
                  // या navigate करो: navigate(`/doctor/${doctor.name}`)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedDoctors;
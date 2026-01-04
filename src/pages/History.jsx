// src/pages/History.jsx
import React, { useEffect, useState } from "react";

const History = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    const savedBookings = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    setBookings(savedBookings);
  };

  // Initial load
  useEffect(() => {
    loadBookings();
  }, []);

  // Real-time update when other tab/window adds booking
  useEffect(() => {
    window.addEventListener("storage", loadBookings);
    return () => window.removeEventListener("storage", loadBookings);
  }, []);

  // Manual clear history function
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to delete all booking history? This action cannot be undone.")) {
      localStorage.removeItem("bookingHistory");
      setBookings([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0B717A] to-teal-600 mb-4">
            My Test Booking History
          </h1>
          <p className="text-xl text-gray-600">
            All your booked lab tests and checkups at one place
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ✅ Your history is saved permanently in your browser until you choose to clear it.
          </p>
        </div>

        {/* Clear History Button (only if there are bookings) */}
        {bookings.length > 0 && (
          <div className="text-center">
            <button
              onClick={clearHistory}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg font-medium"
            >
              Clear All History
            </button>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6 text-gray-300">🩺</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No bookings yet</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Book your first test now and it will appear here. 
              Your history stays saved even if you close the browser!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking, index) => (
              <div
                key={index} // बेहतर होगा unique ID हो, लेकिन अभी index से काम चला लें
                className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-100"
              >
                <h2 className="text-2xl font-bold text-[#0B717A] mb-4 line-clamp-2">
                  {booking.testName}
                </h2>

                <div className="space-y-3 text-gray-700">
                  <p className="flex justify-between">
                    <span className="font-medium">Code:</span>
                    <span className="font-mono text-teal-700">{booking.testCode}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{booking.category}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span className="font-semibold text-teal-700">{booking.date}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Time:</span>
                    <span className="font-semibold text-teal-700">{booking.timeSlot}</span>
                  </p>
                </div>

                {booking.instructions && (
                  <div className="mt-6 bg-teal-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-teal-800 mb-2">Instructions</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {booking.instructions}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
// src/pages/ChooseCheckupType.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ChooseCheckupType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { test } = location.state || {};

  // If no test is passed (user directly accesses this page), show a message
  if (!test) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <p className="text-xl text-red-600">No test selected. Please go back and choose a test.</p>
      </div>
    );
  }

  const handleType = (type) => {
    if (type === "hospital") {
      navigate("/health-checkup-slots", { state: { test } }); // Pass the same test forward
    } else {
      alert("Home Visit booking is coming soon!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Choose Checkup Type
        </h1>

        {/* Selected Test Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Selected Test: {test.test_name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><strong>Code:</strong> {test.test_code}</p>
            <p><strong>Category:</strong> {test.category}</p>
            <p><strong>TAT (Turnaround Time):</strong> {test.tat}</p>
            {test.sample_required !== null && (
              <p>
                <strong>Sample Required:</strong> {test.sample_required ? "Yes" : "No"}
              </p>
            )}
            {test.fasting_required && (
              <p><strong>Fasting Required:</strong> Yes</p>
            )}
          </div>

          {test.instructions && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Instructions:</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line bg-gray-100 p-4 rounded-lg">
                {test.instructions}
              </p>
            </div>
          )}
        </div>

        {/* Choose Type Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => handleType("hospital")}
            className="bg-blue-600 text-white text-lg px-10 py-4 rounded-xl hover:bg-blue-700 transition shadow-md"
          >
            Hospital Visit
          </button>
          <button
            onClick={() => handleType("home")}
            className="bg-green-600 text-white text-lg px-10 py-4 rounded-xl hover:bg-green-700 transition shadow-md opacity-70"
            disabled // Optional: disable until feature is ready
          >
            Home Visit (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseCheckupType;
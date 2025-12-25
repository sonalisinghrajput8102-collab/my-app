// src/pages/TestsCheckup.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

// Simple SVG Icons
const LabIcon = () => (
  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.2 1.2.336 3.288-1.414 3.288H4.828c-1.75 0-2.614-2.088-1.414-3.288l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const BackIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const API_URL = "https://developer.bitmaxtest.com/api/test/checkups";

const TestsCheckup = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = getToken();
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(API_URL, { method: "GET", headers });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        if (result.status === "success") {
          setTests(result.data);
        } else {
          throw new Error(result.message || "Failed to load tests");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleBookNow = (test) => {
    navigate("/choose-checkup-type", { state: { test } });
  };

  const handleBack = () => {
    navigate(-1); // or navigate("/") if you want to go home
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-gray-200 rounded w-64 mb-10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg p-8 animate-pulse">
                <div className="h-12 bg-gray-200 rounded-full mb-6 mx-auto w-20"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-10 bg-gray-300 rounded-xl mt-6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-lg">
          <div className="text-red-500 text-7xl mb-6">⚠️</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={handleBack} className="text-indigo-600 font-semibold flex items-center mx-auto gap-2 hover:text-indigo-800">
            <BackIcon /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button + Header */}
        <div className="flex items-center mb-10">
          <button
            onClick={handleBack}
            className="mr-6 p-3 rounded-full bg-white shadow-md hover:shadow-xl transition-all hover:scale-110"
            aria-label="Go back"
          >
            <BackIcon />
          </button>

          <div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-600">
              Tests & Health Checkups
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Book accurate lab tests & full body checkups instantly
            </p>
          </div>
        </div>

        {/* Tests Grid */}
        {tests.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-8xl mb-8 text-gray-200">🩺</div>
            <h3 className="text-3xl font-semibold text-gray-600 mb-4">No tests available right now</h3>
            <p className="text-gray-500 text-lg">Check back later for updates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tests.map((test) => (
              <div
                key={test.id}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-indigo-100 overflow-hidden"
              >
                <div className="p-8 text-center">
                  <div className="mb-8 flex justify-center">
                    <LabIcon />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2">
                    {test.test_name}
                  </h3>

                  <div className="space-y-3 text-left text-gray-600 mb-8 bg-indigo-50 rounded-2xl p-5">
                    <p className="flex justify-between">
                      <span className="font-medium">Code:</span>
                      <span className="font-mono text-indigo-700">{test.test_code}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Category:</span>
                      <span>{test.category}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">TAT:</span>
                      <span className="text-green-600 font-bold">{test.tat}</span>
                    </p>
                  </div>

                  {test.instructions && (
                    <details className="text-left text-sm text-gray-600 mb-6 bg-gray-50 rounded-2xl p-4 cursor-pointer">
                      <summary className="font-bold text-indigo-700 list-none">View Instructions</summary>
                      <p className="mt-3 whitespace-pre-line leading-relaxed">{test.instructions}</p>
                    </details>
                  )}

                  <button
                    onClick={() => handleBookNow(test)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-bold text-lg py-5 rounded-2xl hover:from-indigo-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsCheckup;
import React, { useState, useEffect } from "react";

const ConsultationType = ({ onContinue }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("appointmentData")) || {};
    const ct = saved.consultation_type;
    if (Array.isArray(ct)) setTypes(ct);
    else if (typeof ct === "string" && ct) setTypes([ct]);
  }, []);

  const toggleType = (t) => {
    setTypes((prev) => {
      if (prev.includes(t)) return prev.filter((x) => x !== t);
      return [...prev, t];
    });
  };

  const handleContinue = () => {
    if (!types || types.length === 0) {
      alert("Please select at least one consultation type");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("appointmentData")) || {};
    localStorage.setItem(
      "appointmentData",
      JSON.stringify({
        ...saved,
        consultation_type: types,
      })
    );

    if (onContinue) onContinue();
  };

  const isSelected = (t) => types.includes(t);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Select Consultation Type</h2>
          <p className="text-gray-600 mt-2">Choose how you'd like to connect</p>
        </div>

        {/* Options */}
        <div className="space-y-5 mb-10">
          {/* Video Option */}
          <div
            onClick={() => toggleType("video")}
            className={`p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              isSelected("video") 
                ? "border-blue-500 bg-gradient-to-r from-blue-50 to-teal-50 shadow-lg" 
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                isSelected("video") ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 text-lg">Video Consultation</h3>
                <p className="text-sm text-gray-600 mt-1">Face-to-face virtual meeting</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                isSelected("video") ? "bg-blue-500 border-blue-500" : "border-gray-300"
              }`}>
                {isSelected("video") && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Audio Option */}
          <div
            onClick={() => toggleType("audio")}
            className={`p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              isSelected("audio") 
                ? "border-teal-500 bg-gradient-to-r from-teal-50 to-blue-50 shadow-lg" 
                : "border-gray-200 hover:border-teal-300"
            }`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                isSelected("audio") ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-600"
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 text-lg">Voice Consultation</h3>
                <p className="text-sm text-gray-600 mt-1">Audio-only conversation</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                isSelected("audio") ? "bg-teal-500 border-teal-500" : "border-gray-300"
              }`}>
                {isSelected("audio") && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Count */}
        {types.length > 0 && (
          <div className="mb-6 p-3 bg-blue-50 rounded-xl text-center">
            <p className="text-blue-700 font-medium">
              {types.length} type{types.length > 1 ? 's' : ''} selected
            </p>
          </div>
        )}

        {/* Continue Button */}
        <button 
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Continue
          <span className="ml-2">→</span>
        </button>

        {/* Helper Text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          You can select one or both options
        </p>
      </div>
    </div>
  );
};

export default ConsultationType;
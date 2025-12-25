// src/pages/SuccessPage.jsx
import React, { useEffect, useState } from "react";

const SuccessPage = ({ onAddMore }) => {
  const [appointmentId, setAppointmentId] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [canStartCall, setCanStartCall] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointmentData")) || {};

    // Generate appointment ID once
    if (!data.appointment_id) {
      data.appointment_id = "APT-" + Date.now().toString().slice(-6);
    }

    setAppointmentId(data.appointment_id);
    setDate(data.date);
    setSlot(data.slot);
    setConsultationType(data.consultation_type);

    // Add appointment to persistent list
    const list = JSON.parse(localStorage.getItem("appointmentList")) || [];
    // Avoid duplicate entries if page refresh
    if (!list.find(a => a.appointment_id === data.appointment_id)) {
      list.push(data);
      localStorage.setItem("appointmentList", JSON.stringify(list));
    }

    localStorage.setItem("appointmentData", JSON.stringify(data));

    // Time check logic for call
    if (data.date && data.slot) {
      const [startTime] = data.slot.split("-").map(t => t.trim());
      const appointmentDateTime = new Date(`${data.date} ${startTime}`);

      const checkTime = () => {
        const now = new Date();
        setCanStartCall(now >= appointmentDateTime);
      };

      checkTime();
      const timer = setInterval(checkTime, 30000); // every 30 sec
      return () => clearInterval(timer);
    }
  }, []);

  const consultationLabel =
    consultationType === "by_video_call"
      ? "By Video Call"
      : consultationType === "by_audio_call"
      ? "By Audio Call"
      : "Consultation";

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl">
          ✓
        </div>

        <h2 className="text-2xl font-bold mt-4">Booking Successful</h2>

        {/* Date & Time */}
        <p className="mt-4 text-gray-600">Appointment Scheduled</p>
        <p className="text-xl font-bold text-teal-600">
          {date} at {slot}
        </p>

        {/* Consultation Type */}
        <p className="mt-2 text-sm font-semibold text-gray-700">
          Consultation Type: <span className="text-teal-600">{consultationLabel}</span>
        </p>

        {/* Appointment ID */}
        <div className="mt-6 bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Appointment ID</p>
          <p className="text-lg font-bold text-teal-600">{appointmentId}</p>
        </div>

        {/* Call Buttons */}
        <div className="mt-6">
          {consultationType === "by_video_call" && (
            <button
              disabled={!canStartCall}
              className={`w-full py-3 rounded-xl font-bold text-white ${
                canStartCall ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              📹 {canStartCall ? "Start Video Call" : "Video Call will start at appointment time"}
            </button>
          )}
          {consultationType === "by_audio_call" && (
            <button
              disabled={!canStartCall}
              className={`w-full py-3 rounded-xl font-bold text-white ${
                canStartCall ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              📞 {canStartCall ? "Start Audio Call" : "Audio Call will start at appointment time"}
            </button>
          )}
        </div>

        {/* Add More Services */}
        <button
          onClick={onAddMore}
          className="w-full mt-6 bg-teal-600 text-white py-3 rounded-full font-bold"
        >
          Add More Services
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;

import React, { useEffect, useState } from "react";
import {
  FaVideo,
  FaPhoneAlt,
  FaUserMd,
  FaArrowLeft,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import { getToken } from "../utils/auth";
import VideoCallUIKit from "../Components/VideoCallUIKit";
import CallInvitationHandler from "../Components/CallInvitationHandler";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [activeCallAppointment, setActiveCallAppointment] = useState(null);
  const [isDoctorInvited, setIsDoctorInvited] = useState(false);

  /* ================= FETCH APPOINTMENTS ================= */
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const res = await axios.get(
        "https://developer.bitmaxtest.com/api/appointments/user",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (res.data?.user) setCurrentUser(res.data.user);

      if (Array.isArray(res.data?.appointments)) {
        const list = [...res.data.appointments].sort(
          (a, b) => (b.appointment_id || 0) - (a.appointment_id || 0)
        );
        setAppointments(list);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* ================= CANCEL APPOINTMENT ================= */
  const openCancelModal = (appointment) => {
    setAppointmentToCancel(appointment);
    setCancelReason("Customer requested cancellation.");
    setShowCancelModal(true);
  };

  const cancelAppointment = async () => {
    if (!cancelReason.trim()) return alert("Enter cancel reason");

    try {
      const token = getToken();
      await axios.post(
        `https://developer.bitmaxtest.com/api/appointments/cancel/${appointmentToCancel.appointment_id}`,
        { cancel_reason: cancelReason },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setShowCancelModal(false);
      setSelectedAppointment(null);
      fetchAppointments();
    } catch (err) {
      alert("Cancel failed");
    }
  };

  /* ================= HELPERS ================= */
  const getConsultationLabel = (subtype = "") => {
    const s = subtype.toLowerCase();
    if (s.includes("video")) return "Video Consultation";
    if (s.includes("voice") || s.includes("audio") || s.includes("phone"))
      return "Audio Consultation";
    return "Consultation";
  };

  const getIcon = (subtype = "") => {
    const s = subtype.toLowerCase();
    if (s.includes("video")) return <FaVideo />;
    if (s.includes("voice") || s.includes("audio") || s.includes("phone"))
      return <FaPhoneAlt />;
    return <FaUserMd />;
  };

  const getStatusClasses = (status = "") => {
    const s = status.toLowerCase();
    if (s === "cancelled" || s === "canceled")
      return "bg-red-100 text-red-700";
    if (s === "pending") return "bg-yellow-100 text-yellow-700";
    return "bg-teal-100 text-teal-700";
  };

  const getCallButton = (item) => {
    if (item.status?.toLowerCase().includes("cancel")) return null;

    if (item.subtype?.toLowerCase().includes("video"))
      return {
        label: "Join Video Call",
        icon: <FaVideo className="mr-2" />,
        className: "bg-blue-600 hover:bg-blue-700 text-white",
      };

    if (
      item.subtype?.toLowerCase().includes("voice") ||
      item.subtype?.toLowerCase().includes("audio")
    )
      return {
        label: "Start Voice Call",
        icon: <FaPhoneAlt className="mr-2" />,
        className: "bg-green-600 hover:bg-green-700 text-white",
      };

    return null;
  };

  /* ================= CALL HANDLERS ================= */
  const handleCall = (appointment) => {
    setActiveCallAppointment(appointment);
    setIsDoctorInvited(false); // Doctor hasn't accepted yet
    
    console.log('📱 Call initiated for appointment:', appointment.appointment_id);
    console.log('📞 Sending invite to doctor...');
  };

  const handleEndCall = () => {
    setActiveCallAppointment(null);
    setIsDoctorInvited(false);
  };

  const handleDoctorInvited = (callInfo) => {
    console.log('👨‍⚕️ Doctor received invitation:', callInfo);
    setIsDoctorInvited(true);
  };

  const handleCallEnded = () => {
    console.log('📞 Call ended');
    setActiveCallAppointment(null);
    setIsDoctorInvited(false);
  };

  /* ================= UI ================= */
  return (
    <div className="relative min-h-screen bg-blue-50 px-4 py-8">
      <button
        onClick={() => window.history.back()}
        className="absolute left-4 top-4 bg-white p-2 rounded-full shadow"
      >
        <FaArrowLeft />
      </button>

      <h2 className="text-2xl font-bold text-center mb-6">
        My Appointments
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{String(error)}</p>}

      {!loading && appointments.length === 0 && (
        <p className="text-center">No appointments found</p>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        {appointments.map((item) => {
          const callBtn = getCallButton(item);
          return (
            <div
              key={item.appointment_id}
              className="bg-white rounded-xl shadow p-5 flex justify-between"
            >
              <div>
                <p className="font-bold text-teal-600">
                  {item.appointment_code || item.appointment_id}
                </p>
                <p className="font-semibold">
                  {item.doctor?.name || "Doctor"}
                </p>
                <p className="text-sm">
                  {item.appointment_date} | {item.appointment_time}
                </p>

                <div className="mt-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedAppointment(item)}
                    className="px-3 py-1 bg-teal-600 text-white rounded"
                  >
                    View Details
                  </button>

                  {callBtn && (
                    <button
                      onClick={() => handleCall(item)}
                      className={`px-3 py-1 rounded flex items-center ${callBtn.className}`}
                    >
                      {callBtn.icon}
                      {callBtn.label}
                    </button>
                  )}

                  <button
                    onClick={() => openCancelModal(item)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <span
                className={`h-fit px-3 py-1 text-xs rounded-full ${getStatusClasses(
                  item.status
                )}`}
              >
                {item.status || "Booked"}
              </span>
            </div>
          );
        })}
      </div>

      {/* ================= CALL INVITATION HANDLER (for doctors) ================= */}
      {currentUser && (
        <CallInvitationHandler
          currentUser={currentUser}
          onCallInvited={handleDoctorInvited}
          onCallEnded={handleCallEnded}
        />
      )}

      {/* ================= VIDEO / VOICE CALL ================= */}
      {activeCallAppointment && currentUser && (
        <VideoCallUIKit
          appointment={activeCallAppointment}
          currentUser={currentUser}
          onEndCall={handleEndCall}
          isDoctorInvited={isDoctorInvited}
        />
      )}
    </div>
  );
};

export default MyAppointments;

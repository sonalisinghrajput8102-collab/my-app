// src/pages/MyAppointments.jsx
import React, { useEffect, useState } from "react";
import { FaVideo, FaPhoneAlt, FaUserMd, FaArrowLeft, FaTimes } from "react-icons/fa";
import axios from "axios";
import { getToken } from "../utils/auth";
import VideoCall from "../components/VideoCall";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For popup
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [activeCallAppointment, setActiveCallAppointment] = useState(null);
  const [showVoiceCallModal, setShowVoiceCallModal] = useState(false);

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    const token = getToken();
    try {
      const res = await axios.get("https://developer.bitmaxtest.com/api/appointments/user", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.data && res.data.user) setCurrentUser(res.data.user);
      if (res.data && res.data.appointments) {
        const list = res.data.appointments;
        list.sort((a, b) => (b.appointment_id || 0) - (a.appointment_id || 0));
        setAppointments(list);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err.response || err.message || err);
      setError(err.response?.data || err.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const openCancelModal = (appointment) => {
    setAppointmentToCancel(appointment);
    setCancelReason("Customer requested cancellation due to personal reasons.");
    setShowCancelModal(true);
  };

  const cancelAppointment = async (appointment_id, reason) => {
    if (!reason || reason.trim().length === 0) {
      alert("Please enter a cancellation reason.");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    setLoading(true);
    try {
      const token = getToken();
      const res = await axios.post(
        `https://developer.bitmaxtest.com/api/appointments/cancel/${appointment_id}`,
        { cancel_reason: reason },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      if (res.data && res.data.status) {
        alert("Appointment cancelled successfully.");
        setSelectedAppointment(null);
        setShowCancelModal(false);
        setAppointmentToCancel(null);
        setCancelReason("");
        await fetchAppointments();
      } else {
        alert("Cancellation may have failed. Check console or try again.");
        console.error("Cancel response:", res.data);
      }
    } catch (err) {
      console.error("Cancel failed:", err.response || err.message || err);
      const msg = err.response?.data || err.message || "Cancel failed";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  const getConsultationLabel = (subtype) => {
    const s = (subtype || "").toLowerCase();
    if (s.includes("video")) return "Video Consultation";
    if (s.includes("voice") || s.includes("audio") || s.includes("phone")) return "Audio Consultation";
    if (s.includes("in_person") || s.includes("in person")) return "In-person";
    return "Consultation";
  };

  const getIcon = (subtype) => {
    const s = (subtype || "").toLowerCase();
    if (s.includes("video")) return <FaVideo />;
    if (s.includes("voice") || s.includes("audio") || s.includes("phone")) return <FaPhoneAlt />;
    return <FaUserMd />;
  };

  const getStatusClasses = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "pending") return { bg: "bg-yellow-100", text: "text-yellow-800" };
    if (s === "cancelled" || s === "canceled") return { bg: "bg-red-100", text: "text-red-700" };
    return { bg: "bg-teal-100", text: "text-teal-700" };
  };

  // NEW: Decide which call button to show (Video or Voice)
  const getCallButton = (subtype, status) => {
    const s = (subtype || "").toLowerCase();
    const st = (status || "").toLowerCase();

    if (st === "cancelled" || st === "canceled") return null;

    if (s.includes("video")) {
      return {
        label: "Join Video Call",
        icon: <FaVideo className="mr-2" />,
        className: "bg-blue-600 hover:bg-blue-700 text-white",
      };
    }
    if (s.includes("voice") || s.includes("audio") || s.includes("phone")) {
      return {
        label: "Start Voice Call",
        icon: <FaPhoneAlt className="mr-2" />,
        className: "bg-green-600 hover:bg-green-700 text-white",
      };
    }
    return null;
  };

  // NEW: Handle click on call button
  const handleCall = (appointment) => {
    setActiveCallAppointment(appointment);
  };

  // Handle end call
  const handleEndCall = () => {
    setActiveCallAppointment(null);
  };

  return (
    <div className="relative min-h-screen bg-blue-50 px-4 py-8">
      <button
        onClick={() => window.history.back()}
        className="absolute left-4 top-4 p-2 rounded-full bg-white shadow hover:bg-gray-50"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-teal-600" />
      </button>

      <h2 className="text-2xl font-bold text-center mb-6">My Appointments</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading appointments...</p>
      ) : error ? (
        <div className="text-center text-red-600">Failed to load appointments: {typeof error === 'string' ? error : JSON.stringify(error)}</div>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments booked yet</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {appointments.map((item) => {
            const callBtn = getCallButton(item.subtype, item.status);

            return (
              <div
                key={item.appointment_id}
                className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                {/* LEFT */}
                <div>
                  <p className="text-sm text-gray-500">Appointment ID</p>
                  <p className="font-bold text-teal-600">{item.appointment_code || item.appointment_id}</p>

                  <p className="mt-2 text-gray-700 font-semibold">
                    {item.doctor?.name || "Doctor Consultation"}
                  </p>

                  <p className="text-sm text-gray-500">Issue: {item.issue || "General Consultation"}</p>

                  <p className="mt-1 text-sm">{item.appointment_date} | {item.appointment_time}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedAppointment(item)}
                      className="px-4 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm"
                    >
                      View Details
                    </button>

                    {/* NEW: Call Button on Card */}
                    {callBtn && (
                      <button
                        onClick={() => handleCall(item)}
                        className={`px-4 py-1.5 rounded-lg text-sm flex items-center ${callBtn.className}`}
                      >
                        {callBtn.icon}
                        {callBtn.label}
                      </button>
                    )}

                    <button
                      onClick={() => item.status?.toLowerCase() !== "cancelled" && openCancelModal(item)}
                      disabled={item.status?.toLowerCase() === "cancelled"}
                      className={`px-3 py-1 rounded-lg text-sm ${item.status?.toLowerCase() === "cancelled" ? "bg-red-200 text-red-400 cursor-not-allowed opacity-60" : "bg-red-600 text-white hover:bg-red-700"}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-teal-600">
                    {getIcon(item.subtype)}
                    {getConsultationLabel(item.subtype)}
                  </div>

                  {(() => {
                    const sc = getStatusClasses(item.status);
                    return (
                      <span className={`px-3 py-1 text-xs rounded-full ${sc.bg} ${sc.text}`}>{item.status || 'Booked'}</span>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Popup Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>

            <div className="flex gap-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img src={selectedAppointment.doctor?.image || '/placeholder.png'} alt="Doctor" className="w-24 h-24 rounded-lg object-cover" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{selectedAppointment.doctor?.name || 'Doctor Consultation'}</h3>
                <p className="text-sm text-gray-500 mb-3">{selectedAppointment.doctor?.department || ''}</p>

                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div><span className="font-semibold">Appointment ID:</span> <span className="ml-2">{selectedAppointment.appointment_code || selectedAppointment.appointment_id}</span></div>

                  <div>
                    <span className="font-semibold">For:</span>
                    <span className="ml-2">
                      {selectedAppointment.for_user_type === 'relative' ? 'Relative' : 'Self'}
                    </span>
                  </div>

                  {selectedAppointment.for_user_type === 'relative' ? (
                    <div>
                      <span className="font-semibold">Relative:</span>
                      <span className="ml-2">{selectedAppointment.relative?.name || 'Relative'}</span>
                      {selectedAppointment.relative?.relation && (
                        <span className="ml-2 text-gray-500">({selectedAppointment.relative.relation})</span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="font-semibold">Booked By:</span>
                      <span className="ml-2">{currentUser?.name || 'You'}</span>
                    </div>
                  )}

                  <div><span className="font-semibold">Issue:</span> <span className="ml-2">{selectedAppointment.issue || 'General Consultation'}</span></div>

                  <div><span className="font-semibold">Date & Time:</span> <span className="ml-2">{selectedAppointment.appointment_date} | {selectedAppointment.appointment_time}</span></div>

                  <div><span className="font-semibold">Consultation Type:</span> <span className="ml-2">{getConsultationLabel(selectedAppointment.subtype)}</span></div>

                  <div>
                    <span className="font-semibold">Status:</span>
                    {(() => {
                      const sc = getStatusClasses(selectedAppointment.status);
                      return (
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${sc.bg} ${sc.text}`}>{selectedAppointment.status || 'Booked'}</span>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons in Popup */}
            <div className="mt-6 flex flex-col gap-3">
              {/* NEW: Call Button in Popup */}
              {(() => {
                const callBtn = getCallButton(selectedAppointment.subtype, selectedAppointment.status);
                return callBtn ? (
                  <button
                    onClick={() => handleCall(selectedAppointment)}
                    className={`w-full px-4 py-2.5 rounded-lg flex items-center justify-center text-sm font-medium ${callBtn.className}`}
                  >
                    {callBtn.icon}
                    {callBtn.label}
                  </button>
                ) : null;
              })()}

              <button
                onClick={() => selectedAppointment?.status?.toLowerCase() !== 'cancelled' && openCancelModal(selectedAppointment)}
                disabled={selectedAppointment?.status?.toLowerCase() === 'cancelled'}
                className={`w-full px-4 py-2 rounded-lg ${selectedAppointment?.status?.toLowerCase() === 'cancelled' ? 'bg-red-200 text-red-400 cursor-not-allowed opacity-60' : 'bg-red-500 text-white hover:bg-red-600'}`}
              >
                {selectedAppointment?.status?.toLowerCase() === 'cancelled' ? 'Already Cancelled' : 'Cancel Appointment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Reason Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowCancelModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>

            <h3 className="text-lg font-bold mb-3">Cancel Appointment</h3>
            <p className="text-sm text-gray-600 mb-3">Please provide a reason for cancellation:</p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-3 border rounded mb-4"
              rows={4}
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (appointmentToCancel) cancelAppointment(appointmentToCancel.appointment_id, cancelReason);
                }}
                disabled={appointmentToCancel?.status?.toLowerCase() === 'cancelled'}
                className={`px-4 py-2 rounded-lg ${appointmentToCancel?.status?.toLowerCase() === 'cancelled' ? 'bg-red-200 text-red-400 cursor-not-allowed opacity-60' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                {appointmentToCancel?.status?.toLowerCase() === 'cancelled' ? 'Already Cancelled' : 'Confirm Cancel'}
              </button>

              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Call Component - For both video and voice consultations */}
      {activeCallAppointment && currentUser && (
        <VideoCall
          appointment={activeCallAppointment}
          onEndCall={handleEndCall}
          appID="724789503"
          appSign="86dae0d2dfac7c46cf4e9208a8394f8a4bb5c5d486fc2268d24d87579704a8a8"
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default MyAppointments;
// src/BookAppointmentComponents/Calendar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, getUser } from "../utils/auth";

const Calendar = ({ doctorId, onConfirm }) => {
  const [availability, setAvailability] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");

  const token = getToken();
  const today = new Date().toISOString().split("T")[0];

  /* ======================
     LOAD SAVED DATA
  ======================= */
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("appointmentData")) || {};
    if (savedData.issue) setIssue(savedData.issue);
    if (savedData.description) setDescription(savedData.description);

    const savedBooking = JSON.parse(localStorage.getItem("booking")) || {};
    if (savedBooking.date && savedBooking.date >= today) {
      setSelectedDate(savedBooking.date);
      setSelectedSlot(savedBooking.slot || null);
    }
  }, []);

  /* ======================
     FETCH AVAILABILITY
  ======================= */
  useEffect(() => {
    if (!doctorId || !token) return;
    fetchAvailability();
  }, [doctorId, token]);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://developer.bitmaxtest.com/api/doctors/${doctorId}/availability`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAvailability(res.data.slots_availability || {});
      console.log("[Calendar] fetched availability:", res.data.slots_availability || {});
    } catch {
      setError("Failed to load availability.");
    } finally {
      setLoading(false);
    }
  };

  const filteredDates = Object.keys(availability).filter((date) => {
    const d = new Date(date);
    return date >= today && d.getDay() !== 0;
  });

  const slots =
    selectedDate && availability[selectedDate]
      ? [
          ...(availability[selectedDate].consultations || []),
          ...(availability[selectedDate].appointments || []),
        ]
      : [];

  /* ======================
     CONFIRM BOOKING
  ======================= */
  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) return;
    if (!issue.trim()) {
      alert("Please enter the issue first.");
      return;
    }

    setLoading(true);
    setError(null);

    const savedData = JSON.parse(localStorage.getItem("appointmentData")) || {};
    const user = getUser();

    const uiForUserType =
      savedData.for_user_type || (savedData.relative_id ? "others" : "self");
    const resolvedUi =
      String(uiForUserType).toLowerCase() === "others" ? "others" : "self";
    const serverForUserType =
      resolvedUi === "others" ? "relative" : "self";

    if (resolvedUi === "self" && !user?.id) {
      alert("Login required.");
      setLoading(false);
      return;
    }

    if (resolvedUi === "others" && !savedData.relative_id) {
      alert("Select a relative first.");
      setLoading(false);
      return;
    }

    /* ===== CONSULTATION TYPE ===== */
    const savedTypes = savedData.consultation_type;
    const mapType = (t) => {
      const s = String(t).toLowerCase();
      if (s === "video") return "by video call";
      if (s === "audio" || s === "voice" || s === "phone") return "by voicecall";
      return s;
    };

    // Prepare two values:
    // - `consultationSubtypeSent` (single token) sent to server — use simple tokens like 'video' or 'audio'
    // - `consultationSubtypeForSave` (human-friendly string) saved to localStorage for UI
    const subtypeTokenFromString = (s) => {
      if (!s) return null;
      const lower = String(s).toLowerCase();
      if (lower.includes("video")) return "video";
      if (lower.includes("voice") || lower.includes("audio") || lower.includes("phone")) return "audio";
      if (lower.includes("in") && lower.includes("person")) return "in_person";
      return lower.replace(/\s+/g, "_");
    };

    let consultationSubtypeForSave = selectedSlot.subtype || "video";
    let consultationSubtypeSent = subtypeTokenFromString(selectedSlot.subtype) || null;

    // Map our simple token to the server enum values used by the API
    const serverEnumFromToken = (token) => {
      if (!token) return null;
      if (token === "video") return "by video call";
      if (token === "audio") return "by voicecall"; // server expects this exact string
      if (token === "in_person") return "in_person";
      return token;
    };

    if (!consultationSubtypeSent) {
      if (Array.isArray(savedTypes) && savedTypes.length) {
        if (savedTypes.includes("video")) consultationSubtypeSent = "video";
        else if (savedTypes.includes("audio") || savedTypes.includes("voice")) consultationSubtypeSent = "audio";
        else consultationSubtypeSent = subtypeTokenFromString(savedTypes[0]);

        consultationSubtypeForSave = savedTypes.join(" & ");
      } else if (typeof savedTypes === "string" && savedTypes) {
        consultationSubtypeSent = subtypeTokenFromString(savedTypes);
        consultationSubtypeForSave = savedTypes;
      } else {
        consultationSubtypeSent = "video";
        consultationSubtypeForSave = "video";
      }
    }

    const consultationSubtypeForServer =
      // if slot already provided an exact enum-like string, prefer it
      selectedSlot.subtype && (selectedSlot.subtype === "by video call" || selectedSlot.subtype === "by voicecall")
        ? selectedSlot.subtype
        : serverEnumFromToken(consultationSubtypeSent) || "by video call";

    const appointmentPayload = {
      for_user_type: serverForUserType,
      doctor_id: doctorId,
      relative_id:
        serverForUserType === "relative" ? savedData.relative_id : null,
      user_id: serverForUserType === "self" ? user?.id : null,
      shift_name: selectedSlot.shift || "Morning",
      appointment_date: selectedDate,
      appointment_time: `${selectedSlot.start} - ${selectedSlot.end}`,
      type: selectedSlot.type || "consultation",
      subtype: consultationSubtypeForServer,
      issue: issue.trim(),
      description: description.trim(),
    };

    try {
      console.log("[Calendar] selectedSlot.subtype:", selectedSlot.subtype);
      console.log("[Calendar] consultationSubtypeForSave:", consultationSubtypeForSave);
      console.log("[Calendar] consultationSubtypeSent (token):", consultationSubtypeSent);
      console.log("[Calendar] consultationSubtypeForServer (sent):", consultationSubtypeForServer);
      console.log("Booking payload:", appointmentPayload);
      await axios.post(
        "https://developer.bitmaxtest.com/api/appointments/book",
        appointmentPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      /* ======================
         SAVE FOR SUCCESS PAGE
      ======================= */
      localStorage.setItem(
        "appointmentData",
        JSON.stringify({
          ...savedData,
          date: selectedDate,
          slot: `${selectedSlot.start} - ${selectedSlot.end}`,
          consultation_subtype: consultationSubtypeForSave,
          consultation_types: Array.isArray(savedTypes) ? savedTypes : (savedTypes ? [savedTypes] : []),
          issue: issue.trim(),
          description: description.trim(),
        })
      );

      localStorage.setItem(
        "booking",
        JSON.stringify({
          date: selectedDate,
          slot: selectedSlot,
          for_user_type: appointmentPayload.for_user_type,
          relative_id: appointmentPayload.relative_id,
        })
      );

      alert("Appointment booked successfully!");
      onConfirm && onConfirm({
        date: selectedDate,
        slot: selectedSlot,
        for_user_type: appointmentPayload.for_user_type,
        relative_id: appointmentPayload.relative_id,
        user_id: appointmentPayload.user_id,
      });
    } catch (err) {
      console.error("Booking error status/data:", err.response?.status, err.response?.data);
      const serverData = err.response?.data;
      if (serverData) {
        // If server returns structured error, show it clearly
        const pretty = typeof serverData === "string" ? serverData : JSON.stringify(serverData);
        alert(`Booking failed: ${pretty}`);
        setError(pretty);
      } else {
        const msg = err.message || "Booking failed.";
        alert(`Booking failed: ${msg}`);
        setError(msg);
      }

      // If validation or conflict, refresh availability and clear selection to let user pick another slot
      if (err.response?.status === 409 || err.response?.status === 422) {
        await fetchAvailability();
        setSelectedSlot(null);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!doctorId)
    return (
      <p className="text-center text-gray-500 mt-10">
        Please select a doctor first.
      </p>
    );

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Select Date & Time
      </h2>

      {error && (
        <p className="text-red-600 text-center mb-4">{error}</p>
      )}
      {loading && (
        <p className="text-center text-teal-600 mb-4">Loading...</p>
      )}

      <input
        type="text"
        placeholder="Enter your issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {filteredDates.map((date) => (
          <div
            key={date}
            onClick={() => {
              setSelectedDate(date);
              setSelectedSlot(null);
            }}
            className={`p-3 rounded-full cursor-pointer ${
              selectedDate === date
                ? "bg-teal-600 text-white"
                : "bg-teal-50"
            }`}
          >
            {new Date(date).getDate()}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {slots.map((slot, i) => (
            <div
              key={i}
              onClick={() => setSelectedSlot(slot)}
              className={`p-2 text-center rounded cursor-pointer ${
                selectedSlot === slot
                  ? "bg-teal-600 text-white"
                  : "bg-teal-50"
              }`}
            >
              {slot.start} - {slot.end}
            </div>
          ))}
        </div>
      )}

      <button
        disabled={!selectedDate || !selectedSlot || loading || !issue.trim()}
        onClick={handleConfirm}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-full font-bold disabled:opacity-50"
      >
        {loading ? "Booking..." : "Confirm & Book"}
      </button>
    </div>
  );
};

export default Calendar;

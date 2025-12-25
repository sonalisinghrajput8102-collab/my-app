// src/pages/HealthCheckupSlot.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaymentPage from "./paymentpage";
import SuccessPage from "./Receipt";

const timeSlots = [
  { label: "10:00 - 11:00 AM", start: "10:00 AM", end: "11:00 AM" },
  { label: "11:00 - 12:00 PM", start: "11:00 AM", end: "12:00 PM" },
  { label: "12:00 - 01:00 PM", start: "12:00 PM", end: "01:00 PM" },
  { label: "02:00 - 03:00 PM", start: "02:00 PM", end: "03:00 PM" },
  { label: "03:00 - 04:00 PM", start: "03:00 PM", end: "04:00 PM" },
  { label: "04:00 - 05:00 PM", start: "04:00 PM", end: "05:00 PM" },
];

const BOOKING_API = "https://developer.bitmaxtest.com/api/test/booking";

const HealthCheckupSlot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { test } = location.state || {};

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentStep, setCurrentStep] = useState("slot");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  if (!test && currentStep === "slot") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <p className="text-xl text-red-600">
          No test selected. Please go back and choose a test.
        </p>
      </div>
    );
  }

  // SUPER SAFE VERSION - Booking ho rahi hai to direct payment par bhejo
  const handleProceedToPayment = async () => {
    if (!selectedDate || !selectedSlot) return;

    setBookingLoading(true);
    setBookingError(null);

    try {
      const token = getToken();
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const payload = {
        test_id: test.id,
        booking_date: formattedDate,
        start_time: selectedSlot.start,
        end_time: selectedSlot.end,
      };

      const response = await fetch(BOOKING_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // Debug ke liye (development mein rakh, production mein hata sakte ho)
      console.log("Booking API Response:", result);
      console.log("HTTP Status:", response.status);

      // MAIN LOGIC: Agar HTTP status 200-299 hai → booking successful maano
      // Kyunki tune bola ki booking database mein ho rahi hai
      if (response.ok) {
        // Sirf tab error dikhao jab sach mein clear error ho
        const hasError =
          result.status === "error" ||
          result.error === true ||
          (result.message && /fail|error|unavailable|already/i.test(result.message));

        if (hasError) {
          throw new Error(result.message || "This slot is no longer available. Please select another.");
        }

        // SUCCESS: Payment page par jaao
        setCurrentStep("payment");
        return;
      }

      // Agar HTTP error (400, 401, 500 etc.)
      throw new Error(result.message || result.msg || "Booking failed. Please try again later.");

    } catch (err) {
      // Network error ya parse error
      setBookingError(err.message || "Network error. Please check your connection and try again.");
      console.error("Booking error:", err);
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    const bookingData = {
      testName: test.test_name,
      testCode: test.test_code,
      category: test.category,
      date: selectedDate?.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      timeSlot: selectedSlot?.label,
      instructions: test.instructions || "",
    };

    const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    history.push(bookingData);
    localStorage.setItem("bookingHistory", JSON.stringify(history));

    setCurrentStep("success");
  };

  const handleBackToSlot = () => setCurrentStep("slot");
  const handleDone = () => navigate("/my-appointments");

  // PAYMENT PAGE
  if (currentStep === "payment") {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12">
        <PaymentPage
          doctor={{
            name: test.test_name,
            spec: test.category || "Lab Test",
            photo: "https://via.placeholder.com/150",
          }}
          date={selectedDate?.toLocaleDateString("en-IN")}
          slot={selectedSlot?.label}
          consultation_type="Health Checkup / Lab Test"
          selectedTest={test}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot?.label}
          onPaymentSuccess={handlePaymentSuccess}
          onBack={handleBackToSlot}
        />
      </div>
    );
  }

  // SUCCESS PAGE
  if (currentStep === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12">
        <SuccessPage
          onAddMore={handleDone}
          bookingDetails={{
            type: "Health Checkup",
            testName: test.test_name,
            testCode: test.test_code,
            category: test.category,
            date: selectedDate?.toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            timeSlot: selectedSlot?.label,
            instructions: test.instructions,
          }}
        />
      </div>
    );
  }

  // SLOT SELECTION PAGE
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Slot for Your Test</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#0B717A]">{test.test_name}</h2>
              <p className="text-gray-600 mt-2"><strong>Code:</strong> {test.test_code}</p>
              <p className="text-gray-600"><strong>Category:</strong> {test.category}</p>
              <p className="text-gray-600"><strong>TAT:</strong> {test.tat}</p>
            </div>
            {test.instructions && (
              <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-[#0B717A]">
                <h3 className="font-semibold text-gray-800 mb-2">Important Instructions:</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">{test.instructions}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Date</h2>
          <div className="flex justify-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              inline
              calendarClassName="border-2 border-[#0B717A] rounded-xl shadow-inner"
            />
          </div>
          {selectedDate && (
            <p className="text-center mt-6 text-lg font-medium text-[#0B717A]">
              Selected Date: {selectedDate.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>

        {selectedDate && (
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Time Slot</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {timeSlots.map((slot) => (
                <button
                  key={slot.label}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-6 px-8 rounded-2xl text-lg font-medium transition-all shadow-md border-2 ${
                    selectedSlot?.label === slot.label
                      ? "bg-[#0B717A] text-white border-[#0B717A] shadow-xl scale-105"
                      : "bg-gray-50 text-gray-800 border-gray-300 hover:bg-[#0B717A] hover:text-white hover:border-[#0B717A]"
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {bookingError && (
          <div className="text-center text-red-600 font-medium text-lg bg-red-50 py-4 rounded-xl">
            {bookingError}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleProceedToPayment}
            disabled={!selectedDate || !selectedSlot || bookingLoading}
            className={`px-16 py-6 rounded-2xl text-2xl font-bold transition-all shadow-lg ${
              selectedDate && selectedSlot && !bookingLoading
                ? "bg-[#0B717A] text-white hover:bg-[#095A63] hover:scale-105 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {bookingLoading ? "Booking Slot..." : "Book Slot & Proceed to Payment"}
          </button>
          {!selectedDate && <p className="mt-4 text-red-600 font-medium">Please select a date first.</p>}
          {selectedDate && !selectedSlot && <p className="mt-4 text-red-600 font-medium">Please select a time slot.</p>}
        </div>
      </div>
    </div>
  );
};

export default HealthCheckupSlot;
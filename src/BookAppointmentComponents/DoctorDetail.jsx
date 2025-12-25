// src/BookAppointmentComponents/DoctorDetail.jsx
import React, { useEffect, useState } from "react";
import { FaUser, FaUsers, FaStethoscope, FaNotesMedical, FaCalendarCheck, FaStar, FaBriefcaseMedical, FaChevronRight, FaGraduationCap, FaUniversity, FaCheckCircle } from "react-icons/fa";

const DoctorDetail = ({ doctor, onContinue }) => {
  const [bookingFor, setBookingFor] = useState("self");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  /* ================= CHECK IF COMING FROM PATIENT LIST ================= */
  useEffect(() => {
    const appointmentData = JSON.parse(localStorage.getItem("appointmentData")) || {};

    if (appointmentData.fromPatientList && appointmentData.patientData) {
      setSelectedPatient(appointmentData.patientData);
      setBookingFor("others");

      // clear flag so it won't persist
      delete appointmentData.fromPatientList;
      localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    }
  }, []);

  /* ================= BOOKING TYPE CHANGE ================= */
  const handleBookingTypeChange = (type) => {
    setBookingFor(type);
    if (type === "self") setSelectedPatient(null);

    if (type === "others" && !selectedPatient) {
      onContinue({ for_user_type: "others" });
    }
  };

  /* ================= NEXT ================= */
  const handleNext = () => {
    if (!issue.trim()) {
      alert("Please enter issue");
      return;
    }
    if (bookingFor === "others" && !selectedPatient) {
      alert("Please select patient");
      return;
    }

    const appointmentData = {
      for_user_type: bookingFor,
      doctor_id: doctor.id,
      relative_id: bookingFor === "others" ? selectedPatient.relative_id : null,
      patientData: bookingFor === "others" ? selectedPatient : null,
      issue,
      description,
    };

    localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    onContinue({ for_user_type: "self" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <FaChevronRight className="mx-2 text-xs" />
            <span className="hover:text-blue-600 cursor-pointer">Doctors</span>
            <FaChevronRight className="mx-2 text-xs" />
            <span className="font-medium text-gray-700">Book Appointment</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Book Your Appointment</h1>
          <p className="text-gray-600 mt-1">Fill in the details below to schedule your consultation</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Doctor Profile Card */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{doctor.name}</h2>
                    <p className="text-blue-100">{doctor.spec}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-300" />
                      <span className="font-bold">{doctor.rating || "4.8"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-center -mt-16 mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <img src={doctor.photo || "/default-doctor.png"} alt={doctor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">{doctor.qual}</h3>
                  <p className="text-gray-600">{doctor.exp} years experience</p>
                </div>

                <div className="mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-gray-700">
                      Highly experienced specialist in Cardiologist with 12 years of practice.
                    </p>
                  </div>
                </div>

                {/* Qualifications */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaGraduationCap className="text-blue-600" />
                    Qualifications
                  </h3>
                  <div className="space-y-3 pl-1">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <span className="font-medium text-gray-700">Degree: </span>
                        <span className="text-gray-600">MBBS</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <span className="font-medium text-gray-700">Institution: </span>
                        <span className="text-gray-600">galgotias university</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <span className="font-medium text-gray-700">Completed: </span>
                        <span className="text-gray-600">2003</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Expertise */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaStethoscope className="text-teal-600" />
                    Skills & Expertise
                  </h3>
                  <div className="space-y-3 pl-1">
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-gray-700">Cardiologist (Beginner)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-gray-700">12 years experience</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <FaBriefcaseMedical className="text-blue-600" />
                      <span className="font-bold text-gray-800">{doctor.exp || "10"}+</span>
                    </div>
                    <p className="text-xs text-gray-600 text-center">Years Exp</p>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <FaUsers className="text-teal-600" />
                      <span className="font-bold text-gray-800">2.5k+</span>
                    </div>
                    <p className="text-xs text-gray-600 text-center">Patients</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Available Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              {/* Appointment For Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaUser className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Who is this appointment for?</h3>
                </div>

                <div className="flex gap-4">
                  {/* For Myself */}
                  <button
                    onClick={() => handleBookingTypeChange("self")}
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      bookingFor === "self"
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`p-2 rounded-full ${bookingFor === "self" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                      <FaUser />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">For Myself</div>
                      <div className="text-sm text-gray-500">Book for yourself</div>
                    </div>
                    {bookingFor === "self" && (
                      <div className="ml-auto bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</div>
                    )}
                  </button>

                  {/* For Someone Else */}
                  <button
                    onClick={() => handleBookingTypeChange("others")}
                    className={`flex-1 flex flex-col items-start justify-center p-4 rounded-xl border-2 transition-all ${
                      bookingFor === "others"
                        ? "border-teal-500 bg-teal-50 text-teal-700 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`p-2 rounded-full ${bookingFor === "others" ? "bg-teal-500 text-white" : "bg-gray-200"}`}>
                        <FaUsers />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-semibold">For Someone Else</div>
                        <div className="text-sm text-gray-500">Book for family/friend</div>
                        {selectedPatient && (
                          <div className="text-sm text-gray-700 mt-1 font-medium">
                            Selected: {selectedPatient.name}
                          </div>
                        )}
                      </div>
                      {selectedPatient && bookingFor === "others" && (
                        <div className="ml-auto bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</div>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Health Concern Section */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <FaStethoscope className="text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Health Concern</h3>
                  </div>
                  <input
                    type="text"
                    placeholder="What health issue are you facing? e.g., Fever, Back Pain, Headache"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-2 ml-1">Be specific for better diagnosis</p>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">Additional Details</label>
                  <textarea
                    placeholder="Describe your symptoms, when they started, severity, any medications you're taking, and other relevant information..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Optional but recommended</span>
                    <span>{description.length}/500</span>
                  </div>
                </div>
              </div>

              {/* Next Button Section */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Next Step</div>
                    <div className="font-semibold text-gray-800">Select Date & Time</div>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Step 1 of 3</div>
                </div>

                <button
                  onClick={handleNext}
                  className="group w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <FaCalendarCheck />
                  <span>Continue to Time Slot</span>
                  <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Your information is secure. By continuing, you agree to our{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">Terms</span> and{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Help/Support Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Need help?</div>
                    <div className="text-sm text-gray-600">Our team is here to assist you</div>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;

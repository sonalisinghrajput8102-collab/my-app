// src/pages/BookAppointment.jsx
import React, { useState, useEffect } from "react";
import Header from "../BookAppointmentComponents/Header";
import SpecialtyCard from "../BookAppointmentComponents/SpecialtyCard";
import DoctorCard from "../BookAppointmentComponents/DoctorCard";
import DoctorDetail from "../BookAppointmentComponents/DoctorDetail";
import Calendar from "../BookAppointmentComponents/Calendar";
import PaymentPage from "../pages/paymentpage";
import SuccessPage from "../pages/Receipt"; // Updated
import PatientList from "../BookAppointmentComponents/PatientList";
import ConsultationType from "../BookAppointmentComponents/ConsultationType";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const navigate = useNavigate(); // useNavigate hook for redirection
  const [page, setPage] = useState("specialties");

  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [consultationType, setConsultationType] = useState("");

  // Fetch specialties
  useEffect(() => {
    fetch("https://developer.bitmaxtest.com/api/skills")
      .then(res => res.json())
      .then(res => {
        if (res.success || res.status) {
          setSpecialties(
            res.data.map(s => ({
              id: s.id,
              name: s.skill,
              img: s.image || "https://via.placeholder.com/150",
            }))
          );
        }
      });
  }, []);

  // Fetch doctors
  useEffect(() => {
    if (page !== "doctors") return;

    fetch("https://developer.bitmaxtest.com/api/doctors")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setDoctors(
            res.data.map(d => ({
              id: d.id,
              name: d.name,
              spec: d.specialities[0]?.skill || "General",
              exp: d.specialities[0]?.years_of_experience || 0,
              photo: d.image,
              qual: d.qualifications?.map(q => q.degree).join(", "),
            }))
          );
        }
      });
  }, [page]);

  // Doctor click handler
  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    const data = JSON.parse(localStorage.getItem("appointmentData")) || {};
    data.doctor = doctor;
    localStorage.setItem("appointmentData", JSON.stringify(data));
    setPage("detail");
  };

  // Back handler
  const handleBack = () => {
    if (page === "doctors") setPage("specialties");
    else if (page === "detail") setPage("doctors");
    else if (page === "patientlist") setPage("detail");
    else if (page === "consultation") setPage("detail");
    else if (page === "booking") setPage("consultation");
    else if (page === "payment") setPage("booking");
  };

  // Reset booking flow
  const resetFlow = () => {
    localStorage.removeItem("appointmentData");
    setPage("specialties");
    setSelectedDoctor(null);
    setSelectedSpecialty(null);
    setSelectedDate("");
    setSelectedSlot("");
    setConsultationType("");
    navigate("/my-appointments"); // redirect to MyAppointments page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={
          page === "specialties"
            ? "Select Specialty"
            : page === "doctors"
            ? "Doctors"
            : page === "detail"
            ? "Doctor Details"
            : page === "patientlist"
            ? "My Patients"
            : page === "consultation"
            ? "Select Consultation Type"
            : page === "booking"
            ? "Select Date & Time"
            : page === "payment"
            ? "Payment"
            : "Success"
        }
        onBack={page === "specialties" ? undefined : handleBack}
      />

      <div className="container mx-auto px-4 py-6">
        {/* Specialties */}
        {page === "specialties" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specialties.map(s => (
              <SpecialtyCard
                key={s.id}
                name={s.name}
                img={s.img}
                onClick={() => {
                  setSelectedSpecialty(s.name);
                  setPage("doctors");
                }}
              />
            ))}
          </div>
        )}

        {/* Doctors */}
        {page === "doctors" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors
              .filter(d => (selectedSpecialty ? d.spec === selectedSpecialty : true))
              .map(doc => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  onClick={() => handleDoctorClick(doc)}
                />
              ))}
          </div>
        )}

        {/* Doctor Detail */}
        {page === "detail" && selectedDoctor && (
          <DoctorDetail
            doctor={selectedDoctor}
            onContinue={(data) => {
              setConsultationType(data?.consultation_type || "");
              if (data?.for_user_type === "others") {
                setPage("patientlist");
              } else {
                setPage("consultation");
              }
            }}
          />
        )}

        {/* Patient List */}
        {page === "patientlist" && (
          <PatientList onPatientSelect={() => setPage("consultation")} />
        )}

        {/* Consultation Type */}
        {page === "consultation" && (
          <ConsultationType
            onContinue={(type) => {
              setConsultationType(type);
              setPage("booking");
            }}
          />
        )}

        {/* Calendar */}
        {page === "booking" && (
          <Calendar
            doctorId={selectedDoctor?.id}
            onConfirm={({ date, slot }) => {
              setSelectedDate(date);
              setSelectedSlot(slot);
              const data = JSON.parse(localStorage.getItem("appointmentData")) || {};
              data.date = date;
              data.slot = typeof slot === "string" ? slot : `${slot.start} - ${slot.end}`;
              data.consultation_type = consultationType;
              localStorage.setItem("appointmentData", JSON.stringify(data));
              setPage("payment");
            }}
          />
        )}

        {/* Payment */}
        {page === "payment" && (
          <PaymentPage
            doctor={selectedDoctor}
            date={selectedDate}
            slot={selectedSlot}
            consultation_type={consultationType}
            onPaymentSuccess={() => setPage("success")}
          />
        )}

        {/* Success */}
        {page === "success" && (
          <SuccessPage onAddMore={resetFlow} />
        )}
      </div>
    </div>
  );
};

export default BookAppointment;

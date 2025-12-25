// src/pages/DoctorsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import DoctorDetail from "../BookAppointmentComponents/DoctorDetail";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    axios
      .get("https://developer.bitmaxtest.com/api/doctors")
      .then((res) => {
        if (res.data.success) {
          setDoctors(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Agar user ne kisi doctor pe click kiya → detail show karo
  if (selectedDoctor) {
    const doctor = selectedDoctor;
    return (
      <div className="p-4">
        <button
          onClick={() => setSelectedDoctor(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to Doctors
        </button>
        <DoctorDetail
          doctor={{
            name: doctor.name,
            spec: doctor.specialities[0]?.skill || "",
            exp: doctor.specialities[0]?.years_of_experience || 0,
            photo: doctor.image,
            qual: doctor.qualifications.map((q) => q.degree).join(", "),
            clinic: "Clinic info",
            dist: "Distance info",
            about: "About info",
            fee: "Fee info",
          }}
          onContinue={() => alert("Continue Booking")}
        />
      </div>
    );
  }

  // Doctor list
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doc) => (
        <DoctorCard
          key={doc.id}
          doctor={{
            name: doc.name,
            spec: doc.specialities[0]?.skill || "",
            exp: doc.specialities[0]?.years_of_experience || 0,
            photo: doc.image,
            qual: doc.qualifications.map((q) => q.degree).join(", "),
            clinic: "Clinic info",
            dist: "Distance info",
            next: "Next slot",
            about: "About info",
            fee: "Fee info",
          }}
          onClick={() => setSelectedDoctor(doc)}
        />
      ))}
    </div>
  );
};

export default DoctorsPage;

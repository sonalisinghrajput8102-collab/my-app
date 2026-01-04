// src/pages/BookAppointment.jsx
import React, { useState } from 'react';
import Header from '../BookAppointmentComponents/Header';
import SearchBar from '../BookAppointmentComponents/SearchBar';
import SpecialtyCard from '../BookAppointmentComponents/SpecialtyCard';
import DoctorCard from '../BookAppointmentComponents/DoctorCard';
import DoctorDetail from '../BookAppointmentComponents/DoctorDetail';
import PatientForm from '../BookAppointmentComponents/PatientForm';
import Calendar from '../BookAppointmentComponents/Calendar';
import PaymentPage from './paymentpage';
import SuccessPage from './Receipt';

import Specialties from '../data/specialties';
import { doctorsDB } from '../data/doctors';

const BookAppointment = () => {
  const [page, setPage] = useState('specialties');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const goBack = () => {
    if (page === 'doctors') setPage('specialties');
    else if (page === 'detail') setPage('doctors');
    else if (page === 'patient') setPage('detail');
    else if (page === 'booking') setPage('detail');
    else if (page === 'payment') setPage('booking');
    else if (page === 'success') setPage('payment');
  };

  const handleSpecialtyClick = (specName) => {
    setSelectedSpecialty(specName);
    setPage('doctors');
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setPage('detail');
  };

  const handleContinueToCalendar = () => {
    setPage('booking');
  };

  const handleConfirmBooking = (booking) => {
    const date = booking?.date || selectedDate;
    const slot = booking?.slot || selectedSlot;

    if (!date || !slot) {
      alert('Please select date and time');
      return;
    }

    if (booking) {
      setSelectedDate(date);
      setSelectedSlot(slot);
    }

    setPage('payment');
  };

  const handlePaymentSuccess = () => {
    setPage('success');
  };

  const handleAddMoreServices = () => {
    // Reset everything and go back to specialties (home)
    setPage('specialties');
    setSelectedSpecialty(null);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pb-20">
      <Header
        title={
          page === 'specialties' ? 'Select Specialty' :
          page === 'doctors' ? 'Doctors Near You' :
          page === 'detail' ? 'Doctor Details' :
          page === 'patient' ? 'Patient Details' :
          page === 'booking' ? 'Select Date & Time' :
          page === 'payment' ? 'Complete Payment' :
          'Appointment Confirmed'
        }
        onBack={page === 'specialties' ? () => window.history.back() : goBack}
      />

      <div className="container mx-auto px-4 pt-4">
        {/* Specialties */}
        {page === 'specialties' && (
          <>
            <SearchBar placeholder="Search by Doctor, Specialty..." />
            <Specialties />
          </>
        )}

        {/* Doctors */}
        {page === 'doctors' && (
          <>
            <div className="flex gap-3 flex-wrap my-4">
              <button className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium">Availability</button>
              <button className="px-4 py-2 bg-gray-100 rounded-full font-medium">Timeslot</button>
              <button className="px-4 py-2 bg-gray-100 rounded-full font-medium">Experience</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctorsDB.map((doctor) => (
                <DoctorCard
                  key={doctor.name}
                  doctor={doctor}
                  onClick={() => handleDoctorClick(doctor)}
                />
              ))}
            </div>
          </>
        )}

        {/* Doctor Detail */}
        {page === 'detail' && (
          <DoctorDetail
            doctor={selectedDoctor}
            onContinue={handleContinueToCalendar}
          />
        )}

        {/* Calendar */}
        {page === 'booking' && (
          <Calendar
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onDateSelect={setSelectedDate}
            onSlotSelect={setSelectedSlot}
            onConfirm={handleConfirmBooking}
            doctorId={selectedDoctor?.id}
          />
        )}

        {/* Payment Page */}
        {page === 'payment' && (
          <PaymentPage
            doctor={selectedDoctor}
            date={selectedDate}
            slot={selectedSlot}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {/* Success Page (Receipt) */}
        {page === 'success' && (
          <SuccessPage
            doctor={selectedDoctor}
            date={selectedDate}
            slot={selectedSlot}
            appointmentId="APT-67850" // Tum dynamically generate kar sakte ho
            onAddMore={handleAddMoreServices}
          />
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
import { useState, useEffect } from 'react';

const IncomingCallPopup = ({ appointment, onAccept, onReject, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!appointment) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-reject after timeout
          onReject();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [appointment, onReject]);

  if (!appointment) return null;

  // Get caller info from customData or appointment
  const customData = appointment.customData || {};
  const isDoctor = currentUser?.user_type === 'doctor';
  
  let callerName = 'Caller';
  let callerImage = '';
  let appointmentDate = appointment.appointment_date || appointment.customData?.appointmentDate;
  let appointmentTime = appointment.appointment_time || appointment.customData?.appointmentTime;

  if (isDoctor) {
    // Doctor is receiving call from patient
    callerName = customData.patientName || appointment.patient?.name || 'Patient';
    callerImage = customData.patientImage || appointment.patient?.image || '';
  } else {
    // Patient is receiving call from doctor
    callerName = customData.doctorName || appointment.doctor?.name || 'Doctor';
    callerImage = customData.doctorImage || appointment.doctor?.image || '';
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 999,
        textAlign: 'center',
        minWidth: '350px',
      }}
    >
      <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>📞 Incoming Call</h2>
      
      {/* Caller Profile Image */}
      {callerImage && (
        <div style={{ marginBottom: '15px' }}>
          <img 
            src={callerImage} 
            alt={callerName}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #4CAF50',
            }}
          />
        </div>
      )}

      <p style={{ fontSize: '20px', margin: '15px 0', color: '#333', fontWeight: 'bold' }}>
        {callerName}
      </p>

      <p style={{ fontSize: '14px', margin: '10px 0', color: '#999' }}>
        {isDoctor ? '👤 Patient' : '👨‍⚕️ Doctor'}
      </p>

      {appointmentDate && appointmentTime && (
        <p style={{ fontSize: '13px', margin: '10px 0', color: '#999' }}>
          📅 {appointmentDate} ⏰ {appointmentTime}
        </p>
      )}

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '15px', marginTop: '20px' }}>
        <button
          onClick={onAccept}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Accept
        </button>

        <button
          onClick={onReject}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#da190b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
        >
          Reject
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
        Auto-reject in {timeLeft} seconds
      </p>
    </div>
  );
};

export default IncomingCallPopup;

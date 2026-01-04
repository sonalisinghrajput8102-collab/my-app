import { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';

const VideoCallUIKit = ({ appointment, currentUser, onEndCall, isDoctorInvited, onCallInitiated }) => {
  const containerRef = useRef(null);
  const zpRef = useRef(null);
  const [error, setError] = useState(null);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    if (!appointment || !currentUser || !containerRef.current) {
      console.warn('VideoCallUIKit: Missing required props');
      return;
    }

    // Get parameters from props
    const roomID = String(appointment.appointment_id || appointment.id || '').trim();
    const userID = String(currentUser.id || '').trim();
    const userName = String(currentUser.name || '').trim();

    // Validate parameters
    if (!roomID || !userID || !userName) {
      console.error('VideoCallUIKit: Missing required parameters:', { roomID, userID, userName });
      setError('Missing appointment or user information');
      return;
    }

    // Use credentials from .env (from Zego Cloud Console)
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      console.error('VideoCallUIKit: Zego credentials not in .env');
      setError('Zego credentials not configured in .env');
      return;
    }

    let isMounted = true;
    let callTimeout = null;

    const initZego = async () => {
      if (!isMounted) return;

      try {
        console.log('🔄 Initializing Zego UIKit...');
        console.log('Room ID:', roomID, 'User ID:', userID, 'User Name:', userName);
        console.log('App ID:', appID);

        // Generate Kit Token using frontend-only method
        console.log('📡 Generating token...');
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          userID,
          userName
        );

        if (!kitToken) {
          throw new Error('Failed to generate Kit Token');
        }

        console.log('✅ Kit Token generated');
        setCalling(true);

        // Create Zego instance
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp;

        console.log('✅ Zego UIKit created');

        // Add ZIM plugin for call invitations
        zp.addPlugins({ ZIM });

        // Set up call invitation config for receiving calls
        zp.setCallInvitationConfig({
          onCallInvitationSent: () => {
            console.log('📤 Call invitation sent successfully');
          },
          onCallInvitationReceived: () => {
            // Handled by CallInvitationHandler component instead
          },
          onCallInvitationAccepted: (callID, callee) => {
            console.log('✅ Call accepted by:', callee?.userName);
          },
          onCallInvitationRejected: (callID, callee) => {
            console.log('❌ Call rejected by:', callee?.userName);
          },
        });

        const doctorID = appointment.doctor?.id || appointment.doctor_id;
        const doctorName = appointment.doctor?.name || appointment.doctor_name || 'Doctor';
        const doctorImage = appointment.doctor?.image || appointment.doctor?.profile_image || '';
        const patientID = appointment.patient?.id || currentUser?.id;
        const patientName = appointment.patient?.name || currentUser?.name || 'Patient';
        const patientImage = appointment.patient?.image || currentUser?.image || '';
        const isDoctor = currentUser.user_type === 'doctor';
        
        console.log('📞 Call initiated with:', isDoctor ? patientName : doctorName);
        console.log('📞 Caller is:', isDoctor ? 'Doctor' : 'Patient');
        console.log('🔍 Doctor Details - ID:', doctorID, 'Name:', doctorName, 'Image:', doctorImage);
        console.log('🔍 Patient Details - ID:', patientID, 'Name:', patientName, 'Image:', patientImage);

        // Send call invitation to the other party
        if (!isDoctor && doctorID) {
          // Patient calling doctor
          const doctorUserID = String(doctorID).trim();
          
          console.log('═══════════════════════════════════════════════════════');
          console.log('📤 SENDING CALL INVITATION TO DOCTOR');
          console.log('═══════════════════════════════════════════════════════');
          console.log('🎯 Recipient Details:');
          console.log('   ID:', doctorUserID);
          console.log('   Name:', doctorName);
          console.log('📋 Invitation Data:');
          console.log('   Appointment ID:', appointment.appointment_id);
          console.log('   Date:', appointment.appointment_date);
          console.log('   Time:', appointment.appointment_time);
          console.log('   Caller (You): ID', userID, '|', userName);
          
          zp.sendCallInvitation({
            callees: [{ userID: doctorUserID, userName: doctorName }],
            callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
            timeout: 45,
            data: JSON.stringify({
              appointmentID: appointment.appointment_id,
              appointmentDate: appointment.appointment_date,
              appointmentTime: appointment.appointment_time,
              patientName: patientName,
              patientID: String(patientID),
              patientImage: patientImage,
              doctorName: doctorName,
              doctorID: String(doctorID),
              doctorImage: doctorImage,
              callerType: 'patient',
              callerID: String(userID),
            }),
          }).then(() => {
            console.log('═══════════════════════════════════════════════════════');
            console.log('✅ CALL INVITATION SENT TO DOCTOR');
            console.log('   Doctor should see popup in 1-3 seconds');
            console.log('═══════════════════════════════════════════════════════');
          }).catch((err) => {
            console.log('═══════════════════════════════════════════════════════');
            console.error('❌ FAILED TO SEND CALL INVITATION');
            console.error('═══════════════════════════════════════════════════════');
            console.error('❌ Error Code:', err?.code);
            console.error('❌ Error Message:', err?.message);
            console.error('');
            console.error('🔍 TROUBLESHOOTING:');
            console.error('   1. Is doctor logged in? Check doctor\'s browser');
            console.error('   2. Does doctor\'s console show "USER NOW REGISTERED IN ZEGO"?');
            console.error('   3. Is doctor on MyAppointments page?');
            console.error('   4. Doctor ID in database:', doctorUserID);
            console.error('   5. Doctor Name in appointment:', doctorName);
            console.error('');
            console.error('⚠️ If error 107026 or 6000281:');
            console.error('   Doctor with ID', doctorUserID, 'is NOT registered in Zego');
            console.error('   Solution: Doctor must log in and initialize CallInvitationHandler');
            console.error('═══════════════════════════════════════════════════════');
            setError(`Failed to call doctor: ${err?.message || 'Unknown error'}. Doctor may not be registered.`);
          });
        } else if (isDoctor && patientID) {
          // Doctor calling patient
          const patientUserID = String(patientID).trim();
          
          console.log('═══════════════════════════════════════════════════════');
          console.log('📤 SENDING CALL INVITATION TO PATIENT');
          console.log('═══════════════════════════════════════════════════════');
          console.log('🎯 Recipient Details:');
          console.log('   ID:', patientUserID);
          console.log('   Name:', patientName);
          console.log('📋 Invitation Data:');
          console.log('   Appointment ID:', appointment.appointment_id);
          console.log('   Date:', appointment.appointment_date);
          console.log('   Time:', appointment.appointment_time);
          console.log('   Caller (You): ID', userID, '|', userName);
          
          zp.sendCallInvitation({
            callees: [{ userID: patientUserID, userName: patientName }],
            callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
            timeout: 45,
            data: JSON.stringify({
              appointmentID: appointment.appointment_id,
              appointmentDate: appointment.appointment_date,
              appointmentTime: appointment.appointment_time,
              doctorName: doctorName,
              doctorID: String(doctorID),
              doctorImage: doctorImage,
              patientName: patientName,
              patientID: String(patientID),
              patientImage: patientImage,
              callerType: 'doctor',
              callerID: String(userID),
            }),
          }).then(() => {
            console.log('═══════════════════════════════════════════════════════');
            console.log('✅ CALL INVITATION SENT TO PATIENT');
            console.log('   Patient should see popup in 1-3 seconds');
            console.log('═══════════════════════════════════════════════════════');
          }).catch((err) => {
            console.log('═══════════════════════════════════════════════════════');
            console.error('❌ FAILED TO SEND CALL INVITATION');
            console.error('═══════════════════════════════════════════════════════');
            console.error('❌ Error Code:', err?.code);
            console.error('❌ Error Message:', err?.message);
            console.error('');
            console.error('🔍 TROUBLESHOOTING:');
            console.error('   1. Is patient logged in? Check patient\'s browser');
            console.error('   2. Does patient\'s console show "USER NOW REGISTERED IN ZEGO"?');
            console.error('   3. Is patient on MyAppointments page?');
            console.error('   4. Patient ID in database:', patientUserID);
            console.error('   5. Patient Name in appointment:', patientName);
            console.error('');
            console.error('⚠️ If error 107026 or 6000281:');
            console.error('   Patient with ID', patientUserID, 'is NOT registered in Zego');
            console.error('   Solution: Patient must log in and initialize CallInvitationHandler');
            console.error('═══════════════════════════════════════════════════════');
            setError(`Failed to call patient: ${err?.message || 'Unknown error'}. Patient may not be registered.`);
          });
        }

        // Notify MyAppointments that call has been initiated (for local UI feedback)
        if (onCallInitiated) {
          setTimeout(() => {
            onCallInitiated(appointment, currentUser);
          }, 500);
        }

        // If doctor hasn't accepted after 45 seconds, show timeout message
        if (!isDoctorInvited) {
          callTimeout = setTimeout(() => {
            if (isMounted) {
              setError('Doctor did not accept the call. Please try again later.');
              setCalling(false);
            }
          }, 45000);
        }

        // Join the room with Zego Cloud config
        await zp.joinRoom({
          container: containerRef.current,
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: false,
          showUserList: true,
          maxUsers: 2,
          layout: 'Auto',
          showLayoutButton: false,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          onLeaveRoom: () => {
            console.log('✅ Left room successfully');
            if (onEndCall) {
              onEndCall();
            }
          },
        });

        console.log('✅ Successfully joined room:', roomID);
        setError(null);
      } catch (error) {
        console.error('❌ Zego error:', error.message);
        setError(`Video call failed: ${error.message}`);
      }
    };

    initZego();

    return () => {
      isMounted = false;
      if (callTimeout) clearTimeout(callTimeout);
      if (zpRef.current && typeof zpRef.current.destroy === 'function') {
        try {
          zpRef.current.destroy();
          zpRef.current = null;
          console.log('🔴 Zego instance cleaned up');
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
    };
  }, [appointment, currentUser, onEndCall, isDoctorInvited, onCallInitiated]);

  if (error) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          color: '#fff',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2>❌ Call Not Connected</h2>
          <p>{error}</p>
          <p style={{ marginTop: '20px', fontSize: '14px', color: '#ccc' }}>
            {calling ? 'Waiting for doctor to accept...' : 'Try scheduling another appointment'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        backgroundColor: '#000',
      }}
    />
  );
};

export default VideoCallUIKit;
  
import { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';

const CallInvitationHandler = ({ currentUser, onCallInvited, onCallEnded }) => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [callTimeout, setCallTimeout] = useState(null);
  const zpRef = useRef(null);

  useEffect(() => {
    if (!currentUser) {
      console.error('❌ CallInvitationHandler: No current user provided');
      return;
    }

    // Get Zego credentials
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    console.log('═══════════════════════════════════════════════════════');
    console.log('📞 CALL INVITATION HANDLER STARTUP');
    console.log('═══════════════════════════════════════════════════════');

    if (!appID || !serverSecret) {
      console.error('❌ Missing .env credentials');
      console.error('   VITE_ZEGO_APP_ID:', appID);
      console.error('   VITE_ZEGO_SERVER_SECRET:', serverSecret ? '***' : 'MISSING');
      return;
    }

    const userID = String(currentUser.id || '').trim();
    const userName = String(currentUser.name || '').trim();
    const userType = currentUser.user_type || currentUser.role || 'unknown';

    console.log('✅ Credentials Found:');
    console.log('   App ID:', appID);
    console.log('   User ID:', userID);
    console.log('   User Name:', userName);
    console.log('   User Type:', userType);

    if (!userID || !userName) {
      console.error('❌ Missing user data');
      console.error('   UserID:', userID || 'MISSING');
      console.error('   UserName:', userName || 'MISSING');
      return;
    }

    console.log('📡 Generating Kit Token...');
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      'call_invite',
      userID,
      userName
    );

    if (!kitToken) {
      console.error('❌ Failed to generate kit token');
      return;
    }

    console.log('✅ Kit Token Generated');

    // Create Zego instance for call invitations
    console.log('🔧 Creating Zego instance...');
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    console.log('✅ Zego Instance Created');

    // Add ZIM plugin for signaling
    console.log('🔧 Adding ZIM plugin...');
    try {
      zp.addPlugins({ ZIM });
      console.log('✅ ZIM Plugin Added Successfully');
    } catch (err) {
      console.error('❌ Failed to add ZIM plugin:', err);
      return;
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ USER NOW REGISTERED IN ZEGO - READY TO RECEIVE CALLS');
    console.log('   UserID:', userID);
    console.log('   UserName:', userName);
    console.log('═══════════════════════════════════════════════════════');

    // Set up call invitation config to receive incoming calls
    console.log('🎧 Setting up call invitation listeners...');
    zp.setCallInvitationConfig({
      onCallInvitationReceived: (callID, caller, callUserList, customData) => {
        console.log('═══════════════════════════════════════════════════════');
        console.log('🎉 INCOMING CALL RECEIVED!');
        console.log('═══════════════════════════════════════════════════════');
        console.log('📞 From:', caller?.userName || 'Unknown');
        console.log('📍 Caller ID:', caller?.userID);
        console.log('🔑 Call ID:', callID);
        
        // Parse custom data if provided
        let appointmentData = null;
        try {
          if (customData) {
            console.log('📦 Raw Custom Data:', customData);
            appointmentData = typeof customData === 'string' ? JSON.parse(customData) : customData;
            console.log('✅ Parsed Appointment Data:');
            console.log('   Appointment ID:', appointmentData?.appointmentID);
            console.log('   Date:', appointmentData?.appointmentDate);
            console.log('   Time:', appointmentData?.appointmentTime);
            console.log('   Caller Type:', appointmentData?.callerType);
          }
        } catch (err) {
          console.error('❌ Failed to parse custom data:', err);
        }

        // Set incoming call state with proper data
        const incomingCallData = {
          callID,
          caller,
          callerName: caller?.userName || 'Caller',
          callerID: caller?.userID,
          customData: appointmentData,
        };

        console.log('═══════════════════════════════════════════════════════');
        console.log('🔔 SHOWING INCOMING CALL POPUP');
        console.log('═══════════════════════════════════════════════════════');
        setIncomingCall(incomingCallData);

        // Trigger callback
        if (onCallInvited) {
          console.log('📤 Triggering onCallInvited callback');
          onCallInvited(incomingCallData);
        }

        // Set 30-second timeout for auto-rejection
        const timeout = setTimeout(() => {
          console.log('⏱️ 30-second timeout - auto-rejecting call');
          setIncomingCall(null);
          // Auto-reject after timeout
          try {
            if (zp && zp.refuseCallInvitation) {
              zp.refuseCallInvitation(callID, caller);
            }
          } catch (err) {
            console.error('Error auto-rejecting call:', err);
          }
        }, 30000);

        setCallTimeout(timeout);
      },

      onCallInvitationCanceled: (callID, caller) => {
        console.log('❌ Call cancelled by:', caller?.userName);
        setIncomingCall(null);
        if (callTimeout) clearTimeout(callTimeout);
      },

      onCallInvitationTimeout: () => {
        console.log('⏰ Call invitation timed out from server');
        setIncomingCall(null);
        if (callTimeout) clearTimeout(callTimeout);
      },

      onCallInvitationEnded: (callID, reason) => {
        console.log('📞 Call ended:', reason);
        setIncomingCall(null);
        if (callTimeout) clearTimeout(callTimeout);
        if (onCallEnded) {
          onCallEnded();
        }
      },
    });

    return () => {
      if (callTimeout) clearTimeout(callTimeout);
      if (zpRef.current && typeof zpRef.current.destroy === 'function') {
        try {
          zpRef.current.destroy();
          zpRef.current = null;
          console.log('🔴 Call invitation handler cleaned up');
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
    };
  }, [currentUser, onCallInvited, onCallEnded, callTimeout]);

  return incomingCall ? (
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
      <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>📞 Incoming Call</h2>
      <p style={{ fontSize: '18px', margin: '15px 0', color: '#666' }}>
        <strong>{incomingCall.callerName}</strong> is calling...
      </p>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          onClick={() => {
            console.log('✅ Call accepted');
            setIncomingCall(null);
            if (callTimeout) clearTimeout(callTimeout);
          }}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Accept
        </button>

        <button
          onClick={() => {
            console.log('❌ Call rejected');
            setIncomingCall(null);
            if (callTimeout) clearTimeout(callTimeout);
          }}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Reject
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#999', marginTop: '15px' }}>
        Call will automatically reject in 30 seconds
      </p>
    </div>
  ) : null;
};

export default CallInvitationHandler;

import { useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const CallInvitationHandler = ({ currentUser, onCallInvited, onCallEnded }) => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [callTimeout, setCallTimeout] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    // Get Zego credentials
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) return;

    console.log('📞 Call Invitation Handler initialized for:', currentUser.name);

    // Generate token for listening to call invitations
    const userID = String(currentUser.id || '').trim();
    const userName = String(currentUser.name || '').trim();

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      'call_invite',
      userID,
      userName
    );

    if (!kitToken) return;

    // Create Zego instance for call invitations
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Set up call invitation config
    zp.setCallInvitationConfig({
      onCallInvitationReceived: (callID, caller, callUserList, customData) => {
        console.log('📱 Incoming call from:', caller);
        console.log('Call ID:', callID);

        // Set incoming call state
        setIncomingCall({
          callID,
          caller,
          callerName: caller.userName,
          callerID: caller.userID,
          customData,
        });

        // Trigger callback
        if (onCallInvited) {
          onCallInvited({
            callID,
            caller,
            callerName: caller.userName,
          });
        }

        // Set 30-second timeout
        const timeout = setTimeout(() => {
          console.log('⏱️ Call invitation timeout - no response');
          setIncomingCall(null);
          // Auto-reject after timeout
          zp.refuseCallInvitation(callID, caller);
        }, 30000);

        setCallTimeout(timeout);
      },

      onCallInvitationCanceled: (callID, caller) => {
        console.log('❌ Call cancelled by:', caller.userName);
        setIncomingCall(null);
        if (callTimeout) clearTimeout(callTimeout);
      },

      onCallInvitationTimeout: (callID, caller) => {
        console.log('⏰ Call invitation timed out');
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
      zp.destroy();
    };
  }, [currentUser, onCallInvited, onCallEnded]);

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

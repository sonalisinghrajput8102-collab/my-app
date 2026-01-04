import { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCallUIKit = ({ appointment, currentUser, onEndCall, isDoctorInvited }) => {
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
  }, [appointment, currentUser, onEndCall, isDoctorInvited]);

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
  
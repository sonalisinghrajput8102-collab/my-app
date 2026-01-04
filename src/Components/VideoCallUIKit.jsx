import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCallUIKit = ({ appointment, currentUser, onEndCall }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!appointment || !currentUser) {
      console.error("Appointment or currentUser missing");
      return;
    }

    const roomID = appointment.appointment_id;
    const userID = currentUser.id;
    const userName = currentUser.name;

    if (!roomID || !userID || !userName) {
      console.error("Missing required data: roomID, userID, userName", { roomID, userID, userName });
      return;
    }

    // VITE env variables
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      console.error("ZEGO ENV missing", { appID, serverSecret });
      return;
    }

    // Generate Kit Token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    if (!kitToken) {
      console.error("Failed to generate kit token");
      return;
    }

    // Create Zego instance
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (!zp) {
      console.error("Failed to create Zego instance");
      return;
    }

    // Join the room
    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, 
      },
      onLeaveRoom: onEndCall, 
    });

    // Cleanup on unmount
    return () => {
      if (zp && typeof zp.destroy === 'function') {
        zp.destroy();
      }
    };
  }, [appointment, currentUser, onEndCall]); 

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default VideoCallUIKit;

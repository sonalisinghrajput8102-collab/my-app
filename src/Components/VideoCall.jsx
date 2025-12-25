import React, { useEffect, useRef, useState, useMemo } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhone,
} from "react-icons/fa";

const VideoCall = ({ appointment, onEndCall, currentUser }) => {
  // Check if this is a video call or voice call
  const isVideoCall = (appointment?.subtype || "").toLowerCase().includes("video");

  const zgRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRefs = useRef({});

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(isVideoCall);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================== ZEGO CONFIG ================== */
  const appID = 724789503; // ✅ MUST be number

  const roomID =
    appointment?.appointment_code ||
    String(appointment?.appointment_id || "");

  // ✅ SELF vs RELATIVE USER ID LOGIC (FIXED)
  const rawUserID =
    appointment?.for_user_type === "relative"
      ? appointment?.relative_id
      : currentUser?.id;

  // 🔒 ZEGO DOES NOT ALLOW EMPTY USERID
  const userID = useMemo(() => rawUserID
    ? String(rawUserID)
    : `user_${Math.random().toString(36).substr(2, 9)}`, []);

  const userName =
    appointment?.for_user_type === "relative"
      ? appointment?.relative_name || "Relative"
      : currentUser?.name || "User";

  /* ================== INIT ZEGO ================== */
  useEffect(() => {
    if (!roomID || !userID) {
      setError("Missing room or user information");
      setLoading(false);
      return;
    }

    if (zgRef.current) return; // prevent double init (React strict mode)

    const initZego = async () => {
      try {
        console.log("ZEGO INIT DATA", {
          appID,
          roomID,
          userID,
          userName,
          userType: appointment?.for_user_type,
        });

        const zg = new ZegoExpressEngine(appID);
        zgRef.current = zg;

        // Fetch token from server
        const tokenResponse = await fetch('http://localhost:5000/api/zego-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID, roomID }),
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to get authentication token');
        }

        const { token } = await tokenResponse.json();

        await zg.loginRoom(
          roomID,
          token,
          { userID, userName },
          { userUpdate: true }
        );

        const localStream = await zg.createStream({
          camera: {
            audio: true,
            video: appointment?.subtype
              ?.toLowerCase()
              .includes("video"),
          },
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        const streamID = `stream_${userID}`;
        await zg.startPublishingStream(streamID, localStream);

        // 🔔 Remote streams
        zg.on("roomStreamUpdate", (roomID, updateType, streamList) => {
          if (updateType === "ADD") {
            setRemoteUsers((prev) => [
              ...prev,
              ...streamList.map((s) => ({
                streamID: s.streamID,
                userID: s.user.userID,
              })),
            ]);
          }

          if (updateType === "DELETE") {
            setRemoteUsers((prev) =>
              prev.filter(
                (u) =>
                  !streamList.some((s) => s.streamID === u.streamID)
              )
            );
          }
        });

        setLoading(false);
      } catch (err) {
        console.error("ZEGO INIT FAILED", err);
        setError("Video call initialization failed");
        setLoading(false);
      }
    };

    initZego();

    return () => {
      if (zgRef.current) {
        zgRef.current.logoutRoom(roomID);
        zgRef.current.destroyEngine();
        zgRef.current = null;
      }
    };
  }, []);

  /* ================== CONTROLS ================== */
  const toggleMic = async () => {
    if (!zgRef.current) return;
    await zgRef.current.muteMicrophone(isMicOn);
    setIsMicOn((p) => !p);
  };

  const toggleVideo = async () => {
    if (!zgRef.current) return;
    await zgRef.current.muteVideo(isVideoOn);
    setIsVideoOn((p) => !p);
  };

  const endCall = () => {
    if (zgRef.current) {
      zgRef.current.logoutRoom(roomID);
      zgRef.current.destroyEngine();
      zgRef.current = null;
    }
    onEndCall();
  };

  /* ================== UI ================== */
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
        Initializing {isVideoCall ? "video call" : "voice call"}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-red-400">
        {error.replace("Video call", isVideoCall ? "video call" : "voice call")}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <div>
          <h3 className="font-semibold">{isVideoCall ? "Video Call" : "Voice Call"}</h3>
          <p className="text-sm opacity-70">Room: {roomID}</p>
        </div>
        <button
          onClick={endCall}
          className="bg-red-600 px-4 py-2 rounded"
        >
          End
        </button>
      </div>

      {/* Videos or Audio UI */}
      {isVideoCall ? (
        <div className="flex-1 grid grid-cols-3 gap-4 p-4">
          {/* Local */}
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="bg-gray-800 rounded"
          />

          {/* Remote */}
          {remoteUsers.map((u) => (
            <video
              key={u.streamID}
              ref={(el) => {
                if (el && !remoteVideoRefs.current[u.streamID]) {
                  remoteVideoRefs.current[u.streamID] = el;
                  zgRef.current
                    .startPlayingStream(u.streamID)
                    .then((stream) => (el.srcObject = stream));
                }
              }}
              autoPlay
              playsInline
              className="bg-gray-800 rounded"
            />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">📞</div>
            <h4 className="text-xl font-semibold mb-2">Voice Call in Progress</h4>
            <p className="text-gray-300">Connected participants: {remoteUsers.length + 1}</p>
          </div>
          {/* Hidden audio element for local stream */}
          <audio
            ref={localVideoRef}
            autoPlay
            muted
            className="hidden"
          />
          {/* Hidden audio elements for remote streams */}
          {remoteUsers.map((u) => (
            <audio
              key={u.streamID}
              ref={(el) => {
                if (el && !remoteVideoRefs.current[u.streamID]) {
                  remoteVideoRefs.current[u.streamID] = el;
                  zgRef.current
                    .startPlayingStream(u.streamID)
                    .then((stream) => (el.srcObject = stream));
                }
              }}
              autoPlay
              className="hidden"
            />
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-4 p-4 bg-gray-900">
        <button onClick={toggleMic} className="p-3 bg-gray-700 rounded-full">
          {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>

        {isVideoCall && (
          <button
            onClick={toggleVideo}
            className="p-3 bg-gray-700 rounded-full"
          >
            {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
          </button>
        )}

        <button onClick={endCall} className="p-3 bg-red-600 rounded-full">
          <FaPhone />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;

import React from "react";
import { FaAndroid } from "react-icons/fa";

const FloatingDownloadButton = () => {
  return (
    <a
      href="https://github.com/abhishekbitmax-ops/Hospital_app/releases/download/Hospital/app-release.apk"
      className="fixed left-0 top-[85%] -translate-y-1/2 z-50"
      download
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="flex items-center gap-3 px-4 py-3
        bg-white text-gray-900
        border border-gray-300
        shadow-md
        rounded-r-xl
        hover:bg-gray-100 hover:pl-6
        transition-all duration-300"
      >
        {/* APK Icon */}
        <FaAndroid className="text-xl" style={{ color: "#0B717A" }} />

        {/* Text */}
        <span className="text-sm font-semibold whitespace-nowrap">
          Download APK
        </span>
      </div>
    </a>
  );
};

export default FloatingDownloadButton;

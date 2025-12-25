import React from "react";

const ScrollingText = () => {
  const texts = [
    "Welcome to our Hospital — Your Health, Our Priority",
    "Book Appointments Easily and Get Instant Reports",
    "24/7 Emergency Services Available",
    "Expert Doctors & Modern Facilities"
  ];

  const duplicatedTexts = [...texts, ...texts];

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee 18s linear infinite;
            white-space: nowrap;
          }
        `}
      </style>

      {/* FULL WIDTH SAME COLOR AS NAVBAR */}
      <div className="w-full bg-[#00C4A4] text-white py-3 overflow-hidden relative">

        {/* Same container width as navbar */}
        <div className="max-w-7xl mx-auto px-4 relative overflow-hidden">

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-[#00C4A4] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#00C4A4] to-transparent z-10"></div>

          <div className="animate-marquee flex items-center">

            {duplicatedTexts.map((text, index) => (
              <div key={index} className="flex items-center">
                <span className="mx-8 text-base md:text-lg font-semibold tracking-wide">
                  {text}
                </span>

                {/* Dot Separator */}
                <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
};

export default ScrollingText;

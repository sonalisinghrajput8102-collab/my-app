// src/components/PatientStories.jsx
import React, { useState,用State, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "My father had a massive heart attack. The MediCare team responded within 8 minutes, performed emergency angioplasty, and saved his life.",
    highlight: "The ICU care was exceptional.",
    name: "Mr. Rajesh Kumar, Delhi",
  },
  {
    text: "My wife was diagnosed with a critical condition during pregnancy. The doctors and nurses at MediCare gave us hope when we had none.",
    highlight: "They delivered our healthy baby safely. We are forever grateful.",
    name: "Mrs. Priya Sharma, Mumbai",
  },
  {
    text: "I was in a road accident with multiple fractures. The trauma team operated immediately and handled everything with utmost care.",
    highlight: "Today I can walk again – all thanks to MediCare Hospital.",
    name: "Mr. Vikram Singh, Jaipur",
  },
];

const PatientStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-2">
          Real Patient Stories
        </h2>
        <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
        <p className="text-gray-700 max-w-3xl mx-auto mb-12">
          Hear from those whose lives were transformed through timely, expert care at{" "}
          <span className="font-semibold">MediCare Hospital</span>.
        </p>

       
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl 
                          p-10 md:p-14 lg:p-16          
                          min-h-96 md:min-h-[420px]     
                          relative overflow-hidden">
            
            {/* Quotes – same as before */}
            <div className="absolute top-8 left-8 text-teal-100 text-7xl select-none">“</div>
            <div className="absolute bottom-8 right-8 text-teal-100 text-7xl rotate-180 select-none">”</div>

            {/* Content – बिल्कुल वैसा ही */}
            <div className="relative z-10">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
                    {item.text}
                    <span className="block mt-4 font-bold text-teal-700">{item.highlight}</span>
                  </p>
                  <p className="text-teal-700 font-semibold text-lg">– {item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation – बिल्कुल पहले जैसा */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={goToPrev}
              className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full transition shadow-lg"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentIndex ? "bg-teal-600 w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full transition shadow-lg"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientStories;
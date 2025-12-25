import React from "react";

const TermCondition = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Gradient Banner */}
      <section className="relative bg-gradient-to-r from-[#35807d] via-[#00bfa5] to-[#00796b] text-white text-center py-16 px-4 clip-path-banner">
        <h1 className="text-4xl md:text-5xl font-semibold md:text-left md:ml-24">
          Terms and Conditions
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white/30"></div>
      </section>

      {/* Content Card */}
      <div className="max-w-3xl bg-white mx-auto -mt-8 mb-12 p-6 md:p-10 rounded-xl shadow-lg border-t-4 border-cyan-400">
        
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-teal-700 font-semibold mb-4 hover:text-teal-900"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back
        </button>

        <p className="text-center text-sm text-gray-500 mb-6">
          Last Updated: October 30, 2025
        </p>

        {/* Sections */}
        <section className="space-y-6 text-sm leading-relaxed">
          
          <div>
            <h2 className="section-title">1. Acceptance of Terms</h2>
            <p>
              By using MediCare, you agree to comply with and be bound by these
              Terms & Conditions. If you do not agree, please stop using our
              services immediately.
            </p>
          </div>

          <div>
            <h2 className="section-title">2. Use of Services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete information.</li>
              <li>You are responsible for maintaining account confidentiality.</li>
              <li>Unauthorized use of another user's account is prohibited.</li>
            </ul>
          </div>

          <div>
            <h2 className="section-title">3. Medical Disclaimer</h2>
            <p>
              MediCare provides tools for appointment booking and health data
              management. It is not a substitute for professional medical advice.
            </p>
          </div>

          <div>
            <h2 className="section-title">4. Privacy & Data</h2>
            <p>
              Your personal data is protected under our{" "}
              <span className="text-teal-700 underline cursor-pointer">
                Privacy Policy
              </span>
              . We do not sell or share sensitive health information.
            </p>
          </div>

          <div>
            <h2 className="section-title">5. Modifications</h2>
            <p>
              MediCare may update these Terms at any time. Continued use of our
              platform means acceptance of updated Terms.
            </p>
          </div>

          <div>
            <h2 className="section-title">6. Contact Us</h2>
            <p>
              For questions or concerns, contact us at{" "}
              <strong>legal@medicare.com</strong>
            </p>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <button className="btn-primary">
            <i className="fas fa-file-pdf mr-2"></i> Download PDF
          </button>
          <button className="btn-primary">
            <i className="fas fa-file-word mr-2"></i> Download DOCX
          </button>
        </div>
      </div>

      {/* Tailwind custom utilities */}
      <style>
        {`
          .clip-path-banner {
            clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
          }
          .section-title {
            color: #00796b;
            font-size: 1rem;
            font-weight: 600;
            border-left: 4px solid #00bcd4;
            padding-left: 10px;
            margin-bottom: 6px;
          }
          .btn-primary {
            background: #00bcd4;
            color: white;
            padding: 10px 22px;
            border-radius: 8px;
            font-size: 0.9rem;
            transition: 0.3s;
          }
          .btn-primary:hover {
            background: #0097a7;
          }
        `}
      </style>
    </div>
  );
};

export default TermCondition;

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f7fbfc] font-sans text-gray-800">
      {/* Hero Section */}
      <header className="relative text-center text-white bg-gradient-to-br from-teal-800 via-teal-700 to-teal-500 py-24 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-95">
          We are committed to protecting your personal information with the
          highest standards of security and transparency.
        </p>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto -mt-16 px-4 pb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 relative">
          
          {/* Top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 to-teal-800 rounded-t-3xl" />

          <p className="text-center text-gray-500 font-medium mb-8">
            Last Updated: October 30, 2025
          </p>

          {/* Intro */}
          <section className="mb-10">
            <p className="text-base leading-relaxed">
              At <strong>MediCare</strong>, your privacy is our top priority.
              This Privacy Policy explains how we collect, use, protect, and
              share your personal and health information in compliance with
              global data protection laws including <strong>HIPAA</strong> and{" "}
              <strong>GDPR</strong>.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-teal-900 mb-3 pl-3 border-l-4 border-teal-400">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Personal identification: name, email, phone, address, date of birth</li>
              <li>Medical records: prescriptions, diagnoses, test reports, allergies</li>
              <li>Appointment & billing history</li>
              <li>Device information, IP address, and anonymized analytics</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-teal-900 mb-3 pl-3 border-l-4 border-teal-400">
              2. How We Use Your Information
            </h2>

            <div className="bg-teal-100 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4 font-medium">
              Your data is used <strong>only</strong> to provide and improve
              healthcare services — never sold to third parties.
            </div>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Schedule and manage appointments</li>
              <li>Send prescription reminders and health alerts</li>
              <li>Improve app performance and user experience</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-teal-900 mb-3 pl-3 border-l-4 border-teal-400">
              3. Data Security & Encryption
            </h2>
            <p className="text-gray-700">
              We implement <strong>AES-256 encryption</strong> for all data in
              transit and at rest. Access is restricted to authorized personnel
              only with multi-factor authentication.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-teal-900 mb-3 pl-3 border-l-4 border-teal-400">
              4. Who We Share Data With
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Doctors and hospitals providing your care</li>
              <li>Pharmacies for prescription fulfillment</li>
              <li>Emergency services in critical situations</li>
              <li>Legal authorities only under court order</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-teal-900 mb-3 pl-3 border-l-4 border-teal-400">
              5. Your Privacy Rights
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Access and download your data</li>
              <li>Request correction or deletion</li>
              <li>Opt out of non-essential communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-teal-900 mb-3 pl-3 border-l-4 border-teal-400">
              6. Contact Us
            </h2>
            <div className="bg-teal-50 p-4 rounded-lg text-gray-700">
              <p>For privacy concerns or data requests:</p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@medicare.com"
                  className="text-teal-700 underline"
                >
                  privacy@medicare.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong> 1800-123-456 (Toll-free)
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

import React from "react";

const HelpSupport = () => {
  return (
    <div className="min-h-screen bg-[#f8fcfb] text-gray-800 font-sans">

      {/* HERO */}
      <section className="relative text-center text-white bg-gradient-to-br from-teal-800 via-teal-700 to-teal-500 py-28 px-4">
        <h1 className="relative text-4xl md:text-5xl font-bold mb-4">
          Help &amp; Support
        </h1>
        <p className="relative max-w-2xl mx-auto text-lg opacity-95">
          Get instant help from our dedicated team. Call, email, or message us —
          we're here 24/7.
        </p>
      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto -mt-16 px-4 pb-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-teal-100">

          {/* BACK */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-teal-700 font-semibold mb-8 hover:text-teal-900"
          >
            ← Back
          </button>

          {/* SUPPORT CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "24/7 Live Support",
                desc: "Instant help via call or chat, anytime.",
                icon: "🎧",
              },
              {
                title: "Email Within 2 Hours",
                desc: "Guaranteed response during business hours.",
                icon: "📧",
              },
              {
                title: "Secure & Private",
                desc: "Your data is encrypted and safe with us.",
                icon: "🔒",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-teal-50 border border-teal-100 rounded-2xl p-6 text-center hover:-translate-y-2 transition shadow-sm hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-teal-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CONTACT BUTTONS */}
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-14">
            <a
              href="tel:1800123456"
              className="bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg text-center hover:bg-teal-800 transition shadow"
            >
              📞 Call: 1800-123-456
            </a>
            <a
              href="mailto:support@medicare.com"
              className="bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg text-center hover:bg-teal-800 transition shadow"
            >
              ✉️ Email: support@medicare.com
            </a>
          </div>

          {/* FORM */}
          <div className="border-t-2 border-dashed border-teal-200 pt-12">
            <h2 className="text-2xl font-semibold text-teal-900 text-center mb-2">
              Send Us a Message
            </h2>
            <p className="text-center text-gray-600 mb-8">
              We usually reply within 1 hour.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your message has been sent.");
                e.target.reset();
              }}
              className="max-w-3xl mx-auto bg-teal-50 border border-teal-100 rounded-2xl p-8 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  required
                  placeholder="Full Name"
                  className="input"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="input"
                />
              </div>

              <input
                placeholder="Subject"
                className="input"
              />

              <textarea
                required
                placeholder="Describe your issue..."
                className="input h-36 resize-none"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition shadow-lg"
              >
                🚀 Send Message
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Tailwind helper */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 14px 16px;
            border-radius: 12px;
            border: 2px solid #cce8e6;
            outline: none;
            transition: 0.3s;
          }
          .input:focus {
            border-color: #14b8a6;
            box-shadow: 0 0 0 4px rgba(20,184,166,0.2);
          }
        `}
      </style>

    </div>
  );
};

export default HelpSupport;

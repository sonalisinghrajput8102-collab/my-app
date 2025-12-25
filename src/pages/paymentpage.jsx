import React, { useState, useEffect } from "react";

const PaymentPage = ({ doctor, date, slot, onPaymentSuccess }) => {
  const consultationFee = 2500;
  const serviceCharge = 750;
  const totalAmount = consultationFee + serviceCharge;

  const [processing, setProcessing] = useState(false);

  // Load temp booking data (issue wagaira)
  const tempBooking = JSON.parse(localStorage.getItem("tempBooking") || "{}");
  const issue = tempBooking.issue || "Not specified";

  // Razorpay script load
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay SDK loaded successfully");
    script.onerror = () => alert("Razorpay load nahi hua. Internet check karo.");
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const launchRazorpay = () => {
    if (!window.Razorpay) {
      alert("Payment system abhi load ho raha hai... Thoda wait karo ya refresh karo.");
      return;
    }

    setProcessing(true);

    const timeDisplay = slot ? `${slot.start} - ${slot.end}` : "Time not selected";

    const options = {
      key: "rzp_test_RqyfR6ogB6XV65", // Test key (production mein badal dena)
      amount: totalAmount * 100,
      currency: "INR",
      name: "Your Clinic Name",
      description: `Consultation with Dr. ${doctor?.name || "Doctor"} on ${date || "N/A"} at ${timeDisplay}`,
      image: "", // Logo URL daal sakte ho
      handler: function (response) {
        alert("Payment Successful! 🎉\nPayment ID: " + response.razorpay_payment_id);
        onPaymentSuccess && onPaymentSuccess(response);
      },
      prefill: {
        name: "Patient Name",
        email: "patient@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#0d9488",
      },
      modal: {
        ondismiss: () => {
          setProcessing(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      alert("Payment Failed 😞\nReason: " + (response.error.description || "Unknown error"));
      console.error("Razorpay Error:", response.error);
      setProcessing(false);
    });

    rzp.open();
  };

  const handleOptionClick = () => {
    launchRazorpay();
  };

  // Safety check – agar data miss hai to back bhej do
  if (!doctor || !date || !slot) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center">
          <p className="text-red-600 text-xl mb-6">Appointment details missing!</p>
          <p>Please go back and select date & time again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#f4f6fb] z-50 overflow-y-auto">
      {/* HEADER */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Secure Payment</h2>
        <span className="text-sm text-gray-500">Powered by Razorpay</span>
      </div>

      {/* BODY */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* LEFT – PAYMENT METHODS */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Select Payment Method</h3>

          {/* Popular UPI Apps */}
          <div className="mb-8">
            <p className="text-sm font-medium mb-4">Popular UPI Apps</p>
            <div className="grid grid-cols-4 gap-4">
              {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app, i) => (
                <button
                  key={i}
                  onClick={handleOptionClick}
                  disabled={processing}
                  className="border rounded-xl p-6 hover:shadow-lg hover:border-teal-500 transition text-center bg-white disabled:opacity-60"
                >
                  <div className="text-5xl mb-3">
                    {i === 0 ? "🟢" : i === 1 ? "🟣" : i === 2 ? "🔵" : "⚪"}
                  </div>
                  <p className="font-semibold">{app}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Wallets & Other */}
          <div className="mb-8">
            <p className="text-sm font-medium mb-4">Wallets</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {["Paytm Wallet", "Amazon Pay", "Mobikwik"].map((wallet) => (
                <button
                  key={wallet}
                  onClick={handleOptionClick}
                  disabled={processing}
                  className="border rounded-xl py-6 hover:shadow-lg hover:border-teal-500 transition bg-white font-semibold disabled:opacity-60"
                >
                  {wallet}
                </button>
              ))}
            </div>

            <p className="text-sm font-medium mb-4">Other Options</p>
            <button
              onClick={handleOptionClick}
              disabled={processing}
              className="w-full border-2 rounded-xl py-5 mb-3 hover:shadow-lg hover:border-teal-500 transition bg-white font-semibold disabled:opacity-60"
            >
              💳 Credit / Debit Card
            </button>
            <button
              onClick={handleOptionClick}
              disabled={processing}
              className="w-full border-2 rounded-xl py-5 hover:shadow-lg hover:border-teal-500 transition bg-white font-semibold disabled:opacity-60"
            >
              🏦 Net Banking
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-8 text-center">
            You will be redirected to secure Razorpay checkout
          </p>
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="font-semibold mb-4">Appointment Summary</h3>
          <div className="text-sm space-y-3">
            <p><b>Doctor:</b> Dr. {doctor?.name || "Loading..."}</p>
            <p><b>Specialty:</b> {doctor?.spec || "General"}</p>
            <p><b>Date:</b> {date ? new Date(date).toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Not selected"}</p>
            <p><b>Time:</b> {slot?.start && slot?.end ? `${slot.start} - ${slot.end}` : "Not selected"}</p>
            <p><b>Issue:</b> {issue}</p>
          </div>

          <hr className="my-6" />

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Consultation Fee</span>
              <span>₹{consultationFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service Charge</span>
              <span>₹{serviceCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-3 border-t">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <button
            onClick={handleOptionClick}
            disabled={processing}
            className="w-full mt-8 bg-teal-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-teal-700 disabled:opacity-70 transition"
          >
            {processing ? "Opening Payment..." : `Pay ₹${totalAmount}`}
          </button>

          <p className="text-xs text-center text-gray-500 mt-6">
            🔒 Secured by Razorpay • 256-bit SSL Encryption
          </p>
        </div>
      </div>

      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600 mx-auto mb-6"></div>
            <p className="font-bold text-lg">Opening secure payment...</p>
            <p className="text-sm text-gray-500 mt-2">Do not close or refresh</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
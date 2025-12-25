import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Download,
  Search,
  Filter,
  UploadCloud,
  Activity,
  Stethoscope,
  Pill,
  Scan,
  ShieldCheck,
} from "lucide-react";

const HealthRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data (later API se replace kar sakti ho)
  const records = [
    {
      id: 1,
      date: "10 Dec 2025",
      type: "Lab Report",
      title: "Complete Blood Count (CBC)",
      doctor: "Dr. Rajesh Kumar",
      category: "blood",
    },
    {
      id: 2,
      date: "05 Dec 2025",
      type: "Prescription",
      title: "Diabetes Medication",
      doctor: "Dr. Priya Sharma",
      category: "prescription",
    },
    {
      id: 3,
      date: "28 Nov 2025",
      type: "Radiology",
      title: "Chest X-Ray",
      doctor: "Dr. Amit Verma",
      category: "radiology",
    },
    {
      id: 4,
      date: "15 Nov 2025",
      type: "Visit Summary",
      title: "Cardiology Consultation",
      doctor: "Dr. Neha Gupta",
      category: "visit",
    },
    {
      id: 5,
      date: "01 Oct 2025",
      type: "Lab Report",
      title: "Lipid Profile",
      doctor: "Dr. Rajesh Kumar",
      category: "blood",
    },
  ];

  const filteredRecords = records.filter(
    (record) =>
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (category) => {
    switch (category) {
      case "blood":
        return <Activity size={24} className="text-red-600" />;
      case "prescription":
        return <Pill size={24} className="text-blue-600" />;
      case "radiology":
        return <Scan size={24} className="text-purple-600" />;
      default:
        return <Stethoscope size={24} className="text-teal-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">
            My Health Records
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access all your medical reports, prescriptions, and visit summaries
            in one secure place.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-teal-700">
            <ShieldCheck size={24} />
            <span className="font-medium">
              Your data is encrypted and secure
            </span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={22}
              className="absolute left-4 top-4 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by report name or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition text-lg"
            />
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition shadow-md">
            <Filter size={22} />
            Filter
          </button>
        </div>

        {/* Records List */}
        <div className="grid gap-6">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
              <UploadCloud size={80} className="mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                No records found
              </h3>
              <p className="text-gray-500 mb-6">
                Your health records will appear here once available.
              </p>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-medium transition shadow-lg">
                Upload Report
              </button>
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                      {getCategoryIcon(record.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-teal-600 bg-teal-50 px-4 py-1 rounded-full">
                          {record.type}
                        </span>
                        <span className="text-gray-500 flex items-center gap-2">
                          <Calendar size={18} />
                          {record.date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {record.title}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        <span className="font-medium">Doctor:</span>{" "}
                        {record.doctor}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition shadow-md">
                      <FileText size={20} />
                      View
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-xl font-medium transition">
                      <Download size={20} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12 text-gray-500">
          <p>Last updated: 13 December 2025</p>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;

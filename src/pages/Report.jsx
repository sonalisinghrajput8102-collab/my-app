// src/pages/Report.jsx  (या src/components/Report.jsx)
import React, { useState } from "react";
import {
  UploadCloud,
  FolderOpen,
  X,
  FileText,
  Image as ImageIcon,
  Calendar,
} from "lucide-react";

const Report = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedReports, setUploadedReports] = useState([]); // Uploaded reports ki list

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (files) => {
    if (files.length === 0) return;

    const newReports = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(), // Unique ID
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB", // Size in MB
      date: new Date().toLocaleDateString("en-IN"), // Indian date format
      url: URL.createObjectURL(file), // Preview ke liye
      type: file.type, // image/* ya application/pdf
      store: "Main Store", // यहाँ backend से dynamic store name ला सकते हो
    }));

    setUploadedReports((prev) => [...prev, ...newReports]);
    // यहाँ चाहो तो backend API call करके actual upload कर सकते हो
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    processFiles(files);
    e.target.value = ""; // Input reset kar do
  };

  const deleteReport = (id) => {
    setUploadedReports((prev) => prev.filter((report) => report.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-left">
          My Reports
        </h1>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl bg-white p-20 text-center transition-all duration-300 cursor-pointer
            ${isDragging
              ? "border-teal-500 bg-teal-50"
              : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"
            }`}
        >
          <input
            type="file"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          <label htmlFor="file-upload" className="cursor-pointer block">
            <UploadCloud
              size={70}
              className={`mx-auto mb-6 transition-colors ${
                isDragging ? "text-teal-600" : "text-gray-400"
              }`}
            />
            <p className="text-xl font-medium text-gray-700 mb-2">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-gray-500">
              PDF, JPG, PNG • Max 10MB
            </p>
          </label>
        </div>

        {/* Uploaded Reports List - Upload area के ठीक नीचे */}
        {uploadedReports.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Uploaded Reports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {uploadedReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition-shadow"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteReport(report.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 z-10"
                  >
                    <X size={16} />
                  </button>

                  {/* Preview Area */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    {report.type.startsWith("image/") ? (
                      <img
                        src={report.url}
                        alt={report.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : report.type === "application/pdf" ? (
                      <FileText size={80} className="text-red-600" />
                    ) : (
                      <ImageIcon size={80} className="text-gray-400" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <p className="font-medium text-gray-800 truncate">
                      {report.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Store: <span className="font-semibold">{report.store}</span>
                    </p>
                    <div className="flex items-center text-xs text-gray-400 mt-2">
                      <Calendar size={14} className="mr-1" />
                      <span>{report.date}</span>
                      <span className="mx-2">•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State - Jab koi report na ho */}
        {uploadedReports.length === 0 && (
          <div className="text-center mt-20">
            <FolderOpen size={90} className="mx-auto text-gray-300 mb-6" />
            <p className="text-lg text-gray-500 mb-2">
              No reports uploaded yet.
            </p>
            <p className="text-teal-600 font-semibold text-lg cursor-pointer hover:underline">
              Upload your first report!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Report;
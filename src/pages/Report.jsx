// src/pages/Report.jsx
import React, { useEffect, useState } from "react";
import {
  UploadCloud,
  X,
  Image as ImageIcon,
  Calendar,
  AlertCircle,
  File,
  FileText,
  FileSpreadsheet,
  FileVideo,
  Loader2,
  Trash2,
} from "lucide-react";
import { getToken } from "../utils/auth";

const API_URL = "/api/upload/reporting";

const Report = () => {
  const [uploadedReports, setUploadedReports] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    "image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp",
    "application/pdf",
    "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "video/mp4", "video/quicktime", "video/x-msvideo",
  ];

  // Load saved reports from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("myReports");
    if (saved) {
      try {
        setUploadedReports(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load reports from storage");
      }
    }
  }, []);

  // Save to localStorage whenever reports change
  useEffect(() => {
    if (uploadedReports.length > 0) {
      localStorage.setItem("myReports", JSON.stringify(uploadedReports));
    } else {
      localStorage.removeItem("myReports");
    }
  }, [uploadedReports]);

  // Real-time sync across tabs
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("myReports");
      if (saved) {
        try {
          setUploadedReports(JSON.parse(saved));
        } catch (e) {
          console.error("Sync error");
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return <ImageIcon size={80} className="text-teal-500" />;
    if (type === "application/pdf") return <FileText size={80} className="text-red-600" />;
    if (type.includes("word")) return <File size={80} className="text-blue-600" />;
    if (type.includes("excel")) return <FileSpreadsheet size={80} className="text-green-600" />;
    if (type.includes("powerpoint")) return <File size={80} className="text-orange-600" />;
    if (type.startsWith("video/")) return <FileVideo size={80} className="text-purple-600" />;
    return <File size={80} className="text-gray-500" />;
  };

  const uploadFile = async (file) => {
    const token = getToken();
    if (!token) {
      setError("Please login again to upload files.");
      return;
    }

    const formData = new FormData();
    formData.append("report_file", file);
    formData.append("user_status", "active");

    setUploadingFiles((prev) => [...prev, { name: file.name }]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Upload failed");
      }

      const reportData = data.data.report;
      const fileUrl = data.data.file_url;

      const newReport = {
        id: reportData.id || Date.now(), // fallback ID
        name: reportData.file_name || file.name,
        url: fileUrl,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        date: new Date(reportData.created_at || Date.now()).toLocaleDateString("en-IN"),
        type: file.type,
      };

      setUploadedReports((prev) => [...prev, newReport]);

    } catch (err) {
      setError(`Failed to upload ${file.name}: ${err.message}`);
    } finally {
      setUploadingFiles((prev) => prev.filter((f) => f.name !== file.name));
    }
  };

  const handleFiles = (files) => {
    setError("");
    Array.from(files).forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`${file.name} - Unsupported file type`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} - File too large (max 10MB)`);
        return;
      }
      uploadFile(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const deleteReport = (id) => {
    setUploadedReports((prev) => prev.filter((r) => r.id !== id));
  };

  const clearAllReports = () => {
    if (window.confirm("Are you sure you want to delete all reports? This cannot be undone.")) {
      setUploadedReports([]);
      localStorage.removeItem("myReports");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0B717A] to-teal-600 mb-4">
            My Medical Reports
          </h1>
          <p className="text-xl text-gray-600">
            Upload and view all your lab reports, scans, prescriptions in one place
          </p>
          <p className="text-sm text-gray-500 mt-3">
            ✅ Your reports are saved safely in your browser until you delete them
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-5 bg-red-100 border border-red-300 text-red-700 rounded-2xl flex items-center gap-3 shadow-md">
            <AlertCircle size={24} />
            <span>{error}</span>
            <button onClick={() => setError("")} className="ml-auto">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Upload Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={handleDrop}
          className={`relative border-4 border-dashed rounded-3xl p-16 text-center transition-all duration-500
            ${isDragging ? "border-teal-500 bg-teal-50 scale-105" : "border-gray-300 bg-white hover:border-teal-400"}
          `}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="cursor-pointer block">
            {uploadingFiles.length > 0 ? (
              <Loader2 className="mx-auto mb-8 animate-spin text-teal-600" size={80} />
            ) : (
              <UploadCloud size={80} className={`mx-auto mb-8 ${isDragging ? "text-teal-600" : "text-gray-400"}`} />
            )}
            <p className="text-2xl font-semibold text-gray-700 mb-3">
              {uploadingFiles.length > 0 ? "Uploading your reports..." : "Drop reports here or click to upload"}
            </p>
            <p className="text-md text-gray-500">PDF, Images, Documents, Videos • Max 10MB each</p>
          </label>
        </div>

        {/* Uploading List */}
        {uploadingFiles.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-md">
            <p className="font-bold text-blue-800 mb-3">Uploading {uploadingFiles.length} file(s)...</p>
            {uploadingFiles.map((f) => (
              <div key={f.name} className="text-blue-700 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                {f.name}
              </div>
            ))}
          </div>
        )}

        {/* Clear All Button */}
        {uploadedReports.length > 0 && (
          <div className="text-center my-10">
            <button
              onClick={clearAllReports}
              className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold shadow-lg flex items-center gap-2 mx-auto"
            >
              <Trash2 size={20} />
              Clear All Reports
            </button>
          </div>
        )}

        {/* Uploaded Reports Grid */}
        {uploadedReports.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Your Uploaded Reports ({uploadedReports.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {uploadedReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-teal-100 group"
                >
                  <button
                    onClick={() => deleteReport(report.id)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition z-10 hover:bg-red-600"
                  >
                    <X size={18} />
                  </button>

                  <a href={report.url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="h-56 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-6">
                      {report.type.startsWith("image/") ? (
                        <img
                          src={report.url}
                          alt={report.name}
                          className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                        />
                      ) : (
                        getFileIcon(report.type)
                      )}
                    </div>

                    <div className="p-5 bg-white">
                      <p className="font-semibold text-gray-800 truncate text-sm">{report.name}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-3 gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {report.date}
                        </div>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : uploadingFiles.length === 0 ? (
          <div className="text-center mt-32">
            <div className="text-9xl mb-8 text-gray-200">📄</div>
            <h3 className="text-3xl font-bold text-gray-600 mb-4">No reports uploaded yet</h3>
            <p className="text-lg text-gray-500 max-w-md mx-auto">
              Start uploading your medical reports. They will stay here safely even if you close the browser!
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Report;
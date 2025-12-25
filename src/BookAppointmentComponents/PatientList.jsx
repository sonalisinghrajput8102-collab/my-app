import React, { useEffect, useState } from "react";
import PatientForm from "./PatientForm";
import Swal from "sweetalert2";
import { getToken } from "../utils/auth";
import {
  FaUserPlus,
  FaUserFriends,
  FaArrowLeft,
  FaCheckCircle,
  FaVenus,
  FaMars,
  FaSpinner,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

const PatientList = ({ onPatientSelect }) => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;

      const res = await fetch("https://developer.bitmaxtest.com/api/relatives", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status) setPatients(data.relatives || []);
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: "error",
        title: "Failed to load patients",
        text: "Please try again later",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePatient = async (patient) => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;

      const formData = new FormData();
      formData.append("id", patient.id || "");
      formData.append("name", patient.name);
      formData.append("age", patient.age);
      formData.append("relation", patient.relation);
      formData.append("gender", patient.gender);
      formData.append("blood_group", patient.bloodGroup);
      if (patient.image) formData.append("image", patient.image);

      const response = await fetch(
        "https://developer.bitmaxtest.com/api/relatives/add",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await response.json();

      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Patient Added!",
          text: `${patient.name} added successfully`,
          timer: 2000,
          showConfirmButton: false,
        });
        setShowForm(false);
        fetchPatients();
      } else {
        throw new Error(result.message || "Failed to add patient");
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: e.message || "Failed to add patient.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (patient) => {
    setSelectedPatientId(patient.relative_id);
    const old = JSON.parse(localStorage.getItem("appointmentData")) || {};
    localStorage.setItem(
      "appointmentData",
      JSON.stringify({
        ...old,
        relative_id: patient.relative_id,
        patientData: patient,
        fromPatientList: true,
      })
    );
    onPatientSelect();
  };

  const getRelationColor = (relation) => {
    const colors = {
      Father: "bg-blue-100 text-blue-800",
      Mother: "bg-pink-100 text-pink-800",
      Spouse: "bg-purple-100 text-purple-800",
      Child: "bg-green-100 text-green-800",
      Sibling: "bg-yellow-100 text-yellow-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[relation] || colors.Other;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Ab ise bhi adjust karte hain */}
        <div className="mb-8">
          <button
            onClick={onPatientSelect}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition mb-4"
          >
            <FaArrowLeft /> Back to Appointment
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
              <p className="text-gray-600 mt-1">Select a patient or add a new one</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                Total Patients: {patients.length}
              </span>
              <button
                onClick={fetchPatients}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition"
              >
                <FaSpinner className={loading ? "animate-spin" : ""} /> Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Ab yahan layout change karte hain */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Patient Form (Narrower) */}
          <div className="lg:w-1/3 xl:w-2/5">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 sticky top-8 h-fit">
              {showForm ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <FaUserPlus className="text-blue-600" /> Add Patient
                    </h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>
                  <div className="border-t pt-4">
                    <PatientForm
                      onSave={handleSavePatient}
                      onCancel={() => setShowForm(false)}
                      loading={loading}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center p-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUserPlus className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    Add New Patient
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Add family members quickly
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-base"
                  >
                    <FaUserPlus /> Add Patient
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Patient List (Wider) */}
          <div className="lg:w-2/3 xl:w-3/5">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              {/* List Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
                    <FaUserFriends className="text-2xl text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Your Patients</h2>
                    <p className="text-sm text-gray-600">Select one to continue</p>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && !showForm ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <FaSpinner className="text-5xl text-blue-600 animate-spin mb-4" />
                  <p className="text-gray-600 text-lg">Loading patients...</p>
                </div>
              ) : patients.length === 0 && !showForm ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-50 to-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaUserFriends className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    No Patients Yet
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Start by adding your first patient using the form on the left.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div
                      key={patient.relative_id}
                      onClick={() => handleSelect(patient)}
                      className={`group relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedPatientId === patient.relative_id
                          ? "border-blue-500 bg-gradient-to-r from-blue-50/50 to-teal-50/50 shadow-lg"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          {/* Avatar */}
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                              {patient.image ? (
                                <img
                                  src={patient.image}
                                  alt={patient.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div
                                  className={`w-full h-full flex items-center justify-center ${
                                    patient.gender === "Female"
                                      ? "bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600"
                                      : "bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600"
                                  }`}
                                >
                                  {patient.gender === "Female" ? (
                                    <FaVenus className="text-xl" />
                                  ) : (
                                    <FaMars className="text-xl" />
                                  )}
                                </div>
                              )}
                            </div>
                            {selectedPatientId === patient.relative_id && (
                              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                                <FaCheckCircle className="text-xs" />
                              </div>
                            )}
                          </div>

                          {/* Patient Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-lg font-bold text-gray-800 truncate">
                                {patient.name}
                              </h4>
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${getRelationColor(
                                  patient.relation
                                )}`}
                              >
                                {patient.relation}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <span>
                                  {patient.gender === "Female" ? (
                                    <FaVenus className="text-pink-500 text-xs" />
                                  ) : (
                                    <FaMars className="text-blue-500 text-xs" />
                                  )}
                                </span>
                                <span>{patient.gender}</span>
                              </div>
                              <div className="h-4 w-px bg-gray-300"></div>
                              <span>{patient.age} years</span>
                              <div className="h-4 w-px bg-gray-300"></div>
                              <span className="font-medium text-red-600">{patient.blood_group}</span>
                            </div>
                          </div>
                        </div>

                        {/* Select Button */}
                        <div className="ml-4">
                          <button
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                              selectedPatientId === patient.relative_id
                                ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white"
                                : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50"
                            }`}
                          >
                            {selectedPatientId === patient.relative_id ? (
                              "Selected"
                            ) : (
                              <>
                                Select
                                <FaChevronRight className="text-xs" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
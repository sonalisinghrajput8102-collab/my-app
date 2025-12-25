import React, { useState } from "react";
import { FaCamera, FaUpload, FaUser, FaVenusMars, FaUsers, FaTint, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

const PatientForm = ({ onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    relation: "",
    bloodGroup: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "warning",
          title: "File too large",
          text: "Image must be less than 5MB",
          timer: 2000,
        });
        return;
      }
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender || !formData.relation || !formData.bloodGroup) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill all required fields",
        timer: 2000,
      });
      return;
    }
    onSave(formData);
  };

  const removeImage = () => {
    setPreview(null);
    setFormData({ ...formData, image: null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Profile Image Upload */}
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow mx-auto">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition text-xs"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col items-center justify-center">
                <FaCamera className="text-2xl text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">No image</span>
              </div>
            )}
          </div>
          <label
            htmlFor="image-upload"
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow cursor-pointer hover:bg-blue-700 transition text-sm"
          >
            <FaUpload />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        {/* Name */}
        <div className="relative">
          <div className="absolute left-3 top-3.5 text-gray-400 text-sm">
            <FaUser />
          </div>
          <input
            type="text"
            placeholder="Full Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {/* Age and Gender */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              placeholder="Age *"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              min="0"
              max="120"
              required
            />
          </div>
          <div className="relative">
            <div className="absolute left-3 top-3.5 text-gray-400 text-sm">
              <FaVenusMars />
            </div>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
              required
            >
              <option value="">Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Relation */}
        <div className="relative">
          <div className="absolute left-3 top-3.5 text-gray-400 text-sm">
            <FaUsers />
          </div>
          <select
            value={formData.relation}
            onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
            required
          >
            <option value="">Relation *</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
            <option value="Sibling">Sibling</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="relative">
          <div className="absolute left-3 top-3.5 text-gray-400 text-sm">
            <FaTint />
          </div>
          <select
            value={formData.bloodGroup}
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
            className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
            required
          >
            <option value="">Blood Group *</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow hover:shadow-md flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Saving...
            </>
          ) : (
            "Save Patient"
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition shadow text-sm"
        >
          Cancel
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center pt-1">
        * Required fields
      </p>
    </form>
  );
};

export default PatientForm;
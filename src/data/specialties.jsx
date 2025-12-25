import React, { useEffect, useState } from "react";
import SpecialtyCard from "../BookAppointmentComponents/SpecialtyCard";
import { useNavigate } from "react-router-dom";

const Specialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch("https://developer.bitmaxtest.com/api/skills");
        if (!response.ok) throw new Error("Failed to fetch specialties");
        const result = await response.json();

        const mappedData = result.data.map((item) => ({
          id: item.id, // important for matching
          name: item.skill,
          img: item.image,
        }));

        // Filter specialties to only those that include "neuro" (case-insensitive)
        const filtered = mappedData.filter((s) =>
          s.name && s.name.toLowerCase().includes("neuro")
        );

        // Debug logs to help diagnose "no items" issues
        console.info("SPECIALTIES: full list count =", mappedData.length);
        console.info("SPECIALTIES: filtered (neuro) count =", filtered.length);
        // preserve the full list in case we need to show all
        setAllSpecialties(mappedData);

        setSpecialties(filtered);
      } catch (error) {
        console.error("Error fetching specialties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  if (loading) return <div>Loading specialties...</div>;
  // If filtered list is empty, allow user to show full list for debugging
  const listToRender = (specialties && specialties.length > 0) || showAll ? (showAll ? allSpecialties : specialties) : [];

  const handleSpecialtyClick = (specialty) => {
    // Save the selected specialty to localStorage
    localStorage.setItem("selectedSpecialty", JSON.stringify(specialty));

    // Navigate to the doctors/booking page
    navigate("/book-appointment");
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {listToRender.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-600 mb-3">No neurology-related specialties found.</p>
          <button
            className="px-4 py-2 bg-teal-600 text-white rounded"
            onClick={() => setShowAll(true)}
          >
            Show all specialties
          </button>
        </div>
      ) : (
        listToRender.map((specialty) => (
          <SpecialtyCard
            key={specialty.id}
            name={specialty.name}
            img={specialty.img}
            onClick={() => handleSpecialtyClick(specialty)}
          />
        ))
      )}
    </div>
  );
};

export default Specialties;

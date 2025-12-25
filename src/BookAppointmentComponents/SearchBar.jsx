// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ placeholder }) => (
  <div className="relative max-w-2xl mx-auto my-6">
    <input
      type="search"
      placeholder={placeholder}
      className="w-full px-12 py-4 bg-white rounded-2xl border-2 border-gray-200 focus:border-teal-600 focus:outline-none shadow-lg text-lg"
    />
    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
  </div>
);

export default SearchBar;
import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="flex justify-center p-4 bg-white shadow-sm">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search for products..."
        className="w-full max-w-md px-4 py-2 border border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
      />
    </div>
  );
};

export default SearchBar;

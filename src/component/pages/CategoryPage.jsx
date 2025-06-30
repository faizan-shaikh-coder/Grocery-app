import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products
      </h2>
    </div>
  );
};

export default CategoryPage;

import React, { useContext, useState } from 'react';
import vegetableData from '../../productdata/vegetable';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Vegetables = () => {
  const [query, setQuery] = useState('');
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('userEmail');

  const filtered = vegetableData.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <h2 className='text-2xl sm:text-3xl font-bold mb-4 text-green-700 text-center'>Vegetable Products</h2>

      <input
        type="text"
        placeholder='Search Vegetables'
        className="w-full sm:w-3/4 md:w-1/2 border border-gray-300 px-4 py-2 mb-6 rounded focus:outline-none mx-auto block"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {filtered.map((product) => (
          <div key={product.id} className="bg-white rounded shadow-md p-4 flex flex-col justify-between">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-36 sm:h-40 w-full object-contain rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            <p className="font-semibold mt-2 text-green-700">₹{product.price}</p>
            <button
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() =>
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.imageUrl,
                  },
                  isLoggedIn,
                  navigate
                )
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vegetables;

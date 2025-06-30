import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("userEmail");

  const handleImage = (e) => {
    e.target.src = "https://via.placeholder.com/150?text=No+Image";
  };

  const imageSrc = product.thumbnail || "https://via.placeholder.com/150?text=No+Image";

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.thumbnail,
      },
      isLoggedIn,
      navigate
    );
  };

  return (
    <div className='border rounded shadow p-3 bg-white flex flex-col items-center text-center hover:shadow-lg transition'>
      <img
        className='h-36 sm:h-40 md:h-44 w-full object-contain rounded'
        src={imageSrc}
        alt={product.title}
        onError={handleImage}
      />
      <h2 className='font-semibold mt-2 text-sm sm:text-base'>{product.title}</h2>
      <p className='text-green-600 font-bold text-sm sm:text-base'>₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className='bg-green-600 text-white px-4 py-1 mt-2 rounded hover:bg-green-700 transition text-sm sm:text-base'
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../ProductCard';
import SearchBar from '../SearchBar';
import Offers from '../Offers';
import CustomerReviews from '../CustomerReviws';
import Contact from '../Contact';
import banner from '../../assets/fresh-banner-new.jpeg';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/groceries")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto">
      {/* Search Bar */}
      <SearchBar onSearch={setQuery} />

      {/* Banner */}
      <img
        src={banner}
        alt="fresh banner"
        className="w-full h-48 sm:h-64 object-cover rounded-lg my-6 shadow-md"
      />

      {/* Best Selling Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-700">
        Best Selling
      </h1>

      {/* Horizontal Product Scroll */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar scroll-smooth"
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[200px] max-w-[250px] flex-shrink-0 transition-transform hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Other Sections */}
      <Offers />
      <CustomerReviews />
      <Contact />
    </div>
  );
};

export default Home;

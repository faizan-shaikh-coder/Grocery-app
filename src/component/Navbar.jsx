import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png.png';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { userEmail, isAdmin } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setCartItems([]);
    toast.success("Logged out successfully");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const cartCount = userEmail ? cartItems.length : 0;

  const handleCartClick = (e) => {
    if (!userEmail) {
      e.preventDefault();
      toast.warn("Please login to view cart");
      navigate('/login');
    }
  };

  return (
    <nav className='bg-green-700 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <img src={logo} alt="Logo" className='h-10 w-10 object-contain' />
          <span className='text-xl font-bold text-white hidden sm:inline'>Organic Grocery</span>
        </Link>

        {/* Hamburger for mobile */}
        <div className='md:hidden'>
          <button onClick={() => setMenuOpen(!menuOpen)} className='text-white text-2xl'>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Links */}
        <div className={`flex-col md:flex-row md:flex gap-6 items-center text-white text-lg font-medium absolute md:static top-16 left-0 w-full md:w-auto bg-green-700 z-50 transition-all duration-300 ease-in-out ${menuOpen ? 'flex' : 'hidden'}`}>
          <Link to="/" className='hover:underline py-2 px-4'>Home</Link>
          <Link to="/about" className='hover:underline py-2 px-4'>About</Link>

          {isAdmin && <Link to="/admin" className='hover:underline py-2 px-4'>Admin</Link>}

          <div className='relative group py-2 px-4'>
            <span className='cursor-pointer hover:underline'>Categories</span>
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white text-green-700 rounded shadow-md mt-2 w-48 z-50 flex flex-col">
              <Link to="/vegetable" className='block px-4 py-2 hover:bg-green-700 hover:text-white'>Vegetables</Link>
              <Link to="/fruits" className='block px-4 py-2 hover:bg-green-700 hover:text-white'>Fruits</Link>
              <Link to="/non-veg" className='block px-4 py-2 hover:bg-green-700 hover:text-white'>Non-Veg</Link>
              <Link to="/grains" className='block px-4 py-2 hover:bg-green-700 hover:text-white'>Grains</Link>
              <Link to="/dairy" className='block px-4 py-2 hover:bg-green-700 hover:text-white'>Dairy</Link>
            </div>
          </div>

          <div className="relative group py-2 px-4">
            <span className="cursor-pointer hover:underline">Account</span>
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white text-green-700 rounded shadow-md mt-2 w-36 z-50 flex flex-col">
              {!userEmail ? (
                <>
                  <Link to="/login" className="block px-4 py-2 hover:bg-green-700 hover:text-white">Login</Link>
                  <Link to="/signup" className="block px-4 py-2 hover:bg-green-700 hover:text-white">Sign Up</Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-left px-4 py-2 hover:bg-green-700 hover:text-white"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          <Link to="/cart" onClick={handleCartClick} className="relative text-white hover:text-black py-2 px-4">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-1 bg-black text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

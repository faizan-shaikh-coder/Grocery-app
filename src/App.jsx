import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './component/Navbar';
import Footer from './component/Footer';

import Home from './component/pages/Home';
import About from './component/pages/About';
import Cart from './component/pages/Cart';
import SignUp from './component/pages/SignUp';
import Login from './component/pages/LogIn';
import Admin from './component/pages/Admin';

import CategoryPage from './component/pages/CategoryPage';
import Vegetables from './component/pages/Vegetables';
import Fruits from './component/pages/Fruits';
import Nonveg from './component/pages/Nonveg';
import Grains from './component/pages/Grains';
import Dairy from './component/pages/Dairy';

const App = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />

        {/* Category Routes */}
        <Route path='/category/:categoryName' element={<CategoryPage />} />
        <Route path='/vegetable' element={<Vegetables />} />
        <Route path='/fruits' element={<Fruits />} />
        <Route path='/non-veg' element={<Nonveg />} />
        <Route path='/grains' element={<Grains />} />
        <Route path='/dairy' element={<Dairy />} />

        {/* Admin Route with Access Check */}
        <Route
          path='/admin'
          element={
            isAdmin ? (
              <Admin />
            ) : (
              <h1 className='text-center text-2xl mt-20 text-red-600'>
                Unauthorized Access
              </h1>
            )
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;

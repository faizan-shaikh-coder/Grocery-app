import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(!!email); 
  }, []);

  
  useEffect(() => {
    const handleStorageChange = () => {
      const email = localStorage.getItem("userEmail");
      setIsLoggedIn(!!email);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  
  useEffect(() => {
    if (isLoggedIn) {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn]);

  
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  const addToCart = (product, isLoggedInNow, navigate) => {
    if (!isLoggedInNow) {
      toast.warning("Please login to add items to cart.");
      navigate("/signup");
      return;
    }

    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      toast.info("This product is already in the cart.");
    } else {
      const itemToAdd = { ...product, quantity: 1 };
      setCartItems([...cartItems, itemToAdd]);
      toast.success("Item added to cart!");
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    toast.info("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

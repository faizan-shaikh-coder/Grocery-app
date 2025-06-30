import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';

    if (email) {
      setUserEmail(email);
      setIsAdmin(adminStatus);
    }

    const handleStorage = () => {
      const updatedEmail = localStorage.getItem('userEmail');
      const updatedIsAdmin = localStorage.getItem('isAdmin') === 'true';
      setUserEmail(updatedEmail);
      setIsAdmin(updatedIsAdmin);
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userEmail, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

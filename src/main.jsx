import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import CartProvider from './context/CartContext.jsx';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> 
        <CartProvider>
          <App />
          <ToastContainer position="top-right" autoClose={2000} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

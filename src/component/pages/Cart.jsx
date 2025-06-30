import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { db } from '../../firebase/firebaseconfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showPayment, setShowPayment] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const order = {
      items: cartItems,
      total: total,
      paymentMethod: "Cash on Delivery",
      createdAt: Timestamp.now(),
      status: "Pending",
      customerName: "Faizan Shaikh",
    };

    try {
      await addDoc(collection(db, "orders"), order);
      toast.success("🎉 Order placed successfully with Cash on Delivery!");
      clearCart();
      setShowPayment(false);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.info("Failed to place order. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600 text-xl">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Your Cart</h2>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4"
          >
            <img
              src={item.imageUrl || item.image || "https://via.placeholder.com/150"}
              alt={item.name}
              className="h-20 w-20 object-cover rounded"
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
              <div className="flex items-center justify-center sm:justify-start mt-2 space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="bg-gray-200 px-2 rounded text-xl"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 rounded text-xl"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total and Actions */}
      <div className="mt-8 text-center">
        <div className="text-lg font-bold mb-1">Total: ₹{total}</div>
        <div className="text-sm text-gray-500 mb-4">Payment Method: <strong>Cash on Delivery</strong></div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          {!showPayment ? (
            <button
              onClick={() => setShowPayment(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Payment Summary Box */}
      {showPayment && (
        <div className="mt-6 p-4 bg-gray-100 border rounded shadow-md">
          <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
          <p>Total to Pay: ₹{total}</p>
          <p className="mb-4">Method: <strong>Cash on Delivery</strong></p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm & Place Order
            </button>
            <button
              onClick={() => setShowPayment(false)}
              className="text-red-600 underline text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/init';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : [];
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    } else {
      fetchOrders();
    }
  }, [isAdmin, navigate]);

  const fetchOrders = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'orders'));
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(fetched);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl: '',
    description: '',
  });

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const newProduct = { ...form, id: Date.now() };
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
    toast.success(`✅ Added "${form.name}" to ${form.category}`);
    setForm({ name: '', category: '', price: '', imageUrl: '', description: '' });
  };

  const handleRemove = id => {
    const filtered = products.filter(p => p.id !== id);
    setProducts(filtered);
    localStorage.setItem('products', JSON.stringify(filtered));
    toast.success('🗑️ Product removed');
  };

  const handleOrderDone = async (id) => {
    try {
      await deleteDoc(doc(db, 'orders', id)); // Delete from Firebase
      const remaining = orders.filter(order => order.id !== id);
      setOrders(remaining);
      toast.success(`✅ Order ${id} marked as done`);
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('❌ Failed to delete order from Firebase');
    }
  };

 return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-6 bg-white rounded shadow-md">
      
      {/* Heading */}
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Add Product</h2>
      
      {/* Product Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="w-full border px-4 py-2 rounded text-sm sm:text-base" required />
        
        <select name="category" value={form.category} onChange={handleChange} className="w-full border px-4 py-2 rounded text-sm sm:text-base" required>
          <option value="">Select Category</option>
          <option value="vegetable">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="non-veg">Non-Veg</option>
          <option value="grains">Grains</option>
          <option value="dairy">Dairy</option>
        </select>
        
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border px-4 py-2 rounded text-sm sm:text-base" required />
        
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full border px-4 py-2 rounded text-sm sm:text-base" required />
        
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className="w-full border px-4 py-2 rounded text-sm sm:text-base" required />
        
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Add Product</button>
      </form>

      {/* Products Grid */}
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {products.length > 0 ? (
          products.map(p => (
            <div key={p.id} className="border rounded p-4 shadow flex flex-col">
              <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-gray-600">₹{p.price}</p>
              <p className="text-xs text-gray-500 capitalize">{p.category}</p>
              <p className="text-sm mt-2 flex-1">{p.description}</p>
              <button onClick={() => handleRemove(p.id)} className="mt-4 bg-red-600 text-white py-1 rounded hover:bg-red-700 transition">Remove</button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products added yet.</p>
        )}
      </div>

      {/* Orders Table */}
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">Customer Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-md text-sm sm:text-base">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Items</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order.id} className="text-center">
                  <td className="py-2 px-4 border break-words">{order.id}</td>
                  <td className="py-2 px-4 border">{order.customerName}</td>
                  <td className="py-2 px-4 border">
                    {order.items.map((item, i) => (
                      <div key={i}>{item.quantity}x {item.name}</div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border">₹{order.total}</td>
                  <td className="py-2 px-4 border text-yellow-600">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-between items-center">
                      {order.status}
                      <button
                        onClick={() => handleOrderDone(order.id)}
                        className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700 transition"
                      >
                        Done
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No orders yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Admin;

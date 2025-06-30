import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    setTimeout(() => {
      console.log("Form Submitted", form);
      toast.success("Thank you for contacting us.");
      setForm({ name: '', email: '', message: '' });
      setLoader(false);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-md rounded-lg p-4 sm:p-6 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center">Contact Us</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loader}
        >
          {loader ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>
          ) : (
            "Send Message"
          )}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Contact;

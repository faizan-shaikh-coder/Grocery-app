import React, { useState } from "react";
import { db } from "../../firebase/init";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const usersCollection = collection(db, "user");
      const snapshot = await getDocs(usersCollection);

      let userFound = false;

      snapshot.forEach((doc) => {
        const user = doc.data();
        if (user.email === form.email && user.password === form.password) {
          userFound = true;
          localStorage.setItem("userEmail", user.email);

          if (user.email === "adminme@gmail.com" && user.password === "user1234") {
            localStorage.setItem("isAdmin", "true");
          } else {
            localStorage.setItem("isAdmin", "false");
          }

          window.dispatchEvent(new Event("storage"));
        }
      });

      if (userFound) {
        toast.success("Login successful! Redirecting to home...", { autoClose: 1500 });
        setTimeout(() => navigate("/"), 2000);
      } else {
        await addDoc(usersCollection, {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("userEmail", form.email);
        localStorage.setItem("isAdmin", "false");
        window.dispatchEvent(new Event("storage"));

        toast.success("New user login saved! Redirecting to home...", { autoClose: 1500 });
        setTimeout(() => navigate("/"), 2000);
      }

    } catch (error) {
      toast.error("Login error");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <div className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

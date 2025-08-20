import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook
import "./auth.css";

const AuthPage = () => {
  const [showForm, setShowForm] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (type) => {
    try {
      const url = type === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const res = await axios.post("http://localhost:5000" + url, formData);
      setMessage(res.data.msg);

      if (type === "login") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/shop"); // ✅ redirect to shop page after login
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error occurred");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setMessage("Logged out successfully");
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold mb-5">VintageVault - Auth Page</h1>

      <div className="space-x-4">
        <button
          onClick={() => setShowForm("login")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
        <button
          onClick={() => setShowForm("signup")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Signup
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {showForm && (
        <div className="mt-6 border p-4 rounded shadow-md w-80">
          <h2 className="text-xl mb-4">
            {showForm === "signup" ? "Signup" : "Login"}
          </h2>
          {showForm === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded"
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-2 p-2 border rounded"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-2 p-2 border rounded"
            onChange={handleChange}
          />
          <button
            onClick={() => handleSubmit(showForm)}
            className="bg-indigo-500 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default AuthPage;

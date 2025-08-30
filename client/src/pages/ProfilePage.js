import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/"); // redirect if not logged in
      return;
    }

    // ✅ Try both id and _id (depending on how your login saves it)
    const userId = storedUser._id || storedUser.id;
    if (!userId) {
      console.error("No user ID found in localStorage:", storedUser);
      return;
    }

    fetchUser(userId);
  }, [navigate]);

  const fetchUser = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="border p-6 rounded shadow w-96 bg-white">
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p>
          <strong>Joined:</strong>{" "}
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;

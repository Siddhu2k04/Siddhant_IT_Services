import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Query admin collection for matching email
      const q = query(collection(db, "admin"), where("email", "==", email.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Admin not found");
        return;
      }

      // There should be only one admin with this email
      const adminDoc = querySnapshot.docs[0];
      const admin = adminDoc.data();

      if (password.trim() === admin.password.trim()) {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin/dashboard");
      } else {
        alert("Invalid admin password");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      alert("Firestore error");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

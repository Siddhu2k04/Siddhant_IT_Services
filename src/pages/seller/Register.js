import React, { useState } from "react";
import { auth, db, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../styles/Regester.css";

const SellerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "sellers", user.uid), {
        name,
        email,
        contactNumber: contact,
        isApproved: false
      });

      alert("Registered successfully! Wait for admin approval.");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  // Google registration
  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const docRef = doc(db, "sellers", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Create new seller
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          contactNumber: "",
          isApproved: false, // Wait for admin approval
        });
        alert("Registered with Google! Wait for admin approval.");
      } else {
        alert("Seller already exists. Please login.");
      }

      navigate("/seller-login");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="seller-register-page">
      <div className="seller-register-card">
        <h2>Seller Registration</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="text" placeholder="Contact Number" value={contact} onChange={e => setContact(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>

        <div className="divider">OR</div>

        <button className="google-btn" onClick={handleGoogleRegister}>
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default SellerRegister;

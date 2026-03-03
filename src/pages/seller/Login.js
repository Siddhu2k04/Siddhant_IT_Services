import React, { useState } from "react";
import { auth, db, googleProvider } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/Password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "sellers", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigate("/seller/seller-dashboard");
         // Direct login
      } else {
        alert("Seller not found. Please register first.");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const docRef = doc(db, "sellers", user.uid);
      const docSnap = await getDoc(docRef);

      // If seller does not exist, create new seller
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          contactNumber: "",
        });
        alert("Registered successfully!");
      }

    navigate("/seller/seller-dashboard");

// Direct login
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <div className="seller-login-page">
      <div className="seller-login-card">
        <h2>Seller Login</h2>

        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login with Email</button>
        </form>

        <div className="divider">OR</div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SellerLogin;

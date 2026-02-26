import React, { useState } from "react";
import { db } from "../config/firebase"; // Make sure your Firebase config is correct
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/HireUs.css";

const HireUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !projectDetails) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "hireRequests"), {
        name,
        email,
        projectDetails,
        createdAt: serverTimestamp(),
      });

      alert(`Thank you, ${name}! Your project request has been submitted.`);
      setName("");
      setEmail("");
      setProjectDetails("");
    } catch (error) {
      console.error("Error sending form data:", error);
      alert("Failed to submit request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="hireus-page">
      <div className="hireus-card">
        <h1>Hire Us</h1>
        <p className="hireus-intro">
          If you want to build a custom software project, web app, or mobile app, hire <strong>Siddhant IT Services</strong>. Tell us your project idea and we will make it real!
        </p>

        <form className="hireus-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Project Details"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HireUs;

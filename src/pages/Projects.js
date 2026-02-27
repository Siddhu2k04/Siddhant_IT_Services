import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc
} from "firebase/firestore";
import { db} from "../config/firebase";
import { openRazorpay } from "../utils/razorpay";
import "../styles/Projects.css";






const Projects = ({ darkMode }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchCategory, setSearchCategory] = useState("");


const [showForm, setShowForm] = useState(false); 
const [name, setName] = React.useState("");
const [email, setEmail] = React.useState("");
const [phone, setPhone] = React.useState("");
const [errors, setErrors] = React.useState({});

const validate = () => {
  let newErrors = {};

  // ===== FULL NAME VALIDATION =====
  const trimmedName = name.trim();

  if (!trimmedName) {
    newErrors.name = "Full name is required";
  } else if (trimmedName.length < 3) {
    newErrors.name = "Name must be at least 3 characters";
  } else if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
    newErrors.name = "Name should contain only letters and spaces";
  }

  // ===== EMAIL VALIDATION =====
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    newErrors.email = "Email address is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedEmail)
  ) {
    newErrors.email = "Enter a valid email address";
  }

  // ===== PHONE VALIDATION =====
  const trimmedPhone = phone.trim();

  if (!trimmedPhone) {
    newErrors.phone = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
    newErrors.phone =
      "Enter valid 10-digit Indian mobile number (starting with 6-9)";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}; 

  /* ================= FETCH APPROVED PROJECTS ================= */
  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(
        collection(db, "projects"),
        where("approved", "==", true)
      );

      const snapshot = await getDocs(q);
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    fetchProjects();
  }, []);




  

  /* ================= CATEGORY FILTER ================= */
  const filteredProjects = projects.filter((proj) =>
    proj.category
      ?.toLowerCase()
      .includes(searchCategory.toLowerCase())
  );

  return (
    <div className={`projects-container ${darkMode ? "dark" : ""}`}>
      <h2 className="page-title">Available Projects</h2>

      {/* SEARCH BOX */}
      <input
        type="text"
        className="category-search"
        placeholder="Search by category..."
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
      />

      {/* PROJECT GRID */}
      <div className="project-grid">
        {filteredProjects.length === 0 ? (
          <p className="no-projects">No matching projects found.</p>
        ) : (
          filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="project-card"
              onClick={() => setSelectedProject(proj)}
            >
              <img src={proj.imageUrl} alt={proj.title} />
              <h4>{proj.title}</h4>
              <p>{proj.category}</p>
              <p>{proj.price === 0 ? "Free" : `₹${proj.price}`}</p>
            </div>
          ))
        )}
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setSelectedProject(null)}>
              ✖
            </button>

            <img src={selectedProject.imageUrl} alt={selectedProject.title} />
            <h2>{selectedProject.title}</h2>

            <p><b>Category:</b> {selectedProject.category}</p>
            <p><b>Description:</b> {selectedProject.description}</p>
            <p><b>Seller:</b> {selectedProject.sellerName}</p>
            <p>
              <b>Price:</b>{" "}
              {selectedProject.price === 0
                ? "Free"
                : `₹${selectedProject.price}`}
            </p>

            {/* ALL BUTTONS KEPT */}
            <div className="project-links">
              <a
                href={selectedProject.livePreview}
                target="_blank"
                rel="noreferrer"
              >
                🌐 Live Preview
              </a>

              {selectedProject.videoDemo && (
                <a
                  href={selectedProject.videoDemo}
                  target="_blank"
                  rel="noreferrer"
                >
                  🎥 Video Demo
                </a>
              )}

         {!showForm ? (
  <button
    className="pay-btn"
    onClick={() => {
      if (selectedProject.price === 0) {
        window.open(selectedProject.githubLink, "_blank");
        return;
      }
      setShowForm(true); // 👈 show form after clicking
    }}
  >
    {selectedProject.price === 0
      ? "View GitHub"
      : "Buy & Unlock GitHub"}
  </button>
) : (
  <div className="payment-form">
<input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => {
    setName(e.target.value);
    setErrors({ ...errors, name: "" });
  }}
  className="payment-input"
/>
{errors.name && <p className="error">{errors.name}</p>}
<input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  }}
  className="payment-input"
/>
{errors.email && <p className="error">{errors.email}</p>}

<input
  type="tel"
  placeholder="WhatsApp Number"
  value={phone}
  maxLength="10"
  onChange={(e) => {
    setPhone(e.target.value.replace(/\D/g, "")); // only numbers
    setErrors({ ...errors, phone: "" });
  }}
  className="payment-input"
/>
{errors.phone && <p className="error">{errors.phone}</p>}


   <button
  className="pay-btn"
  onClick={() => {
    if (!validate()) return; // 👈 use proper validation

    openRazorpay({
      amount: selectedProject.price,
      onSuccess: async (response) => {

        await addDoc(collection(db, "payments"), {
          name,
          email,
          phone,
          projectId: selectedProject.id,
          amount: selectedProject.price,
          paymentId: response.razorpay_payment_id,
          status: "success",
          createdAt: new Date()
        });

        alert("Payment successful! GitHub unlocked 🔓");
        window.open(selectedProject.githubLink, "_blank");
      }
    });
  }}
>
  Confirm & Pay
</button>

  </div>
)}
             <a
  href={`tel:${selectedProject.contactNumber || "9518941034"}`}
>
  📞 Contact Now
</a>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

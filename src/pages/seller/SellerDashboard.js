import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../../styles/SellerDashboard.css";

const SellerDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [livePreview, setLivePreview] = useState("");
  const [videoDemo, setVideoDemo] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [price, setPrice] = useState(0);

  /* ================= AUTH ================= */
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const q = query(
        collection(db, "projects"),
        where("sellerId", "==", user.uid),
      );
      const snap = await getDocs(q);
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const payQ = query(
        collection(db, "payments"),
        where("sellerId", "==", user.uid),
        where("status", "==", "success"),
      );
      const paySnap = await getDocs(payQ);
      setPayments(paySnap.docs.map((d) => d.data()));
    };

    fetchData();
  }, [user]);

  /* ================= IMAGE UPLOAD ================= */
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=993bee2e792521121ff98fe387e92cff",
      { method: "POST", body: fd },
    );

    const data = await res.json();
    return data.data.url;
  };

  /* ================= ADD PROJECT ================= */
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!imageFile) return;

    try {
      setUploading(true);
      const imageUrl = await uploadImage(imageFile);

      await addDoc(collection(db, "projects"), {
        sellerId: user.uid,
        sellerName: user.email,
        title,
        description,
        category,
        imageUrl,
        livePreview,
        videoDemo,
        githubLink,
        price: Number(price),
        createdAt: new Date(),
      });

      alert("Project Added ✅");
      setActiveTab("projects");

      setTitle("");
      setDescription("");
      setCategory("");
      setImageFile(null);
      setLivePreview("");
      setVideoDemo("");
      setGithubLink("");
      setPrice(0);
    } catch (e) {
      alert("Upload Failed ❌");
    } finally {
      setUploading(false);
    }
  };

  /* ================= DELETE PROJECT ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete project?")) return;
    await deleteDoc(doc(db, "projects", id));
    setProjects((p) => p.filter((x) => x.id !== id));
    setSelectedProject(null);
  };

  const totalEarnings = payments.reduce((s, p) => s + p.amount, 0);

  if (!user) return <p className="center">Login Required</p>;

  return (
    <div className="seller-dashboard">
      {/* TABS */}
      <div className="dashboard-tabs">
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("add")}>Add Project</button>
        <button onClick={() => setActiveTab("projects")}>My Projects</button>
      </div>

      {/* ================= DASHBOARD ================= */}
      {activeTab === "dashboard" && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              📦 Projects
              <br />
              {projects.length}
            </div>
            <div className="stat-card">
              💰 Sales
              <br />
              {payments.length}
            </div>
            <div className="stat-card">
              ₹ Earnings
              <br />₹{totalEarnings}
            </div>
          </div>
        </>
      )}

      {/* ================= ADD PROJECT ================= */}
      {activeTab === "add" && (
        <form className="add-project-form" onSubmit={handleAddProject}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            className="scroll-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option>Mini Project</option>
            <option>Major Project</option>
            <option>Final Year Project</option>

            <option>Web Development</option>
            <option>Full Stack Development</option>
            <option>Android App</option>
            <option>AI / ML</option>

            <option>Data Science</option>
            <option>Cyber Security</option>
            <option>Blockchain</option>
            <option>Cloud Computing</option>

            <option>Python Project</option>
            <option>Java Project </option>

            <option>DataBase System </option>
          </select>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
          <input
            placeholder="Live Preview Link"
            value={livePreview}
            onChange={(e) => setLivePreview(e.target.value)}
          />
          <input
            placeholder="Video Demo Link"
            value={videoDemo}
            onChange={(e) => setVideoDemo(e.target.value)}
          />
          <input
            placeholder="GitHub Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price || ""}
            min="1"
            step="0.01"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || Number(value) > 0) {
                setPrice(value);
              }
            }}
          />
          <button disabled={uploading}>
            {uploading ? "Uploading..." : "Add Project"}
          </button>
        </form>
      )}

      {/* ================= PROJECTS ================= */}
      {activeTab === "projects" && (
        <div className="seller-projects">
          {projects.map((p) => (
            <div
              key={p.id}
              className="project-card"
              onClick={() => setSelectedProject(p)}
            >
              <img src={p.imageUrl} alt="" />
              <h4>{p.title}</h4>
              <p>₹{p.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)} // ✅ Close when clicking outside
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()} // ✅ Prevent close when clicking inside
          >
            {/* Close Button */}
            <button
              className="close-btn"
              onClick={() => setSelectedProject(null)}
            >
              &times;
            </button>

            <img src={selectedProject.imageUrl} alt="" />
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>

            <div className="project-links">
              <a
                href={selectedProject.livePreview}
                target="_blank"
                rel="noreferrer"
              >
                Live
              </a>
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <button
                className="delete-btn"
                onClick={() => handleDelete(selectedProject.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;

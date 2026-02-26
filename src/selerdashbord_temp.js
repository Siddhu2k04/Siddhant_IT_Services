import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../../styles/SellerDashboard.css";

const SellerDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [livePreview, setLivePreview] = useState("");
  const [videoDemo, setVideoDemo] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [price, setPrice] = useState(0);

  // 1️⃣ Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2️⃣ Fetch projects after user is loaded
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      const q = query(collection(db, "projects"), where("sellerId", "==", user.uid));
      const snapshot = await getDocs(q);
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProjects();
  }, [user]);

  // 3️⃣ Add new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, "projects"), {
        sellerId: user.uid,
        title,
        description,
        category,
        imageUrl,
        livePreview,
        videoDemo,
        githubLink,
        price: Number(price),
        sellerName: user.displayName || user.email,
        createdAt: new Date(),
      });

      alert("Project added successfully!");

      // Clear form
      setTitle(""); setDescription(""); setCategory("");
      setImageUrl(""); setLivePreview(""); setVideoDemo(""); setGithubLink(""); setPrice(0);

      // Refresh projects
      const q = query(collection(db, "projects"), where("sellerId", "==", user.uid));
      const snapshot = await getDocs(q);
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  if (!user) return <p style={{ textAlign: "center", marginTop: "50px" }}>Please login to see your dashboard.</p>;

  return (
    <div className="seller-dashboard">
      <h2>Welcome, {user.displayName || user.email}</h2>

      <form onSubmit={handleAddProject} className="add-project-form">
        <input type="text" placeholder="Project Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} required />
        <input type="text" placeholder="Live Preview Link" value={livePreview} onChange={e=>setLivePreview(e.target.value)} required />
        <input type="text" placeholder="Video Demo Link" value={videoDemo} onChange={e=>setVideoDemo(e.target.value)} />
        <input type="text" placeholder="GitHub Link" value={githubLink} onChange={e=>setGithubLink(e.target.value)} required />
        <input type="number" placeholder="Price (0 for Free)" value={price} onChange={e=>setPrice(e.target.value)} required />
        <button type="submit">Add Project</button>
      </form>

      <h3>Your Projects</h3>
      <div className="seller-projects">
        {projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          projects.map(proj => (
            <div key={proj.id} className="project-card">
              <img src={proj.imageUrl} alt={proj.title} />
              <h4>{proj.title}</h4>
              <p>Category: {proj.category}</p>
              <p>Price: {proj.price === 0 ? "Free" : `₹${proj.price}`}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;

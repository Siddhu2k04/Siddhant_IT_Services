import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const UploadProject = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [livePreview, setLivePreview] = useState("");
  const [videoDemo, setVideoDemo] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [price, setPrice] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        category,
        imageUrl,
        livePreview,
        videoDemo,
        githubLink,
        price,
        sellerName: user.displayName || user.email,
        contactNumber,
      });
      alert("Project uploaded successfully!");
      // Clear form
      setTitle(""); setDescription(""); setCategory(""); setImageUrl("");
      setLivePreview(""); setVideoDemo(""); setGithubLink(""); setPrice(""); setContactNumber("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Project</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
        <input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
        <input placeholder="Live Preview Link" value={livePreview} onChange={e => setLivePreview(e.target.value)} required />
        <input placeholder="Video Demo Link" value={videoDemo} onChange={e => setVideoDemo(e.target.value)} required />
        <input placeholder="GitHub Link" value={githubLink} onChange={e => setGithubLink(e.target.value)} required />
        <input type="number" placeholder="Price " value={price} onChange={e => setPrice(e.target.value)} required />
        <input placeholder="Contact Number" value={contactNumber} onChange={e => setContactNumber(e.target.value)} required />
        <button type="submit">Upload Project</button>
      </form>
    </div>
  );
};

export default UploadProject;

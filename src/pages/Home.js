import React from "react";      
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPython,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaAndroid 
} from "react-icons/fa";

import {
  SiFirebase,
  SiTensorflow,
  SiMongodb
} from "react-icons/si";

const categories = [
  { name: "Mini Project", img: "/categories/mini.png" },
  { name: "Major Project", img: "/categories/major.png" },
  { name: "Final Year Project", img: "/categories/finalyear.png" },

  { name: "Web Development", img: "/categories/web.png" },
  { name: "Full Stack Development", img: "/categories/fullstack.png" },
  { name: "Android App", img: "/categories/android.png" },
  { name: "AI / ML", img: "/categories/ai.png" },

  { name: "Data Science", img: "/categories/datascience.png" },
  { name: "Cyber Security", img: "/categories/cybersecurity.png" },
  { name: "Blockchain", img: "/categories/blockchain.png" },
  { name: "Cloud Computing", img: "/categories/cloud.png" },

  { name: "Python Project", img: "/categories/python.png" },
  { name: "Java Project", img: "/categories/java.png" },
  { name: "Database System", img: "/categories/database.png" }
];

const projects = [
  { name: "Library Management System", tech: "Java, SQLite", img: "/library.png" },
  { name: "Crop Disease Prediction", tech: "Python, ML", img: "crop.png" },
  { name: "File Sharing System", tech: "Firebase ", img: "filesharing.png" },
  { name: "Grampanchayat Portal", tech: "React, Firebase", img: "/grampanchyat.png" },
];

const Home = ({ darkMode }) => {
  const navigate = useNavigate();

  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Siddhant IT Services</h1>
        <p>Mini & Mega Projects | Ready College Projects | Learn & Earn</p>
        <div className="buttons">
          <button className="btn" onClick={() => navigate("/projects")}>View Projects</button>
          <button className="btn" onClick={() => navigate("/hire-us")}>Hire Custom Project</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Explore by Category</h2>
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <div className="category-card" key={idx}>
              <img src={cat.img} alt={cat.name} />
              <h3>{cat.name}</h3>
              <button
                className="btn"
                onClick={() =>
                  navigate(`/projects?category=${encodeURIComponent(cat.name)}`)
                }
              >
                View Projects
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>✅ 100% Working Projects</h3>
            <p>All projects are fully functional with source code.</p>
          </div>
          <div className="feature-card">
            <h3>✅ Affordable Pricing</h3>
            <p>Get projects without breaking your budget.</p>
          </div>
          <div className="feature-card">
            <h3>✅ Documentation & PPT</h3>
            <p>Complete project report and presentation included.</p>
          </div>
          <div className="feature-card">
            <h3>✅ On-Time Delivery</h3>
            <p>We ensure your projects are delivered on schedule.</p>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="projects-showcase">
        <h2>Recent Projects</h2>
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <div className="project-card" key={idx}>
              <img src={proj.img} alt={proj.name} />
              <h3>{proj.name}</h3>
              <p>{proj.tech}</p>
              <button className="showcase_btn" onClick={() => navigate("/projects")}>View Project</button>
            </div>
          ))}
        </div>
      </section>

   {/* Testimonials Section */}
<section className="testimonials">
  <h2>What Our Clients Say</h2>
  <div className="testimonial-cards">
    <div className="testimonial-card">
      <p>⭐⭐⭐⭐⭐</p>
      <p>"Got my final year project on time with full explanation. Excellent guidance and support throughout the project."</p>
      <h4>— Saiprasad</h4>
    </div>

    <div className="testimonial-card">
      <p>⭐⭐⭐⭐⭐</p>
      <p>"Amazing experience! The project was delivered perfectly, and every detail was explained thoroughly."</p>
      <h4>— Rushikesh</h4>
    </div>

    <div className="testimonial-card">
      <p>⭐⭐⭐⭐⭐</p>
      <p>"Professional and fast service. They helped me understand all the concepts and implement them successfully."</p>
      <h4>— Yash</h4>
    </div>

    <div className="testimonial-card">
      <p>⭐⭐⭐⭐⭐</p>
      <p>"Highly recommend! Clear explanations, timely delivery, and excellent support for all project requirements."</p>
      <h4>— Prathama</h4>
    </div>
  </div>
</section>

{/* ================= Technologies Section ================= */}
<section className="technologies-section">
  <h2>Technologies We Use</h2>

  <div className="technologies-grid">

    <div className="tech-card">
      <FaHtml5 className="tech-icon html" />
      <p>HTML</p>
    </div>

    <div className="tech-card">
      <FaCss3Alt className="tech-icon css" />
      <p>CSS</p>
    </div>

    <div className="tech-card">
      <FaJs className="tech-icon js" />
      <p>JavaScript</p>
    </div>

    <div className="tech-card">
      <FaReact className="tech-icon react" />
      <p>React</p>
    </div>

    <div className="tech-card">
      <SiFirebase className="tech-icon firebase" />
      <p>Firebase</p>
    </div>

    <div className="tech-card">
      <FaPython className="tech-icon python" />
      <p>Python</p>
    </div>

    <div className="tech-card">
      <FaJava className="tech-icon java" />
      <p>Java</p>
    </div>

    <div className="tech-card">
  <FaAndroid className="tech-icon android" />
  <p>Android Studio</p>
</div>



    <div className="tech-card">
      <SiTensorflow className="tech-icon ml" />
      <p>Machine Learning</p>
    </div>

  
    <div className="tech-card">
      <SiMongodb className="tech-icon mongo" />
      <p>MongoDB</p>
    </div>

    <div className="tech-card">
      <FaGitAlt className="tech-icon git" />
      <p>Git</p>
    </div>

    <div className="tech-card">
      <FaGithub className="tech-icon github" />
      <p>GitHub</p>
    </div>

  </div>
</section>
      {/* Contact / Call to Action */}
      <section className="contact-cta">
        <h2>Have a Project Idea?</h2>
        <p>Contact us now for custom projects or ready-made solutions.</p>
        <div className="buttons">
          <a href="tel:+919518941034" className="btn">Call Now</a>
          <a href="https://wa.me/919518941034" target="_blank" rel="noopener noreferrer" className="btn">WhatsApp</a>
        </div>
      </section>

    </div>
  );
};

export default Home;

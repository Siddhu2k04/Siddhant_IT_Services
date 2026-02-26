import React from "react";      
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const categories = [
  { name: "Web Development", img: "/categories/web.png" },
  { name: "Android Apps", img: "/categories/android.png" },
  { name: "AI / ML", img: "/categories/ai.png" },
  { name: "React JS", img: "/categories/react.png" },
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


      {/* Contact / Call to Action */}
      <section className="contact-cta">
        <h2>Have a Project Idea?</h2>
        <p>Contact us now for custom projects or ready-made solutions.</p>
        <div className="buttons">
          <a href="tel:+919518941034" className="btn">Call Now</a>
          <a href="https://wa.me/919518941034" target="_blank" className="btn">WhatsApp</a>
        </div>
      </section>

    </div>
  );
};

export default Home;

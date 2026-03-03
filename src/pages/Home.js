import React from "react";      
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
 import { useEffect, useState } from "react";

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
  { name: "Python Project", img: "/categories/python.png" },
  { name: "Java Project", img: "/categories/java.png" },
  { name: "Database System", img: "/categories/database.png" }
];


  const words = [
  "Mini & Final Year Projects",
  "Custom Software Development",
  "Source Code + Report + PPT",
  "Full Explanation Support"
];


const Home = ({ darkMode }) => {
  const navigate = useNavigate();




const [text, setText] = useState("");
const [wordIndex, setWordIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);
const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
  const currentWord = words[wordIndex];
  let speed = isDeleting ? 50 : 100;

  const timer = setTimeout(() => {
    if (!isDeleting) {
      setText(currentWord.substring(0, charIndex + 1));
      setCharIndex(charIndex + 1);

      if (charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      setText(currentWord.substring(0, charIndex - 1));
      setCharIndex(charIndex - 1);

      if (charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }
  }, speed);

  return () => clearTimeout(timer);
}, [charIndex, isDeleting, wordIndex ]);


  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>

    

{/* Ultra Modern Hero */}
<section className="hero">
  <div className="hero-content">

    <h1>
      Welcome to <span>Siddhant IT Services</span>
    </h1>

    <h2 className="typing-text">
      {text}
    </h2>

    <p>
      We provide ready college projects, custom development,
      full documentation, and expert explanation support.
    </p>

    <div className="hero-buttons">
      <button className="btn primary" onClick={() => navigate("/projects")}>
        View Projects
      </button>
      <button className="btn secondary" onClick={() => navigate("/hire-us")}>
        Hire Custom Project
      </button>
    </div>

  </div>
</section>


<a
  href="tel:+919518941034"
  className="floating-call"
>
  📞
</a>

<a
  href="https://wa.me/919518941034"
  className="floating-whatsapp"
  target="_blank"
  rel="noopener noreferrer"
>
  💬
</a>


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
{/* Pricing Section */}
<section className="pricing">
  <h2>Our Pricing</h2>

  <div className="price-card">
    <h3>Basic Package</h3>
    <h4>Mini Project</h4>
    <h2>₹999</h2>
    <p>✔ Source Code</p>
    <p>✔ Project Report</p>
    <p>✔ PPT</p>
    <button
      className="btn"
      onClick={() =>
        navigate(`/projects?category=${encodeURIComponent("Mini Project")}`)
      }
    >
      Get Started
    </button>
  </div>

  <div className="price-card standard">
    <h3>Standard Package</h3>
    <h4>Major Project</h4>
    <h2>₹2499</h2>
    <p>✔ Source Code</p>
    <p>✔ Report + PPT</p>
    <p>✔ Basic Customization</p>
    <p>✔ Explanation Support</p>
    <button
      className="btn"
      onClick={() =>
        navigate(`/projects?category=${encodeURIComponent("Major Project")}`)
      }
    >
      Get Started
    </button>
  </div>

  <div className="price-card premium">
    <h3>Premium Package</h3>
    <h4>Final Year Project</h4>
    <h2>₹4999</h2>
    <p>✔ Full Custom Project</p>
    <p>✔ Complete Documentation</p>
    <p>✔ Viva Explanation</p>
    <p>✔ Lifetime Support</p>
    <button
      className="btton"
      onClick={() =>
        navigate(`/projects?category=${encodeURIComponent("Final Year Project")}`)
      }
    >
      Get Started
    </button>
  </div>
</section>


<section className="how-it-works">
  <h2>How It Works?</h2>

  <div className="process-container">

    {/* Buying Process */}
    <div className="process-box">
      <h3>🎓 For Students (Buy Project)</h3>

      <div className="step">
        <span>1</span>
        <p>Choose your project category.</p>
      </div>

      <div className="step">
        <span>2</span>
        <p>Confirm details & make payment.</p>
      </div>

      <div className="step">
        <span>3</span>
        <p>Receive source code & documentation.</p>
      </div>

      <div className="step">
        <span>4</span>
        <p>Get explanation support for viva.</p>
      </div>
    </div>

    {/* Selling Process */}
    <div className="process-box sell">
      <h3>💼 For Developers (Sell Project)</h3>

      <div className="step">
        <span>1</span>
        <p>Submit your project details.</p>
      </div>

      <div className="step">
        <span>2</span>
        <p>We review & approve your project.</p>
      </div>

      <div className="step">
        <span>3</span>
        <p>Your project gets listed on our platform.</p>
      </div>

      <div className="step">
        <span>4</span>
        <p>Earn money on every successful sale.</p>
      </div>
    </div>

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



      <section className="faq">
  <h2>Frequently Asked Questions</h2>

  <details>
    <summary>Do you provide full source code and documentation?</summary>
    <p>
      Yes, we provide complete source code along with project report,
      documentation, PPT, and database files.
    </p>
  </details>

  <details>
    <summary>Will you explain the project for viva and presentation?</summary>
    <p>
      Absolutely! We guide you step-by-step and explain the complete
      project logic so you can confidently answer in viva.
    </p>
  </details>

  <details>
    <summary>Can I customize the project according to my requirements?</summary>
    <p>
      Yes, we provide full customization including feature changes,
      UI updates, and technology upgrades.
    </p>
  </details>

  <details>
    <summary>Which technologies do you provide projects in?</summary>
    <p>
      We provide projects in React, Python, Java, Android, AI/ML,
      Firebase, MongoDB, and many more modern technologies.
    </p>
  </details>

  <details>
    <summary>How long does delivery take?</summary>
    <p>
      Ready-made projects are delivered instantly. Custom projects
      usually take 2–5 days depending on complexity.
    </p>
  </details>

  <details>
    <summary>Do you provide support after delivery?</summary>
    <p>
      Yes, we provide post-delivery support to fix issues and guide
      you whenever needed.
    </p>
  </details>

  <details>
    <summary>Is the project 100% working and tested?</summary>
    <p>
      Yes, all projects are fully tested and working before delivery.
      We ensure quality and proper execution.
    </p>
  </details>

  <details>
    <summary>What is the payment process?</summary>
    <p>
      You can pay via UPI, bank transfer, or online payment.
      After payment confirmation, the project is delivered immediately.
    </p>
  </details>
</section>

    </div>
  );
};

export default Home;

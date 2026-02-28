import React from "react";
import "../styles/About.css";
import profileImg from "../assets/siddhant.jpg"; // Add your profile image in src/assets

const About = () => {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>About Siddhant IT Services</h1>

        <div className="about-intro">
          <img src={profileImg} alt="Siddhant Sonawane" className="profile-img" />
          <div className="intro-text">
            <p>
              Hello! I am <strong>Siddhant Sonawane</strong>, a Computer Science student and the CEO of <strong>Siddhant IT Services</strong>. 
              Our mission is to help students, startups, and businesses with real-world projects in software development, web apps, mobile apps, and AI/ML solutions.
            </p>
            <p>
              With a passion for technology and innovation, we strive to deliver high-quality, customized projects tailored to our clients' needs.
            </p>
          </div>
        </div>

        <div className="about-services">
          <h2>What We Offer</h2>
          <ul>
            <li>Custom Web Development Projects</li>
            <li>Mobile App Development (Android/iOS)</li>
            <li>AI/ML Projects & Solutions</li>
            <li>Startup Project Guidance</li>
            <li>Student Mini & Mega Projects</li>
          </ul>
        </div>

        <div className="about-success">
          <h2>Success Stories</h2>
          <div className="success-cards">
            <div className="success-card">
              <h3>Startup Website Launch</h3>
              <p>Helped a local startup launch their website in just 2 weeks.</p>
            </div>
            <div className="success-card">
              <h3>AI Project for College</h3>
              <p>Guided students to create an AI-based attendance system for their college project.</p>
            </div>
            <div className="success-card">
              <h3>Mobile App Deployment</h3>
              <p>Developed and deployed a React Native mobile app for a client with 500+ downloads.</p>
            </div>
          </div>
        </div>

        <div className="about-contact">
  <h2>Contact Me</h2>
  <p>
    Want to work with us on your project? Reach out to me at:{" "}
    <a href="tel:9518941034"><strong>9518941034</strong></a>{" "}
    or email:{" "}
   <a href="https://mail.google.com/mail/?view=cm&fs=1&to=siddhantitservices2024@gmail.com" target="_blank">
  <strong>siddhantitservices2024@gmail.com</strong>
</a>
  </p>
</div>

      </div>
    </div>
  );
};

export default About;

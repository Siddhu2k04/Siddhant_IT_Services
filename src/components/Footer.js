import "../styles/Footer.css";

const Footer = ({ darkMode }) => {
  return (
    <footer className={`footer ${darkMode ? "dark" : ""}`}>
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2>Siddhant IT Services</h2>
          <p>
            We build professional software solutions, college projects,
            startups MVPs, and custom applications with modern technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/hire-us">Hire Us</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>Web Development</li>
            <li>Android App Development</li>
            <li>AI / ML Projects</li>
            <li>Final Year Projects</li>
            <li>Custom Software</li>
          </ul>
        </div>

       {/* Contact Section */}
<div className="footer-section contact">
  <h3>Contact</h3>

  <a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=siddhantitservices2024@gmail.com"
  target="_blank" rel="noopener noreferrer">
  📧siddhantitservices2024@gmail.com
</a>

  <p>
    📞 <a href="tel:+919518941034">+91 95189 41034</a>
  </p>

  <p>
    📍 <a 
          href="https://maps.app.goo.gl/cCpXPKgpyVHsP9Gg7" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Chhatrapati Sambhajinagar ,
          India
        </a>
  </p>

  <p>
    💻 <a href="https://www.linkedin.com/company/siddhant-it-services/?viewAsMember=true" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  </p>

  <p>
    🌐 <a href="https://siddhant-it-services.vercel.app/" target="_blank" rel="noopener noreferrer">Website</a>
  </p>
</div>


      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Siddhant IT Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

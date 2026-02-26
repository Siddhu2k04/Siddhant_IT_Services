import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll && currentScroll > 70) {
        // scrolling down
        setHideHeader(true);
      } else {
        // scrolling up
        setHideHeader(false);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header 
        ${darkMode ? "dark" : ""} 
        ${hideHeader ? "hide" : ""}`}
    >
    <div className="logo-container">
  <img
    src={darkMode ? "/darklogo.png" : "/logo.png"}
    alt="Logo"
    className="logo-img"
  />
  <span className="logo-text">Siddhant IT Services</span>
</div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <ul className="nav">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/projects" onClick={toggleMenu}>Projects</Link></li>
          <li><Link to="/become-seller" onClick={toggleMenu}>Become a Seller</Link></li>
          <li><Link to="/hire-us" onClick={toggleMenu}>Hire Us</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li><Link to="/admin/login" onClick={toggleMenu}>Admin</Link></li>

          <li>
            <button className="dark-toggle" onClick={toggleDarkMode}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
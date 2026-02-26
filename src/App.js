import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import HireUs from "./pages/HireUs";
import Contact from "./pages/Contact";

import BecomeSeller from "./pages/seller/BecomeSeller";
import SellerRegister from "./pages/seller/Register";
import SellerLogin from "./pages/seller/Login";
import SellerDashboard from "./pages/seller/SellerDashboard";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle function
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Persist dark mode in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    // Add dark class to body for global dark mode
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  return (
    <Router>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/about" element={<About darkMode={darkMode} />} />
        <Route path="/projects" element={<Projects darkMode={darkMode} />} />
        <Route path="/hire-us" element={<HireUs darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} />
        <Route path="/become-seller" element={<BecomeSeller darkMode={darkMode} />} />
        <Route path="/seller/register" element={<SellerRegister darkMode={darkMode} />} />
        <Route path="/seller/login" element={<SellerLogin  darkMode={darkMode}/>} />
         <Route path="/seller/seller-dashboard" element={<SellerDashboard darkMode={darkMode} />} />
        <Route path="/admin/login" element={<AdminLogin darkMode={darkMode} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard darkMode={darkMode} />} />

      </Routes>
      <Footer darkMode={darkMode} />
    </Router>
  );
}

export default App;

import React from "react";
import {
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/Contact.css";

const Follow = () => {
  return (
    <div className="follow-page">
      <div className="follow-container">
        <h1 className="follow-title">Follow Us</h1>

        <div className="social-icons">

          <a
            href="https://wa.me/919518941034"
            target="_blank"
            rel="noopener noreferrer"
            className="icon whatsapp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://www.linkedin.com/company/siddhant-it-services/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon linkedin"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com/siddhant_it_services"
            target="_blank"
            rel="noopener noreferrer"
            className="icon instagram"
          >
            <FaInstagram />
          </a>

         

          <a
            href="https://github.com/Siddhu2k04"
            target="_blank"
            rel="noopener noreferrer"
            className="icon github"
          >
            <FaGithub />
          </a>

   

<a
  href="https://x.com/Siddhant_2k04"
  target="_blank"
  rel="noopener noreferrer"
  className="icon twitter"
>
  <FaXTwitter />
</a>

        </div>
      </div>
    </div>
  );
};

export default Follow;
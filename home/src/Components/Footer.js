import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="logo-container">
        <img src="/ResumeLogo.png" alt="Company Logo" style={{ maxWidth: '40%', height: 'auto' }} />
      </div>
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/pricing">Pricing</a>
          <a href="/terms">Terms and Conditions</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="centered-text">
          <p>Made with ❤️ in Kolkata, India</p>
        </div>
      </div>
      <div className="copyright-text">
        <p>&copy; {new Date().getFullYear()} ResumeSnap. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

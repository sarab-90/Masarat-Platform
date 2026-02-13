import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Masarat</h2>
          <p>Luxury outdoor experiences designed for elegance and adventure.</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <a href="/">Home</a>
          <a href="/activities">Activities</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="icons">
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Masarat. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

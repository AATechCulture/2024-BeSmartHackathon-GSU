import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* Navigation Bar in Footer */}
      <nav className="footer-nav">
        <ul className="footer-links">
          <li>
            <Link to="/">Overview</Link>
          </li>
          <li>
            <Link to="/budgeting">Budgeting</Link>
          </li>
          <li>
            <Link to="/Investment">Investment</Link>
          </li>
          <li>
            <Link to="/Sign Up">Sign Up</Link>
          </li>
        </ul>
      </nav>

      {/* Footer Content */}
      <div className="footer-content">
        <p>© 2024 sAIve. All rights reserved.</p>
        <p>
          Follow us on:{" "}
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>{" "}
          |{" "}
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            Twitter
          </a>{" "}
          |{" "}
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

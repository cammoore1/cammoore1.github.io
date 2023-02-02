import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-link">
            About Me
          </Link>
          <Link to="projects" className="navbar-link">
            Projects
          </Link>
          <Link to="projects/resume" className="navbar-link">
            Resume
          </Link>
          <a
            href="https://github.com/cammoore1"
            target="_blank"
            rel="noreferrer"
            className="navbar-link"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/cameron-moore-aab0b9211/"
            target="_blank"
            rel="noreferrer"
            className="navbar-link"
          >
            LinkedIn
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

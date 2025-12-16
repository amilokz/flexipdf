import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import * as bootstrap from "bootstrap"; // important

function Navbar() {
  useEffect(() => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach((dropdownToggleEl) => {
      new bootstrap.Dropdown(dropdownToggleEl);
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">FlexiPDF</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chatbot">Chatbot</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="toolsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tools
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="toolsDropdown">
                <li><NavLink className="dropdown-item" to="/pdf-to-word">PDF → Word</NavLink></li>
                <li><NavLink className="dropdown-item" to="/word-to-pdf">Word → PDF</NavLink></li>
                <li><NavLink className="dropdown-item" to="/pdf-to-image">PDF → Image</NavLink></li>
                <li><NavLink className="dropdown-item" to="/images-to-pdf">Images → PDF</NavLink></li>
                <li><NavLink className="dropdown-item" to="/merge-pdf">Merge PDFs</NavLink></li>
                <li><NavLink className="dropdown-item" to="/split-pdf">Split PDFs</NavLink></li>
                <li><NavLink className="dropdown-item" to="/compress-pdf">Compress PDFs</NavLink></li>
                <li><NavLink className="dropdown-item" to="/rotate-pdf">Rotate PDFs</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

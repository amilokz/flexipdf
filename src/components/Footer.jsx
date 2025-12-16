import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} FlexiPDF. All rights reserved.</p>
        <p className="mb-0">
          Made with ❤️ by <a href="#" className="text-light text-decoration-underline">ALI</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;


import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="app-Footer">
      <div className="Footer-inner">
        <p>© {new Date().getFullYear()} My Course Dashboard WEBD172</p>
        
       <p> <nav className="Footer-links" aria-label="Footer links">
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
          <a href="/">Contact</a>
        </nav>
        </p>
        
      </div>
    </footer>
  );
}
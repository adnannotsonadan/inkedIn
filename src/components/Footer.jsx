import React from "react";
import { NavLink } from "react-router-dom";
import { Zap, MapPin, Phone, Mail, Globe, Share2, AtSign } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <Zap size={18} className="footer__logo-icon" />
            INKED
          </div>
          <p className="footer__tagline">
            Premium tattoo artistry crafted with passion, precision, and purpose.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram"><AtSign size={18} /></a>
            <a href="#" aria-label="Facebook"><Globe size={18} /></a>
            <a href="#" aria-label="Share"><Share2 size={18} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/artists">Artists</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Custom Designs</a></li>
            <li><a href="#">Cover-Ups</a></li>
            <li><a href="#">Touch-Ups</a></li>
            <li><a href="#">Consultations</a></li>
            <li><a href="#">Aftercare</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li><MapPin size={14} /> 42 Dark Alley, Brooklyn, NY</li>
            <li><Phone size={14} /> +1 (555) 000-1234</li>
            <li><Mail size={14} /> hello@inkedstudio.com</li>
          </ul>
          <div className="footer__hours">
            <span>Mon – Sat: 10am – 9pm</span>
            <span>Sun: 12pm – 6pm</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} INKED Studio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

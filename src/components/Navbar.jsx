import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/artists", label: "Artists" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          <Zap size={20} className="navbar__logo-icon" />
          INKED
        </NavLink>

        {/* Desktop links */}
        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className="navbar__cta" onClick={() => navigate("/booking")}>
          Book Appointment
        </button>

        {/* Hamburger */}
        <button className="navbar__hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${open ? "navbar__mobile--open" : ""}`}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""}`
            }
            onClick={closeMenu}
          >
            {l.label}
          </NavLink>
        ))}
        <button
          className="navbar__cta navbar__cta--mobile"
          onClick={() => { navigate("/booking"); closeMenu(); }}
        >
          Book Appointment
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

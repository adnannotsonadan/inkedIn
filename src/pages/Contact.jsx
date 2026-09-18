import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, AtSign, Globe, Share2, Send } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="contact-page">
      <div className="page-hero">
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <SectionTitle subtitle="Get In Touch" title="Contact Us" />
        </div>
      </div>

      <div className="container section">
        <div className="contact__grid">
          {/* Info */}
          <div className="contact__info">
            <h3 className="contact__info-title">Studio Info</h3>

            <div className="contact__info-items">
              <div className="contact__info-item">
                <MapPin size={18} className="contact__info-icon" />
                <div>
                  <strong>Address</strong>
                  <span>42 Dark Alley, Brooklyn, NY 11201</span>
                </div>
              </div>
              <div className="contact__info-item">
                <Phone size={18} className="contact__info-icon" />
                <div>
                  <strong>Phone</strong>
                  <span>+1 (555) 000-1234</span>
                </div>
              </div>
              <div className="contact__info-item">
                <Mail size={18} className="contact__info-icon" />
                <div>
                  <strong>Email</strong>
                  <span>hello@inkedstudio.com</span>
                </div>
              </div>
            </div>

            <div className="contact__hours">
              <Clock size={16} className="contact__info-icon" />
              <div>
                <strong>Opening Hours</strong>
                <ul>
                  <li><span>Monday – Friday</span><span>10:00 – 21:00</span></li>
                  <li><span>Saturday</span><span>10:00 – 22:00</span></li>
                  <li><span>Sunday</span><span>12:00 – 18:00</span></li>
                </ul>
              </div>
            </div>

            <div className="contact__socials">
              <a href="#" aria-label="Instagram"><AtSign size={18} /></a>
              <a href="#" aria-label="Facebook"><Globe size={18} /></a>
              <a href="#" aria-label="Share"><Share2 size={18} /></a>
            </div>
          </div>

          {/* Form */}
          <div className="contact__form-wrap">
            {sent ? (
              <div className="contact__success">
                <Send size={36} className="contact__success-icon" />
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <Button variant="ghost" onClick={() => setSent(false)}>Send Another</Button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <h3 className="contact__form-title">Send a Message</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="c-name">Full Name</label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-email">Email</label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="c-subject">Subject</label>
                  <input
                    id="c-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your idea..."
                    required
                  />
                </div>
                <Button type="submit" variant="primary">
                  <Send size={15} /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;

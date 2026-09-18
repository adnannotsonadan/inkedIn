import React from "react";
import { Shield, Eye, Heart, Zap } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import "./About.css";

const steps = [
  { num: "01", title: "Consultation", desc: "We sit down with you to understand your vision, placement, and size preferences." },
  { num: "02", title: "Custom Design", desc: "Your artist sketches a bespoke design tailored exactly to your brief." },
  { num: "03", title: "Approval", desc: "You review and approve the design before any needle touches skin." },
  { num: "04", title: "Tattooing", desc: "Your artist works with precision in our sterile, comfortable studio environment." },
  { num: "05", title: "Aftercare", desc: "We provide a full aftercare kit and guide to ensure perfect healing." },
];

const About = () => {
  return (
    <main className="about-page">
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <SectionTitle subtitle="Our Story" title="About INKED" />
        </div>
      </div>

      {/* Story */}
      <section className="section container">
        <div className="about__story">
          <div className="about__story-text">
            <span className="about__label">Est. 2014</span>
            <h2 className="about__heading">A Decade of<br />Art on Skin</h2>
            <p>
              INKED was born in a small Brooklyn basement in 2014. What started as a single
              artist with a handful of loyal clients has grown into a celebrated studio with
              a team of four world-class tattoo artists.
            </p>
            <p>
              We believe a tattoo is more than ink — it is a permanent piece of personal
              mythology. Our mission is to create that piece with the care, craft, and
              creativity it deserves.
            </p>
            <p>
              Over the past decade we have tattooed thousands of clients from all walks
              of life and built a community rooted in respect for the art form.
            </p>
          </div>
          <div className="about__story-image">
            <img
              src="https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=700&q=80"
              alt="Studio interior"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about__mission">
        <div className="container">
          <div className="about__mission-inner">
            <div className="about__mission-card">
              <Eye size={28} />
              <h3>Our Vision</h3>
              <p>To be the studio where art and identity meet — a place where every client leaves feeling truly seen.</p>
            </div>
            <div className="about__mission-card">
              <Heart size={28} />
              <h3>Our Mission</h3>
              <p>To deliver bespoke tattoo experiences with uncompromising artistic integrity and exceptional client care.</p>
            </div>
            <div className="about__mission-card">
              <Zap size={28} />
              <h3>Our Values</h3>
              <p>Creativity, craftsmanship, collaboration, and a relentless pursuit of excellence in every single piece.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hygiene & Safety */}
      <section className="section container">
        <SectionTitle subtitle="Your Safety" title="Hygiene & Care" />
        <div className="about__hygiene">
          <div className="about__hygiene-image">
            <img
              src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=700&q=80"
              alt="Clean studio"
            />
          </div>
          <div className="about__hygiene-list">
            {[
              "Single-use, sterile needles — never reused",
              "Medical-grade ink from certified suppliers",
              "Full PPE worn by all artists during sessions",
              "Autoclave-sterilised equipment after every client",
              "Regular deep-cleans of all studio surfaces",
              "COVID-safe protocols always maintained",
            ].map((item, i) => (
              <div className="about__hygiene-item" key={i}>
                <Shield size={16} className="about__hygiene-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section about__process-section">
        <div className="container">
          <SectionTitle subtitle="How It Works" title="The Process" />
          <div className="about__process">
            {steps.map((s) => (
              <div className="about__step" key={s.num}>
                <span className="about__step-num">{s.num}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio images */}
      <section className="about__studio-gallery">
        <img src="https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&q=80" alt="Studio" />
        <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80" alt="Tattoo work" />
        <img src="https://images.unsplash.com/photo-1590246814883-57c511e86a45?w=600&q=80" alt="Artist" />
        <img src="https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&q=80" alt="Design" />
      </section>
    </main>
  );
};

export default About;

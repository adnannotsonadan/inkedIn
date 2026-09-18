import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Award, Sparkles, Zap, ArrowRight, ChevronDown } from "lucide-react";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import TattooCard from "../components/TattooCard";
import ArtistCard from "../components/ArtistCard";
import { tattoos } from "../data/tattoos";
import { artists } from "../data/artists";
import "./Home.css";

const featuredTattoos = tattoos.slice(0, 6);

const whyItems = [
  {
    icon: <Award size={32} />,
    title: "Experienced Artists",
    desc: "Over 30 combined years of professional tattooing expertise.",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Custom Designs",
    desc: "Every piece is drawn from scratch to match your vision.",
  },
  {
    icon: <Shield size={32} />,
    title: "Hygienic Studio",
    desc: "Sterile, single-use needles and medical-grade equipment.",
  },
  {
    icon: <Zap size={32} />,
    title: "Premium Equipment",
    desc: "Top-tier machines and inks sourced from the best suppliers.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1600&q=80"
            alt="Tattoo studio"
          />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <span className="hero__eyebrow">Premium Tattoo Studio</span>
          <h1 className="hero__headline">
            YOUR STORY.<br />
            <span className="hero__headline--accent">INKED</span> FOREVER.
          </h1>
          <p className="hero__sub">
            Where skin becomes canvas. We craft bespoke tattoos that tell your story
            with precision, passion, and artistry.
          </p>
          <div className="hero__actions">
            <Button variant="primary" onClick={() => navigate("/booking")}>
              Book an Appointment
            </Button>
            <Button variant="outline" onClick={() => navigate("/gallery")}>
              Explore Gallery
            </Button>
          </div>
        </div>
        <a href="#featured" className="hero__scroll">
          <ChevronDown size={20} />
          <span>Scroll</span>
        </a>
      </section>

      {/* Featured Tattoos */}
      <section className="section featured" id="featured">
        <div className="container">
          <SectionTitle subtitle="Our Work" title="Featured Designs" />
          <div className="grid-3">
            {featuredTattoos.map((t) => (
              <TattooCard key={t.id} tattoo={t} onClick={() => navigate("/gallery")} />
            ))}
          </div>
          <div className="section__cta">
            <Button variant="ghost" onClick={() => navigate("/gallery")}>
              View Full Gallery <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Artists */}
      <section className="section artists-section">
        <div className="container">
          <SectionTitle subtitle="The Team" title="Meet Our Artists" />
          <div className="grid-4">
            {artists.map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
          <div className="section__cta">
            <Button variant="ghost" onClick={() => navigate("/artists")}>
              View All Artists <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-section">
        <div className="container">
          <SectionTitle subtitle="Why Us" title="The INKED Difference" />
          <div className="why-grid">
            {whyItems.map((item, i) => (
              <div className="why-card" key={i}>
                <div className="why-card__icon">{item.icon}</div>
                <h3 className="why-card__title">{item.title}</h3>
                <p className="why-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-banner__bg">
          <img
            src="https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1600&q=80"
            alt="Tattoo artist at work"
          />
          <div className="cta-banner__overlay" />
        </div>
        <div className="cta-banner__content">
          <h2>Ready to Get Inked?</h2>
          <p>Book a free consultation with one of our artists today.</p>
          <Button variant="primary" onClick={() => navigate("/booking")}>
            Book Your Session
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;

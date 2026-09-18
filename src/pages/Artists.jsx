import React from "react";
import SectionTitle from "../components/SectionTitle";
import ArtistCard from "../components/ArtistCard";
import { artists } from "../data/artists";
import "./Artists.css";

const Artists = () => {
  return (
    <main className="artists-page">
      <div className="page-hero">
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <SectionTitle subtitle="The Team" title="Our Artists" />
        </div>
      </div>

      <div className="container section">
        <p className="artists-page__intro">
          Each artist at INKED brings a unique style and vision. From hyper-realistic portraits to
          delicate fine-line work — there's someone here for every story.
        </p>

        <div className="artists-grid">
          {artists.map((a) => (
            <ArtistCard key={a.id} artist={a} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Artists;

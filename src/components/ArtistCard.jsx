import React from "react";
import { AtSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./ArtistCard.css";

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div className="artist-card">
      <div className="artist-card__image-wrap">
        <img src={artist.image} alt={artist.name} className="artist-card__image" loading="lazy" />
        <div className="artist-card__badge">{artist.experience}+ yrs</div>
      </div>
      <div className="artist-card__body">
        <h3 className="artist-card__name">{artist.name}</h3>
        <span className="artist-card__specialty">{artist.specialty}</span>
        <p className="artist-card__bio">{artist.bio}</p>
        <div className="artist-card__footer">
          <a
            href={`https://instagram.com/${artist.instagram.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
            className="artist-card__insta"
          >
            <AtSign size={16} />
            {artist.instagram}
          </a>
          <Button variant="ghost" onClick={() => navigate(`/booking?artist=${artist.name}`)}>
            <Calendar size={14} />
            Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;

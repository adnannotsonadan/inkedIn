import React from "react";
import { Eye } from "lucide-react";
import "./TattooCard.css";

const TattooCard = ({ tattoo, onClick }) => {
  return (
    <div className="tattoo-card" onClick={() => onClick && onClick(tattoo)}>
      <div className="tattoo-card__image-wrap">
        <img src={tattoo.image} alt={tattoo.name} className="tattoo-card__image" loading="lazy" />
        <div className="tattoo-card__overlay">
          <Eye size={28} color="#fff" />
          <span>View</span>
        </div>
      </div>
      <div className="tattoo-card__info">
        <span className="tattoo-card__category">{tattoo.category}</span>
        <h3 className="tattoo-card__name">{tattoo.name}</h3>
        <p className="tattoo-card__desc">{tattoo.description}</p>
      </div>
    </div>
  );
};

export default TattooCard;

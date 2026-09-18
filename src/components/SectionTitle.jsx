import React from "react";
import "./SectionTitle.css";

const SectionTitle = ({ subtitle, title, light = false }) => {
  return (
    <div className={`section-title ${light ? "section-title--light" : ""}`}>
      {subtitle && <span className="section-title__sub">{subtitle}</span>}
      <h2 className="section-title__main">{title}</h2>
      <div className="section-title__line" />
    </div>
  );
};

export default SectionTitle;

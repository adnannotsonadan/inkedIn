import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import TattooCard from "../components/TattooCard";
import { tattoos, categories } from "../data/tattoos";
import "./Gallery.css";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    activeCategory === "All"
      ? tattoos
      : tattoos.filter((t) => t.category === activeCategory);

  const selectedIndex = selected ? filtered.findIndex((t) => t.id === selected.id) : -1;

  const prev = () => {
    if (selectedIndex > 0) setSelected(filtered[selectedIndex - 1]);
  };

  const next = () => {
    if (selectedIndex < filtered.length - 1) setSelected(filtered[selectedIndex + 1]);
  };

  const handleKey = (e) => {
    if (e.key === "Escape") setSelected(null);
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <main className="gallery-page" onKeyDown={handleKey} tabIndex={-1}>
      {/* Page hero */}
      <div className="page-hero">
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <SectionTitle subtitle="Our Portfolio" title="The Gallery" />
        </div>
      </div>

      <div className="container section">
        {/* Filter tabs */}
        <div className="gallery__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`gallery__filter-btn ${activeCategory === cat ? "gallery__filter-btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="gallery__count">{filtered.length} designs</p>

        {/* Grid */}
        <div className="gallery__grid">
          {filtered.map((t) => (
            <TattooCard key={t.id} tattoo={t} onClick={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setSelected(null)}>
              <X size={22} />
            </button>
            <div className="modal__img-wrap">
              <img src={selected.image} alt={selected.name} />
            </div>
            <div className="modal__info">
              <span className="modal__category">{selected.category}</span>
              <h2 className="modal__name">{selected.name}</h2>
              <p className="modal__desc">{selected.description}</p>
            </div>
            {selectedIndex > 0 && (
              <button className="modal__nav modal__nav--prev" onClick={prev}>
                <ChevronLeft size={24} />
              </button>
            )}
            {selectedIndex < filtered.length - 1 && (
              <button className="modal__nav modal__nav--next" onClick={next}>
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;

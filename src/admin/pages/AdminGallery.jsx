import React, { useState } from "react";
import { Plus, Trash2, X, Save, Search } from "lucide-react";
import { tattoos as initialTattoos, categories } from "../../data/tattoos";
import "./AdminGallery.css";

const emptyForm = { name: "", category: "", description: "", image: "" };

const AdminGallery = () => {
  const [tattoos, setTattoos]         = useState(initialTattoos);
  const [search, setSearch]           = useState("");
  const [filterCat, setFilterCat]     = useState("All");
  const [modal, setModal]             = useState(null);
  const [form, setForm]               = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = tattoos.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchCat    = filterCat === "All" || t.category === filterCat;
    return matchSearch && matchCat;
  });

  const openAdd  = () => { setForm(emptyForm); setModal("add"); };
  const openEdit = (t) => { setForm({ ...t });  setModal(t); };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal === "add") {
      setTattoos((p) => [...p, { ...form, id: Date.now() }]);
    } else {
      setTattoos((p) => p.map((t) => (t.id === modal.id ? { ...form, id: modal.id } : t)));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setTattoos((p) => p.filter((t) => t.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="admin-gallery">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Gallery</h1>
          <span className="admin-page-sub">{filtered.length} / {tattoos.length} designs</span>
        </div>
        <button className="admin-add-btn" onClick={openAdd}>
          <Plus size={16} /> Add Design
        </button>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={15} />
          <input
            placeholder="Search designs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="admin-filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`admin-filter-btn ${filterCat === c ? "admin-filter-btn--active" : ""}`}
              onClick={() => setFilterCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="admin-gallery__grid">
        {filtered.map((t) => (
          <div className="admin-gallery-card" key={t.id}>
            <div className="admin-gallery-card__img-wrap">
              <img src={t.image} alt={t.name} loading="lazy" />
              <div className="admin-gallery-card__overlay">
                <button className="admin-icon-btn admin-icon-btn--light" onClick={() => openEdit(t)}>
                  <Save size={14} /> Edit
                </button>
                <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteConfirm(t.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="admin-gallery-card__info">
              <span className="admin-gallery-card__cat">{t.category}</span>
              <p className="admin-gallery-card__name">{t.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit modal */}
      {modal !== null && (
        <div className="admin-modal-backdrop" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>{modal === "add" ? "Add Design" : "Edit Design"}</h3>
              <button className="admin-icon-btn" onClick={() => setModal(null)}><X size={18} /></button>
            </div>
            <div className="admin-modal__body">
              {[
                { name: "name",        label: "Design Name",  placeholder: "Sacred Lotus"  },
                { name: "image",       label: "Image URL",    placeholder: "https://..."   },
              ].map((f) => (
                <div className="admin-modal__field" key={f.name}>
                  <label>{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} />
                </div>
              ))}
              <div className="admin-modal__field">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option value="">Select category</option>
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="admin-modal__field">
                <label>Description</label>
                <textarea name="description" rows={3} value={form.description} onChange={handleChange} placeholder="Short description…" />
              </div>
              {form.image && (
                <div className="admin-modal__preview">
                  <img src={form.image} alt="preview" />
                </div>
              )}
            </div>
            <div className="admin-modal__footer">
              <button className="admin-modal__cancel" onClick={() => setModal(null)}>Cancel</button>
              <button className="admin-modal__save" onClick={handleSave}>
                <Save size={14} /> Save Design
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal admin-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>Delete Design?</h3>
              <button className="admin-icon-btn" onClick={() => setDeleteConfirm(null)}><X size={18} /></button>
            </div>
            <div className="admin-modal__body">
              <p style={{ color: "#888", fontSize: "0.9rem" }}>This action cannot be undone.</p>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-modal__cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="admin-modal__delete" onClick={() => handleDelete(deleteConfirm)}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;

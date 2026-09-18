import React, { useState } from "react";
import { Plus, Trash2, X, Save } from "lucide-react";
import { artists as initialArtists } from "../../data/artists";
import "./AdminArtists.css";

const empty = { name: "", specialty: "", experience: "", bio: "", image: "", instagram: "" };

const AdminArtists = () => {
  const [artists, setArtists]   = useState(initialArtists);
  const [modal, setModal]       = useState(null); // null | "add" | artist object
  const [form, setForm]         = useState(empty);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openAdd = () => { setForm(empty); setModal("add"); };
  const openEdit = (a) => { setForm({ ...a }); setModal(a); };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal === "add") {
      setArtists((p) => [...p, { ...form, id: Date.now(), experience: Number(form.experience) }]);
    } else {
      setArtists((p) => p.map((a) => (a.id === modal.id ? { ...form, id: modal.id, experience: Number(form.experience) } : a)));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setArtists((p) => p.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="admin-artists">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Artists</h1>
          <span className="admin-page-sub">{artists.length} artists on roster</span>
        </div>
        <button className="admin-add-btn" onClick={openAdd}>
          <Plus size={16} /> Add Artist
        </button>
      </div>

      <div className="admin-artists__grid">
        {artists.map((a) => (
          <div className="admin-artist-card" key={a.id}>
            <img src={a.image} alt={a.name} className="admin-artist-card__img" />
            <div className="admin-artist-card__body">
              <span className="admin-artist-card__specialty">{a.specialty}</span>
              <h3 className="admin-artist-card__name">{a.name}</h3>
              <p className="admin-artist-card__bio">{a.bio}</p>
              <span className="admin-artist-card__exp">{a.experience}+ years experience</span>
            </div>
            <div className="admin-artist-card__actions">
              <button className="admin-icon-btn admin-icon-btn--light" onClick={() => openEdit(a)}>
                <Save size={14} /> Edit
              </button>
              <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteConfirm(a.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit modal */}
      {modal !== null && (
        <div className="admin-modal-backdrop" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>{modal === "add" ? "Add Artist" : "Edit Artist"}</h3>
              <button className="admin-icon-btn" onClick={() => setModal(null)}><X size={18} /></button>
            </div>
            <div className="admin-modal__body">
              {[
                { name: "name",        label: "Full Name",         placeholder: "Jane Doe"           },
                { name: "specialty",   label: "Specialty",         placeholder: "Realism & Portraits" },
                { name: "experience",  label: "Years Experience",  placeholder: "7", type: "number"   },
                { name: "instagram",   label: "Instagram Handle",  placeholder: "@jane.ink"           },
                { name: "image",       label: "Image URL",         placeholder: "https://..."         },
              ].map((f) => (
                <div className="admin-modal__field" key={f.name}>
                  <label>{f.label}</label>
                  <input
                    name={f.name}
                    type={f.type || "text"}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
              <div className="admin-modal__field">
                <label>Bio</label>
                <textarea name="bio" rows={3} value={form.bio} onChange={handleChange} placeholder="Short artist bio…" />
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-modal__cancel" onClick={() => setModal(null)}>Cancel</button>
              <button className="admin-modal__save" onClick={handleSave}>
                <Save size={14} /> Save Artist
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
              <h3>Delete Artist?</h3>
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

export default AdminArtists;

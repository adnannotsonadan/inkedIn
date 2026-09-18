import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, Loader } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { artists } from "../data/artists";
import "./Booking.css";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CATEGORIES = ["Blackwork", "Realism", "Geometric", "Minimal", "Japanese", "Traditional", "Watercolour", "Tribal", "Other"];
const PLACEMENTS = ["Arm", "Forearm", "Upper Arm", "Sleeve", "Leg", "Thigh", "Calf", "Back", "Chest", "Ribcage", "Neck", "Wrist", "Ankle", "Hand", "Foot", "Other"];
const SIZES = ["Small (up to 5cm)", "Medium (5–10cm)", "Large (10–20cm)", "Extra Large (20cm+)", "Full Sleeve", "Half Sleeve", "Back Piece"];

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  preferredDate: "",
  preferredTime: "",
  category: "",
  placement: "",
  size: "",
  notes: "",
  artist: "",
};

const validate = (form) => {
  const e = {};
  if (!form.fullName.trim()) e.fullName = "Full name is required.";
  if (!form.phone.trim()) e.phone = "Phone number is required.";
  else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
  if (!form.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
  if (!form.preferredDate) e.preferredDate = "Please select a date.";
  if (!form.preferredTime) e.preferredTime = "Please select a time.";
  if (!form.category) e.category = "Please select a category.";
  if (!form.placement) e.placement = "Please select a placement.";
  if (!form.size) e.size = "Please select an approximate size.";
  return e;
};

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ ...initialForm, artist: searchParams.get("artist") || "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        fullName:      form.fullName,
        phone:         form.phone,
        email:         form.email,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        category:      form.category,
        placement:     form.placement,
        size:          form.size,
        artist:        form.artist,
        notes:         form.notes,
        // imageUrl: null — re-enable when Firebase Storage (Blaze plan) is set up
        status:        "pending",
        submittedAt:   serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Firestore error:", err);
      setErrors({ fullName: "Failed to submit. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="booking-page">
        <div className="booking__success">
          <CheckCircle size={64} className="booking__success-icon" />
          <h2>Booking Request Sent!</h2>
          <p>
            Thanks, <strong>{form.fullName.split(" ")[0]}</strong>! We've received your
            request and will reach out within 24 hours to confirm your appointment.
          </p>
          <div className="booking__success-details">
            <div><span>Date</span><strong>{form.preferredDate}</strong></div>
            <div><span>Time</span><strong>{form.preferredTime}</strong></div>
            <div><span>Category</span><strong>{form.category}</strong></div>
            {form.artist && <div><span>Artist</span><strong>{form.artist}</strong></div>}
          </div>
          <Button variant="primary" onClick={() => { setSubmitted(false); setForm({ ...initialForm }); }}>
            Book Another
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <div className="page-hero">
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <SectionTitle subtitle="Reserve Your Seat" title="Book an Appointment" />
        </div>
      </div>

      <div className="container section">
        <form className="booking__form" onSubmit={handleSubmit} noValidate>

          {/* Personal Info */}
          <div className="booking__section">
            <h3 className="booking__section-title">Personal Information</h3>
            <div className="booking__row">
              <div className={`form-group ${errors.fullName ? "form-group--error" : ""}`}>
                <label htmlFor="fullName">Full Name *</label>
                <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} placeholder="Jane Doe" />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>
              <div className={`form-group ${errors.phone ? "form-group--error" : ""}`}>
                <label htmlFor="phone">Phone Number *</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 555 000 1234" />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-group" style={{ maxWidth: "50%" }}>
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@email.com" className={errors.email ? "input--error" : ""} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="booking__section">
            <h3 className="booking__section-title">Appointment Details</h3>
            <div className="booking__row">
              <div className={`form-group ${errors.preferredDate ? "form-group--error" : ""}`}>
                <label htmlFor="preferredDate">Preferred Date *</label>
                <input id="preferredDate" name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} min={minDate} />
                {errors.preferredDate && <span className="form-error">{errors.preferredDate}</span>}
              </div>
              <div className={`form-group ${errors.preferredTime ? "form-group--error" : ""}`}>
                <label htmlFor="preferredTime">Preferred Arrival Time *</label>
                <select id="preferredTime" name="preferredTime" value={form.preferredTime} onChange={handleChange}>
                  <option value="">Select a time</option>
                  {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.preferredTime && <span className="form-error">{errors.preferredTime}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="artist">Preferred Artist</label>
              <select id="artist" name="artist" value={form.artist} onChange={handleChange}>
                <option value="">No preference</option>
                {artists.map((a) => (
                  <option key={a.id} value={a.name}>{a.name} – {a.specialty}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tattoo Details */}
          <div className="booking__section">
            <h3 className="booking__section-title">Tattoo Details</h3>
            <div className="booking__row">
              <div className={`form-group ${errors.category ? "form-group--error" : ""}`}>
                <label htmlFor="category">Tattoo Category *</label>
                <select id="category" name="category" value={form.category} onChange={handleChange}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <span className="form-error">{errors.category}</span>}
              </div>
              <div className={`form-group ${errors.placement ? "form-group--error" : ""}`}>
                <label htmlFor="placement">Tattoo Placement *</label>
                <select id="placement" name="placement" value={form.placement} onChange={handleChange}>
                  <option value="">Select placement</option>
                  {PLACEMENTS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.placement && <span className="form-error">{errors.placement}</span>}
              </div>
            </div>
            <div className={`form-group ${errors.size ? "form-group--error" : ""}`} style={{ maxWidth: "50%" }}>
              <label htmlFor="size">Approximate Size *</label>
              <select id="size" name="size" value={form.size} onChange={handleChange}>
                <option value="">Select size</option>
                {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.size && <span className="form-error">{errors.size}</span>}
            </div>

            {/* Image upload disabled — requires Firebase Storage (Blaze plan) */}

            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={form.notes}
                onChange={handleChange}
                placeholder="Describe your idea, colour preferences, inspiration, or anything else we should know..."
              />
            </div>
          </div>

          <div className="booking__submit">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <><Loader size={16} className="spin" /> Sending Request…</> : "Submit Booking Request"}
            </Button>
            <p className="booking__disclaimer">
              * Submitting this form is a booking request, not a confirmed appointment.
              We will contact you to finalise details.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Booking;

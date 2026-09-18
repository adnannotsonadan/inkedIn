import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Eye, EyeOff, UserPlus } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { auth } from "../../../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./AdminLogin.css";
import "./AdminSignup.css";

const AdminSignup = () => {
  const { setAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [form, setForm]               = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password)     e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(result.user, { displayName: form.name });
      setAdmin(result.user);
      navigate("/admin/dashboard");
    } catch (err) {
      setErrors({ email: err.message.replace("Firebase: ", "").replace(/ \(auth\/.*\)\.?/, "") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__panel">
        <div className="admin-login__panel-inner">

          <div className="admin-login__logo">
            <Zap size={20} />
            INKED
          </div>

          <h1 className="admin-login__title">Create Account</h1>
          <p className="admin-login__sub">
            Set up your admin account to manage the studio.
          </p>

          <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
            <div className="admin-login__field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Studio Admin"
                autoComplete="name"
                className={errors.name ? "input--error" : ""}
              />
              {errors.name && <span className="signup-error">{errors.name}</span>}
            </div>

            <div className="admin-login__field">
              <label htmlFor="su-email">Email Address</label>
              <input
                id="su-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@inked.com"
                autoComplete="email"
                className={errors.email ? "input--error" : ""}
              />
              {errors.email && <span className="signup-error">{errors.email}</span>}
            </div>

            <div className="admin-login__field">
              <label htmlFor="su-password">Password</label>
              <div className="admin-login__pass-wrap">
                <input
                  id="su-password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  className={errors.password ? "input--error" : ""}
                />
                <button type="button" className="admin-login__eye" onClick={() => setShowPass(!showPass)} aria-label="Toggle password">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="signup-error">{errors.password}</span>}
            </div>

            <div className="admin-login__field">
              <label htmlFor="confirm">Confirm Password</label>
              <div className="admin-login__pass-wrap">
                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  className={errors.confirm ? "input--error" : ""}
                />
                <button type="button" className="admin-login__eye" onClick={() => setShowConfirm(!showConfirm)} aria-label="Toggle confirm password">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirm && <span className="signup-error">{errors.confirm}</span>}
            </div>

            <button className="admin-login__btn" type="submit" disabled={loading}>
              {loading ? <span className="admin-login__spinner" /> : <><UserPlus size={16} /> Create Account</>}
            </button>
          </form>

          <p className="admin-login__hint">
            Already have an account?{" "}
            <Link to="/admin/login" className="signup-link">Sign in</Link>
          </p>

        </div>
      </div>

      <div className="admin-login__deco">
        <img
          src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1000&q=80"
          alt="Tattoo studio"
        />
        <div className="admin-login__deco-overlay" />
        <div className="admin-login__deco-text">
          <span>YOUR STORY.</span>
          <span className="admin-login__deco-accent">INKED FOREVER.</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;

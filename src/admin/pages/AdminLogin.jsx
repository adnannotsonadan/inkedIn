import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Eye, EyeOff, LogIn } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { auth } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./AdminLogin.css";

const AdminLogin = () => {
  const { setAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [form, setForm]         = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, form.email, form.password);
      setAdmin(result.user);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message.replace("Firebase: ", "").replace(/ \(auth\/.*\)\.?/, ""));
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

          <h1 className="admin-login__title">Admin Portal</h1>
          <p className="admin-login__sub">
            Sign in to manage bookings, artists, and gallery content.
          </p>

          {error && <div className="admin-login__error">{error}</div>}

          <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
            <div className="admin-login__field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@inked.com"
                autoComplete="email"
              />
            </div>

            <div className="admin-login__field">
              <label htmlFor="password">Password</label>
              <div className="admin-login__pass-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="admin-login__eye"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button className="admin-login__btn" type="submit" disabled={loading}>
              {loading ? <span className="admin-login__spinner" /> : <><LogIn size={16} /> Sign In</>}
            </button>
          </form>

          <p className="admin-login__hint">
            No account?{" "}
            <Link to="/admin/signup" style={{ color: "#c0392b", textDecoration: "none", fontWeight: 600 }}>
              Create one
            </Link>
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

export default AdminLogin;

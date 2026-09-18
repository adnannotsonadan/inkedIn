import { useState, useEffect } from "react";
import { CalendarDays, Users, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { db } from "../../../lib/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { artists } from "../../data/artists";
import { tattoos } from "../../data/tattoos";
import "./AdminDashboard.css";

const STATUS_COLOR = { pending: "#f39c12", confirmed: "#27ae60", cancelled: "#c0392b" };

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("submittedAt", "desc"), limit(20));
    const unsubscribe = onSnapshot(q, (snap) => {
      setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setFetching(false);
    }, (err) => {
      console.error("Dashboard fetch error:", err);
      setFetching(false);
    });
    return unsubscribe;
  }, []);

  const total     = bookings.length;
  const pending   = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const recent    = bookings.slice(0, 5);

  const stats = [
    { icon: <CalendarDays size={22} />, label: "Total Bookings", value: fetching ? "…" : total,     color: "#fff"    },
    { icon: <Clock size={22} />,        label: "Pending",        value: fetching ? "…" : pending,   color: "#f39c12" },
    { icon: <CheckCircle size={22} />,  label: "Confirmed",      value: fetching ? "…" : confirmed, color: "#27ae60" },
    { icon: <XCircle size={22} />,      label: "Cancelled",      value: fetching ? "…" : cancelled, color: "#c0392b" },
    { icon: <Users size={22} />,        label: "Artists",        value: artists.length,             color: "#fff"    },
    { icon: <TrendingUp size={22} />,   label: "Designs",        value: tattoos.length,             color: "#fff"    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <span className="admin-page-sub">Overview of your studio activity</span>
      </div>

      {/* Stats */}
      <div className="dashboard__stats">
        {stats.map((s, i) => (
          <div className="dashboard__stat-card" key={i}>
            <div className="dashboard__stat-icon" style={{ color: s.color }}>{s.icon}</div>
            <div>
              <p className="dashboard__stat-value" style={{ color: s.color }}>{s.value}</p>
              <p className="dashboard__stat-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="dashboard__section">
        <h2 className="dashboard__section-title">Recent Bookings</h2>
        <div className="admin-table-wrap">
          {fetching ? (
            <p className="dashboard__empty">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="dashboard__empty">No bookings yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Artist</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div className="admin-table__client">
                        <span>{b.fullName}</span>
                        <small>{b.email}</small>
                      </div>
                    </td>
                    <td>{b.preferredDate} · {b.preferredTime}</td>
                    <td>{b.artist || "—"}</td>
                    <td>{b.category}</td>
                    <td>
                      <span className="admin-badge" style={{ "--badge-color": STATUS_COLOR[b.status] }}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

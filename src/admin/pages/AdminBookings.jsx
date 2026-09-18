import { useState, useEffect } from "react";
import { Search, Filter, Eye, X } from "lucide-react";
import { db } from "../../../lib/firebase";
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from "firebase/firestore";
import "./AdminBookings.css";

const STATUS_OPTIONS = ["all", "pending", "confirmed", "cancelled"];
const STATUS_COLOR   = { pending: "#f39c12", confirmed: "#27ae60", cancelled: "#c0392b" };

const AdminBookings = () => {
  const [bookings, setBookings]   = useState([]);
  const [fetching, setFetching]   = useState(true);
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");
  const [selected, setSelected]   = useState(null);

  // Real-time listener — updates instantly when Firestore changes
  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("submittedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setFetching(false);
    }, (err) => {
      console.error("Firestore fetch error:", err);
      setFetching(false);
    });
    return unsubscribe;
  }, []);

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.id?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status });
      if (selected?.id === id) setSelected((p) => ({ ...p, status }));
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  return (
    <div className="admin-bookings">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Bookings</h1>
        <span className="admin-page-sub">{filtered.length} records</span>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={15} />
          <input
            placeholder="Search by name, email or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="admin-filters">
          <Filter size={14} />
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              className={`admin-filter-btn ${filterStatus === s ? "admin-filter-btn--active" : ""}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        {fetching ? (
          <p className="admin-table__empty">Loading bookings…</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Date · Time</th>
                <th>Artist</th>
                <th>Category</th>
                <th>Placement</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="admin-table__empty">No bookings found.</td>
                </tr>
              )}
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div className="admin-table__client">
                      <span>{b.fullName}</span>
                      <small>{b.email}</small>
                    </div>
                  </td>
                  <td className="admin-table__nowrap">
                    {b.preferredDate}<br /><small>{b.preferredTime}</small>
                  </td>
                  <td>{b.artist || <span className="admin-table__muted">No pref.</span>}</td>
                  <td>{b.category}</td>
                  <td>{b.placement}</td>
                  <td>
                    <select
                      className="admin-status-select"
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                      style={{ "--s-color": STATUS_COLOR[b.status] }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button className="admin-icon-btn" onClick={() => setSelected(b)} title="View details">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="admin-drawer-backdrop" onClick={() => setSelected(null)}>
          <div className="admin-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="admin-drawer__header">
              <div>
                <span className="admin-drawer__id">{selected.id}</span>
                <h3 className="admin-drawer__name">{selected.fullName}</h3>
              </div>
              <button className="admin-icon-btn" onClick={() => setSelected(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="admin-drawer__body">
              {[
                ["Email",     selected.email],
                ["Phone",     selected.phone],
                ["Date",      `${selected.preferredDate} at ${selected.preferredTime}`],
                ["Artist",    selected.artist || "No preference"],
                ["Category",  selected.category],
                ["Placement", selected.placement],
                ["Size",      selected.size],
                ["Status",    selected.status],
              ].map(([label, val]) => (
                <div className="admin-drawer__row" key={label}>
                  <span className="admin-drawer__label">{label}</span>
                  <span
                    className="admin-drawer__val"
                    style={label === "Status" ? { color: STATUS_COLOR[val] } : {}}
                  >
                    {val}
                  </span>
                </div>
              ))}
              {selected.notes && (
                <div className="admin-drawer__notes">
                  <span className="admin-drawer__label">Notes</span>
                  <p>{selected.notes}</p>
                </div>
              )}
              <div className="admin-drawer__actions">
                <span className="admin-drawer__label">Change Status</span>
                <div className="admin-drawer__status-btns">
                  {["pending", "confirmed", "cancelled"].map((s) => (
                    <button
                      key={s}
                      className={`admin-status-pill ${selected.status === s ? "admin-status-pill--active" : ""}`}
                      style={{ "--p-color": STATUS_COLOR[s] }}
                      onClick={() => updateStatus(selected.id, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

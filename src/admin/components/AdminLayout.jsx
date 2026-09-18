import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, CalendarDays, Users, Images,
  LogOut, Menu, X, Zap, ChevronRight,
} from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import "./AdminLayout.css";

const navItems = [
  { to: "/admin/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/admin/bookings",  icon: <CalendarDays size={18} />,    label: "Bookings"  },
  { to: "/admin/artists",   icon: <Users size={18} />,           label: "Artists"   },
  { to: "/admin/gallery",   icon: <Images size={18} />,          label: "Gallery"   },
];

const AdminLayout = ({ children }) => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar__logo">
          <Zap size={18} className="admin-sidebar__logo-icon" />
          <span>INKED</span>
          <span className="admin-sidebar__logo-badge">Admin</span>
        </div>

        <nav className="admin-sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
              <ChevronRight size={14} className="admin-sidebar__arrow" />
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">
              {admin?.name?.charAt(0) ?? "A"}
            </div>
            <div className="admin-sidebar__user-info">
              <span className="admin-sidebar__user-name">{admin?.name}</span>
              <span className="admin-sidebar__user-email">{admin?.email}</span>
            </div>
          </div>
          <button className="admin-sidebar__logout" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="admin-main">
        <header className="admin-header">
          <button
            className="admin-header__hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="admin-header__right">
            <span className="admin-header__greeting">
              Welcome back, {admin?.name}
            </span>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

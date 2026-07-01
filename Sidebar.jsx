import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="pulse-dot" />
        EcoSentinel
      </div>

      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Dashboard
        </NavLink>
      </nav>

      <div style={{ marginTop: "auto" }}>
        {user && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "capitalize" }}>
              {user.role}
            </div>
          </div>
        )}
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "8px",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: 6,
            color: "var(--text-muted)",
            fontSize: 13,
          }}
        >
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#e8a33d", "#4c9a6b", "#8fa396", "#d9534f", "#6fcf6f"];

const StatsPanel = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="value">{stats.total}</div>
        <div className="label">Tracked Animals</div>
      </div>
      <div className="stat-card">
        <div className="value" style={{ color: "var(--danger)" }}>{stats.atRisk}</div>
        <div className="label">At Risk</div>
      </div>
      <div className="stat-card">
        <div className="value" style={{ color: "var(--amber)" }}>{stats.injured}</div>
        <div className="label">Injured</div>
      </div>
      <div className="stat-card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 60, height: 60 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={stats.bySpecies}
                dataKey="count"
                nameKey="_id"
                innerRadius={16}
                outerRadius={28}
              >
                {stats.bySpecies.map((entry, i) => (
                  <Cell key={entry._id} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ marginLeft: 12, fontSize: 11, color: "var(--text-muted)" }}>
          Species mix
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;

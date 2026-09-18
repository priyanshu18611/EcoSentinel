import React from "react";

const timeAgo = (dateStr) => {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
};

const AlertsFeed = ({ alerts }) => {
  if (!alerts.length) {
    return <p style={{ color: "var(--text-muted)", fontSize: 13 }}>No active alerts. All collars nominal.</p>;
  }

  return (
    <div>
      {alerts.map((alert) => (
        <div key={alert._id} className={`alert-item ${alert.severity}`}>
          <div>{alert.message}</div>
          <div className="alert-meta">
            {alert.type.toUpperCase()} · {timeAgo(alert.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsFeed;

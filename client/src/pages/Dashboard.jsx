import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../api/axios.js";
import Sidebar from "../components/Sidebar.jsx";
import MapView from "../components/MapView.jsx";
import AnimalCard from "../components/AnimalCard.jsx";
import AlertsFeed from "../components/AlertsFeed.jsx";
import StatsPanel from "../components/StatsPanel.jsx";

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

const Dashboard = () => {
  const [animals, setAnimals] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [animalsRes, alertsRes, statsRes] = await Promise.all([
        api.get("/animals"),
        api.get("/alerts"),
        api.get("/animals/stats/summary"),
      ]);
      setAnimals(animalsRes.data);
      setAlerts(alertsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const socket = io(SOCKET_URL);
    socket.on("tracking:update", ({ animal }) => {
      setAnimals((prev) => prev.map((a) => (a._id === animal._id ? animal : a)));
    });
    socket.on("alert:new", (alert) => {
      setAlerts((prev) => [{ ...alert, createdAt: new Date().toISOString() }, ...prev].slice(0, 50));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div>
            <div className="eyebrow">Live Reserve Overview</div>
            <h1>Wildlife Tracking Dashboard</h1>
          </div>
        </div>

        {loading ? (
          <p style={{ color: "var(--text-muted)" }}>Loading field data…</p>
        ) : (
          <>
            <StatsPanel stats={stats} />

            <div className="dashboard-grid">
              <div className="panel topo-bg">
                <div className="eyebrow">GPS Positions</div>
                <MapView animals={animals} />
              </div>

              <div>
                <div className="panel" style={{ marginBottom: 16 }}>
                  <div className="eyebrow">Active Alerts</div>
                  <AlertsFeed alerts={alerts.filter((a) => !a.resolved)} />
                </div>

                <div className="panel">
                  <div className="eyebrow">Tracked Animals</div>
                  <div className="animal-list">
                    {animals.map((animal) => (
                      <AnimalCard key={animal._id} animal={animal} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

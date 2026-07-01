import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import api from "../api/axios.js";
import Sidebar from "../components/Sidebar.jsx";
import MapView from "../components/MapView.jsx";

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get(`/animals/${id}`).then(({ data }) => {
      setAnimal(data.animal);
      setHistory(data.history.slice().reverse());
    });
  }, [id]);

  if (!animal) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <p style={{ color: "var(--text-muted)" }}>Loading animal record…</p>
        </main>
      </div>
    );
  }

  const chartData = history.map((h) => ({
    time: new Date(h.recordedAt).toLocaleTimeString(),
    heartRate: h.heartRate,
    temperature: h.temperature,
  }));

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Link to="/" style={{ color: "var(--text-muted)", fontSize: 13 }}>&larr; Back to dashboard</Link>

        <div className="topbar" style={{ marginTop: 12 }}>
          <div>
            <div className="eyebrow">{animal.tagId}</div>
            <h1>{animal.name} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>· {animal.species}</span></h1>
          </div>
          <span className={`badge ${animal.status}`}>{animal.status}</span>
        </div>

        <div className="panel topo-bg" style={{ marginBottom: 20 }}>
          <div className="eyebrow">Current Position</div>
          <MapView animals={[animal]} />
        </div>

        <div className="vitals-row" style={{ marginBottom: 20 }}>
          <div className="vital">
            <div className="v-value mono">{animal.vitals.heartRate} bpm</div>
            <div className="v-label">Heart Rate</div>
          </div>
          <div className="vital">
            <div className="v-value mono">{animal.vitals.temperature}°C</div>
            <div className="v-label">Temperature</div>
          </div>
          <div className="vital">
            <div className="v-value mono">{animal.vitals.speed} km/h</div>
            <div className="v-label">Speed</div>
          </div>
          <div className="vital">
            <div className="v-value mono">{animal.conservationStatus}</div>
            <div className="v-label">Conservation Status</div>
          </div>
        </div>

        <div className="panel">
          <div className="eyebrow">Vitals History</div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--panel-2)", border: "1px solid var(--border)" }} />
                <Line type="monotone" dataKey="heartRate" stroke="var(--amber)" dot={false} name="Heart Rate" />
                <Line type="monotone" dataKey="temperature" stroke="var(--green-bright)" dot={false} name="Temp (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {chartData.length === 0 && (
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 12 }}>
              No tracking pings yet — run the IoT simulator to generate live data.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnimalDetail;

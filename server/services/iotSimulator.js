/**
 * EcoSentinel IoT Collar Simulator
 * Mimics real GPS + biometric sensor collars posting periodic pings
 * to the backend, so the dashboard can be demoed without physical hardware.
 *
 * Run with: npm run simulate  (from /backend)
 */
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.API_URL || "http://localhost:5000/api/tracking";

const collars = [
  { tagId: "TAG-TIG-001", lat: 1.2, lng: 35.1 },
  { tagId: "TAG-ELE-002", lat: 0.5, lng: 36.0 },
  { tagId: "TAG-RHI-003", lat: 1.8, lng: 34.2 },
  { tagId: "TAG-LIO-004", lat: -0.9, lng: 34.9 },
  { tagId: "TAG-LEO-005", lat: 2.1, lng: 37.9 },
];

const randomWalk = (value, delta) => value + (Math.random() * 2 - 1) * delta;

const sendPing = async (collar) => {
  // Random-walk the collar's position slightly each tick
  collar.lat = randomWalk(collar.lat, 0.02);
  collar.lng = randomWalk(collar.lng, 0.02);

  const payload = {
    tagId: collar.tagId,
    lat: Number(collar.lat.toFixed(5)),
    lng: Number(collar.lng.toFixed(5)),
    heartRate: Math.round(randomWalk(70, 15)),
    temperature: Number(randomWalk(37.2, 0.5).toFixed(1)),
    speed: Math.max(0, Number(randomWalk(3, 2).toFixed(1))),
    batteryLevel: Math.max(5, Math.round(randomWalk(80, 10))),
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log(`📡 ${collar.tagId} ->`, data.log ? "ping sent" : data.message);
  } catch (err) {
    console.error(`⚠️  Failed to send ping for ${collar.tagId}:`, err.message);
  }
};

console.log("🐾 EcoSentinel IoT simulator started. Sending pings every 5s...");
setInterval(() => {
  collars.forEach(sendPing);
}, 5000);

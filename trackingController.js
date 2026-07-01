import TrackingLog from "../models/TrackingLog.js";
import Animal from "../models/Animal.js";
import Alert from "../models/Alert.js";

// Simple geofence: acceptable safe zone bounding box (demo: a reserve area)
const SAFE_ZONE = { minLat: -2.5, maxLat: 2.5, minLng: 33.5, maxLng: 38.5 };

const checkAnomalies = async (animal, log) => {
  const alerts = [];

  const outOfZone =
    log.lat < SAFE_ZONE.minLat ||
    log.lat > SAFE_ZONE.maxLat ||
    log.lng < SAFE_ZONE.minLng ||
    log.lng > SAFE_ZONE.maxLng;

  if (outOfZone) {
    alerts.push({
      animal: animal._id,
      type: "geofence-breach",
      severity: "high",
      message: `${animal.name} (${animal.tagId}) has left the protected reserve boundary.`,
    });
  }

  if (log.heartRate && (log.heartRate < 30 || log.heartRate > 180)) {
    alerts.push({
      animal: animal._id,
      type: "abnormal-vitals",
      severity: "critical",
      message: `${animal.name} showing abnormal heart rate: ${log.heartRate} bpm.`,
    });
  }

  if (log.batteryLevel !== undefined && log.batteryLevel < 15) {
    alerts.push({
      animal: animal._id,
      type: "low-battery",
      severity: "low",
      message: `Collar battery low (${log.batteryLevel}%) for ${animal.name}.`,
    });
  }

  if (log.speed === 0 && animal.status !== "injured") {
    // Sustained zero speed could indicate injury/poaching - kept lightweight for demo
  }

  if (alerts.length) {
    await Alert.insertMany(alerts);
  }
  return alerts;
};

// @desc  Ingest a new GPS/sensor reading from an IoT collar
// @route POST /api/tracking
export const ingestTrackingData = async (req, res) => {
  try {
    const { tagId, lat, lng, heartRate, temperature, speed, batteryLevel } = req.body;

    const animal = await Animal.findOne({ tagId });
    if (!animal) return res.status(404).json({ message: "No animal registered with this tag ID" });

    const log = await TrackingLog.create({
      animal: animal._id,
      lat,
      lng,
      heartRate,
      temperature,
      speed,
      batteryLevel,
    });

    animal.lastLocation = { lat, lng };
    animal.lastSeen = new Date();
    if (heartRate) animal.vitals.heartRate = heartRate;
    if (temperature) animal.vitals.temperature = temperature;
    if (speed !== undefined) animal.vitals.speed = speed;
    await animal.save();

    const newAlerts = await checkAnomalies(animal, log);

    const io = req.app.get("io");
    if (io) {
      io.emit("tracking:update", { animal, log });
      newAlerts.forEach((a) => io.emit("alert:new", a));
    }

    res.status(201).json({ log, alerts: newAlerts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Get tracking history for an animal
// @route GET /api/tracking/:animalId
export const getTrackingHistory = async (req, res) => {
  try {
    const logs = await TrackingLog.find({ animal: req.params.animalId })
      .sort({ recordedAt: -1 })
      .limit(200);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

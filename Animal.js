import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: { type: String, required: true, trim: true },
    tagId: { type: String, required: true, unique: true }, // GPS collar / RFID tag ID
    status: {
      type: String,
      enum: ["healthy", "injured", "at-risk", "unknown"],
      default: "healthy",
    },
    conservationStatus: {
      type: String,
      enum: ["least-concern", "vulnerable", "endangered", "critically-endangered"],
      default: "vulnerable",
    },
    lastLocation: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
    lastSeen: { type: Date, default: Date.now },
    vitals: {
      heartRate: { type: Number, default: 60 }, // bpm
      temperature: { type: Number, default: 37.5 }, // Celsius
      speed: { type: Number, default: 0 }, // km/h
    },
    habitat: { type: String, default: "Unknown" },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Animal", animalSchema);

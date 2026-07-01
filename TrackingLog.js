import mongoose from "mongoose";

const trackingLogSchema = new mongoose.Schema(
  {
    animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true, index: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    heartRate: Number,
    temperature: Number,
    speed: Number,
    batteryLevel: { type: Number, default: 100 }, // IoT collar battery %
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

trackingLogSchema.index({ animal: 1, recordedAt: -1 });

export default mongoose.model("TrackingLog", trackingLogSchema);

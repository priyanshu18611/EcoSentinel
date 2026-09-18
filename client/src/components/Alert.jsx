import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true },
    type: {
      type: String,
      enum: ["geofence-breach", "no-movement", "abnormal-vitals", "low-battery", "poaching-risk"],
      required: true,
    },
    severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
    message: { type: String, required: true },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);

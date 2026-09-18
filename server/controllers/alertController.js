import Alert from "../models/Alert.js";

// @desc  Get all alerts (most recent first)
// @route GET /api/alerts
export const getAlerts = async (req, res) => {
  try {
    const { resolved } = req.query;
    const filter = {};
    if (resolved !== undefined) filter.resolved = resolved === "true";

    const alerts = await Alert.find(filter)
      .populate("animal", "name species tagId")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Mark an alert resolved
// @route PATCH /api/alerts/:id/resolve
export const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );
    if (!alert) return res.status(404).json({ message: "Alert not found" });
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

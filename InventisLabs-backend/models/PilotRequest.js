const mongoose = require("mongoose");

const pilotRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  organizationType: {
    type: String,
    required: true,
    enum: [
      "Government / PSU",
      "Private Enterprise",
      "Smart City",
      "Industrial",
      "Educational",
      "Research",
      "Other",
    ],
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  areaOfInterest: {
    type: [String],
    required: true,
    enum: [
      "State-wide EEW",
      "City / Smart City EEW",
      "Industrial Plant EEW",
      "Structural Monitoring",
      "IoT Development",
    ],
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    default: "New Request",
    enum: [
      "New Request",
      "Under Review",
      "In Discussion",
      "Proposal Sent",
      "Closed",
      "Converted",
    ],
  },
  priority: {
    type: String,
    default: "Medium",
    enum: ["Low", "Medium", "High", "Urgent"],
  },
  notes: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
  submittedDate: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
pilotRequestSchema.index({ email: 1 });
pilotRequestSchema.index({ status: 1 });

module.exports = mongoose.model("PilotRequest", pilotRequestSchema);

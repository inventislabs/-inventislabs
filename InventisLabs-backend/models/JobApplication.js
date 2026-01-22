const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  experience: {
    type: String,
  },
  resumeUrl: {
    type: String,
  },
  portfolioUrl: {
    type: String,
  },
  linkedinUrl: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    default: "Under Review",
    enum: [
      "Under Review",
      "Shortlisted",
      "Interview Scheduled",
      "Rejected",
      "Hired",
    ],
  },
  notes: {
    type: String,
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
jobApplicationSchema.index({ email: 1, jobId: 1 });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);

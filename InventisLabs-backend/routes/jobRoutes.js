const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { authenticateAdmin } = require("../middleware/auth");

// Public routes
router.get("/", jobController.getAllJobs);
router.post("/apply", jobController.submitJobApplication);

// Admin routes (protected)
router.get(
  "/applications",
  authenticateAdmin,
  jobController.getAllApplications,
);
router.get(
  "/applications/:jobId",
  authenticateAdmin,
  jobController.getApplicationsByJob,
);
router.put(
  "/applications/:id",
  authenticateAdmin,
  jobController.updateApplicationStatus,
);

module.exports = router;

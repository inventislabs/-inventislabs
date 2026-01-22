const express = require("express");
const router = express.Router();
const pilotRequestController = require("../controllers/pilotRequestController");
const { authenticateAdmin } = require("../middleware/auth");
const { validatePilotRequest } = require("../middleware/validation");

// Public route
router.post(
  "/",
  validatePilotRequest,
  pilotRequestController.submitPilotRequest,
);

// Admin routes (protected)
router.get("/", authenticateAdmin, pilotRequestController.getAllPilotRequests);
router.get("/:id", authenticateAdmin, pilotRequestController.getPilotRequest);
router.put(
  "/:id",
  authenticateAdmin,
  pilotRequestController.updatePilotRequest,
);
router.delete(
  "/:id",
  authenticateAdmin,
  pilotRequestController.deletePilotRequest,
);

module.exports = router;

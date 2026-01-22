const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const pressKitController = require("../controllers/pressKitController");
const pilotRequestController = require("../controllers/pilotRequestController");
const { authenticateAdmin } = require("../middleware/auth");
const {
  validateJob,
  validateJobUpdate,
  validateMongoId,
  validateMessageUpdate,
} = require("../middleware/validation");

// Apply authentication to all admin routes
router.use(authenticateAdmin);

// Jobs
router.post("/jobs", validateJob, adminController.createJob);
router.patch("/jobs/:id", validateJobUpdate, adminController.updateJob);
router.delete("/jobs/:id", validateMongoId, adminController.deleteJob);

// Messages
router.get("/messages", adminController.getAllMessages);
router.get(
  "/messages/:id/history",
  validateMongoId,
  adminController.getMessageHistory,
);
router.delete("/messages/:id", validateMongoId, adminController.deleteMessage);
router.patch(
  "/messages/:id",
  validateMessageUpdate,
  adminController.updateMessage,
);
router.post("/reply", adminController.replyToMessage);
router.post("/forward", adminController.forwardMessage);

// Press Kit
router.get("/presskit", pressKitController.adminGetAllPressKitItems);
router.get("/presskit/stats", pressKitController.getPressKitStats);
router.post("/presskit", pressKitController.createPressKitItem);
router.patch("/presskit/:id", pressKitController.updatePressKitItem);
router.delete(
  "/presskit/:id",
  validateMongoId,
  pressKitController.deletePressKitItem,
);

// Pilot Requests (Enterprise)
router.get("/pilot-requests", pilotRequestController.getAllPilotRequests);
router.get("/pilot-requests/:id", pilotRequestController.getPilotRequest);
router.put("/pilot-requests/:id", pilotRequestController.updatePilotRequest);
router.delete("/pilot-requests/:id", pilotRequestController.deletePilotRequest);

module.exports = router;

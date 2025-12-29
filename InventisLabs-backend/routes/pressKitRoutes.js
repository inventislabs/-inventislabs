const express = require('express');
const router = express.Router();
const pressKitController = require('../controllers/pressKitController');

// Public routes
router.get('/', pressKitController.getAllPressKitItems);
router.get('/:id', pressKitController.getPressKitItem);
router.post('/:id/download', pressKitController.trackDownload);

module.exports = router;

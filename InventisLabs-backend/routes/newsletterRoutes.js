const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { validateNewsletter } = require('../middleware/validation');

router.post('/newsletter', validateNewsletter, newsletterController.subscribe);

module.exports = router;


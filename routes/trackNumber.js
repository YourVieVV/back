const express = require('express');
const trackController = require('../controllers/trackNumber');
const router = express.Router();

router.post('/', trackController.getBuTrackNumber)

module.exports = router

const express = require('express');
const calcController = require('../controllers/calculation');
const router = express.Router();

router.post('/', calcController.calculation)

module.exports = router

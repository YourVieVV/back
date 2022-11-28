const express = require('express');
const cargoController = require('../controllers/cargo');
const router = express.Router();

router.get('/', cargoController.getAll)
router.post('/', cargoController.create)
router.delete('/:id', cargoController.remove)
router.patch('/:id', cargoController.update)

module.exports = router

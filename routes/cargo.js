const express = require('express');
const cargoController = require('../controllers/cargo');
const passport = require('passport')

const router = express.Router();


router.get('/', passport.authenticate('jwt', {session: false}), cargoController.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), cargoController.create)
router.delete('/:id', cargoController.remove)
router.patch('/:id', cargoController.update)

module.exports = router

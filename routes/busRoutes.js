const express = require('express');
const router = express.Router();
const {getBusBetween} = require('../controllers/busControllers')

router.route('/getbusbetween').get(getBusBetween);

module.exports = router;
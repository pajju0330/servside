const express = require('express');
const router = express.Router();

const {getTrainBetween,getTrainById,getTrainRoute,getTrainOn} = require('../controllers/trainControllers');

router.route('/gettrainbetween').get(getTrainBetween);
router.route('/gettrainbyid').get(getTrainById);
router.route('/gettrainroute').get(getTrainRoute);
router.route('/gettrainon').get(getTrainOn);

module.exports = router;
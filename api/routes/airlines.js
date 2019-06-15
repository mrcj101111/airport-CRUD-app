const express = require('express');

const AirlinesController = require('../controllers/airlines');

const router = express.Router();

router.post('/create-airline', AirlinesController.createAirline);
router.get('', AirlinesController.getAirlines);

module.exports = router;

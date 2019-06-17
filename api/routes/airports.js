const express = require('express');

const AirportsController = require('../controllers/airports');

const router = express.Router();

router.post('/create-airport', AirportsController.createAirport);


module.exports = router;
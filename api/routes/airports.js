const express = require('express');

const AirportsController = require('../controllers/airports');

const router = express.Router();

router.post('/create-airport', AirportsController.createAirport);
router.get('', AirportsController.getAirports);
router.delete('/delete-airport/:id', AirportsController.deleteAirport);

module.exports = router;
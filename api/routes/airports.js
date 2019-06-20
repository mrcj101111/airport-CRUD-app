const express = require('express');

const AirportsController = require('../controllers/airports');

const router = express.Router();

router.post('/create-airport', AirportsController.createAirport);
router.get('', AirportsController.getAirports);
router.get('/airport-airline', AirportsController.getAirportAirline);
router.delete('/delete-airport-airline', AirportsController.deleteAirportAirline);
router.get('/:id', AirportsController.getAirport);
router.delete('/delete-airport/:id', AirportsController.deleteAirport);
router.patch('/update-airport/:id', AirportsController.updateAirport);
router.post('/add-airport-airline', AirportsController.createAirportAirline);

module.exports = router;
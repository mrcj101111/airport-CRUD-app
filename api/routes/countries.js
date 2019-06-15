const express = require('express');

const CountriesController = require('../controllers/countries');

const router = express.Router();

router.post('/add-country', CountriesController.addCountry);

module.exports = router;
const express = require('express');

const CountriesController = require('../controllers/countries');

const router = express.Router();

router.get('/', CountriesController.getCountries);

module.exports = router;
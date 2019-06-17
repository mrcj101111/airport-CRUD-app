const express = require('express');

const AirlinesController = require('../controllers/airlines');

const router = express.Router();

router.post('/create-airline', AirlinesController.createAirline);
router.get('', AirlinesController.getAirlines);
router.get('/:id', AirlinesController.getAirline);
router.patch('/update-airline/:id', AirlinesController.updateAirline);
router.delete('/delete-airline/:id', AirlinesController.deleteAirline);

module.exports = router;

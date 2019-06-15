const express = require('express');

const db = require('../database');
const router = express.Router();

//Create airline
exports.createAirline = (req, res) => {
    db.from('airline').where('airline_name', req.body.airlineName).then(airlineList => {
        if (airlineList.length === 0) {
            db('airline').insert({
                airline_name: req.body.airlineName,
                country_id: req.body.countryId,
            }).then(result => {
                res.status(201).json(
                    result
                )
            })
                .catch(err => {
                    res.status(500).json({
                        message: 'Oops! Something went wrong, please try again later.'
                    })
                })
        } else {
            res.status(409).json({
                message: 'The airline already exists!'
            })
        }
    })
} 

//Get airlines
exports.getAirlines = (req, res) => {
    db('airline').select().then(result => {
        res.status(200).json(
            result
        )
    })
}

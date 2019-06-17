const express = require('express');

const db = require('../database');

//Create airport
exports.createAirport = (req, res) => {
    db.from('airport').where('name', req.body.airportName).then(airportList => {
        if (airportList.length === 0) {
            db('airport').insert({
                name: req.body.airportName,
                location: req.body.location,
                country_id: req.body.countryId,
                airline_id: req.body.airlineId,
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
                message: 'The airport already exists!'
            })
        }
    })
}
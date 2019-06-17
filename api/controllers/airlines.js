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
    db('airline')
        .join('country', { 'airline.country_id': 'country.country_id' })
        .select().then(result => {
            obj = result.map(data => {
                return {
                    airline: {
                        id: data.airline_id,
                        name: data.airline_name,
                        country: {
                            id: data.country_id,
                            name: data.country_name,
                            code: data.country_code
                        }
                    }
                };
            })
            res.status(200).json(obj);
        })
}

//Get current airline
exports.getAirline = (req, res) => {
    db('airline').where('airline_id', req.params.id)
        .select()
        .join('country', { 'airline.country_id': 'country.country_id' })
        .then(result => {
            obj = result.map(data => {
                return {
                    airline: {
                        id: data.airline_id,
                        name: data.airline_name,
                        country: {
                            id: data.country_id,
                            name: data.country_name,
                            code: data.country_code
                        }
                    }
                };
            })
            res.status(200).json(obj);
        })
}

//Update airlines
exports.updateAirline = (req, res) => {
    db('airline')
        .where('airline_id', req.params.id)
        .update({
            airline_name: req.body.airlineName,
            country_id: req.body.countryId,
        }).then(result => {
            res.status(201).json({
                message: 'Airline successfully updated!'
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Oops! Something went wrong, please try again later.'
            })
        })
}

// Delete airline
exports.deleteAirline = (req, res) => {
    db('airline')
        .where('airline_id', req.params.id)
        .del().then(result => {
            res.status(201).json({
                message: 'Airline successfully deleted!'
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Oops! Something went wrong, please try again later.'
            })
        })
}
const express = require('express');

const db = require('../database');

//Create airport
exports.createAirport = (req, res) => {
    db.from('airport').where('name', req.body.airportName).then(airportList => {
        if (airportList.length === 0) {
            db('airport').insert({
                name: req.body.airportName,
                lat: req.body.lat,
                long: req.body.long,
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

//Get airports
exports.getAirports = (req, res) => {
    db('airport')
        .leftJoin('airline', { 'airport.airline_id': 'airline.airline_id' })
        .join('country', { 'airport.country_id': 'country.country_id' })
        .select().then(result => {
            obj = result.map(data => {
                return {
                    airport: {
                        id: data.airport_id,
                        name: data.name,
                        lat: data.lat,
                        long: data.long,
                        country: {
                            id: data.country_id,
                            name: data.country_name,
                            code: data.country_code
                        },
                        airline: {
                            id: data.airline_id,
                            name: data.airline_name,
                            country: data.country_id,
                        }
                    }
                };
            })
            res.status(200).json(obj);
        }).catch(err => {
            res.status(500).json({
                message: 'Oops! Something went wrong, please try again later.'
            })
        })
}

//Get current airport
exports.getAirport = (req, res) => {
    db('airport').where('airport_id', req.params.id)
        .leftJoin('airline', { 'airport.airline_id': 'airline.airline_id' })
        .join('country', { 'airport.country_id': 'country.country_id' })
        .select()
        .then(result => {
            obj = result.map(data => {
                return {
                    airport: {
                        id: data.airport_id,
                        name: data.name,
                        lat: data.lat,
                        long: data.long,
                        country: {
                            id: data.country_id,
                            name: data.country_name,
                            code: data.country_code
                        },
                        airline: {
                            id: data.airline_id,
                            name: data.airline_name,
                            code: data.airline_code
                        }
                    }
                };
            })
            res.status(200).json(obj);
        })
}

//Update airport
exports.updateAirport = (req, res) => {
    db('airport')
        .where('airport_id', req.params.id)
        .update({
            name: req.body.airportName,
            lat: req.body.lat,
            long: req.body.long,
            country_id: req.body.countryId,
            airline_id: req.body.airlineId,
        }).then(result => {
            res.status(200).json({
                message: 'Airport successfully updated!'
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Oops! Something went wrong, please try again later.'
            })
        })
}

// Delete airline
exports.deleteAirport = (req, res) => {
    db('airport')
        .where('airport_id', req.params.id)
        .del().then(result => {
            res.status(201).json({
                message: 'Airport successfully deleted!'
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Oops! Something went wrong, please try again later.'
            })
        })
}
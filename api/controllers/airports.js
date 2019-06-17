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

//Get airports
exports.getAirports = (req, res) => {
    db('airport')
        .join('country', { 'airport.country_id': 'country.country_id' })
        /* .join('airline', { 'airport.airline_id': 'airline.airline_id' }) */
        .select().then(result => {
            console.log(result);
            obj = result.map(data => {
                return {
                    airport: {
                        id: data.airport_id,
                        name: data.name,
                        location: data.location,
                        country: {
                            id: data.country_id,
                            name: data.country_name,
                            code: data.country_code
                        },
                        /* airline: {
                            id: data.airline_id,
                            name: data.airline_name,
                            country: data.country_id,
                        } */
                    }
                };
            })
            res.status(200).json(obj);
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Oops! Something went wrong, please try again later.'
            })
        })
}
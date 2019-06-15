const express = require('express');

const db = require('../database');
const router = express.Router();

//Add country
exports.addCountry = (req, res) => {
    db.from('country').where('country_name', req.body.countryName).then(countryList => {
        if (countryList.length === 0) {
            db('country').insert({
                country_id: req.body.countryId,
                country_name: req.body.countryName,
                country_code: req.body.countryCode,
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
                message: 'This country already exists!'
            })
        }
    })
}
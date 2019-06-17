const express = require('express');

const db = require('../database');
var request = require('request');

//Get countries
exports.getCountries = (req, res) => {
    db('country').select().then(result => {
        res.status(200).json(
            result
        )
    })
}
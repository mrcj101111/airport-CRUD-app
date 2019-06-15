const express = require('express');
const bodyParser = require("body-parser");
const db = require('./database/index');

// Route imports
const airlineRoutes = require('./routes/airlines')

//Configure knex's promise to global promise
db.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate app
const app = express();

app.listen('3000', () => console.log('Server running on http://localhost:3000'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

// Routes
  app.use('/api/airlines', airlineRoutes);

  module.exports = app;
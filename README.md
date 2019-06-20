# airport-CRUD-app
A Functional CRUD web app for managing airports, along with associated SQL schema

## Features
- RESTful API using Nodejs and Express
- SQL database using Postgresql
- Authentication using Auth0
- GUI using Angular

## Requirements
- Nodejs v10.16
- Express.js v4.17.1
- Angular v7+
- PostgreSQL
- knex v6.9.0

## Installation
Clone this repository to your local machine and then `cd` into the folder where you've cloned the project.

    npm install

Create a databse in Postgres called _airport_. Be sure to make your username _postgres_ and your password, _password_ when setting up the database.

## Run 
Before you run your backend, make sure you have the latest migrations.
To run the latest migrations navigate into your `api` folder and type in the following comand:

    knex migrate:latest

To run your backend on a local server, navigate into the `api` and type in the following in your cli:

    node app.js

To run your frontend on a local server, navigate into the `airport-CRUD-app` folder and run the following command:

    ng serve

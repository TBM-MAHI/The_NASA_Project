let express = require('express');
let planetsController = require('./planets.controller')

const planetsRouter = express.Router();

planetsRouter.get('/', planetsController.http_getAllPlanets);

module.exports = {planetsRouter}
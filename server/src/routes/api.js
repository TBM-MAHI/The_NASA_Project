let express = require("express");

let { planetsRouter } = require("../routes/Planets/planets.router");
let { launchesRouter } = require("../routes/Launches/launches.router");
let api = express.Router();

api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports =  api ;
let express = require('express');
let launchesController = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get('/', launchesController.httpgetAll_Launches);
launchesRouter.post('/', launchesController.add_New_Launch);
launchesRouter.delete('/:id', launchesController.abortLaunch);

module.exports = {launchesRouter}
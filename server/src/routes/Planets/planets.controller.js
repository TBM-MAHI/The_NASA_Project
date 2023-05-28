let planetsModel = require("../../model/planets.model");

async function http_getAllPlanets(req, res) {
  //console.log(planets)
  return res.status(200).json(await planetsModel.getAllPlanets());
}

module.exports = { http_getAllPlanets };

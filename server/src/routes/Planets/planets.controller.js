let planetsModel = require("../../model/planets.model");

function http_getAllPlanets(req, res) {
  //console.log(planets)
  return res.status(200).json(planetsModel.getAllPlanets());
}

module.exports = { http_getAllPlanets };

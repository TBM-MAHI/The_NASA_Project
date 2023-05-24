let validator = require("validator");
let launchesModel = require("../../model/launches.model");

function httpgetAll_Launches(req, res) {
  return res.status(200).json(launchesModel.getAll_Launches());
}

function add_New_Launch(req, res) {
  let launch = req.body;
  if (
    !launch.missionName ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "Missing required launch Data",
    });
  }
  launch.launchDate = new Date(launch.launchDate);

  if (!validator.isDate(launch.launchDate))     
    return res.status(400).json({
      error: "Invalid launch Date",
    });

  try {
    launchesModel.addNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (error) {
    return res.status(400).json(error);
  }
}

function abortLaunch(req, res) {
    let launchID =  Number(req.params.id);
    // console.log(launchID)
  //if Launch does not exist
  if (!launchesModel.launchIDexists(launchID))
    return res.status(400).json({
      error: "Invalid launch ID! Does not exists",
    });

  let aborted_launch = launchesModel.abortlaunch_by_ID(launchID);
  return res.status(200).json(aborted_launch);
}
module.exports = {
  httpgetAll_Launches,
  add_New_Launch,
  abortLaunch,
};

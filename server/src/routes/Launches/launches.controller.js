let validator = require("validator");
let launchesModel = require("../../model/launches.model");

async function httpgetAll_Launches(req, res) {
  return res.status(200).json( await launchesModel.getAll_Launches());
}

async function add_New_Launch(req, res) {
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
      error: "Invalid Launch Date",
    });

  try {
    await launchesModel.schedule_NewLaunch(launch);
    console.log(`from launch controller \n ${launch}`)
    return res.status(201).json(launch);
  } catch (error) {
    return res.status(400).json(error);
  }
}

async function abortLaunch(req, res) {
    let launchID =  Number(req.params.id);
    // console.log(launchID)
  //if Launch does not exist
  if (! await launchesModel.launchIDexists(launchID))
    return res.status(400).json({
      error: "Invalid launch ID! Does not exists",
    });

  let aborted_launch = await launchesModel.abortlaunch_by_ID(launchID);
  if (!aborted_launch) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json(aborted_launch);
}
module.exports = {
  httpgetAll_Launches,
  add_New_Launch,
  abortLaunch,
};

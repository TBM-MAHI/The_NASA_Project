let launchesCollection = require("./launches.mongo.js");
let planets = require("./planets.mongo");
let launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  missionName: "kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27,2030"),
  destination: "kepler-442b",
  customers: ["spaceX", "USSR"],
  upcoming: true,
  success: true,
};

async function schedule_NewLaunch(launch) {
  let latestFlightNumber = await getLatest_Flight_Number();
  latestFlightNumber++;
  let completeLaunchData = {
    ...launch,
    flightNumber: latestFlightNumber,
    customers: ["NASA", "USSR"],
    upcoming: true,
    success: true,
  };
  try {
    await saveLaunches(completeLaunchData);
  } catch (error) {
    console.log(error)
   
}
}

async function addNewLaunchMap(launch) {
  DEFAULT_FLIGHT_NUMBER++;
  let completeLaunchData = Object.assign(launch, {
    flightNumber: DEFAULT_FLIGHT_NUMBER,
    customers: ["NASA", "ASSR"],
    upcoming: true,
    success: true,
  });
  launches.set(DEFAULT_FLIGHT_NUMBER, completeLaunchData);
}

async function getAll_Launches() {
  // it will only return the launch Fields excluding the _id, __v field
  return await launchesCollection.find({}, [ '-_id', '-__v' ]);
}

async function launchIDexists(launchid) {
  return await launchesCollection.findOne({ flightNumber: launchid });
}

async function getLatest_Flight_Number() {
  let latestMission = await launchesCollection.findOne().sort("-flightNumber");
  // console.log(latestMission);
  if (latestMission) return latestMission.flightNumber;
  return DEFAULT_FLIGHT_NUMBER;
}

async function saveLaunches(launch) {
  let planetFromCollec = await planets.findOne({
    keplerName: launch.destination,
  });
  //console.log(planetFromCollec);
  if (planetFromCollec) {
    const res = await launchesCollection.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
    //console.log(" new Launch data Inserted :", res.acknowledged);
  } else throw new Error("Invalid planet");
}

async function abortlaunch_by_ID(launchid) {
  const res = await launchesCollection.findOneAndUpdate(
    {
      flightNumber: launchid,
    },
    {
      upcoming: false,
      success: false,
    }, { new: true}
  );
  console.log(res)
  return res;
}

module.exports = {
  getAll_Launches,
  addNewLaunchMap,
  schedule_NewLaunch,
  launchIDexists,
  abortlaunch_by_ID,
};

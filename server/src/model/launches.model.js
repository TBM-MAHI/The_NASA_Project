let axios = require('axios')
let launchesCollection = require("./launches.mongo.js");

let planets = require("./planets.mongo");
let launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_LAUNCHES_API_URL = "https://api.spacexdata.com/v4/launches/query";


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
  let planetFromCollec = await planets.findOne({
    keplerName: launch.destination,
  });

  if (planetFromCollec) {
    try {
      await saveLaunches(completeLaunchData);
    } catch (error) {
      console.log(error);
    }
  } else throw new Error("Invalid planet");
}

async function loadspaceXlaunch_Data() {
  let launchRes = await findLaunch({
    flightNumber: 1,
    missionName: "FalconSat",
    rocket: "Falcon 1",
    customers: ["DARPA"],
  });

 if (launchRes) {
    console.log(`SpaceX launch Data already exists!`);
    return;
  } else {
    populate_spaceX_launch_Data();
  }
}

async function populate_spaceX_launch_Data() { 
  console.log(`Downloading Launch Data from SpacexAPI....`)
  let response = await axios.post(SPACEX_LAUNCHES_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "launchpad",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
      select: [
        "flight_number",
        "name",
        "date_local",
        "rocket",
        "success",
        "failures",
        "payloads",
        "launchpad",
        "upcoming",
      ],
      pagination: false,
    },
  });
 
  if (response.status === 200) { 
  let { docs } = response.data;
    for (let doc of docs) {
      let {
        success,
        name,
        flight_number,
        rocket,
        upcoming,
        date_local,
        payloads,
      } = doc;
      let launch = {
        flightNumber: flight_number,
        missionName: name,
        rocket: rocket["name"],
        launchDate: date_local,
        customers: payloads.flatMap((load) => load["customers"]),
        upcoming,
        success,
      };
      saveLaunches(launch)
      //console.log(launch.flightNumber+". "+launch.missionName);
    }
  }
  else {
    console.log(`ERROR fetch data from spacex API`)
  }
  console.log(`spaceX DATA populated`);
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

async function getAll_Launches(skip, limit) {
  // it will only return the launch Fields excluding the _id, __v field
return await launchesCollection
    .find({}, ["-_id", "-__v"])
    .skip(skip)
    .limit(limit)
    .sort({flightNumber :'asc'});
}

async function findLaunch(filter) { 
  return await launchesCollection.findOne(filter);
}

async function launchIDexists(launchid) {
  return await findLaunch({ flightNumber: launchid });
}

async function getLatest_Flight_Number() {
  let latestMission = await launchesCollection.findOne().sort("-flightNumber");
  // console.log(latestMission);
  if (latestMission) return latestMission.flightNumber;
  return DEFAULT_FLIGHT_NUMBER;
}

async function saveLaunches(launch) {
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
  //console.log(res)
  return res;
}

module.exports = {
  getAll_Launches,
  addNewLaunchMap,
  schedule_NewLaunch,
  launchIDexists,
  abortlaunch_by_ID,
  loadspaceXlaunch_Data,
};

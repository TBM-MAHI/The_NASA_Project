let launches = new Map();
let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  missionName: "kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27,2030"),
  destination: "kepler-442b",
  customers: ["spacex", "ASSR"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["NASA", "ASSR"],
      upcoming: true,
      success: true,
    })
  );
}
function getAll_Launches() {
  return Array.from(launches.values());
}
function launchIDexists(launchid) {
  return launches.has(launchid);
}
function abortlaunch_by_ID(launchid) {
  const aborted_launch = launches.get(launchid);
  aborted_launch.upcoming = false;
  aborted_launch.success = false;
  // console.log(aborted_launch);
  return aborted_launch;
}

module.exports = {
  getAll_Launches,
  addNewLaunch,
  launchIDexists,
  abortlaunch_by_ID,
};

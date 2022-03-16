const launches = new Map();

let latestFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Moon Exploration",
  launchDate: new Date("June 2030"),
  rocket: "Kepler-IS1",
  customers: ["Abhishek", "NASA"],
  target: "Kepler-1652 b",
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existLaunchId(launchId) {
  return launches.has(launchId);
}

function postLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["Abhishek", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function abortByLaunchId(launchId) {
  const aborted = launches.get(launchId);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

module.exports = {
  launches,
  postLaunch,
  abortByLaunchId,
  existLaunchId,
};

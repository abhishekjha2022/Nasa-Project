const {
  launches,
  postLaunch,
  abortByLaunchId,
  existLaunchId,
} = require("../models/launches.model");

function getAllLaunches(req, res) {
  return res.status(200).json(Array.from(launches.values()));
}

function getPostLaunches(req, res) {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);
  if (
    !launch.mission ||
    !launch.target ||
    !launch.launchDate ||
    !launch.rocket
  ) {
    return res.status(400).json({
      error: "Missing required information",
    });
  }

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid date type",
    });
  }
  postLaunch(launch);
  return res.status(201).json(launch);
}

function abortLaunches(req, res) {
  const launchId = Number(req.params.id);
  if (!existLaunchId(launchId)) {
    return res.status(404).json({
      error: "Launch does not exist",
    });
  }
  const aborted = abortByLaunchId(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  getAllLaunches,
  getPostLaunches,
  abortLaunches,
};

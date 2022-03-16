const express = require("express");
const {
  getAllLaunches,
  getPostLaunches,
  abortLaunches,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", getAllLaunches);

launchesRouter.post("/launches", getPostLaunches);

launchesRouter.delete("/launches/:id", abortLaunches);

module.exports = launchesRouter;

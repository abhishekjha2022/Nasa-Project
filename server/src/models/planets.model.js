const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
function loadDataOnStartup() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitable(data)) {
          habitablePlanets.push(data);
        }
      })

      .on("error", (error) => {
        console.log(error);
        reject();
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} is habitable planets`);
        resolve();
      });
  });
}

module.exports = {
  planets: habitablePlanets,
  loadDataOnStartup,
};

const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
let habitablePlanets = [];
/* 
fs.createReadStream( ) returns an instance of the class Class: fs.ReadStream
fs.ReadStream has events that are being handled/
 */
function loadPlanetsDatafromCSV() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "data", "keplar_data.csv"), {
      encoding: "utf-8",
    })
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (planetData) => {
        if (isHabitable(planetData))
          habitablePlanets.push(planetData);
      })
      .on("error", (err) => reject(err) )
      .on("end", () => {
        console.log("fetching data from CSV complete.");
        resolve();
        //for (let names of habitablePlanetsNames) console.log(`\t ${names}`);
      });

    function isHabitable(planet) {
      //returns true or false
      return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6
      );
    }
  });
}
function getAllPlanets() {
  return habitablePlanets
}
module.exports = {
  loadPlanetsDatafromCSV,
  getAllPlanets
};

let planets = require("./planets.mongo");
const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
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
        if (isHabitable(planetData) )
          //Replace below create with Update + Insert = Upsert
          savePlanetsToCollection(planetData)
      })
      .on("error", (err) => reject(err))
      .on("end", async () => {
        let habitablePlanets = await getAllPlanets();

        console.log(`${habitablePlanets.length } planets Found!`);
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
async function getAllPlanets() {
  //query to mongoDB planets collection
  return await planets.find({}, [ 'keplerName','-_id' ]);
}

async function savePlanetsToCollection(planetData) {
  try {
    await planets.updateOne(
      {
        keplerName: planetData.kepler_name,
      },
      {
        keplerName: planetData.kepler_name,
      },
      { upsert: true }
    );
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  loadPlanetsDatafromCSV,
  getAllPlanets,
};

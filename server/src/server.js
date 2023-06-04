const http = require("http");
const app = require("./app");
require('dotenv').config();
let { ConnectDB } = require("../src/services/mongo.services");

const PORT = process.env.PORT || 8000;

let { loadPlanetsDatafromCSV } = require("./model/planets.model");
let { loadspaceXlaunch_Data } = require("./model/launches.model");

let server = http.createServer(app);

async function loadServer() {
  await ConnectDB();
  await loadPlanetsDatafromCSV();
  await loadspaceXlaunch_Data();
  server.listen(PORT, () => console.log(`server is listening to port ${PORT}`));
}

loadServer();

/* 
PORT = 8000
MONGO_URL=mongodb+srv://mahoo:1RA8SMojOyIRNa5U@nasaprojectcluster.ijwur21.mongodb.net/?retryWrites=true&w=majority
 */

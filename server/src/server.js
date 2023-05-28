const http = require("http");
const app = require("./app");
let { ConnectDB } = require("../src/services/mongo.services");
console.log(ConnectDB);
const PORT = process.env.PORT || 8000;


let { loadPlanetsDatafromCSV } = require("./model/planets.model");
let server = http.createServer(app);


async function loadServer() {
 await ConnectDB()
  await loadPlanetsDatafromCSV();
  server.listen(PORT, () => console.log(`server is listening to port ${PORT}`));
}

loadServer();
let express = require("express");
let cors = require("cors");
let path = require("path");
var morgan = require("morgan");
let app = express();

let { planetsRouter } = require("./routes/Planets/planets.router");
let { launchesRouter } = require("./routes/Launches/launches.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("short"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get('/*', (req, res) => res.status(200).
  sendFile(path.join(__dirname, '..', 'public', 'index.html'))
);
//console.log(path.join(__dirname, "..", "public"));


module.exports = app;

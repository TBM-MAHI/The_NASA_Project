let express = require("express");
let cors = require("cors");
let path = require("path");
var morgan = require("morgan");
let app = express();
let api = require("./routes/api");


app.use(
  cors({
    origin: "http://localhost:3000",
    origin:'https://thespacexnasaproject.onrender.com/'
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/v1', api);

app.get("/*", (req, res) =>
  res.status(200).sendFile(path.join(__dirname, "..", "public", "index.html"))
);

module.exports = app;

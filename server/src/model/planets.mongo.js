const mongoose = require("mongoose");

let planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model('Planet', planetsSchema);
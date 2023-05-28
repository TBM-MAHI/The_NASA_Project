const mongoose = require("mongoose");

let launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  missionName: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  customers: {
    type: [String],
    required: true,
  },
  upcoming: {
    type: Boolean,
    required: true,
    default: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});
// Connects launchesSchema with "launches" Collection
// compiling the model
module.exports = mongoose.model("Launch", launchesSchema);
const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://mahoo:1RA8SMojOyIRNa5U@nasaprojectcluster.ijwur21.mongodb.net/?retryWrites=true&w=majority";
mongoose.connection.once("open", () => {
  console.log(`Mongo db Connection is ready..`);
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function ConnectDB() {
  await mongoose.connect(MONGO_URL);
}
async function disconnectDB() {
  await mongoose.disconnect();
}
module.exports = {
  ConnectDB,
  disconnectDB,
};

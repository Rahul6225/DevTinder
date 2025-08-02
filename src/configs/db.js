const mongoose = require("mongoose");
//mongoose.connect return a promise so we put in the async await
const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb://localhost:27017/devtinder"
    // "mongodb+srv://rahulorstan:8m2L9F28UlKBhWA1@cluster0.kyc1nwm.mongodb.net/DevTinder"
  );
};
module.exports = { ConnectDB };



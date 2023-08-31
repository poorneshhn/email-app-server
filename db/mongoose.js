const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then((res) => console.log("database connected successfully"));

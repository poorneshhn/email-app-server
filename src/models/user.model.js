const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleID: String,
  credits: {
    type: Number,
    default: 0,
  },
  picture: String,
  email: String,
  name: String,
});

module.exports = mongoose.model("users", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleID: String,
  //   name: {
  //     type: String,
  //     required: true,
  //   },
});

mongoose.model("users", userSchema);

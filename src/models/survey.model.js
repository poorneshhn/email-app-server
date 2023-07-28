const mongoose = require("mongoose");
const RecipientSchema = require("./recipient.model");

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  recipients: {
    type: [RecipientSchema],
  },
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
  _owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});

module.exports = mongoose.model("survey", surveySchema);

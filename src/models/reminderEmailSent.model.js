const mongoose = require("mongoose");

const reminderEmailSentSchema = new mongoose.Schema(
  {
    to: String,
    cc: String,
    bcc: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReminderEmailSent", reminderEmailSentSchema);

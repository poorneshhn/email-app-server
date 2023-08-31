const mongoose = require("mongoose");

const ReminderListSchema = new mongoose.Schema(
  {
    _owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reminderTime: { type: Number, required: true },
    eventDetails: { type: String, required: true },
    uniqueID: String,
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: "00:00",
    },
  },
  { timeStamps: true }
);

ReminderListSchema.methods.getPublicObject = function () {
  const reminderListObject = this.toObject();
  delete reminderListObject._owner;
  delete reminderListObject.reminderTime;
  delete reminderListObject._id;
  return reminderListObject;
};
module.exports = mongoose.model("ReminderList", ReminderListSchema);

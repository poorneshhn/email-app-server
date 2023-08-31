// convert 02:15 time format to milliseconds
function convertTimeToMilliSeconds(time) {
  let newTime = time.split(":");
  let hours = parseInt(newTime[0]);
  let minutes = parseInt(newTime[1]);
  return hours * 3600000 + minutes * 60000;
}

function getUTCFromIST(time) {
  let date = new Date(time);
  let offset = date.getTimezoneOffset() * 60000;
  return +date + offset;
}
function getPublicObjectReminderList(reminders) {
  return reminders.map((reminder) => reminder.getPublicObject());
}
function getStructuredReminderData(reminderData, userId) {
  if (!Array.isArray(reminderData)) {
    throw new Error("Reminder data must be an array");
  }
  let structuredReminderData = reminderData.map((reminder) => {
    return {
      _owner: userId,
      eventDetails: reminder.eventDetails,
      date: reminder.date,
      time: reminder.time,
      uniqueID: reminder.uniqueID,
      reminderTime: getUTCFromIST(
        new Date(reminder.date).getTime() +
          convertTimeToMilliSeconds(reminder.time)
      ),
    };
  });

  return structuredReminderData;
}

// getNextDayMillisiconds
function getNextDayMillisiconds() {
  // return new Date(new Date().setMinutes(new Date().getMinutes() + 1)).getTime();
  return new Date(new Date().setDate(new Date().getDate() + 1)).getTime();
}

module.exports = {
  getStructuredReminderData,
  convertTimeToMilliSeconds,
  getNextDayMillisiconds,
  getPublicObjectReminderList,
};

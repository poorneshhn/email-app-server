const cron = require("node-cron");
const ReminderList = require("../models/reminderList.model");
const User = require("../models/user.model");
const { getNextDayMillisiconds } = require("../utils/utils");
const sendReminderEmail = require("../services/sendEmail");

let previousYear = new Date().getFullYear();
// let task = cron.schedule("0 20 * * *", async () => {
let currentYear = new Date().getFullYear();
let task = cron.schedule("* * * * *", async () => {
  if (currentYear !== previousYear) {
    previousYear = currentYear;
    // clear reminder db
    await ReminderList.deleteMany({});
  }
  let reminders = await getEmailReminderWithinNext24Hours();
  scheduleEmailJobFromReminder(reminders);
});

async function getEmailReminderWithinNext24Hours() {
  try {
    let currentTimeInMilliSeconds = Date.now();
    let nextDayInMilliSeconds = getNextDayMillisiconds();
    const remindersWithinNext24Hours = await ReminderList.find({
      reminderTime: {
        $gte: currentTimeInMilliSeconds,
        $lt: nextDayInMilliSeconds,
      },
    });
    return remindersWithinNext24Hours;
  } catch (error) {
    console.log(error);
  }
}

async function scheduleEmailJobFromReminder(reminders) {
  try {
    reminders.forEach(async (event) => {
      let owner = event._owner;
      const user = await User.findById(owner);
      const email = user.email;
      const name = user.name;

      let reminderTime = new Date(event.reminderTime);
      let mins = reminderTime.getMinutes();
      let hours = reminderTime.getHours();
      let eventDetails = event.eventDetails;
      let task = cron.schedule(`${mins} ${hours} * * *`, () => {
        sendReminderEmail("reminder", {
          userName: name,
          toEmails: email,
          date: `${event.date}, ${event.time}`,
          info: eventDetails,
        });
        task.stop();
      });
    });
  } catch (error) {
    console.log(error);
  }
}

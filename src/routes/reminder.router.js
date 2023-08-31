const router = require("express").Router();
const ReminderList = require("../models/reminderList.model");
const {
  getStructuredReminderData,
  getPublicObjectReminderList,
} = require("../utils/utils");

router.post("/postreminderlist", async (req, res) => {
  try {
    const user = req.user.id;
    const { reminderData } = req.body;
    let structuredReminderData = getStructuredReminderData(reminderData, user);

    const reminders = await ReminderList.insertMany(structuredReminderData);
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update", async (req, res) => {
  const user = req.user.id;
  const { dates, datesId } = req.body;

  const Holidays = await HolidaylistModel.findByIdAndUpdate(
    datesId,
    { _owner: user, dates },
    { new: true }
  );
  res.status(200).json(Holidays);
});

router.get("/allreminderlist", async (req, res) => {
  try {
    const user = req.user.id;
    const allReminderList = await ReminderList.find({ _owner: user });

    res
      .status(200)
      .json({ list: getPublicObjectReminderList(allReminderList) });
  } catch (error) {
    console.error("error while querying all reminderlist", error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;

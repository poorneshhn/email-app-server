const { requireLogin } = require("../middlewares/authMiddleware");
const { requireCredits } = require("../middlewares/requireCredits");
const Survey = require("../models/survey.model");
const Recipients = require("../models/recipient.model");
const router = require("express").Router();

router.post("/", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;
  const recipientsArray = recipients.split(",").map((email) => ({
    email: email.trim(),
  }));
  const Survey = await new Survey({
    title,
    subject,
    body,
    recipients: recipientsArray,
    _owner: req.user.id,
    dateSent: Date.now(),
  }).save();
  res.send("ok");
});

module.exports = router;

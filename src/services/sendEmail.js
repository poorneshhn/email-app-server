const getMailTemplate = require("../emailHelpers/emailHelpers");
const nodemailer = require("nodemailer");
const ReminderEmailSent = require("../models/reminderEmailSent.model");
let config = {
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

async function sendReminderEmail(type = "reminder", mailTemplateOptions) {
  const mailOptions = getMailTemplate(type, mailTemplateOptions);

  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent:", info.messageId);
  const email = await ReminderEmailSent(mailOptions);
  await email.save();
}

module.exports = sendReminderEmail;

const nodemailer = require("nodemailer");
const getMailTemplate = require("../emailHelpers/emailHelpers");

let config = {
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendMailMiddleware = async (req, res, next) => {
  const body = req.body;
  let toEmails = body.emails;
  let userEmail = req.user.email;
  let userName = req.user.name;
  try {
    const mailOptions = getMailTemplate("survey", {
      toEmails,
      userName,
      userEmail,
    });

    const info = await transporter.sendMail(mailOptions);

    next();
  } catch (error) {
    console.log(error, "error while sending email");
    res.send("something went wrong while sending email. Refer logs");
  }
};

module.exports = sendMailMiddleware;

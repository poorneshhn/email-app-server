const getReminderBodyTemplate = (date, info) =>
  `<html>
  <style>
    .info-container {
      padding: 1rem;
      background-color: #ee6e73;
      color: white;
      width: max-content;
      height: 2rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      display: flex;
      align-items: center;
  }
  
  </style>
    <body>
      <h4>Its a Reminder Email from Emaily</h4>
      <p>You had created a Reminder event for this date ${date}.</p>
      <p>More information : </p>
      <pre class="info-container">${info}</pre>
    </body>
  </html>`;

const getSurveyBodyTemplate = () =>
  `<html>
    <body>
      <h3>Survey question</h3>
      <p>Are you happy with the service?</p>
      <div class="flex">
        <a href="http://localhost:3000">Yes</a>
        <a href="http://localhost:3000">No</a>
      </div>
    </body>
  </html>`;

const getMailTemplate = (
  type,
  { userName, userEmail, toEmails, date, info }
) => {
  let mailTemplate = {
    from: "Emaily <poorneshhn3@gmail.com>",
    to: toEmails,
    bcc: "poorneshhn3@gmail.com",
  };
  if (type === "reminder") {
    let html = getReminderBodyTemplate(date, info);
    let text = `Hi ${userName},\nIts a Reminder Email from Emaily.You had created a Reminder event for this date ${date}. ${info}`;
    mailTemplate.subject = "Reminder Email from Emaily 🥳";
    mailTemplate.text = text;
    mailTemplate.html = html;
    mailTemplate.amp = html;
    return mailTemplate;
  } else {
    mailTemplate.subject = "Survey from Emaily...";
    mailTemplate.text = "Its a survey from Emaily. Please respond.";
    mailTemplate.html = getSurveyBodyTemplate();
    return mailTemplate;
  }
};

module.exports = getMailTemplate;

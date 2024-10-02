const nodemailer = require("nodemailer");
const { USER_EMAIL, USER_PASSWORD, HOST_SERVICE, SMTP_PORT } = require("../config/config");

const transporter = nodemailer.createTransport({
  host: HOST_SERVICE,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

// Function to send an email
function sendEmail(email, name, topic, content) {
  const emailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: `Your AI-Generated Newsletter on ${topic}`,
    html: `<h1>Hello ${name},</h1><p>Here's your personalized article on <strong>${topic}</strong>:</p><p>${content}</p>`,
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(`Error sending email to ${email}:`, err);
    } else {
      console.log(`Email sent to ${email}: ${info.response}`);
    }
  });
}

module.exports = { sendEmail };

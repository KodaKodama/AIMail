require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  SMTP_PORT: 587,
  HOST_SERVICE: "smtp.gmail.com",
  USER_EMAIL: process.env.USER_EMAIL,
  USER_PASSWORD: process.env.PASS || "your-password",
  AI_API_KEY: process.env.API_KEY,
};

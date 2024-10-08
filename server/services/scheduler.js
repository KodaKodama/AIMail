const scheduler = require("node-cron");
const userController = require("../controller/userController");
const emailService = require("./emailService");
const {getRandomTopic} = require('../utils/getRandomTopic');
const aiService = require("./aiService");

function start() {
  // Schedule the task to generate content and send emails to each user
  scheduler.schedule("0 0 * * *", async () => {
    try {
      const users = await userController.getUsers(); // Fetch users from the controller
      console.log('Users fetched:', users);
    
    if (!Array.isArray(users) || users.length === 0) {
      console.warn('No users found.');
      return;
    }

    for (const user of users) {
      const { email, name, preferences } = user;
      console.log(`User: ${name}, Email: ${email}`);
      console.log('Preferences:', preferences);

      // Ensure preferences are valid
      if (!Array.isArray(preferences) || preferences.length === 0) {
        console.warn(`No preferences found for user: ${name}`);
        continue; 
      }

      // Get a random topic or subtopic from the user's preferences array
      const randomPreference = getRandomTopic(preferences);

      if (!randomPreference) {
        console.warn(`No valid preference selected for user: ${name}`);
        continue; 
      }

      // Generate AI content based on the selected random preference (topic or subtopic)
      const generatedContent = await aiService.generateStory(randomPreference);

      // Send personalized email
      await emailService.sendEmail(email, name, randomPreference, generatedContent);
      console.log(`Email sent to: ${email}`);
    }
  } catch (error) {
    console.error('Error during scheduled task:', error);
  }
});
}

module.exports = { start };

// Get a random subtopic from user preferences
function getRandomTopic(userPreferences) {
    return userPreferences[Math.floor(Math.random() * userPreferences.length)];
  }
  
  module.exports = { getRandomTopic };
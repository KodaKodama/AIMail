const Topic = require('../models/topics');
const User = require('../models/user');

topicController = {
    getTopic: async (req, res) => {
        try {
            console.log('fetching topics');
            
          const topics = await Topic.find();
          console.log('Fetched topics:', topics); // Log the response
          res.status(200).send(topics);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching topics', error });
        }
      },

      updatePreferences: async (req, res) => {
        try {
          const userId = req.userId;
          const { preferences } = req.body;  // Accept `preferences` as an array
  
          // Validate that preferences array is provided and not empty
          if (!Array.isArray(preferences) || preferences.length === 0) {
              return res.status(400).json({ msg: "Select at least one topic" });
          }
  
          // Ensure each preference has a `topic`
          const isValid = preferences.every(pref => pref.topic);
          if (!isValid) {
              return res.status(400).json({ msg: "Each topic must have a valid name" });
          }
  
          // Fetch the existing user
          const user = await User.findById(userId);
  
          if (!user) {
              return res.status(404).json({ msg: 'User not found' });
          }
  
          // Merge the new preferences with the existing ones
          preferences.forEach(newPref => {
              const existingPref = user.preferences.find(pref => pref.topic === newPref.topic);
  
              if (existingPref) {
                  // If topic already exists, merge subtopics without duplicates
                  newPref.subtopics.forEach(subtopic => {
                      if (!existingPref.subtopics.includes(subtopic)) {
                          existingPref.subtopics.push(subtopic);
                      }
                  });
              } else {
                  // If topic doesn't exist, add it to preferences
                  user.preferences.push(newPref);
              }
          });
  
          // Save the updated user document
          await user.save();
  
          res.status(200).json({ message: 'Preferences updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
};


module.exports = topicController;``
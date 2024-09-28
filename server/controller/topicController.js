const Topic = require('../models/topics');
const User = require('../models/user');

topicController = {
    getTopic: async (req, res) => {
        try {
            console.log('fetching topics');
            
          const topics = await Topic.find();
          res.status(200).send(topics);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching topics', error });
        }
      },

      updatePreferences: async (req, res) => {
        try {
            const userId = req.userId;
            const { preferences } = req.body;  // Accept `preferences` as a flat array
    
            // Validate that preferences array is provided and not empty
            if (!Array.isArray(preferences) || preferences.length === 0) {
                return res.status(400).json({ msg: "Select at least one preference" });
            }
    
            // Fetch the existing user
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
    
            // Merge the new preferences with the existing ones, avoiding duplicates
            user.preferences = [...new Set([...user.preferences, ...preferences])];
    
            // Save the updated user document
            await user.save();
    
            res.status(200).json({ message: 'Preferences updated successfully', user });
        } catch (err) {
            console.log(err);
            
            return res.status(500).json({ message: err.message });
        }
    }
};


module.exports = topicController;``
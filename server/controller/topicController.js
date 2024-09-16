const Topic = require('../models/topics');

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
      }
}

module.exports = topicController;
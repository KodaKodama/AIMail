const router = require('express').Router();
const Topic = require('../models/topics');
const topicController = require('../controller/topicController')

// Route to get all topics with subtopics
router.get('/topics', topicController.getTopic);

module.exports = router;
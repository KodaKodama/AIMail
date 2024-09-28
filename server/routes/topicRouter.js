const router = require('express').Router();
const topicController = require('../controller/topicController');
const isAuthenticated = require('../middlewares/isAuth')

// Route to get all topics with subtopics
router.get('/topics', topicController.getTopic);
router.post('/preferences', isAuthenticated, topicController.updatePreferences);

module.exports = router;
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  subtopics: { type: [String], required: true }, // Array of strings for recommended subtopics
});

const Topic = mongoose.model('SubtopicRecommendation', topicSchema);

module.exports = Topic;
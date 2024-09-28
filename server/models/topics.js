const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  subtopics: { type: [String], required: true }, 
});

const Topic = mongoose.model('SubtopicRecommendation', topicSchema);

module.exports = Topic;
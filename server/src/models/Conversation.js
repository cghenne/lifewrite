var mongoose = require('mongoose');

var ConversationSchema = mongoose.Schema({
  name: String,
  topic: String,
  created_on: Date,
  last_used: Date,
  conversation_history: [{ type: mongoose.Schema.ObjectId, ref: 'ConversationHistory' }],
  users : [String]
});

module.exports = mongoose.model('Conversation', ConversationSchema);

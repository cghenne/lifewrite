const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
  name: String,
  topic: String,
  created_on: { type: Date, default: Date.now },
  last_used: Date,
  conversation_history: {type: mongoose.Schema.ObjectId, ref: 'ConversationHistory'},
  users : [String],
  owner : String
});

module.exports = mongoose.model('Conversation', ConversationSchema);

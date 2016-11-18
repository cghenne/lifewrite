var mongoose = require('mongoose');

var ConversationHistorySchema = mongoose.Schema({
  created_on: Date,
  history: [string]
});

module.exports = mongoose.model('ConversationHistory', ConversationHistorySchema);

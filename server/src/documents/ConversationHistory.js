var mongoose = require('mongoose');
var HistoryLog = require('HistoryLog');

var ConversationHistorySchema = mongoose.Schema({
  created_on: {type: Date, default: Date.now},
  owner: String,
  history: [HistoryLog]
});

module.exports = mongoose.model('ConversationHistory', ConversationHistorySchema);

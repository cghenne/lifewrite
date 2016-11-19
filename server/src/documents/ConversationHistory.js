var mongoose = require('mongoose');

var HistoryLogSchema = mongoose.Schema({
	date: {type: Date, default: Date.now},
	message: String,
	sender: String
});

var ConversationHistorySchema = mongoose.Schema({
  created_on: {type: Date, default: Date.now},
  conversation: { type: mongoose.Schema.ObjectId, ref: 'Conversation' },
  history: [HistoryLogSchema]
});

module.exports = mongoose.model('HistoryLog', HistoryLogSchema);
module.exports = mongoose.model('ConversationHistory', ConversationHistorySchema);

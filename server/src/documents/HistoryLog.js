var mongoose = require('mongoose');

var HistoryLogSchema = mongoose.Schema({
	date: {type: Date, default: Date.now},
	message: String,
	sender: String
});

module.exports = mongoose.model('HistoryLog', HistoryLogSchema);

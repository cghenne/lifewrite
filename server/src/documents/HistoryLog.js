var mongoose = require('mongoose');

var HistoryLogSchema = mongoose.Schema({
	date: {type: Date, default: Date.now},
	message: String
});

module.exports HistoryLogSchema;
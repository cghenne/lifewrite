var mongoose = require('mongoose')
var ConversationModel = require('../models/Conversation.js');
var ConversationHistoryModel = require('../models/ConversationHistory.js');
var ConversationHistory = require('../documents/ConversationHistory.js')
var entity;

var ConversationHistoryModel = {};

ConversationHistoryModel.findById = (conversationId) => {
	ConversationHistory.findOne({conversation_id: conversationId}).exec(function(err, history){
		entity = history;
	});
	return entity;
}

ConversationHistoryModel.findByDate = (conversationId, date) => {
	ConversationHistoryModel.findOneBy({conversation_id: conversation_id, 'history.date' : {$gte : date}})
		.exec(function (err, document) {
			entity = document
		})
	return entity;
}

ConversationHistoryModel.create = (conversationId) => {
  var conversationHistory = new ConversationHistory({
    conversation: new mongoose.mongo.ObjectId(conversationId),
    history: []
  });
  conversationHistory.save(function (err) {});
  return conversationHistory;
}

ConversationHistoryModel.addToHistory = (conversationId, date, sender, message) => {
	var conversationHistory = ConversationHistoryModel.findById(conversationId);
	var historyLogEntity = new HistoryLog({
		sender: sender,
		message: message
	})
	conversationHistory.history.push(historyLogEntity)
	return ConversationHistory
}

module.exports = ConversationHistoryModel;
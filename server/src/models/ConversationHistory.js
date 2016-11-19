var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID;
var ConversationModel = require('../models/Conversation.js');
var ConversationHistoryModel = require('../models/ConversationHistory.js');
var ConversationHistory = require('../documents/ConversationHistory.js')
var entity;

var ConversationHistoryModel = {};


ConversationHistoryModel.fetchOrCreate = (conversationId) => {
	var history = ConversationHistoryModel.findById(conversationId);
	if (!history) {
		history = ConversationHistoryModel.create(conversationId);  
	}
	return history;
}
ConversationHistoryModel.findById = (conversationId) => {
	ConversationHistory.findOne({conversation_id: conversationId}).exec(function(err, history){
		entity = history;
	});
	return entity;
}

ConversationHistoryModel.findByTimestamp = (conversationId, timestamp) => {
	var dateStart = new Date(timestamp*1000);
	var dateEnd = new Date(timestamp*1000);
	dateStart.setHours(0,0,0,0)
	dateEnd.setHours(23,59,0,0)
	ConversationHistory.findOne({
		conversation: new ObjectID(conversationId),
		created_on: {$gte: dateStart, $lte: dateEnd}
	})
	.exec(function (err, document) {
		entity = document
	})
	console.log(entity)
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

ConversationHistoryModel.addToHistory = (conversationId, timestamp, sender, message) => {
	var conversationHistory = ConversationHistoryModel.findByTimestamp(conversationId, timestamp);
	var historyLogEntity = {
		sender: sender,
		message: message
	}
	conversationHistory.history.push(historyLogEntity)
	conversationHistory.save()
	return ConversationHistory
}

module.exports = ConversationHistoryModel;
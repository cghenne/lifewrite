const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID;
const ConversationModel = require('../models/Conversation.js');
const ConversationHistory = require('../documents/ConversationHistory.js')
var entity;

const ConversationHistoryModel = {};

ConversationHistoryModel.fetchOrCreate = (conversationId, timestamp) => {
	let history = ConversationHistoryModel.findByTimestamp(conversationId, timestamp);
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
	let dateStart = new Date(timestamp*1000);
	let dateEnd = new Date(timestamp*1000);
	dateStart.setHours(0,0,0,0)
	dateEnd.setHours(23,59,0,0)
	ConversationHistory.findOne({
		conversation: new ObjectID(conversationId),
		created_on: {$gte: dateStart, $lte: dateEnd}
	})
	.exec(function (err, document) {
		entity = document
	})
	return entity;
}

ConversationHistoryModel.create = (conversationId) => {
  let conversationHistory = new ConversationHistory({
    conversation: new mongoose.mongo.ObjectId(conversationId),
    history: []
  });
  conversationHistory.save(function (err) {});
  return conversationHistory;
}

ConversationHistoryModel.addToHistory = (conversationId, timestamp, sender, message) => {
	let conversationHistory = ConversationHistoryModel.findByTimestamp(conversationId, timestamp);
	let historyLogEntity = {
		sender: sender,
		message: message
	}
	conversationHistory.history.push(historyLogEntity)
	conversationHistory.save()
	return ConversationHistory
}

module.exports = ConversationHistoryModel;
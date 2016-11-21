const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID;
const ConversationHistory = require('../documents/ConversationHistory.js')
var entity;

const ConversationHistoryModel = {};

<<<<<<< HEAD
ConversationHistoryModel.fetchOrCreate = (conversationId, timestamp) => {
	let history = ConversationHistoryModel.findByTimestamp(conversationId, timestamp);
	if (!history) {
		history = ConversationHistoryModel.create(conversationId);
	}
	return history;
}
=======
>>>>>>> 88b7779a9fe2cf9a41ba93ed2aa455be91eff2a0
ConversationHistoryModel.findById = (conversationId) => {
	ConversationHistory.findOne({conversation_id: conversationId}).exec(function(err, history){
		entity = history;
	});
	return entity;
}

ConversationHistoryModel.findByTimestamp = (conversationId, timestamp, historyToAdd, res) => {
	let dateStart = new Date(timestamp);
	let dateEnd = new Date(timestamp);
	dateStart.setHours(0,1,0,0)
	dateEnd.setHours(23,59,0,0)
	ConversationHistory.findOne({
		conversation: new ObjectID(conversationId),
		"created_on": { $exists: true, $gte: dateStart, $lte: dateEnd }
	})
	.exec(function (err, document) {
		if (document && historyToAdd) {
			document.history.push(historyToAdd);
			document.save()
		} else if (!document && historyToAdd) {
			ConversationHistoryModel.create(conversationId, historyToAdd)
		}
		if (res) {
			  res.status(200).send(document)
		}
	})
}

ConversationHistoryModel.create = (conversationId, historyToAdd) => {
  let conversationHistory = new ConversationHistory({
    conversation: new mongoose.mongo.ObjectId(conversationId),
    history: []
  });
  if (historyToAdd) {
  	conversationHistory.history.push(historyToAdd)
  }
  conversationHistory.save(function (err) {});
  return conversationHistory;
}

<<<<<<< HEAD
ConversationHistoryModel.addToHistory = (conversationId, timestamp, sender, message) => {
	let conversationHistory = ConversationHistoryModel.fetchOrCreate(conversationId, timestamp);
=======
ConversationHistoryModel.addToHistory = (conversationId, data) => {
>>>>>>> 88b7779a9fe2cf9a41ba93ed2aa455be91eff2a0
	let historyLogEntity = {
		sender: data.message.sender,
		message: data.message.message,
		timestamp: data.message.date
	}
	let conversationHistory = ConversationHistoryModel.findByTimestamp(conversationId, historyLogEntity.timestamp, historyLogEntity);
}

module.exports = ConversationHistoryModel;

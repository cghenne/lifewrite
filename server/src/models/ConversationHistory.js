const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID;
const ConversationHistory = require('../documents/ConversationHistory.js')
var entity;

const ConversationHistoryModel = {};

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

ConversationHistoryModel.addToHistory = (conversationId, data) => {
	let historyLogEntity = {
		sender: data.message.sender,
		message: data.message.message,
		timestamp: data.message.date
	}
	let conversationHistory = ConversationHistoryModel.findByTimestamp(conversationId, historyLogEntity.timestamp, historyLogEntity);
}

module.exports = ConversationHistoryModel;

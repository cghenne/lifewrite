var Conversation = require('../models/Conversation.js');
var ConversationHistory = require('../models/ConversationHistory.js');
var entity;

var ConversationHistoryModel = {};

ConversationHistoryModel.findOne = (conversationId, timestamp) => {
	var dateOn = new Date(timestamp*1000);
	ConversationHistory.findOneBy({"history.date" :{$gte: dateOn}}).exec(function(err, history){
		entity = history;
	});
	return entity;
}

ConversationHistoryModel.addToHistory = (conversationId, sender, ...messages) => {
	
}

module.exports = ConversationHistoryModel;
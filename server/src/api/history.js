const history = {}
var ConversationHistoryModel = require('../models/ConversationHistory.js')

history.getHistory = (req, res, conversationId, timestamp) => {
  var history = ConversationHistoryModel.findById(conversationId);
  console.log(history)
  if (!history) {
    ConversationHistoryModel.create(conversationId);  
  }
  res.status(200).send(history)
}

history.getHistoryByTimestamp = (req, res, conversationId, timestamp) => {
  var dateOn = new Date(timestamp*1000);
  console.log(dateOn)
}

history.addToHistory = (req, res, conversationId, timestamp) => {
  var conversation = ConversationHistoryModel.create();
  if (!conversation) {
    res.status(404).send('Conversation not found')
  }
  res.status(200).send(conversation)
}

module.exports = history

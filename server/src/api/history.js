const history = {}
var ConversationHistoryModel = require('../models/ConversationHistory.js')

history.getHistory = (req, res, conversationId, timestamp) => {
  var history = ConversationHistoryModel.fetchOrCreate(conversationId, timestamp)
  res.status(200).send(history)
}

history.getHistoryByTimestamp = (req, res, conversationId, timestamp) => {
  var dateOn = new Date(timestamp*1000);
  console.log(dateOn)
}

history.addToHistory = (req, res, conversationId) => {
  ConversationHistoryModel.addToHistory(conversationId, req.body.timestamp, req.body.sender, req.body.message);
  history.getHistory(req, res, conversationId, timestamp);
  res.status(200).send(conversation)
}

module.exports = history

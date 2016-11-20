const history = {}
const ConversationHistoryModel = require('../models/ConversationHistory.js')

history.getHistory = (req, res, conversationId, timestamp) => {
  let history = ConversationHistoryModel.fetchOrCreate(conversationId, timestamp)
  res.status(200).send(history)
}

history.addToHistory = (req, res, conversationId, timestamp) => {
  ConversationHistoryModel.addToHistory(conversationId, timestamp, req.body.sender, req.body.message);
  history.getHistory(req, res, conversationId, timestamp);
}

module.exports = history

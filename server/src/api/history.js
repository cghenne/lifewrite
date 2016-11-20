const history = {}
const ConversationHistoryModel = require('../models/ConversationHistory.js')

history.getHistory = (req, res, conversationId, timestamp) => {
  ConversationHistoryModel.findByTimestamp(conversationId, timestamp, null, res)
}

module.exports = history

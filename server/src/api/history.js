const history = {}
var HistoryModel = require('../models/ConversationHistory.js')

history.getHistory = (req, res, conversationId) => {
  var history = HistoryModel.findOne(conversationId, req.body.timestamp);
  if (!history) {
    HistoryModel.create();
  }
  res.status(200).send(history)
}

history.addToHistory = (req, res) => {
  var conversation = HistoryModel.create(conversationId, req.body.name, req.body.topic, req.body.target_list)
  if (!conversation) {
    res.status(404).send('Conversation not found')
  }
  res.status(200).send(conversation)
}

module.exports = history

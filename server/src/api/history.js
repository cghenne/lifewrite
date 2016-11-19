const history = {}
var HistoryModel = require('../models/ConversationHistory.js')

history.getHistory = (req, res) => {
  var history = HistoryModel.
  res.status(200).send(conversation)
}

history.updateConversation = (req, res, conversationId) => {
  var conversation = ConversationModel.update(conversationId, req.body.name, req.body.topic, req.body.target_list)
  if (!conversation) {
    res.status(404).send('Conversation not found')
  }
  res.status(200).send(conversation)
}

module.exports = history

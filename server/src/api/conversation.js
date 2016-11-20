const conversation = {}
const ConversationModel = require('../models/Conversation.js')

conversation.getConversationListForUser = (req, res, userId) => {
    ConversationModel.findAllForUser(userId, res);
}

conversation.updateConversation = (req, res, conversationId) => {
  let conversation = ConversationModel.update(conversationId, req.body.name, req.body.topic, req.body.target_list)
  if (!conversation) {
    res.status(404).send('Conversation not found')
  }
  res.status(200).send(conversation)
}

module.exports = conversation

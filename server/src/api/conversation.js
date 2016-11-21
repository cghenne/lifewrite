const conversation = {}
const ConversationModel = require('../models/Conversation.js')

conversation.getConversationListForUser = (req, res, userId) => {
    ConversationModel.findAllForUser(userId, res);
}

conversation.updateConversation = (req, res, conversationId) => {
  ConversationModel.update(conversationId, req.body.name, req.body.topic, req.body.target_list, res)
}

module.exports = conversation

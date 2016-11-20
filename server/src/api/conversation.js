const conversation = {}
const ConversationModel = require('../models/Conversation.js')

conversation.createOrFetchConversation = (req, res) => {
  let conversation = ConversationModel.fetchOrCreate(req.body.target_list);
  res.status(200).send(conversation)
}

conversation.getConversationListForUser = (req, res, userId) => {
    let conversationList = ConversationModel.findAllForUser(userId);
    res.status(200).send(conversationList)
}

conversation.updateConversation = (req, res, conversationId) => {
  let conversation = ConversationModel.update(conversationId, req.body.name, req.body.topic, req.body.target_list)
  if (!conversation) {
    res.status(404).send('Conversation not found')
  }
  res.status(200).send(conversation)
}

module.exports = conversation

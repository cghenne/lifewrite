const conversation = {}
var ConversationModel = require('../models/Conversation.js')

conversation.createOrFetchConversation = (req, res) => {
  var conversation = ConversationModel.findOneByUserIds(req.body.target_list)
  if (!conversation) {
    ConversationModel.create(req.body.owner, req.body.name, req.body.topic, req.body.target_list)
    conversation = ConversationModel.findOneByUserIds(req.body.target_list)
  }
  res.status(200).send(conversation)
}

conversation.updateConversation = (req, res, conversationId) => {
  var conversation = ConversationModel.update(conversationId, req.body.name, req.body.topic, req.body.target_list)
  if (!conversation) {
    res.status(404).send('Conversation not found')
  }
  res.status(200).send(conversation)
}

module.exports = conversation

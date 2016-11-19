const conversation = {}
var ConversationRepository = require('../repositories/Conversation.js')

conversation.createOrFetchConversation = (req, res) => {
  var conversation = ConversationRepository.findOneByUserIds(req.body.target_list)
  if (!conversation) {
    ConversationRepository.create(undefined, req.body.target_list)
    conversation = ConversationRepository.findOneByUserIds(req.body.target_list)
  }
  res.status(200).send(conversation)
}

conversation.updateConversation = (req, res) => {
  var conversation = ConversationRepository.findOneByUserIds(req.body.target_list)
  if (!conversation) {
    res.status(404).send('Conversation not found')
  }
}

module.exports = conversation

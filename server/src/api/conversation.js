const conversation = {};
var Conversation = require('../models/Conversation.js');
var ConversationRepository = require('../repositories/Conversation.js');

conversation.createOrFetchConversation = (req, res, userName, targetUserName) => {
  var conversation = ConversationRepository.findOneByUserIds(userName, targetUserName);
  if (!conversation) {
    ConversationRepository.create(undefined, userName, targetUserName);
    conversation = ConversationRepository.findOneByUserIds(userName, targetUserName);
  }
  res.status(200).send(conversation);
};

module.exports = conversation;

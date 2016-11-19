var Conversation = require('../models/Conversation.js');

var ConversationRepository = {};
var entity;

ConversationRepository.findOneByUserIds = (targetUserIds) => {
  Conversation.findOne({'users' : {$in: targetUserIds}}).exec(function(err, document) {
    entity = document;
  });
  return entity;
};

ConversationRepository.create = (name = "Default", targetUserIds) => {
  var conversation = new Conversation({
    name: name + 'Conversation',
    created_on: new Date(),
    conversation_history: [],
    users: targetUserIds
  });
  conversation.save();
  return conversation;
};

module.exports = ConversationRepository;

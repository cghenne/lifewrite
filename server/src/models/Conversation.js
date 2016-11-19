var Conversation = require('../models/Conversation.js');

var ConversationModel = {};
var entity;

ConversationModel.findOneByUserIds = (targetUserIds) => {
  Conversation.findOne({'users' : {$in: targetUserIds}}).exec(function(err, document) {
    entity = document;
  });
  return entity;
};

ConversationModel.create = (ownerId, name = "Default", topic = "", targetUserIds) => {
  var conversation = new Conversation({
    name: name + 'Conversation',
    topic: topic,
    conversation_history: [],
    users: targetUserIds,
    owner: ownerId
  });
  conversation.save();
  return conversation;
};

ConversationModel.update = (conversationId, name, topic, targetUserIds) => {
  var updatePrams = {};
  if (name) {
    updatePrams.name = name;
  }
  if (topic) {
    updatePrams.topic = topic;
  }
  if (targetUserIds) {
    updatePrams.users = targetUserIds;
  }
  Conversation.findOneByIdAndUpdate(conversationId, updatePrams, {new: false}).exec(function(err, document){
    entity = document;
  });
  return entity;
}

module.exports = ConversationModel;

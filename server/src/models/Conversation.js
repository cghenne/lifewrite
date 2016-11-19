const Conversation = require('../documents/Conversation.js');
const ConversationModel = {};
var entity;

ConversationModel.findOneByUserIds = (targetUserIds) => {
  Conversation.findOne({'users' : {$in: targetUserIds}}).exec(function(err, document) {
    entity = document;
  });
  return entity;
};

ConversationModel.findOneById = (conversationId) => {
  Conversation.findOneById(conversationId).exec(function(err, document){
    entity = document;
  })
  return entity;
}

ConversationModel.findAllForUser = (userId) => {
  Conversation.find({'users' : userId}).exec(function(err, document) {
    entity = document;
  });
  return entity;
}

ConversationModel.create = (ownerId, name = "Default", topic = "", targetUserIds) => {
  var conversation = new Conversation({
    name: name + 'Conversation',
    topic: topic,
    users: targetUserIds,
    owner: ownerId
  });
  conversation.save(function (err) {console.log(err)});
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

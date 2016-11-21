const Conversation = require('../documents/Conversation.js');
const ConversationModel = {};

ConversationModel.findOneByUserIds = (targetUserIds, sendInvites, owner) => {
  Conversation.findOne({'users' : {"$all": targetUserIds}}).exec(function(err, document) {
    console.log('conversation from find')
    if (document) {
          sendInvites(document)
    } else {
          ConversationModel.create(owner, targetUserIds, null, null, sendInvites)
    }
    return;
  });
};

ConversationModel.fetchOrCreate = (owner, targetUserIds, sendInvites) => {
  targetUserIds.push(owner)
  ConversationModel.findOneByUserIds(targetUserIds, sendInvites, owner)
}

ConversationModel.findOneById = (conversationId) => {
  var entity = null;
  Conversation.findById(conversationId).exec(function(err, document){
    entity = document;
  })
  return entity;
}

ConversationModel.findAllForUser = (userId, res) => {
  Conversation.find({'users' : {$in: [userId]}}).exec(function(err, document) {
    if (document) {
      res.status(200).send(document)
    } else {
      res.status(200).send([])
    }
  });
}

ConversationModel.create = (ownerId, targetUserIds, name = "Default", topic = "", sendInvites) => {
  var conversation = new Conversation({
    name: name + 'Conversation',
    topic: topic,
    users: targetUserIds,
    owner: ownerId
  });
  console.log('conversation from create')
  conversation.save(function (err) {console.log(err)});
  sendInvites(conversation)
  return conversation;
};

ConversationModel.update = (conversationId, name, topic, targetUserIds) => {
  var entity = null;
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

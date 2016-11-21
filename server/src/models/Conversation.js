const Conversation = require('../documents/Conversation.js');
const ConversationModel = {};

ConversationModel.findOneByUserIds = (targetUserIds, sendInvites, owner) => {
  Conversation.findOne({'users' : {"$all": targetUserIds}}).exec(function(err, document) {
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
  conversation.save(function (err) {console.log(err)});
  sendInvites(conversation)
  return conversation;
};

ConversationModel.update = (conversationId, name, topic, targetUserIds, res) => {
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
    if (document) {
      res.status(200).send(document)
    } else {
      res.status(500).send({"message" : "cannot update entity"})
    }
  });
  return entity;
}

module.exports = ConversationModel;

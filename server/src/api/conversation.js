const conversation = {};
var Conversation = require('../models/Conversation.js');

conversation.createOrFetchConversation = (req, res, userName, targetUserName) => {
  var conversation = Conversation.findOne({'users' : [userName, targetUserName]});
  console.log(conversation);
  if (!conversation) {
    var conversation = new Conversation({
      name: userName + 'Conversation',
      created_on: new Date(),
      conversation_history: [],
      users: [userName, targetUserName]
    });
    conversation.save(function (err) {
      if(err) res.status(404).send(err);
    });
  }
  res.status(200).send(conversation);
};

module.exports = conversation;

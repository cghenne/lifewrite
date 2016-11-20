const ConversationModel = require('../models/Conversation.js')
let io = null;
let connectedSocket = null;

var onlineConversations = {}
var onlineUsers = {}

const setupIO = connectedIo => {
  io = connectedIo;

  io.on('connection', connectedSocket => {
    connectedSocket.on('login', function (data) {
      connectedSocket.userId = data.userId;
      onlineUsers[connectedSocket.userId] = connectedSocket.userId;
      io.emit('update:userlist', onlineUsers)
    })

    connectedSocket.on('join:conversation', function (data) {
      const conversationId = data.conversationId
      if (conversationId) {
        let conversation = ConversationModel.findOneById(conversationId);
        if (!conversation) {
          connectedSocket.emit('notfound:conversation')
          return;
        }
      } else {
        let conversation = ConversationModel.fetchOrCreate(data.targetList);
      }
      connectedSocket.join(data.conversationId)
    });

    connectedSocket.on('send:message', function (data) {
      connectedSocket.broadcast.to(data.conversationId).emit(
        'receive:message',
        {conversationId: data.conversationId, sender: connectedSocket.userId, message: data.message.text}
      )
    });

    connectedSocket.on('disconnect', () => {
      if (connectedSocket.hasOwnProperty('userId') && onlineUsers[connectedSocket.userId]) {
          delete onlineUsers[connectedSocket.userId]
      }
      connectedSocket = null
      io.emit('update:userlist', onlineUsers)
    });
  });
}

const isConnected = () => connectedSocket !== null;

const emitEvent = (eventName, data) => {
  if (isConnected()) {
    connectedSocket.emit(eventName, data);
    return true;
  } else {
    return false;
  }
}

exports.setupIO = setupIO;
exports.isConnected = isConnected;
exports.emitEvent = emitEvent;

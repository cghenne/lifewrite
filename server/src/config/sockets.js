const ConversationModel = require('../models/Conversation.js')
const _ = require('lodash');

let io = null;
let connectedSocket = null;

var onlineConversations = {}
var onlineUsers = {}

const setupIO = connectedIo => {
  io = connectedIo;

  io.on('connection', connectedSocket => {
    connectedSocket.on('login', function (data) {
      connectedSocket.userId = data.userId;
      onlineUsers[connectedSocket.userId] = connectedSocket
      io.sockets.emit('update:userlist', {users: _.keys(onlineUsers)})
    })

    connectedSocket.on('join:conversation', function (data) {
      let conversation;
      const conversationId = data.conversationId
      if (conversationId) {
        let conversation = ConversationModel.findOneById(conversationId);
      } else {
        conversation = ConversationModel.fetchOrCreate(connectedSocket.userId, data.targetList);
      }
      if (!conversation) {
        connectedSocket.emit('notfound:conversation')
        return;
      }
      conversation.users.map((userId) => {
        if (onlineUsers[userId]) {
          let userSocket = onlineUsers[userId];
          userSocket.join(data.conversationId)
          userSocket.emit('receive:joinedConversation', {conversationId: conversation._id})
        }
      });
    });

    connectedSocket.on('send:message', function (data) {
      console.log('got message')
      console.log(data)
      connectedSocket.broadcast.to(data.conversationId).emit(
        'receive:message',
        {conversationId: data.conversationId, sender: connectedSocket.userId, message: data.message}
      )
    });

    connectedSocket.on('logout', () => {
      console.log('got logout')
      if (connectedSocket.hasOwnProperty('userId') && onlineUsers[connectedSocket.userId]) {
          delete onlineUsers[connectedSocket.userId]
      }
      io.emit('update:userlist', onlineUsers)
    })

    connectedSocket.on('disconnect', () => {
      console.log('got dc')
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

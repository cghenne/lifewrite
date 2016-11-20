const ConversationModel = require('../models/Conversation.js')
let io = null;
let socket = null;

var onlineConversations = {}
var onlineUsers = {}

const setupIO = connectedIo => {
  io = connectedIo;

  io.on('connection', connectedSocket => {
    socket = connectedSocket;

    socket.on('login', function (data) {
      socket.userId = data.userId;
      onlineUsers[socket.userId] = socket.userId;
    })

    socket.on('join:conversation', function (data) {
      const conversationId = data.conversationId
      if (!onlineConversations[conversationId]) {
          console.log(`no conversation ${conversationId} online :(`)
          let conversation = ConversationModel.findOneById(conversationId);
          if (!conversation) {
            socket.emit('notfound:conversation')
            return;
          }
          onlineConversations[conversationId] = []
          let conversationOnlineUsers = conversation.users.filter(function(user) {
            return onlineUsers[user] ? onlineUsers[user] : false
          })
          onlineConversations[conversationId].push(socket)
          onlineConversations[conversationId].push(conversationOnlineUsers);
      }
      // onlineConversations[conversationId].emit('invited:chat', conversationId);
    });

    socket.on('send:message', function (data) {
      const conversationId = data.conversationId
      const message = data.message.text
      // onlineConversations[conversationId].emit('heh')
    });

    socket.on('disconnect', () => {
      if (socket.hasOwnProperty('userId') && onlineUsers[socket.userId]) {
          delete onlineUsers[socket.userId]
      }
      socket = null
      io.emit('update userlist', onlineUsers)
      console.log('user disconnected');
    });
  });
}

const isConnected = () => socket !== null;

const emitEvent = (eventName, data) => {
  if (isConnected()) {
    socket.emit(eventName, data);
    return true;
  } else {
    return false;
  }
}

exports.setupIO = setupIO;
exports.isConnected = isConnected;
exports.emitEvent = emitEvent;

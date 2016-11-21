const ConversationModel = require('../models/Conversation.js')
const HistoryModel = require('../models/ConversationHistory.js')
const _ = require('lodash');

let io = null;
let connectedSocket = null;

var onlineConversations = {}
var onlineUsers = {}

const setupIO = connectedIo => {
  io = connectedIo;

  io.on('connection', connectedSocket => {
    connectedSocket.on('login', function (data) {
      console.log('user logged in:')
      console.log(data.userId)
      connectedSocket.userId = data.userId;
      onlineUsers[connectedSocket.userId] = connectedSocket
      updateUserList()
    })

    connectedSocket.on('join:conversation', function (data) {
      let conversation; 
      const conversationId = data.conversationId
      if (conversationId) {
        conversation = ConversationModel.findOneById(conversationId, sendInvites);
      } else {
        conversation = ConversationModel.fetchOrCreate(connectedSocket.userId, data.targetList, sendInvites);
      }
    });

    const sendInvites = (conversation) => {
      conversation.users.map((userId) => {
        if (onlineUsers[userId]) {
          let userSocket = onlineUsers[userId];
          userSocket.join(conversation._id)
          userSocket.emit('receive:joinedConversation', {conversationId: conversation._id})
        }
      });
    }

    const updateUserList = () => {
      io.sockets.emit('update:userlist', {users: _.keys(onlineUsers)})
    }

    connectedSocket.on('send:message', function (data) {
      console.log('got message')
      connectedSocket.broadcast.to(data.conversationId).emit(
        'receive:message',
        {conversationId: data.conversationId, sender: connectedSocket.userId, message: data.message}
      )
      HistoryModel.addToHistory(
          data.conversationId,
          data
       )
    });

    connectedSocket.on('logout', () => {
      console.log('got logout')
      if (connectedSocket.hasOwnProperty('userId') && onlineUsers[connectedSocket.userId]) {
          delete onlineUsers[connectedSocket.userId]
      }
      updateUserList()
    })

    connectedSocket.on('disconnect', () => {
      console.log('got dc')
      if (connectedSocket.hasOwnProperty('userId') && onlineUsers[connectedSocket.userId]) {
          delete onlineUsers[connectedSocket.userId]
      }
      updateUserList()
      connectedSocket = null
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

require('isomorphic-fetch');
require('es6-promise').polyfill();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const api = require('./api/');
const fs = require('fs');
const Utils = require('./utils/Utils');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


http.listen(4000, () => {
  console.log('listening on *:4000');
});


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/users', (req, res) => {
  api.lifeworks.getUsers()
  .then((results) => {
    res.json(results);
  })
  .catch(console.error);
});

app.get('/api/conversation/:userName/with/:targetUserName', (req, res) => {
  api.conversation.createOrFetchConversation(req, res, req.params.userName, req.params.targetUserName);
});

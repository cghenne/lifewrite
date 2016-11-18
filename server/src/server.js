require('isomorphic-fetch');
require('es6-promise').polyfill();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const api = require('./api/');
const fs = require('fs');
const Utils = require('./utils/Utils');

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

app.get('/api/test', (req, res) => {

  api.test.getTitle()
  .then((results) => {
    res.json(results);
  })
  .catch(console.error);
});

require('isomorphic-fetch');
require('es6-promise').polyfill();


const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./config/routes');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});

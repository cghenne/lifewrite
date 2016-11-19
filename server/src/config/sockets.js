let io = null;
let socket = null;

const setupIO = connectedIo => {
  io = connectedIo;

  io.on('connection', connectedSocket => {
    socket = connectedSocket;
    console.log('a user connected');
    socket.on('disconnect', () => {
      socket = null;
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

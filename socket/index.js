const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on('connection', (socket) => {
  io.emit('welcome event', 'hello this is socket');
  //take userId and add it to the array
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    //send new list of online users to all users
    io.emit('getUsers', users);
  });
  socket.on('disconnected', () => {
    removeUser(socket.id);
  });
});

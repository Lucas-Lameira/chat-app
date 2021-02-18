/* server side js - THIS IS THE BACKEND */
const path = require('path');
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));


let users = [];


//when user connects
io.on('connection', socket => {  
  
  socket.on('aside data', ({username, room}) => {

    const user = addUserJoin(socket.id, username, room)

    //room functional join from socketio
    socket.join(user.room)

    socket.broadcast
      .to(user.room)
      .emit('message', messageData('admin', `${user.username} has joined the chat`));
    //console.log(`user: ${user}\nroom:${room}`)
    /* io.emit('aside data', {user, room}) */

    io.to(user.room).emit('aside data', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
  })

  //send message to frontend / emit to a single user or a client
  //socket.emit('message', messageData(socket.id + ' ', 'welcome to the chat room!'));

  //also emits a message to frontend, but emmits to everyone except the user
  //socket.broadcast.emit('message', messageData('user', 'A user has joined the chat'));

  //emmits to everyone 
  //io.emit();  

  //event emmited on frontend - listen to messages
  socket.on('chat message', msg => {
    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('chat message',messageData(user.username, msg));
  })


  //Each socket also fires a special disconnect event / run when user disconnects
  socket.on('disconnect', () => {
    
    const user = userLeft(socket.id);

    if(user){
      io.to(user.room).emit('message', messageData('admin',`${user.username} has left the room`))

      io.to(user.room).emit('aside data', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }

  })
})

const PORT = 3000 || process.env.PORT;
//http server listen on port 3000
server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`)
})


function messageData (user, message) {
  return {
    user,
    message,
    time: getHourAndMinute()
  }
}

function getHourAndMinute() {
  /* constructor Date() */
  /* year, month, day, hours, minutes, seconds, milliseconds */
  const now = Date()
  const date = new Date(now);
  //console.log(`${date.getHours()}:${date.getMinutes()}`);
  return `${date.getHours()}:${date.getMinutes()}`;
}

function addUserJoin(id, username, room) {
  const user = {id, username, room}
  users.push(user);
  return user;
}

function getCurrentUser (id) {
  return users.find(user => user.id === id);
}

function userLeft (id) {
  const index = users.findIndex(user => user.id === id)

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getUsersInRoom(room){
  return users.filter(user => user.room === room);
}
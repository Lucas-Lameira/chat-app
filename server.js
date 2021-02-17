/* server side js - THIS IS THE BACKEND */
const path = require('path');
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));


//when user connects
io.on('connection', socket => {
  console.log(`conectouuuuuu!! \nuserid: ${socket.id}`) // ler com a voz do gaules

  //send message to frontend / emit to a silge user or client
  socket.emit('message', 'hello client frontend');

  //also emits a message to frontend, but emmit to everyone except the user
  socket.broadcast.emit('message', 'A user has joined the chat');

  //emmits to everyone 
  //io.emit();


  //Each socket also fires a special disconnect event / run when user disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected'); //vozinha do discord  
    io.emit('message', 'A user has left the room')
  })

  //event emmited on frontend
  socket.on('chat message', msg => {
    console.log(`message: ${msg}`);
    io.emit('chat message', msg)
  })
})

const PORT = 3000 || process.env.PORT;
//http server listen on port 3000
server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`)
})
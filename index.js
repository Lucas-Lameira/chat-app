const express = require('express');
const port = 3000;

//initialize app with express - app will be a function handler to supply an http server
const app = express();

//
const http = require('http').Server(app);

// inicializando uma instancia do socketio passando o objeto http
const io = require('socket.io')(http)

//
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
})


//listen no evento connection pra sockets e logs que entram no console
io.on('connection', (socket) => {
  console.log("conectou!!"); //dps poe a vozinha do discord

  socket.on('chat message', (msg)=> {
    console.log(`message: ${msg}`)
    
    io.emit('chat message', msg)
  })
 
 socket.on('disconnect', () => {
    console.log('user disconected');
  })
})  //obs ('some event', some property or some value)

//http server listen on port 3000
http.listen(port, () => {
  console.log(`listen on port ${port}`)
})
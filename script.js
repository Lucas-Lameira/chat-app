// client side js - frontend js

//defaults to trying to connect to the host that serves the page.
let socket = io();

let input = document.getElementById('text-message');
let form = document.getElementById('message-form');
let ulEment = document.getElementById('message-list');

//no index.js vamo printar o eventomessage-form
form.addEventListener('submit', function(event){
  event.preventDefault()
  if(input.value){   
    //when the user types in a message, the server gets it as a chat message event 
    socket.emit('chat message', input.value);
    input.value = ''
  }
})

socket.on('chat message', function (msg) {
  let liElement = document.createElement('li');
  liElement.textContent = msg;
  ulEment.appendChild(liElement);

  window.scrollTo(0, document.body.scrollHeight);
})

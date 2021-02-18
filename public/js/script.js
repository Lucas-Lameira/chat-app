// client side js - frontend js

//by default trying to connect to the host that serves the page.
let socket = io(); //esse io vem da tag script com o socketio no chatapp.html


let chatField = document.getElementById('chat-field');

//get data from query params - https://developer.mozilla.org/pt-BR/docs/Web/API/URLSearchParams/get
const queryParams = new URLSearchParams(window.location.search);
const username = queryParams.get('user-name')
const room = queryParams.get('rooms')
//console.log(user, room)

/*  */
socket.emit('aside data', {username, room})

socket.on('aside data', ({room, users}) => {  
  outputUsers(users)
  outputCurrentRoom(room)
})

//getting default messages from the server
socket.on('message', msg => {
  outputChatMessage(msg) 
  console.log(msg)
})

let form = document.getElementById('chat-form');
let input = document.getElementById('text-message');

form.addEventListener('submit', event => {
  event.preventDefault();

  if(input.value){
    //when the user types in a message, the server gets it as a "chat message" event
    socket.emit('chat message', input.value);
    input.value = '';
  }  
});

socket.on('chat message', msg => {
  outputChatMessage(msg);
  
  //scroll down man 
  chatField.scrollTop = chatField.scrollHeight
})



//output message 
function outputChatMessage (msg) {  
  let div = document.createElement('div');
  div.classList.add('box-message')

  let strong = document.createElement('strong');
  let p = document.createElement('p');
  p.innerText =  msg.user;

  let span = document.createElement('span');
  span.innerText = "-" + msg.time ;

  p.appendChild(span);

  strong.appendChild(p);

  let pMessage = document.createElement('p');
  pMessage.innerText = msg.message

  div.appendChild(strong);
  div.appendChild(pMessage);

  chatField.appendChild(div);  
}


function outputUsers(users) {
  let ul = document.getElementById('users-in-room')  
  ul.innerHTML = '';
  users.forEach((user) => {
    let li = document.createElement('li');
    li.innerText = user.username;
    ul.appendChild(li);
  });
}

function outputCurrentRoom(room) {
  let h3 = document.getElementById('current-room')
  h3.innerText = room
}
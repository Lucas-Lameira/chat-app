// client side js - frontend js

//by default trying to connect to the host that serves the page.
let socket = io(); //esse io vem da tag script com o socketio no chatapp.html


let chatField = document.getElementById('chat-field');

//getting default messages from the server
socket.on('message', msg => {
  console.log(`server msg: ${msg}`)  
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


  //sc
  chatField.scrollTop = chatField.scrollHeight
})


//output message 
function outputChatMessage (msg) {  
  let div = document.createElement('div');
  div.classList.add('box-message')

  let strong = document.createElement('strong');
  let p = document.createElement('p');
  p.innerText = 'lucas lameira';

  let span = document.createElement('span');
  span.innerText = '14:30 pm' ;

  p.appendChild(span);

  strong.appendChild(p);

  let pMessage = document.createElement('p');
  pMessage.innerText = msg

  div.appendChild(strong);
  div.appendChild(pMessage);

  chatField.appendChild(div);  
}
const socket=io();
let textarea=document.querySelector("#text-msg");
let msgBox=document.querySelector(".msg-box");
let nameBox=document.querySelector(".user-name");
let enter=document.querySelector('#save-btn');
let form=document.querySelector('.model');
let send=document.querySelector(".send-btn")
let name;
 enter.addEventListener("click",function(e){
     e.preventDefault();
     name=nameBox.value;
     while(!name){
         nameBox.value="";
     }
     socket.emit("newUserJoined",name);
     form.style.display="none";
     
 })
  
send.addEventListener("click",function(){
 
 sendMsg(textarea.value)
 textarea.value='';
 scrollBottom();
});

textarea.addEventListener("keyup",(e)=>{
     if(e.key==='Enter'){
        sendMsg(e.target.value);
        e.target.value='';
        scrollBottom();
     }
});

function sendMsg(msg){
    let message={
        user:name,
        message:msg
    }
  
    // Append the msg to outgoing
    appendMsg(message,'outgoing');
    // send to server
    socket.emit('message',message);
}

function appendMsg(msg,type){
  let newDiv=document.createElement("div"); 
  newDiv.className=type;
  let inner="msg";
  let innerName="name"
  let data=` <div class=${inner}>
               <div class=${innerName}>
                      <h4>${msg.user}</h4>
               </div>
                     <p>${msg.message}</p>
                               </div>
                                     </div>`;
  newDiv.innerHTML=data;
  msgBox.appendChild(newDiv);
}
// scroll to bottom
function scrollBottom(){
    msgBox.scrollTop=msgBox.scrollHeight;
}

// Receive the message
socket.on("message",(msg)=>{
    appendMsg(msg,"incoming");
    incomingAudio();
    scrollBottom();
});

// new user joined
socket.on("newUserJoined",(user)=>{
    appendJoin(user,"joined");
    joinAudio();
})
// defining appendJoin
function appendJoin(user,type){
    let newDiv=document.createElement("div"); 
    newDiv.className=type;
    let inner="msg";
    let innerName="name"
    let data=` <div class=${inner}>
                 <div class=${innerName}>
                 <hr>
                        <h6>*****${user} joined the chat*****</h6>
                  <hr>
                            </div>
                            </div>`;
    newDiv.innerHTML=data;
    msgBox.appendChild(newDiv);
    scrollBottom();
}

function joinAudio(){
    let audio=new Audio("tune.mp3");
    audio.play();

}
function incomingAudio(){
    let audio=new Audio("incoming.mp3");
    audio.play();
}

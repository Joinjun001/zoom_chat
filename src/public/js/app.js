const socket = io();

const room = document.getElementById("room");
const msgForm = room.querySelector("#msg");
const nickname = document.querySelector("#nickname");
const nameForm = nickname.querySelector("#name");

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

let roomName;
msgForm.hidden = true;

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", input.value, roomName,() =>{
        addMessage(`You: ${value}`);
    });
    input.value = "";
}

function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = nickname.querySelector("#name input");
    
    socket.emit("nickname", input.value);

}

function showRoom() {
    const h3 = room.querySelector("h3");
    welcome.hidden = true;
    msgForm.hidden = false;
    nameForm.hidden = true;
    
    
    h3.innerText = `Room ${roomName}`;
    msgForm.addEventListener("submit", handleMessageSubmit);
}



function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}


form.addEventListener("submit", handleRoomSubmit);
nameForm.addEventListener("submit", handleNicknameSubmit);


socket.on("welcome", (user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} ${newCount}`;
    addMessage(`${user} joined this room.`);
});

socket.on("bye", (user, newCount)=> {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName} ${newCount}`;
    addMessage(`${user} lefted this room.`);
});

socket.on("message", addMessage);

socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";
    if (rooms.length === 0){
        return; // 아래 코드를 실행하지 않음.
    }
    rooms.forEach( room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    })
});
//socket.on("room_change", (msg) => {console.log(msg)}); 랑 똑같음.


const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form"); 
const socket = new WebSocket(`ws://${window.location.host}`);
//프론트엔드에서 백엔드(서버)에 연결
//프론트엔드에서 socket은 연결된 서버, 백엔드에서 socket은 연결된 브라우저를 뜻한다.


socket.addEventListener("open", () => {
    console.log("Connected to Server (O)");
}); // when socket is opened

socket.addEventListener("message", (message)=> {
    const li = document.createElement("li");
    li.innerText = message.data;    
    messageList.append(li);
}); 

socket.addEventListener("close", ()=> {
    console.log("Disconnected from Server");
});


function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    console.log(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
import http from "http";
import SocketIO from "socket.io";
import express from "express"; 

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req,res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on https://localhost:3000`);

const httpServer = http.createServer(app); // express로 server를 만듬. 
const wsServer = SocketIO(httpServer); // socketIO 서버를 만듬 

wsServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) =>{
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome");
    });
});


/*
const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket); //연결된 브라우저들을 알기위해 sockets에 넣음.
    socket["nickname"] = "Anon";
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from the browser"));
    socket.on('message', (msg) => {
        const message = JSON.parse(msg);
        switch(message.type) {
            case "new_message":
                sockets.forEach((aSockets) => aSockets.send(`${socket.nickname}: ${message.payload}`));
            case "nickname":
                socket["nickname"] = message.payload;
        } 
    });
}); 
*/

httpServer.listen(3000, handleListen);
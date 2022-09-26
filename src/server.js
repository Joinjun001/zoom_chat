import http from "http";
import WebSocket from "ws";
import express from "express"; 

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req,res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on https://localhost:3000`);

const server = http.createServer(app); // express로 server를 만듬. 
const wss = new WebSocket.Server({ server }); //server 에 http와 websocket둘다 추가.

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket); //연결된 브라우저들을 알기위해 sockets에 넣음.
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from the browser"));
    socket.on('message', (message, isBinary) => {
        const messageString = isBinary ? message : message.toString('utf8');
        sockets.forEach(Asockets => Asockets.send(message));
        });//isBinary를 안쓰면 message가 이상한 형태로 나옴.
}); //wss.on은 addEventListener랑 비슷함. 브라우저로부터 이벤트가 발생하면 함수 실행.


server.listen(3000, handleListen);
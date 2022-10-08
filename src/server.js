import http from "http";
import {Server} from "socket.io";
import express from "express";
import { instrument } from "@socket.io/admin-ui";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on https://localhost:3000`);

const httpServer = http.createServer(app); // express로 server를 만듬. 
const wsServer = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
    },
}); // socketIO 서버를 만듬 


instrument(wsServer, {
    auth: false
  });


function publicRooms() {
    const {
        sockets:
        { adapter:
            { sids, rooms },
        },
    } = wsServer;

    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) == undefined) {
            publicRooms.push(key);
        }

    })
    return publicRooms;
}

function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
    socket["nickname"] = "Anon";
    socket.onAny((event) => {

        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
        wsServer.sockets.emit("room_change", publicRooms());
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => {
            socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1);
        });
    });

    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
    })

    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("message", `${socket.nickname} : ${msg}`);
        done();
    });

    socket.on("nickname", nickname => socket["nickname"] = nickname); //socket에 nickname payload 추가

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
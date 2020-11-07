const express = require('express');
const server = express();
const http = require('http').createServer(server);
const cors = require('cors');

server.use(cors({origin: "http://localhost:8080"}));
server.use(express.json());

http.listen(8090, function () {
    console.log('Server started!');
});

let lobbies = {};

server.get("/", (req, res) => {
    res.send("hello this is default text in box");
});

// Creating a lobby
server.put("/lobby", (req, res) => {
    let lobby = createLobby();
    lobbies[lobby.id] = lobby;

    joinLobby(lobby.id, req.body);

    console.log(`Created lobby ${JSON.stringify(lobby)}`);

    res.send(lobby);
});

// Joining a lobby
server.post("/lobby", (req, res) => {
    let lobby = lobbies[req.body.id];
    joinLobby(req.body.id, req.body.user);

    console.log(`${JSON.stringify(lobby)} Created lobby ${JSON.stringify(lobby)}`);

    res.send(lobby);
});

// Return lobby info
server.get("/lobby/:id", (req, res) => {
    console.log(`Get lobby ${req.params.id} info`);
    res.send(lobbies[req.params.id]);
});

function createLobby() {
    return {
        id: makeid(6),
        users: []
    }
}

function joinLobby(lobbyId, user) {
    lobbies[lobbyId].users.push(user);
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
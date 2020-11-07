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
    try {
        let lobby = getLobby(req.body.id, res);
        joinLobby(req.body.id, req.body.user);

        console.log(`${JSON.stringify(lobby)} Created lobby ${JSON.stringify(lobby)}`);

        res.send(lobby);
    } catch (e) {
        res.status(422).send(e);
    }
});

// Return lobby info
server.get("/lobby/:id", (req, res) => {
    console.log(`Get lobby ${req.params.id} info`);
    try {
        const lobby = getLobby(req.params.id, res);
        res.send(lobby);
    } catch (e) {
        res.status(422).send(e);
    }
});

/**
 * Get lobby or throw error if lobby does not exist
 * @param lobbyId
 * @param res
 */
function getLobby(lobbyId, res) {
    const lobby = lobbies[lobbyId];
    if (lobby === undefined) {
        throw {error: "Could not find lobby"};
    } else {
        return lobby;
    }
}

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
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
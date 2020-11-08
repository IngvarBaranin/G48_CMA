const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const server = express();
const http = require('http').createServer(server);
const cors = require('cors');
const questions = require('./questions.json');
const positions = require('./positions.json');

server.use(cors());
server.use('/', serveStatic(path.join(__dirname, '../dist')));
server.use(express.json());

const port = process.env.PORT || 8090;
server.listen(port, function () {
    console.log("Server started")
});

/*http.listen(8090, function () {
    console.log('Server started!');
});*/

let lobbies = {};

/*server.get("/", (req, res) => {
    res.send("hello this is default text in box");
});*/

// Creating a lobby
server.put("/lobby", (req, res) => {
    let lobby = createLobby();
    lobbies[lobby.id] = lobby;

    const currentUser = joinLobby(lobby.id, req.body);
    lobby.user = currentUser;
    lobby.host = currentUser.userId;
    lobby.timerStatus = req.body.timerStatus;
    lobby.timerTime = req.body.timerTime;

    console.log(`Created lobby ${JSON.stringify(lobby)}`);
    res.send(lobby);
});

// Joining a lobby
server.post("/lobby", (req, res) => {
    try {
        let lobby = getLobby(req.body.id, res);
        if (lobbies[lobby.id].users.length < 6){
            const currentUser = joinLobby(req.body.id, req.body.user);
            console.log(`${JSON.stringify(lobby)} Created lobby ${JSON.stringify(lobby)}`);
            lobby.user = currentUser;
            res.send(lobby);
        }
        else {
            res.status(422).send({error: "The lobby is full"});
        }
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

server.post("/game/:id", (req, res) =>{
    try {
        console.log("Got event ", req.body);
        const lobby = getLobby(req.params.id);
        switch (req.body.event) {
            case "start":
                startGame(lobby);
                break;
            case "positionUpdate":
                setMove(lobby, req.body.userId, req.body.position);
                switchPlayerAndGenerateNextQuestion(lobby);
                break;
            case "getNewQuestion":
                getQuestion(lobby);
                break;
            default:
                return res.status(422).send({error: "Unknown event " + req.body.event});
        }
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

function switchPlayerAndGenerateNextQuestion(lobby){
    //Switching player
    if(lobby.currentAnswerer >= lobby.users.length-1){
        lobby.currentAnswerer = 0;
    }else{
        lobby.currentAnswerer += 1;
    }

    //Generate new question
    if(lobby.users[lobby.currentAnswerer].position === 0){
        lobby.currentQuestionType = "Algus";
        lobby.currentQuestion = questions["Algus"][0];
    } else{
        //Where is the user and what is the topic
        getQuestion(lobby);
    }
}

function getQuestion(lobby){
    let topic = positions.Positions[lobby.users[lobby.currentAnswerer].position].type;
    lobby.currentQuestionType = topic;
    let questionPool = questions[topic].length - 1;
    lobby.currentQuestion = questions[topic][randomNumber(questionPool)];
}

function startGame(lobby) {
    lobby.currentQuestionType = "Algus";
    lobby.currentQuestion = questions["Algus"][0];
    lobby.currentAnswerer = 0;
}

function setMove(lobby, userId, position) {
    const user = findUser(lobby.users, userId);
    user.position = position;
}

function findUser(players, playerId) {
    for (let player of players) {
        if (player.userId === playerId) {
            return player;
        }
    }
    throw {error: "Could not find player " + playerId};
}

function createLobby() {
    return {
        id: makeid(6),
        users: [],
        timerStatus: false,
        timerTime: 0
    }
}

function joinLobby(lobbyId, user) {
    let userdata = {
        name: user.name,
        userId: makeid(4),
        position: 0
    };
    lobbies[lobbyId].users.push(userdata);
    return userdata;
}

function randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

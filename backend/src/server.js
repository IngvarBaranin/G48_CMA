const server = require('express')();
const http = require('http').createServer(server);
const cors = require('cors');

server.use(cors({origin: "http://localhost:8080"}));

http.listen(8090, function () {
    console.log('Server started!');
});

server.get("/", (req, res) => {
    res.send("hello this is default text in box");
});
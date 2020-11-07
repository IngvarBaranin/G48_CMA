<template>
    <div class="game">

        <div class="gamecontainer">
            <img class="board" src="../assets/Gameboard.png">
            <img v-for="(user, index) in users"
                 :key="index"
                 v-bind:id="'piece' + index"
                 class="piece"
                 :ref="'piece' + index">
            <div v-if="gameStarted" id="card">
                <h1>{{currentQuestionType}}</h1>
                <h2>{{currentQuestion}}</h2>
                <div id="rate">
                    <button v-on:click="movePiece(1)">1</button>
                    <button v-on:click="movePiece(2)">2</button>
                    <button v-on:click="movePiece(3)">3</button>
                    <button v-on:click="movePiece(4)">4</button>
                </div>
                <div>
                    <button v-on:click="generateNewQ()" class="brk-btn" id="brk-btn-smaller">Asenda küsimus</button>
                </div>
            </div>
        </div>

        <div id ="info">
            <div style="margin-bottom: 3vh">
                <Counter :minutes="60" :seconds="0" v-on:countdownExpiration="expireCountdown"/>
            </div>

            <div class="nicknames" style="margin-bottom: 5vh">
                <p class="infoText"> Ruumi kood: <br></p>
                <p class="bigInfoText" style="margin-bottom: 5vh"><strong> {{this.$route.params.id}} </strong></p>
                <p class="infoText"> Rahvas ruumis: </p>
                <p class="bigInfoText" v-for="user in users" :key="user.userId"><strong> {{ user.name }} </strong></p>
            </div>

            <div class="startGame">
                <button v-if="host && !gameStarted" class="brk-btn" id="brk-btn-bigger" v-on:click="runGame()">Alusta</button>
                <button class="brk-btn" id="brk-btn-bigger" v-on:click="showInstructions()">Juhised</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Counter from "./Counter.vue"
    import storage from "../storage"

    export default {
        components: {
            Counter
        },
        data: function () {
            return {
                positions: [
                    {id: 0, offsetLeft: 0, offsetTop: 0, type: "Algus"},
                    {id: 1, offsetLeft: 7.4, offsetTop: 86.8, type: "Jutustamine"},
                    {id: 2, offsetLeft: 9.7, offsetTop: 79, type: "Tegevus"},
                    {id: 3, offsetLeft: 12.2, offsetTop: 71.8, type: "Jutustamine"},
                    {id: 4, offsetLeft: 14.3, offsetTop: 64, type: "Pakkumine"},
                    {id: 5, offsetLeft: 19.7, offsetTop: 62.6, type: "Võistlus"},
                    {id: 6, offsetLeft: 22.2, offsetTop: 70, type: "Tegevus"},
                    {id: 7, offsetLeft: 25.5, offsetTop: 76.8, type: "Tegevus"},
                    {id: 8, offsetLeft: 28.9, offsetTop: 82.9, type: "Jutustamine"},
                    {id: 9, offsetLeft: 33.8, offsetTop: 87, type: "Jutustamine"},
                    {id: 10, offsetLeft: 39.1, offsetTop: 86.1, type: "Tegevus"},
                    {id: 11, offsetLeft: 40.5, offsetTop: 78.2, type: "Jutustamine"},
                    {id: 12, offsetLeft: 43.8, offsetTop: 72, type: "Tegevus"},
                    {id: 13, offsetLeft: 47.7, offsetTop: 66.2, type: "Pakkumine"},
                    {id: 14, offsetLeft: 51.7, offsetTop: 60.3, type: "Tegevus"},
                    {id: 15, offsetLeft: 56.7, offsetTop: 57.1, type: "Tühi"},
                    {id: 16, offsetLeft: 61.0, offsetTop: 61.5, type: "Jutustamine"},
                    {id: 17, offsetLeft: 63.8, offsetTop: 69, type: "Jutustamine"},
                    {id: 18, offsetLeft: 65.8, offsetTop: 76.4, type: "Võistlus"},
                    {id: 19, offsetLeft: 68.9, offsetTop: 83.4, type: "Tegevus"},
                    {id: 20, offsetLeft: 74.4, offsetTop: 82.7, type: "Pakkumine"},
                    {id: 21, offsetLeft: 76, offsetTop: 75.2, type: "Lubadus"},
                    {id: 22, offsetLeft: 79.9, offsetTop: 69.3, type: "Tühi"},
                    {id: 23, offsetLeft: 85.4, offsetTop: 69.6, type: "Tühi"},
                    {id: 24, offsetLeft: 90.7, offsetTop: 72.1, type: "Jutustamine"},
                    {id: 25, offsetLeft: 92.6, offsetTop: 64.7, type: "Pakkumine"},
                    {id: 26, offsetLeft: 91.6, offsetTop: 56.7, type: "Võistlus"},
                    {id: 27, offsetLeft: 87.0, offsetTop: 51.5, type: "Lubadus"},
                    {id: 28, offsetLeft: 82.2, offsetTop: 48, type: "Võistlus"},
                    {id: 29, offsetLeft: 77.0, offsetTop: 45.5, type: "Võistlus"},
                    {id: 30, offsetLeft: 71.6, offsetTop: 43.1, type: "Tegevus"},
                    {id: 31, offsetLeft: 66.4, offsetTop: 40.9, type: "Lubadus"},
                    {id: 32, offsetLeft: 62.1, offsetTop: 35.6, type: "Pakkumine"},
                    {id: 33, offsetLeft: 65.5, offsetTop: 28.6, type: "Võistlus"},
                    {id: 34, offsetLeft: 69.7, offsetTop: 23.6, type: "Pilt"}
                ],
                pieces: [
                    {id: 0, howFar: 0},
                    {id: 1, howFar: 0},
                    {id: 2, howFar: 0},
                    {id: 3, howFar: 0},
                    {id: 4, howFar: 0},
                    {id: 5, howFar: 0}
                ],
                gameStarted: false,
                currentPlayerIndex: 0,
                users: [],
                countdownExpired: false,
                currentQuestionType: "",
                currentQuestion: "",
                host: false
            }

        },
        mounted: function () {
            console.log(storage.userId);
            this.updateBoard(true);
        },
        methods: {
            showInstructions () {
                var win = window.open("juhised.pdf", "_blank");
                win.focus();
            },
            generateNewQ () {
                axios.post("/game/" + this.$route.params.id, {
                    event: "getNewQuestion"})
                    .then((res) => {
                        this.currentQuestionType =
                            res.data.currentQuestionType + " (" + this.users[this.currentPlayerIndex].name + ")";
                        this.currentQuestion = res.data.currentQuestion;
                    });
            },
            expireCountdown () {
                let vm = this;

                if (!vm.gameOver) {
                    let farthestDistance = 0;
                    let winners = [];

                    for (let i = 0; i < vm.pieces.length; i++) {
                        if (vm.pieces[i].howFar > farthestDistance) {
                            farthestDistance = vm.pieces[i].howFar;
                        }
                    }

                    for (let i = 0; i < vm.pieces.length; i++) {
                        if (vm.pieces[i].howFar == farthestDistance) {
                            winners.push(vm.users[i])
                        }
                    }

                    const title = document.getElementById("title");
                    const question = document.getElementById("question");

                    document.getElementById("rate").style.display = "none";

                    if (winners.length > 1) {
                        let winnerStr = winners.join(" ja ");
                        title.innerHTML = "Võitis " + winnerStr;
                    }

                    question.innerHTML = "Aitäh, et mängisite!";
                }


                this.countdownExpired = true;
            },
            randomNumber: function (max) {
                return Math.floor(Math.random() * Math.floor(max));
            },
            movePiece: function (nrOfSteps) {
                const nextPosition = this.users[this.currentPlayerIndex].position + nrOfSteps;

                axios.post("/game/" + this.$route.params.id, {
                    event: "positionUpdate",
                    userId: this.users[this.currentPlayerIndex].userId,
                    position: nextPosition})
                    .then((res) => {
                        this.currentPlayerIndex = res.data.currentAnswerer;
                        this.currentQuestionType =
                            res.data.currentQuestionType + " (" + this.users[this.currentPlayerIndex].name + ")";
                        this.currentQuestion = res.data.currentQuestion;
                    });

                this.setPiecePosition(this.currentPlayerIndex, nextPosition)
            },
            setPiecePosition: function (pieceIndex, position) {
                console.log(this.users);
                this.users[pieceIndex].position = position;

                let step = (2 * Math.PI) / this.users.length;
                let angle = pieceIndex * step;

                const pieceElements = this.$refs['piece' + pieceIndex];

                // If we did not find piece element (it has not been rendered yet), skip modifying it
                if (pieceElements === undefined || pieceElements.length === 0) {
                    return;
                }

                const pieceElement = pieceElements[0];

                let getTile = Math.min(this.users[pieceIndex].position, 34);
                let getOffsetLeft = this.positions[getTile].offsetLeft;
                let getOffsetTop = this.positions[getTile].offsetTop;

                let x = -2 * Math.cos(angle);
                let y = -2 * 1.5 * Math.sin(angle);

                pieceElement.style.left = (parseFloat(getOffsetLeft) + x) + "%";
                pieceElement.style.top = (parseFloat(getOffsetTop) + y) + "%";
            },
            checkForWinner: function () {
                let vm = this;
                if (vm.pieces[vm.currentPlayer].howFar >= 34) {
                    const title = document.getElementById("title");
                    const question = document.getElementById("question");

                    document.getElementById("rate").style.display = "none";

                    question.innerHTML = "Aitäh, et mängisite!";
                    title.innerHTML = vm.users[vm.currentPlayer] + " võitis!";

                    return true;
                }
                return false;
            },
            runGame: function () {
                axios.post("/game/" + this.$route.params.id, {
                    event: "start",
                })
                    .then(res => {
                        this.currentPlayerIndex = res.data.currentAnswerer;
                        this.currentQuestionType =
                            res.data.currentQuestionType + " (" + this.users[this.currentPlayerIndex].name + ")";
                        this.currentQuestion = res.data.currentQuestion;
                        this.gameStarted = true;
                    });
            },
            updateBoard: function (loop = false) {
                axios.get("/lobby/" + this.$route.params.id)
                    .then(res => {
                        this.users = res.data.users;

                        // Only show the start game button to the lobby host
                        this.host = res.data.host === storage.userId;

                        if (res.data.currentQuestion !== undefined) {
                            this.currentPlayerIndex = res.data.currentAnswerer;
                            this.currentQuestionType =
                                res.data.currentQuestionType + " (" + this.users[this.currentPlayerIndex].name + ")";
                            this.currentQuestion = res.data.currentQuestion;
                            this.gameStarted = true;
                            this.rerenderBoard();
                        }

                        if (loop) {
                            setTimeout(() => this.updateBoard(loop), 2000)
                        }
                    });
            },
            rerenderBoard: function () {
                let i = 0;
                for (let user of this.users) {
                    // Skip users with position 0 as we want them to stay in the starting line
                    if (user.position === 0) {
                        continue;
                    }
                    this.setPiecePosition(i, user.position);
                    i++;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .startGame {

    }

    .infoText {
        font-size: 3vh;
    }

    .bigInfoText {
        font-size: 6vh;
    }

    #rate {
        display: flex;
        flex-direction: row;
    }

    #rate button {
        height: 40px;
        width: 40px;
    }

    #card > * {
        margin: 1% 0 1%;
    }

    #rate > button {
    }

    #card {
        z-index: 1;
        position: absolute;
        background-color: #f4f5f6;
        top: 0;
        left: 0;
        width: 50%;
        height: 30%;

        display: flex; /* establish flex container */
        flex-direction: column; /* make main axis vertical */
        justify-content: center; /* center items vertically, in this case */
        align-items: center;
    }

    button {
        margin-left: 1%;
        margin-right: 1%;
    }

    .piece {
        position: absolute;
        width: 1.2vw;
    }

    #piece0 {
        top: 94%;
        left: 13%;
        content: url("../assets/piece0.png")
    }

    #piece1 {
        top: 94%;
        left: 14%;
        content: url("../assets/piece1.png")
    }

    #piece2 {
        top: 94%;
        left: 15%;
        content: url("../assets/piece2.png")
    }

    #piece3 {
        top: 94%;
        left: 16%;
        content: url("../assets/piece3.png")
    }

    #piece4 {
        top: 94%;
        left: 17%;
        content: url("../assets/piece4.png")
    }

    #piece5 {
        top: 94%;
        left: 18%;
        content: url("../assets/piece5.png")
    }

    .game {
        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: center;
        justify-content: space-evenly;

        position: relative;
        text-align: center;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
    }

    .gamecontainer {
        border-style: solid;
        border-radius: 5px;
        border-width: thick;
        position: relative;
        display: inline-block;
        height: 90%;
    }

    .board {
        position: relative;
        top: 0;
        left: 0;
        height: 100%;
    }

    .nicknames {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .brk-btn {
        margin: 5%;
        position: relative;
        background: none;
        color: black;
        text-decoration: none;
        border: 0.2em solid #ec9821;
        padding: 0.5em 1em;
        height: 100%;
    }

    .brk-btn::before {
        content: "";
        display: block;
        position: absolute;
        width: 10%;
        background: #ffffff;
        height: 0.3em;
        right: 20%;
        top: -0.21em;
        transform: skewX(-45deg);
        -webkit-transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
        transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
    }

    .brk-btn::after {
        content: "";
        display: block;
        position: absolute;
        width: 10%;
        background: #ffffff;
        height: 0.3em;
        left: 20%;
        bottom: -0.25em;
        transform: skewX(45deg);
        -webkit-transition: all 0.45 cubic-bezier(0.86, 0, 0.07, 1);
        transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
    }

    .brk-btn:hover:before {
        right: 80%;
    }

    .brk-btn:hover:after {
        left: 80%;
    }

    .brk-btn:focus {
    outline: none;
    }

    #brk-btn-smaller {
        font-size: 1vh;
    }

    #brk-btn-bigger {
        font-size: 2vh;
    }

</style>

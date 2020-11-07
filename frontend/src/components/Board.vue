<template>
    <div class="game">
        <div class="nicknames">
            <p>Ruumi kood: {{this.$route.params.id}} /</p>
            <p> Rahvas ruumis: </p>
            <p v-for="user in users" :key="user"> {{ user }} /</p>
        </div>

        <div class="buttons">
            <button v-on:click="movePiece(0, 2)">Move 1</button>
            <button v-on:click="movePiece(1, 1)">Move 2</button>
            <button v-on:click="movePiece(2)">Move 3</button>
            <button v-on:click="movePiece(3)">Move 4</button>
            <button v-on:click="movePiece(4)">Move 5</button>
            <button v-on:click="movePiece(5)">Move 6</button>
            <button v-on:click="runGame()">Start game</button>
            <button v-on:click="updateCardData()">Make turn</button>

        </div>

        <div class="gamecontainer">
            <img class="board" src="../assets/Gameboard.png">
            <img v-for="(user, index) in users" :key="index" v-bind:id="'piece' + index" class="piece">
            <div v-if="gameStarted" id="card">
                <h1 id="title">Jutustamine</h1>
                <h2>Mis on sinu kõige varasem mälestus?</h2>
                <div id="rate">
                    <button v-on:click="movePiece(currentPlayer, 1)">1</button>
                    <button v-on:click="movePiece(currentPlayer, 2)">2</button>
                    <button v-on:click="movePiece(currentPlayer, 3)">3</button>
                    <button v-on:click="movePiece(currentPlayer, 4)">4</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import axios from "axios";

    export default {
        data: function () {
            return {
                positions: [
                    {id: 0, offsetLeft: 0, offsetTop: 0, type: "jutt"},
                    {id: 1, offsetLeft: 7.4, offsetTop: 86.8, type: "jutt"},
                    {id: 2, offsetLeft: 9.7, offsetTop: 79, type: "tegu"},
                    {id: 3, offsetLeft: 12.2, offsetTop: 71.8, type: "jutt"},
                    {id: 4, offsetLeft: 14.3, offsetTop: 64, type: "pakkumine"},
                    {id: 5, offsetLeft: 19.7, offsetTop: 62.6, type: "võistlus"},
                    {id: 6, offsetLeft: 22.2, offsetTop: 70, type: "tegu"},
                    {id: 7, offsetLeft: 25.5, offsetTop: 76.8, type: "tegu"},
                    {id: 8, offsetLeft: 28.9, offsetTop: 82.9, type: "jutt"},
                    {id: 9, offsetLeft: 33.8, offsetTop: 87, type: "jutt"},
                    {id: 10, offsetLeft: 39.1, offsetTop: 86.1, type: "tegu"},
                    {id: 11, offsetLeft: 40.5, offsetTop: 78.2, type: "jutt"},
                    {id: 12, offsetLeft: 43.8, offsetTop: 72, type: "tegu"},
                    {id: 13, offsetLeft: 47.7, offsetTop: 66.2, type: "pakkumine"},
                    {id: 14, offsetLeft: 51.7, offsetTop: 60.3, type: "tegu"},
                    {id: 15, offsetLeft: 56.7, offsetTop: 57.1, type: "tühi"},
                    {id: 16, offsetLeft: 61.0, offsetTop: 61.5, type: "jutt"},
                    {id: 17, offsetLeft: 63.8, offsetTop: 69, type: "jutt"},
                    {id: 18, offsetLeft: 65.8, offsetTop: 76.4, type: "võistlus"},
                    {id: 19, offsetLeft: 68.9, offsetTop: 83.4, type: "tegu"},
                    {id: 20, offsetLeft: 74.4, offsetTop: 82.7, type: "pakkumine"},
                    {id: 21, offsetLeft: 76, offsetTop: 75.2, type: "lubadus"},
                    {id: 22, offsetLeft: 79.9, offsetTop: 69.3, type: "tühi"},
                    {id: 23, offsetLeft: 85.4, offsetTop: 69.6, type: "tühi"},
                    {id: 24, offsetLeft: 90.7, offsetTop: 72.1, type: "jutt"},
                    {id: 25, offsetLeft: 92.6, offsetTop: 64.7, type: "pakkumine"},
                    {id: 26, offsetLeft: 91.6, offsetTop: 56.7, type: "võistlus"},
                    {id: 27, offsetLeft: 87.0, offsetTop: 51.5, type: "lubadus"},
                    {id: 28, offsetLeft: 82.2, offsetTop: 48, type: "võistlus"},
                    {id: 29, offsetLeft: 77.0, offsetTop: 45.5, type: "võistlus"},
                    {id: 30, offsetLeft: 71.6, offsetTop: 43.1, type: "tegu"},
                    {id: 31, offsetLeft: 66.4, offsetTop: 40.9, type: "lubadus"},
                    {id: 32, offsetLeft: 62.1, offsetTop: 35.6, type: "pakkumine"},
                    {id: 33, offsetLeft: 65.5, offsetTop: 28.6, type: "võistlus"},
                    {id: 34, offsetLeft: 69.7, offsetTop: 23.6, type: "pilt"}
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
                currentPlayer: 0,
                users: []
            }

        },
        mounted: function () {
            this.updateBoard();
        },
        methods: {
            movePiece: function (whichPiece, nrOfSteps) {
                let vm = this;
                const elements = document.getElementsByClassName("piece");

                let  step = (2 * Math.PI) / elements.length;
                let angle = 0;

                let i;
                for (i = 0; i < elements.length; i++) {
                    if (whichPiece === i) {

                        vm.pieces[whichPiece].howFar += nrOfSteps; // Piece is about to move, add nr of steps
                        const style = getComputedStyle(elements[i]);

                        let  leftStyle = style.left.substring(0, style.left.length - 2);
                        let  topStyle = style.top.substring(0, style.top.length - 2);
                        leftStyle = parseFloat(leftStyle);
                        topStyle = parseFloat(topStyle);

                        let  getTile = vm.pieces[whichPiece].howFar;
                        let  getOffsetLeft = vm.positions[getTile].offsetLeft;
                        let  getOffsetTop = vm.positions[getTile].offsetTop;

                        let  x = -2 * Math.cos(angle);
                        let  y = -2 * 1.5 * Math.sin(angle);


                        elements[i].style.left = (parseFloat(getOffsetLeft) + x) + "%";
                        elements[i].style.top = (parseFloat(getOffsetTop) + y) + "%";

                        vm.currentPlayer++;

                        if (vm.currentPlayer >= vm.users.length) {
                            vm.currentPlayer = 0;
                        }
                    }
                    angle += step;
                }
                this.updateCardData();
                console.log(vm.currentPlayer);
            },
            runGame: function () {
                let vm = this;
                vm.gameStarted = true;

                setTimeout(function (){

                    const title = document.getElementById("title");
                    let howFarIsCurrentPlayer = vm.pieces[vm.currentPlayer].howFar;

                    title.innerHTML = vm.positions[howFarIsCurrentPlayer].type + " " + vm.users[vm.currentPlayer];

                }, 100);
            },
            updateCardData: function () {
                let vm = this;
                setTimeout(function (){

                    const title = document.getElementById("title");
                    let howFarIsCurrentPlayer = vm.pieces[vm.currentPlayer].howFar;

                    title.innerHTML = vm.positions[howFarIsCurrentPlayer].type + " " + vm.users[vm.currentPlayer];

                }, 100);
            },
            updateBoard: function () {
                axios.get("/lobby/" + this.$route.params.id)
                    .then(res => {
                        this.users = res.data.users.map(user => user.name);
                        setTimeout(() => this.updateBoard(), 2000)
                    });
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #rate {
        display: flex;
        flex-direction: row;
    }

    #rate button {
        height: 40px;
        width: 40px;
    }

    #card > * {
        margin: 3% 0 3%;
    }

    #rate > button {
    }

    #card {
        z-index: 1;
        position: absolute;
        background-color: white;
        top: 0%;
        left: 0%;
        width: 50%;
        height: 30%;

        display: flex;           /* establish flex container */
        flex-direction: column;  /* make main axis vertical */
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
        content:url("../assets/piece0.png")
    }

    #piece1 {
        top: 94%;
        left: 14%;
        content:url("../assets/piece1.png")
    }

    #piece2 {
        top: 94%;
        left: 15%;
        content:url("../assets/piece2.png")
    }

    #piece3 {
        top: 94%;
        left: 16%;
        content:url("../assets/piece3.png")
    }

    #piece4 {
        top: 94%;
        left: 17%;
        content:url("../assets/piece4.png")
    }

    #piece5 {
        top: 94%;
        left: 18%;
        content:url("../assets/piece5.png")
    }

    .game {
        position: relative;
        border-style: solid;
        text-align: center;
        overflow: hidden;
        width: 100vw;
        margin-top: 5vh;
        height: 95vh;
    }

    .gamecontainer {
        border-style: solid;
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
        align-items: center;
        justify-content: center;
    }

</style>

<template>
    <div class="game">

        <div class="gamecontainer">
            <img class="board" src="../assets/Gameboard.png">
            <img v-for="(user, index) in users" :key="index" v-bind:id="'piece' + index" class="piece">
            <div v-if="gameStarted" id="card">
                <h1 id="title">Jutustamine</h1>
                <h2 id="question">Mis on sinu kõige varasem mälestus?</h2>
                <div id="rate">
                    <button v-on:click="movePiece(currentPlayer, 1)">1</button>
                    <button v-on:click="movePiece(currentPlayer, 2)">2</button>
                    <button v-on:click="movePiece(currentPlayer, 3)">3</button>
                    <button v-on:click="movePiece(currentPlayer, 4)">4</button>
                </div>
            </div>
        </div>

        <div id ="info">
            <div style="margin-bottom: 5vh">
                <Counter />
            </div>

            <div class="nicknames" style="margin-bottom: 5vh">
                <p id = "infoText"> Ruumi kood: <br></p>
                <p id = "bigInfoText" style="margin-bottom: 5vh"><strong> {{this.$route.params.id}} </strong></p>
                <p id = "infoText"> Rahvas ruumis: </p>
                <p id = "bigInfoText" v-for="user in users" :key="user"> <strong> {{ user }} </strong> </p>
            </div>

            <div class="startGame">
                <button v-on:click="runGame()">Start game</button>
            </div>
        </div>

    </div>

</template>

<script>
    import axios from "axios";
    import Counter from "./Counter.vue"

    export default {
        components: {
            Counter
        },
        data: function () {
            return {
                positions: [
                    {id: 0, offsetLeft: 0,      offsetTop: 0,       type: "Algus"},
                    {id: 1, offsetLeft: 7.4,    offsetTop: 86.8,    type: "Jutustamine"},
                    {id: 2, offsetLeft: 9.7,    offsetTop: 79,      type: "Tegevus"},
                    {id: 3, offsetLeft: 12.2,   offsetTop: 71.8,    type: "Jutustamine"},
                    {id: 4, offsetLeft: 14.3,   offsetTop: 64,      type: "Pakkumine"},
                    {id: 5, offsetLeft: 19.7,   offsetTop: 62.6,    type: "Võistlus"},
                    {id: 6, offsetLeft: 22.2,   offsetTop: 70,      type: "Tegevus"},
                    {id: 7, offsetLeft: 25.5,   offsetTop: 76.8,    type: "Tegevus"},
                    {id: 8, offsetLeft: 28.9,   offsetTop: 82.9,    type: "Jutustamine"},
                    {id: 9, offsetLeft: 33.8,   offsetTop: 87,      type: "Jutustamine"},
                    {id: 10, offsetLeft: 39.1,  offsetTop: 86.1,    type: "Tegevus"},
                    {id: 11, offsetLeft: 40.5,  offsetTop: 78.2,    type: "Jutustamine"},
                    {id: 12, offsetLeft: 43.8,  offsetTop: 72,      type: "Tegevus"},
                    {id: 13, offsetLeft: 47.7,  offsetTop: 66.2,    type: "Pakkumine"},
                    {id: 14, offsetLeft: 51.7,  offsetTop: 60.3,    type: "Tegevus"},
                    {id: 15, offsetLeft: 56.7,  offsetTop: 57.1,    type: "Tühi"},
                    {id: 16, offsetLeft: 61.0,  offsetTop: 61.5,    type: "Jutustamine"},
                    {id: 17, offsetLeft: 63.8,  offsetTop: 69,      type: "Jutustamine"},
                    {id: 18, offsetLeft: 65.8,  offsetTop: 76.4,    type: "Võistlus"},
                    {id: 19, offsetLeft: 68.9,  offsetTop: 83.4,    type: "Tegevus"},
                    {id: 20, offsetLeft: 74.4,  offsetTop: 82.7,    type: "Pakkumine"},
                    {id: 21, offsetLeft: 76,    offsetTop: 75.2,    type: "Lubadus"},
                    {id: 22, offsetLeft: 79.9,  offsetTop: 69.3,    type: "Tühi"},
                    {id: 23, offsetLeft: 85.4,  offsetTop: 69.6,    type: "Tühi"},
                    {id: 24, offsetLeft: 90.7,  offsetTop: 72.1,    type: "Jutustamine"},
                    {id: 25, offsetLeft: 92.6,  offsetTop: 64.7,    type: "Pakkumine"},
                    {id: 26, offsetLeft: 91.6,  offsetTop: 56.7,    type: "Võistlus"},
                    {id: 27, offsetLeft: 87.0,  offsetTop: 51.5,    type: "Lubadus"},
                    {id: 28, offsetLeft: 82.2,  offsetTop: 48,      type: "Võistlus"},
                    {id: 29, offsetLeft: 77.0,  offsetTop: 45.5,    type: "Võistlus"},
                    {id: 30, offsetLeft: 71.6,  offsetTop: 43.1,    type: "Tegevus"},
                    {id: 31, offsetLeft: 66.4,  offsetTop: 40.9,    type: "Lubadus"},
                    {id: 32, offsetLeft: 62.1,  offsetTop: 35.6,    type: "Pakkumine"},
                    {id: 33, offsetLeft: 65.5,  offsetTop: 28.6,    type: "Võistlus"},
                    {id: 34, offsetLeft: 69.7,  offsetTop: 23.6,    type: "Pilt"}
                ],
                categories: [
                    {type: "Algus",
                    questions: [
                        "Mis on sinu kõige varasem mälestus?",
                    ]},
                    {type: "Jutustamine",
                    questions: [
                        "Mis on sinu suurim eesmärk, mille oled täitnud?",
                        "Mis on sinu suurim eesmärk, mida tahad saavutada?",
                        "Mis on suurim eesmärk, mis sinu sõber/tuttav on saavutanud?",
                        "Milline inimene on ideaalne sina?",
                        "Kui sa saaksid viibutada võlukeppi ja muuta oma elus ühte asja, siis mis see oleks?",
                        "Milline on sinu ideaalne kaaslane?",
                        "Kirjelda enda unistuste päeva.",
                        "Mida kirjutaksid enda hauakivile?",
                        "Kirjelda, kuidas sooviksid surra.",
                        "Millist elu sooviksid elada?",
                        "Milline näeb välja sinu ideaalne elukoht?",
                    ]},
                    {type: "Tegevus",
                    questions: [
                        "Joonista kolm asja, mille eest oled tänulik.",
                        "Joonista kaks asja, mis sulle ei meeldi.",
                        "Joonista enda ägedaim pereliige.",
                        "Joonista enda unistuste kodu.",
                        "Kustuta oma postkastist viis ebaolulist meili.",
                        "Lülita enda telefon mängu ajaks välja.",
                        "Kustuta enda telefonist üks üleliigne telefoninumber.",
                        "Kustuta enda telefonist või arvutist kaks kasutut märget.",
                        "Eemalda enda kalendrist üks ebaoluline tegevus.",
                        "Kustuta enda telefonist üks rakendus.",
                        "Tantsi üksi või paarilisega.",
                        "Hoia ühe minuti vältel planku.",
                        "Tee enda parim kükk.",
                        "Tee 10 kätekõverdust."
                    ]},
                    {type: "Võistlus",
                    questions: [
                        "Kumb suudab 30 sekundi jooksul nimetada rohkem enesearengu raamatuid?",
                        "Kumb suudab 30 sekundi jooksul rohkem nimetada häid podcaste?",
                        "Kumb suudab 30 sekundi jooksul rohkem nimetada blogisid, mida lugeda?",
                        "Kumb suudab 30 sekundi jooksul rohkem nimetada häid harjumusi, mida on hea teha, et ennast arendada?",
                        "Kumb suudab 30 sekundi jooksul rohkem nimetada heategijaid?",
                        "Kumb suudab 30 sekundi jooksul rohkem nimetada heategusi, mida teha?",
                        "Kumb suudab 30 sekundi jooksul rohkem nimetada viise enda ökoloogilise jalajälje vähendamiseks?"
                    ]},
                    {type: "Lubadus",
                    questions: [
                        "Finants (nt. Loen..., Investeerin..., Ostan..., Koostan eelarve...",
                        "Tervis (nt. Teen..., Söön..., Magan..., Väldin...)",
                        "Füüsiline heaolu (nt. Teen..., Väldin..., Trenn..., Toitumine...)",
                        "Vaimne heaolu (nt. Loen..., Harin..., Puhkan..., Arendan...)",
                    ]},
                    {type: "Pakkumine",
                    questions: [
                        "Mis isiksusetüüpi teised pigem on - ekstravert-introvert?",
                        "Mis isiksusetüüpi teised pigem on - spontaanne-planeerija?",
                        "Mis isiksusetüüpi teised pigem on - detailne-ideederohke?",
                        "Mis isiksusetüüpi teised pigem on - ideede genereerija-elluviija?",
                        "Kuidas teised stressi olukorras käituvad- vajab aega üksi, lõbutseb teistega koos?",
                        "Mida teised eelistavad - raamat, audioraamat, podcast, blogi?",
                        "Millised teised pigem on - õhtu- või hommikuinimesed?",
                        "Mida teised pigem õpiksid - reaalained, humanitaarained, loovained?"
                    ]}
                    ,
                    {type: "Tühi",
                    questions: [
                        "Antud hetkel vajuta lihtsalt \"1\" :)"
                    ]}
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
            randomNumber: function (max) {
                return Math.floor(Math.random() * Math.floor(max));
            },
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

                        let leftStyle = style.left.substring(0, style.left.length - 2);
                        let topStyle = style.top.substring(0, style.top.length - 2);
                        leftStyle = parseFloat(leftStyle);
                        topStyle = parseFloat(topStyle);

                        let getTile = Math.min(vm.pieces[whichPiece].howFar, 34);
                        let getOffsetLeft = vm.positions[getTile].offsetLeft;
                        let getOffsetTop = vm.positions[getTile].offsetTop;

                        let x = -2 * Math.cos(angle);
                        let y = -2 * 1.5 * Math.sin(angle);


                        elements[i].style.left = (parseFloat(getOffsetLeft) + x) + "%";
                        elements[i].style.top = (parseFloat(getOffsetTop) + y) + "%";

                        let isEnd = this.checkForWinner();

                        if (isEnd) {
                            return
                        }

                        vm.currentPlayer++;

                        if (vm.currentPlayer >= vm.users.length) {
                            vm.currentPlayer = 0;
                        }
                    }
                    angle += step;
                }
                this.updateCardData();
            },
            checkForWinner: function () {
                let vm = this;
                if (vm.pieces[vm.currentPlayer].howFar >= 34) {
                    const title = document.getElementById("title");
                    const question = document.getElementById("question");

                    document.getElementById("rate").style.display = "none";

                    question.innerHTML = "Aitäh, et mängisite!";
                    title.innerHTML = vm.users[vm.currentPlayer] + " võitis!"

                    return true;
                }
                return false;
            },
            runGame: function () {
                let vm = this;
                vm.gameStarted = true;

                this.updateCardData();
            },
            updateCardData: function () {
                let vm = this;
                setTimeout(function (){

                    const title = document.getElementById("title");
                    const question = document.getElementById("question");

                    let howFarIsCurrentPlayer = vm.pieces[vm.currentPlayer].howFar;
                    let questionType = vm.positions[howFarIsCurrentPlayer].type;

                    let randomQuestion = "do you like to cook a food?"

                    for (let i = 0; i < vm.categories.length; i++) {
                        if (vm.categories[i].type === questionType) {

                            let random = vm.randomNumber(vm.categories[i].questions.length);
                            randomQuestion = vm.categories[i].questions[random];
                        }
                    }

                    question.innerHTML = randomQuestion;
                    title.innerHTML = questionType + " (" + vm.users[vm.currentPlayer] + ")";

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

    .startGame {

    }

    #infoText {
        font-size: 3vh;
    }

    #bigInfoText {
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
        margin: 3% 0 3%;
    }

    #rate > button {
    }

    #card {
        z-index: 1;
        position: absolute;
        background-color: #f4f5f6;
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
        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: center;
        justify-content: space-around;

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

</style>

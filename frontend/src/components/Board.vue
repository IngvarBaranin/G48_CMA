<template>
    <div class="game">

        <div class="buttons">
            <button v-on:click="movePiece(0)">Move 1</button>
            <button v-on:click="movePiece(1)">Move 2</button>
            <button v-on:click="movePiece(2)">Move 3</button>
            <button v-on:click="movePiece(3)">Move 4</button>
            <button v-on:click="movePiece(4)">Move 5</button>
            <button v-on:click="movePiece(5)">Move 6</button>
            <p v-for="user in users" :key="user">{{user}}</p>
        </div>

        <div class="gamecontainer">
            <img class="board" src="../assets/Gameboard.png">
            <img class = "piece" id="piece0" src="../assets/piece1.png">
            <img class = "piece" id="piece1" src="../assets/piece2.png">
            <img class = "piece" id="piece2" src="../assets/piece3.png">
            <img class = "piece" id="piece3" src="../assets/piece4.png">
            <img class = "piece" id="piece4" src="../assets/piece5.png">
            <img class = "piece" id="piece5" src="../assets/piece6.png">
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            posts: [
            { id: 0, offsetLeft: 0, offsetTop: 0 },
            { id: 1, offsetLeft: 7.4, offsetTop: 86.8 },
            { id: 2, offsetLeft: 9.7, offsetTop: 79 },
            { id: 3, offsetLeft: 12.2, offsetTop: 71.8 },
            { id: 4, offsetLeft: 14.3, offsetTop: 64 },
            { id: 5, offsetLeft: 19.7, offsetTop: 62.6 },
            { id: 6, offsetLeft: 22.2, offsetTop: 70 },
            { id: 7, offsetLeft: 25.5, offsetTop: 76.8 },
            { id: 8, offsetLeft: 28.9, offsetTop: 82.9 },
            { id: 9, offsetLeft: 33.8, offsetTop: 87 },
            { id: 10, offsetLeft: 39.1, offsetTop: 86.1 },
            { id: 11, offsetLeft: 40.5, offsetTop: 78.2 },
            { id: 12, offsetLeft: 43.8, offsetTop: 72 },
            { id: 13, offsetLeft: 47.7, offsetTop: 66.2 },
            { id: 14, offsetLeft: 51.7, offsetTop: 60.3 },
            { id: 15, offsetLeft: 56.7, offsetTop: 57.1 },
            { id: 16, offsetLeft: 61.0, offsetTop: 61.5 },
            { id: 17, offsetLeft: 63.8, offsetTop: 69 },
            { id: 18, offsetLeft: 65.8, offsetTop: 76.4 },
            { id: 16, offsetLeft: 68.9, offsetTop: 83.4 },
            { id: 17, offsetLeft: 74.4, offsetTop: 82.7 },
            { id: 18, offsetLeft: 76, offsetTop: 75.2 },
            { id: 16, offsetLeft: 79.9, offsetTop: 69.3 },
            { id: 17, offsetLeft: 85.4, offsetTop: 69.6 },
            { id: 18, offsetLeft: 90.7, offsetTop: 72.1 },
            { id: 16, offsetLeft: 92.6, offsetTop: 64.7 },
            { id: 17, offsetLeft: 91.6, offsetTop: 56.7 },
            { id: 18, offsetLeft: 87.0, offsetTop: 51.5 },
            { id: 16, offsetLeft: 82.2, offsetTop: 48 },
            { id: 17, offsetLeft: 77.0, offsetTop: 45.5 },
            { id: 18, offsetLeft: 71.6, offsetTop: 43.1 },
            { id: 18, offsetLeft: 66.4, offsetTop: 40.9 },
            { id: 18, offsetLeft: 62.1, offsetTop: 35.6 },
            { id: 18, offsetLeft: 65.5, offsetTop: 28.6 },
            { id: 18, offsetLeft: 69.7, offsetTop: 23.6 }
            ],
            pieces: [
                { id: 0, howFar: 1 },
                { id: 1, howFar: 1 },
                { id: 2, howFar: 1 },
                { id: 3, howFar: 1 },
                { id: 4, howFar: 1 },
                { id: 5, howFar: 1 }
            ],
            users:[]
        }

    },
    methods: {
        movePiece: function (whichPiece) {
            var vm = this;
            const elements = document.getElementsByClassName("piece");

            var step = (2*Math.PI) / elements.length;
            var angle = 0;

            var i;
            for (i = 0; i < elements.length; i++) {
                const style = getComputedStyle(elements[i]);

                var leftStyle = style.left.substring(0, style.left.length - 2);
                var topStyle = style.top.substring(0, style.top.length - 2);

                leftStyle = parseFloat(leftStyle);
                topStyle = parseFloat(topStyle);

                var img = document.getElementsByClassName('board')[0];
                var width = img.clientWidth;
                var height = img.clientHeight;

                var percentWidth = width/100;
                var percentHeight = height/100;
                console.log(percentWidth, percentHeight)

                var getTile = vm.pieces[whichPiece].howFar;
                var getOffsetLeft = vm.posts[getTile].offsetLeft;
                var getOffsetTop = vm.posts[getTile].offsetTop;

                var x = -2 * Math.cos(angle);
                var y = -2 * 1.5 * Math.sin(angle);

                if (whichPiece == i) {
                    elements[i].style.left = parseFloat(getOffsetLeft + x) + "%";
                    elements[i].style.top = parseFloat(getOffsetTop + y) + "%";
                    vm.pieces[whichPiece].howFar++;
                }

                angle += step;

                // When individually implemented
            }
        },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


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
}

#piece1 {
    top: 94%;
    left: 14%;
}

#piece2 {
    top: 94%;
    left: 15%;
}

#piece3 {
    top: 94%;
    left: 16%;
}

#piece4 {
    top: 94%;
    left: 17%;
}

#piece5 {
    top: 94%;
    left: 18%;
}

.game {
    position: relative;
    border-style: solid;
    text-align: center;
    overflow: hidden;
    width: 100vw;
    margin-top: 5vh;
    height: 90vh;
}

.gamecontainer {
    border-style: solid;
    position: relative;
    display: inline-block;
    height: inherit;
}

.board {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
}
</style>

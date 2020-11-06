<template>
    <div class="game">
        <div class="gamecontainer">
            <img class="board" src="../assets/Gameboard.png">
            <img class = "piece" id="piece1" src="../assets/piece1.png">
            <img class = "piece" id="piece2" src="../assets/piece2.png">
            <img class = "piece" id="piece3" src="../assets/piece3.png">
            <img class = "piece" id="piece4" src="../assets/piece4.png">
            <img class = "piece" id="piece5" src="../assets/piece5.png">
            <img class = "piece" id="piece6" src="../assets/piece6.png">
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        getTop: function () {
            const elements = document.getElementsByClassName("piece");

            var i;
            for (i = 0; i < elements.length; i++) {
                const style = getComputedStyle(elements[i]);

                var leftStyle = style.left.substring(0, style.left.length - 2);
                var topStyle = style.top.substring(0, style.top.length - 2);

                leftStyle = parseFloat(leftStyle);
                topStyle = parseFloat(topStyle);

                elements[i].style.left = leftStyle + 10 + "px";
                elements[i].style.top = topStyle + 10 + "px";
            }
        },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.piece {
    position: absolute;
    width: 1vw;
}

#piece1 {
    top: 85%;
    left: 9.5%;
}

#piece2 {
    top: 85%;
    left: 5%;
}

#piece3 {
    top: 89%;
    left: 9.5%;
}

#piece4 {
    top: 89%;
    left: 5%;
}

#piece5 {
    top: 82.5%;
    left: 7.5%;
}

#piece6 {
    top: 90.5%;
    left: 7.5%;
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

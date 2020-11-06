<template>
    <div class="gamecontainer">
        <div class="board">
            <img id="piece" src="../assets/Piece1.png">
            <img id="piece" src="../assets/Piece1.png">
            <img id="piece" src="../assets/Piece1.png">
            <img id="piece" src="../assets/Piece1.png">
            <img id="piece" src="../assets/Piece1.png">
            <img id="piece" src="../assets/Piece1.png">
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#piece {
    width: 1vw;
    height: 2vh;

}

.gamecontainer {
    overflow: hidden;
    width: 100vw;
    margin-top: 5vh;
    height: 90vh;
}

.board {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("../assets/Gameboard.png");
}
</style>

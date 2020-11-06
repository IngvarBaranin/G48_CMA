<template>
  <div class="board">

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
.board {
    width: 100vw;
    margin-top: 5vh;
    height: 90vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("../assets/Gameboard.png");
}
</style>

<template>
  <div class="app">
    <Board />
  </div>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style>
.app {
}

* {
  margin: 0;
  padding: 0;
}
</style>

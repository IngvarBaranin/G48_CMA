<template>
  <div class="app">
    <div class="game">
      <Board />
    </div>
    <div class="test">
      <div>
        <Chat />
      </div>
      <div>

      </div>

    </div>

  </div>
</template>

<script>
import Board from './components/Board.vue'
import Chat from './components/Chat.vue';

export default {
  name: 'App',
  components: {
    Board,
    Chat
  }
}
</script>

<style>
.app {
}

.test {
  display: flex;
}

* {
  margin: 0;
  padding: 0;
}
</style>

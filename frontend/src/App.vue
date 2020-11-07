<template>
    <div class="app">
        <div class="lobby">
            <component :is="currentComponent"></component>
        </div>
    </div>
</template>

<script>
    import Board from './components/Board.vue'
    import ChooseLobby from "./components/ChooseLobby";
    import {EventBus} from './main.js';

    export default {
        name: 'App',
        components: {
            ChooseLobby
        },
        data: function () {
            return {
                currentComponent: ChooseLobby
            }
        },
        mounted() {
            EventBus.$on('i-got-clicked', () => {
                this.currentComponent = Board;
            })
        }

    };

</script>


<style>

    * {
        margin: 0;
        padding: 0;
    }
</style>

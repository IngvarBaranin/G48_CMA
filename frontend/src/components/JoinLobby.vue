<template>
    <div class="container">
        <h1>Join Lobby</h1>
        <div id="output">
            <h1>{{lobbyId}}</h1>
            <h1>{{players}}</h1>
            <p v-for="(text, index) in textOutput" :key="index">{{text}}</p>
        </div>
        <div id="input">
            <form>
                <input type="text" v-model="nameInput" placeholder="Name"/>
                <input type="text" v-model="codeInput" placeholder="Code"/>
                <input type="submit" value="Send" v-on:click="submitText"/>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { EventBus } from '../main.js';

    export default {
        name: 'JoinLobby',
        data: function () {
            return {
                lobbyId: "",
                players: "",
                nameInput: "",
                codeInput: null,
                textOutput: []
            }
        },
        methods: {
            submitText: function (event) {
                event.preventDefault();

                axios.post("/lobby", {id: this.codeInput, user: this.nameInput})
                    .then(res => {
                        this.lobbyId = res.data.id;
                        this.players = res.data.users;
                    });
                EventBus.$emit('i-got-clicked', this.lobbyId);
            }
        }
    }
</script>

<style scoped>

</style>
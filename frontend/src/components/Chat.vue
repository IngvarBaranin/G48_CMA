<template>
    <div id="container">
        <div id="output">
            <h1>{{lobbyId}}</h1>
            <h1>{{players}}</h1>
            <p v-for="(text, index) in textOutput" :key="index">{{text}}</p>
        </div>
        <div id="input">
            <form>
                <input type="text" v-model="textInput" :placeholder="textInput"/>
                <input type="submit" value="Send" v-on:click="submitText"/>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Chat',
        data: function () {
            return {
                lobbyId: "",
                players: "",
                textInput: null,
                textOutput: []
            }
        },
        methods: {
            submitText: function (event) {
                event.preventDefault();

                if (this.textInput === null || this.textInput === "") {
                    axios.put("/lobby", {name: "bob"})
                        .then(res => {
                            this.lobbyId = res.data.id;
                            this.players = res.data.users;
                        });
                } else {
                    axios.post("/lobby", {id: this.textInput, user: {name: "tony"}})
                        .then(res => {
                            this.lobbyId = res.data.id;
                            this.players = res.data.users;
                        });
                }
            }
        }
    }
</script>

<style scoped>

</style>
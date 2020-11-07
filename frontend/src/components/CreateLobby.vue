<template>
    <div class="container">
        <h1>Create Lobby</h1>
        <div id="input">
            <form>
                <input type="text" v-model="nameInput" :placeholder="nameInput"/>
                <input type="submit" value="Send" @click.stop.prevent="submitText"/>
            </form>
        </div>

        <div id="output">
            <h1>{{lobbyId}}</h1>
            <h1>{{players}}</h1>
            <p v-for="(text, index) in textOutput" :key="index">{{text}}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'CreateLobby',
        data: function () {
            return {
                nameInput: "",
                textOutput: []
            }
        },
        methods: {
            submitText: function (event) {
                event.preventDefault();
                axios.put("/lobby", {name: this.nameInput})
                    .then(res => {
                        this.$router.push("/game/"+res.data.id);
                    });

            }
        }
    }
</script>

<style scoped>

</style>
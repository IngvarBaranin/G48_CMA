<template>
    <div class="container">
        <h1>Join Lobby</h1>
        <div id="output">
            <p v-for="(text, index) in textOutput" :key="index">{{text}}</p>
        </div>
        <div id="input">
            <form>
                <input type="text" v-model="nameInput" placeholder="Name"/>
                <input type="text" v-model="codeInput" placeholder="Code"/>
                <input type="submit" value="Send" @click.stop.prevent="submitText"/>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'JoinLobby',
        data: function () {
            return {
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
                        this.$router.push("/game/"+res.data.id);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
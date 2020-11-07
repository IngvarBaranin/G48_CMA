<template>
    <div class="container">
        <div class="content">
            <h1>Join Lobby</h1>
            <form>
                <input class="namebox" type="text" v-model="nameInput" placeholder="Username"/>
                <input class="namebox" type="text" v-model="codeInput" placeholder="Code"/>
                <input class="brk-btn" type="submit" value="Send" @click.stop.prevent="submitText"/>
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

                axios.post("/lobby", {id: this.codeInput, user: {name: this.nameInput}})
                    .then(res => {
                        this.$router.push("/game/" + res.data.id);
                    }).catch(e => {
                    alert(e.response.data.error)
                });
            }
        }
    }
</script>

<style scoped>

    .container {
        text-align: center;
        display: flex;
        align-self: center;
        justify-content: center;
    }

    .namebox {
        margin-top: 10%;
        padding: 0.5em 1em;
        height: 50%;
        font-size: 15px;
    }

    .content {
        margin-top: 10%;
    }

    .brk-btn {
        margin-top: 10%;
        position: relative;
        background: none;
        color: black;
        font-size: 15px;
        text-decoration: none;
        border: 0.2em solid black;
        padding: 0.5em 1em;
    }

</style>
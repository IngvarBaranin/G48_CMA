<template>
    <div class="container">
        <div class="content">
            <h1>Create Lobby</h1>

            <form>
                <input class="namebox" type="text" v-model="nameInput" placeholder="Username"/>
                <input class="brk-btn" type="submit" value="Create" @click.stop.prevent="submitText"/>
            </form>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'CreateLobby',
        data: function () {
            return {
                nameInput: ""
            }
        },
        methods: {
            submitText: function (event) {
                event.preventDefault();
                axios.put("/lobby", {name: this.nameInput})
                    .then(res => {
                        this.$router.push("/game/" + res.data.id);
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
        margin-top: 15%;
        height: 50%;
        padding: 0.5em 1em;
        font-size: 15px;
    }

    .content {
        margin-top: 10%;
    }

    .brk-btn {
        margin-top: 15%;
        position: relative;
        background: none;
        color: black;
        font-size: 15px;
        text-decoration: none;
        border: 0.2em solid black;
        padding: 0.5em 1em;
    }

</style>
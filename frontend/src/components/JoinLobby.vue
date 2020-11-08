<template>
    <div class="container">
        <div class="content">
            <h1>Ühine ruumiga</h1>
            <input class="namebox" type="text" v-model="nameInput" placeholder="Kasutajanimi"/>
            <input class="namebox" type="text" v-model="codeInput" placeholder="Ruumikood"/>
            <div>
                <input class="brk-btn" type="submit" value="Ühine" @click.stop.prevent="submitText"/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import storage from '../storage';

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
                        storage.userId = res.data.user.userId;
                        console.log("Set storage to " + storage);
                        this.$router.push("/game/" + res.data.id);
                    })
                    .catch(e => {
                        alert(e.response.data.error)
                    });
            }
        }
    }
</script>

<style scoped>


    .namebox {
        margin-top: 10%;
        padding: 0.5em 1em;
        height: 60%;
        font-size: 15px;
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
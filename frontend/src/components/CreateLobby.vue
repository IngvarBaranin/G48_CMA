<template>
    <div class="container">
        <div class="content">
            <h1>Loo uus ruum</h1>

            <input class="namebox" type="text" v-model="nameInput" placeholder="Kasutajanimi"/>

            <div class="timer">
                <h3>Taimer?</h3>
                <input id="toggle-on" class="toggle toggle-left" name="toggle" value="false" type="radio" checked>
                <label for="toggle-on" class="btn">Jah</label>
                <input id="toggle-off" class="toggle toggle-right" name="toggle" value="true" type="radio">
                <label for="toggle-off" class="btn">Ei</label>
            </div>
            <input class="brk-btn" type="submit" value="Loo ruum" @click.stop.prevent="submitText"/>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import storage from "../storage";

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
                        storage.userId = res.data.user.userId;
                        console.log("Set storage to " + storage);
                        this.$router.push("/game/" + res.data.id);
                    });

            }
        }
    }
</script>

<style scoped>

    .namebox {
        margin-top: 10%;
        height: 60%;
        padding: 0.5em 1em;
        font-size: 15px;
    }

    .timer{
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

    .btn {
        border: 3px solid #1a1a1a;
        display: inline-block;
        padding: 7px;
        position: relative;
        text-align: center;
        transition: background 600ms ease, color 600ms ease;
    }

    input[type="radio"].toggle {
        display: none;
    }

    input[type="radio"].toggle + label {
        cursor: pointer;
        min-width: 60px;
    }

    input[type="radio"].toggle + label:hover {
        background: none;
        color: #1a1a1a;
    }

    input[type="radio"].toggle + label:after {
        background: #1a1a1a;
        content: "";
        height: 100%;
        position: absolute;
        top: 0;
        transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
        width: 100%;
        z-index: -1;
    }

    input[type="radio"].toggle.toggle-left + label {
        border-right: 0;
    }

    input[type="radio"].toggle.toggle-left + label:after {
        left: 100%
    }

    input[type="radio"].toggle.toggle-right + label {
        margin-left: -5px;
    }

    input[type="radio"].toggle.toggle-right + label:after {
        left: -100%;
    }

    input[type="radio"].toggle:checked + label {
        cursor: default;
        color: #fff;
        transition: color 200ms;
    }

    input[type="radio"].toggle:checked + label:after {
        left: 0;
    }

</style>
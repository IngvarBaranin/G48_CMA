<template>
    <div id="container">
        <div id="output">
            <h1>STRUCT</h1>
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
                textInput: null,
                textOutput: []
            }
        },
        methods: {
            submitText: function (event) {
                event.preventDefault();
            }
        },
        created: function () {
            axios.get("/")
                .then(res => {
                    this.textInput = res.data;
                });
        }
    }
</script>

<style scoped>

</style>
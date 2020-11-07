<template>
    <div id="container">
        <button @click = "joinLobby"> Join Lobby </button>
        <button @click = "createLobby"> Create Lobby </button>
        <component :is="currentComponent"></component>
    </div>
</template>

<script>
    import CreateLobby from "./CreateLobby";
    import JoinLobby from "./JoinLobby";

    export default {
        name: 'ChooseLobby',
        components: {CreateLobby, JoinLobby},
        data: function () {
            return {
                currentComponent: CreateLobby
            }
        },
        methods: {
            createLobby: function () {
                this.currentComponent = CreateLobby;
            },
            joinLobby: function () {
                this.currentComponent = JoinLobby;
            }
        }
    }
</script>

<style scoped>

    #container {
        align-items: center;
        justify-content: center;
        display: flex;
    }

</style>
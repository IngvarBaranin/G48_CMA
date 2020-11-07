<template>
    <div id="container">
        <button @click="$router.push('/')"> Join Lobby </button>
        <button @click="$router.push('/create')"> Create Lobby </button>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'ChooseLobby',
    }
</script>

<style scoped>

    #container {
        align-items: center;
        justify-content: center;
        display: flex;
    }

</style>
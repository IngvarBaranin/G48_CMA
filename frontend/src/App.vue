<template>
    <div class="app">
        <div class="lobby">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {
        },
        data: function () {
            return {
            }
        },

    };

</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

    html, body {
    font-family: 'Roboto', sans-serif;
    }

    #app {
    font-family: 'Roboto', sans-serif;
    }

    * {
        margin: 0;
        padding: 0;
    }
</style>

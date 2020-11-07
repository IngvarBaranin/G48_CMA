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

    * {
        margin: 0;
        padding: 0;
    }
</style>

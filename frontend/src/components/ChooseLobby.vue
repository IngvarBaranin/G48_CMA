<template>
    <div id="container">
        <div class="card">
            <div class="main">
                <router-view></router-view>
            </div>
            <hr>
            <div class="container">
                <button class="brk-btn" @click="$router.push('/')"> Join Lobby</button>
                <button class="brk-btn" @click="$router.push('/create')"> Create Lobby</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChooseLobby',
    }
</script>

<style scoped>

    #container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        margin-top: 20vh;
    }

    .card {
        /* Add shadows to create the "card" effect */
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        border-radius: 5px;
        height: 50vh;
        width: 40vh;
    }

    /* On mouse-over, add a deeper shadow */
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    .main {
        height: 80%;
    }

    /* Add some padding inside the card container */
    .container {
        display: flex;
        justify-content: space-between;
        padding: 2px 16px;
        height: 20%;
    }

    .brk-btn {
        margin: 5%;
        position: relative;
        background: none;
        color: black;
        font-size: 15px;
        text-decoration: none;
        border: 0.2em solid black;
        padding: 0.5em 1em;
        height: 50%;
    }

    .brk-btn::before {
        content: "";
        display: block;
        position: absolute;
        width: 10%;
        background: #ffffff;
        height: 0.3em;
        right: 20%;
        top: -0.21em;
        transform: skewX(-45deg);
        -webkit-transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
        transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
    }

    .brk-btn::after {
        content: "";
        display: block;
        position: absolute;
        width: 10%;
        background: #ffffff;
        height: 0.3em;
        left: 20%;
        bottom: -0.25em;
        transform: skewX(45deg);
        -webkit-transition: all 0.45 cubic-bezier(0.86, 0, 0.07, 1);
        transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
    }

    .brk-btn:hover:before {
        right: 80%;
    }

    .brk-btn:hover:after {
        left: 80%;
    }

</style>
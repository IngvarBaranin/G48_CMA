<template>
    <div class="container">
        <div>
            <h1>Aeg</h1>
            <h2 v-if="!expired">{{displayMinutes}}:{{displaySeconds}}</h2>
            <h2 v-if="expired">Aeg läbi!</h2>
        </div>

    </div>
</template>

<script>
export default {
    props: ['minutes', 'seconds'],
    data: () => ({
        displayMinutes: 0,
        displaySeconds: 0,
        loaded: false,
        expired: false
    }),
    computed: {
        _seconds: () => 1000,
        _minutes () {
            return this._seconds * 60
        }
    },
    mounted() {
        this.showRemaining();
    },
    methods: {
        countdownExpired () {
            this.$emit('countdownExpiration', this.childMessage)
        },
        showRemaining() {
            let now = new Date();
            let end = new Date();
            end.setMinutes(now.getMinutes() + this.minutes);
            end.setSeconds(now.getSeconds() + this.seconds);

            const Timer = setInterval(() => {

                now = new Date();

                const distance = end.getTime() - now.getTime();

                if (distance < 0) {
                    clearInterval(Timer);

                    this.countdownExpired();
                    this.expired = true;
                    this.loaded = true;
                    return
                }

                const minutes = Math.floor(distance / this._minutes);
                const seconds = Math.floor((distance % this._minutes) / this._seconds);

                this.displayMinutes = minutes < 10 ? "0" + minutes : minutes;
                this.displaySeconds = seconds < 10 ? "0" + seconds : seconds;
                this.loaded = true;
            }, 1000);
        }
    }
}
</script>

<style scoped>


</style>

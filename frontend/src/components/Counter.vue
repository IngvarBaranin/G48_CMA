<template>
    <div class="container">
        <div class="content">
            <h1>Timer</h1>
            {{displayMinutes}}
            {{displaySeconds}}

        </div>

    </div>
</template>

<script>
export default {
    data: () => ({
        displayMinutes: 0,
        displaySeconds: 0
    })
}
</script>

<style scoped>


</style>

<template>
    <div class="operate">
        <uploadfile></uploadfile>
        <classify></classify>
    </div>
</template>

<script setup>
import uploadfile from './uploadfile.vue';
import classify from './classify.vue';
</script>

<style lang="scss" scoped>
.operate{
    width: 20vw;
    height: 100vh;
    background-color: #c4c3c3;
}


</style>
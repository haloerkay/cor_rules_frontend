<template>
  <div class="wrapper">
    <operate></operate>
  <router-view></router-view>
  </div>

</template>

<script setup>
import operate from "@/components/operate/index.vue"

</script>

<style scoped lang="scss">
  .wrapper {
    width: 100%;
    display: flex;
    border: none;
  }

</style>


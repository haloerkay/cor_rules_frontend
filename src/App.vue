<template>
  <div class="wrapper">
    <operate></operate>
    <preview></preview>
  </div>
</template>

<script setup>
import operate from './views/operate/index.vue'
import preview from './views/preview/index.vue'
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
}
</style>


<template>
  <div>
    <bar></bar>
    <div class="wrapper">
      <sample></sample>
      <preview></preview>
      <parameter></parameter>
    </div>
  </div>
</template>

<script setup>
import bar from './views/bar/index.vue'
import sample from './views/sample/index.vue'
import parameter from './views/parameter/index.vue'
import preview from './views/preview/index.vue'
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
}
</style>

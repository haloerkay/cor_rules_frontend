<template>
  <div class="slider-demo-block">
    <span class="demonstration">Min_Sup</span>
    <el-slider v-model="sup" @change="changeSup1" :format-tooltip="formatTooltip" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Min_Conf</span>
    <el-slider v-model="conf" @change="changeConf1" :format-tooltip="formatTooltip" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useInfoStore } from "@/store/index.js"
import { storeToRefs } from 'pinia'


const infoStore = useInfoStore()
const { minSup, minConf } = storeToRefs(infoStore)

let sup = ref(0)
let conf = ref(0)
onMounted(() => {
  if (minSup.value != 0) {
    sup.value = minSup.value * 100
  } 
  if (minConf.value != 0) {
    conf.value = minConf.value * 100
  } 
})


const formatTooltip = (val) => {
  return val / 100
}
const changeSup1 = () => {
  infoStore.changeSup(sup.value / 100)
}
const changeConf1 = () => {
  infoStore.changeConf(conf.value / 100)
}

</script>
<style scoped>
.slider-demo-block {
  width: 17vw;
  margin-left: 2vw;
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  /* margin-left: 6px; */
}

.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-color-primary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.slider-demo-block .demonstration+.el-slider {
  flex: 0 0 70%;
}
</style>
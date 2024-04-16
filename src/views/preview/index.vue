<template>
  <div class="preview">
    <div v-if="!data.length" class="tip">
      请先上传文件
    </div>
    
    <el-table v-if="data.length" :data="data"   style="width: 100%" >
      <el-table-column v-for="(item, index) in title" :key="item" align="center" :label="item">
        <!-- 注意vue3和vue2的区别 -->
        <template #default="{ row }">
          <span v-if="row">{{ row[index] }}</span>
      </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import { useFileStore } from "@/store/index.js"
import { ref, watch } from "vue";
import { storeToRefs } from 'pinia'

const fileStore = useFileStore()
const { file } = storeToRefs(fileStore)
let title = ref([])
let data = ref([])

watch(file, () => {
  if (file) {
    title.value = file.value[0]
    data.value = file.value.slice(1)
  }
})



</script>

<style lang="scss" scoped>
.preview {
  width: 80vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  .tip{
    align-self: center;
    font-size: 30px;
  }
}
</style>
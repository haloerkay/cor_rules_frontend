<template>
  <div class="uploadFile">
    <button class="uploadTool" @click="btnClick">
      <div class="txt">上传</div>
      <input type="file" ref="fileRef" :style="{ display: 'none' }" @change="loadFile" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { httpReq } from "@/utils/httpReq.js"
import { useFileStore } from "@/store/index.js"
import Papa from 'papaparse'

let fileRef = ref(null)
const fileStore = useFileStore()

const btnClick = () => {
  fileRef.value.click()
}
const loadFile = async (e) => {
  let file = e.target.files[0]
  
  fileStore.changeName(file.name.split('.')[0])
  Papa.parse(file, {
    complete: (results) => {
      fileStore.changeFile(results.data)
    }
  })

  let formData = new FormData()
  formData.append('file', file)
  const ret = await httpReq('post', 'upload', formData, { "Content-Type": "multipart/form-data" })
}
</script>


<style lang="scss" scoped>
.uploadFile {
  display: flex;
  justify-content: center;

  .uploadTool {
    background-color: #fff;
    padding: 0;
    margin: 0;
    outline: none;
    border-style: none;
    width: 8vw;
    height: 8vh;
    align-self: center;
    margin-top: 10px;
    border-radius: 10px;
  }
  .uploadTool:hover{
    cursor: pointer;
}
}
</style>
<template>

</template>

<script setup>
import { ref } from 'vue';
import { httpReq } from "@/utils/httpReq.js"
import { useFileStore } from "@/store/index.js"
import Papa from 'papaparse'
import { useRouter } from 'vue-router';
import { useInfoStore } from "@/store/index.js"

const router = useRouter()
let fileRef = ref(null)
const fileStore = useFileStore()
const infoStore = useInfoStore()

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
  router.push("/")
  infoStore.changeSup(0)
  infoStore.changeConf(0)
}
</script>


<style lang="scss" scoped>
.uploadFile {
  display: flex;
  justify-content: center;

  .uploadTool {
    background-color: rgb(237, 242, 246);
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

  .uploadTool:hover {
    cursor: pointer;
    color: #fff;
    background-color: var(--el-color-primary);
  }
}
</style>
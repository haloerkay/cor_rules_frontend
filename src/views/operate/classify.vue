<template>
    <div class="classify">
        <button class="btn" @click="cbaClassify">CBA分类</button>
        <button class="btn" @click="cmarClassify">CMAR分类</button>
    </div>
</template>

<script setup>
import { httpReq } from "@/utils/httpReq"
import { useFileStore,useInfoStore } from "@/store/index.js"
import { storeToRefs } from 'pinia'

const fileStore = useFileStore()
const infoStore = useInfoStore()
const { fileName } = storeToRefs(fileStore)
const {minSup,minConf} = storeToRefs(infoStore)

const cbaClassify = async () => {
    let ret = await httpReq('post', '/cba', 
    JSON.stringify({ minsup: minSup.value, minconf:minConf.value, filename: fileName.value }),
    { "Content-Type": "application/json" })
    console.log('cba', ret)
}
const cmarClassify = async () => {
    let ret = await httpReq('get', '/cmar', {}, {})
    console.log('cmar', ret)
}

</script>

<style lang="scss" scoped>
.classify {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .btn {
        width: 8vw;
        height: 8vh;
        margin-top: 10px;
        border-radius: 10px;
        border: none;
        outline: none;
        background-color: #fff;

    }
}

.btn:hover {
    cursor: pointer;
}
</style>
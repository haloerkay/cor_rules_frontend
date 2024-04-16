<template>
    <div class="classify">
        <button class="btn" @click="classify">分类</button>
    </div>
</template>

<script setup>
import {httpReq} from "@/utils/httpReq"
import { useFileStore } from "@/store/index.js"
import { storeToRefs } from 'pinia'

const fileStore = useFileStore()
const { fileName } = storeToRefs(fileStore)

const classify =async () =>{
    let ret = await httpReq('get', 'result/'+fileName.value, '',{} )
    console.log(ret)
}

</script>

<style lang="scss" scoped>
.classify {
    display: flex;
    justify-content: center;
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
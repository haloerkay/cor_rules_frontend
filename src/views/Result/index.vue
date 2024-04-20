<template>
    <div class="ret">
        File:{{ fileName }}
        <br>
        CBA:{{ CBARet }}
        <br>
        CMAR:{{ CMARRet }}
    </div>
</template>

<script setup>
import {useInfoStore,useFileStore,useRetStore} from "@/store/index.js"
import { storeToRefs } from "pinia";

const fileStore = useFileStore()
const infoStore = useInfoStore()
const retStore = useRetStore()
const {fileName} =storeToRefs(fileStore)
const {CBARet,CMARRet} = storeToRefs(retStore)

</script>

<style lang="scss" scoped>
.ret{
    width: 80vw;
    height: 100vh;
    background-color: rgb(237,242,246);
}
</style>
<template>
    <div class="result">
        <div class="preview">
            <preview></preview>
        </div>

        <div class="ret" v-if="ret">
            <div class='title'>
                {{ btnStore.btn }}算法
            </div>
            <div class="tag">
                <div class="accuracy">
                    <span>
                        准确率:{{ Number(ret.accuracy).toFixed(3) }}
                    </span>
                </div>
                <div class="cost">
                    <span>
                        时间:{{ Number(ret.cost).toFixed(4) + "s" }}
                    </span>
                </div>
            </div>
            <div class="rule">
                <el-scrollbar>
                    <el-table :data="ret.rules">
                        <el-table-column v-for="(item, index) in ret.rules[0]" :key="index" :label="labels[index]"
                            :prop="'column' + index">
                            <template v-slot="{ row }">
                                {{ row[index] }}
                            </template>
                        </el-table-column>
                    </el-table>


                </el-scrollbar>

            </div>
        </div>



    </div>
</template>

<script setup>
import preview from "@/views/Preview/index.vue"
import { useInfoStore, useFileStore, useRetStore, useBtnStore } from "@/store/index.js"
import { storeToRefs } from "pinia";
import { ref } from 'vue'

const fileStore = useFileStore()
const infoStore = useInfoStore()
const retStore = useRetStore()
const btnStore = useBtnStore()
const { fileName } = storeToRefs(fileStore)
const { ret } = storeToRefs(retStore)
const { minSup, minConf } = storeToRefs(infoStore)
// let data = ref([[['1', '2'], 2, 3], [4, 5, 6]])
let labels = ref(['rule', 'class', 'sup', 'conf'])



</script>

<style lang="scss" scoped>
.result {
    width: 80vw;
    height: 100vh;
    background-color: rgb(237, 242, 246);

    .preview {
        height: 43vh;
    }

    .ret {
        border-top: #eee 1px solid;
        display: flex;
        width: 80vw;
        height: 56.5vh;
        border-right: 1px solid #cfcfcf;
        flex-direction: column;

        .title {
            width: 8vw;
            height: 5vh;
            align-self: center;
            background-color: var(--el-color-primary);
            line-height: 5vh;
            text-align: center;
            border-radius: 5px;
            color: #fff;
        }

        .tag {
            align-self: flex-end;
            height: 6vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: var(--el-color-primary);
            color: #fff;
            width: 10vw;
            border-radius: 5px;
            text-align: center;
            margin-right: 10vw 0;
        }

        .rule {
            // margin-top: 3vh;
            height: 47vh;
            overflow: auto;
        }
    }

}
</style>
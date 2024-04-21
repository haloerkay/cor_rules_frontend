<template>
    <div class="result">
        <div class="preview">
            <preview></preview>
        </div>

        <div class="ret">
            <div v-if="CBARet" class="cba">
                <div class='title'>
                    CBA算法
                </div>
                <div class="accuracy">
                    <span>
                        准确率:{{ Number(CBARet.accuracy).toFixed(3) }}
                    </span>
                </div>
                <div class="cost">
                    <span>
                        运算时间:{{ Number(CBARet.cost).toFixed(4) + "s" }}
                    </span>
                </div>
                
                    <div class="rule">
                        <el-scrollbar>
                        <el-table :data="CBARet.rules">
                            <el-table-column v-for="(item, index) in CBARet.rules[0]" :key="index"
                                :label="labels[index]" :prop="'column' + index">
                                <template v-slot="{ row }">
                                    {{ row[index] }}
                                </template>
                            </el-table-column>
                        </el-table>
                        
                </el-scrollbar>
    
            </div>
        </div>

        <div v-if="CMARRet" class="cmar">
            <span>
                CMAR:{{ Number(CMARRet).toFixed(3) }}
            </span>
        </div>
    </div>

    </div>
</template>

<script setup>
import preview from "@/views/Preview/index.vue"
import { useInfoStore, useFileStore, useRetStore } from "@/store/index.js"
import { storeToRefs } from "pinia";
import { ref } from 'vue'

const fileStore = useFileStore()
const infoStore = useInfoStore()
const retStore = useRetStore()
const { fileName } = storeToRefs(fileStore)
const { CBARet, CMARRet } = storeToRefs(retStore)
const { minSup, minConf } = storeToRefs(infoStore)
let data = ref([[['1', '2'], 2, 3], [4, 5, 6]])
let labels = ref(['rule', 'class', 'sup', 'conf'])

</script>

<style lang="scss" scoped>
.result {
    width: 80vw;
    height: 100vh;
    background-color: rgb(237, 242, 246);

    .preview {
        height: 50vh;
    }

    .ret {
        display: flex;

        .cba {
            width: 50%;
            height: 50vh;
            border-right: 1px solid #cfcfcf;

            .title {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .rule {
                margin-top: 3vh;
                height: 40vh;
                overflow: auto;
            }
        }

        .cmar {
            width: 50%;
            height: 50vh;
            // background-color: aquamarine;

        }
    }

}
</style>
<template>
    <div class="operate">
        <div class="uploadFile">
            <button class="uploadTool" @click="btnClick">
                <div class="txt">上传</div>
                <input type="file" ref="fileRef" :style="{ display: 'none' }" @change="loadFile" />
            </button>
        </div>
        <div class="classify">
            <button class="btn" @click="preProcess">预处理</button>
            <button class="btn" @click="cbaM1Classify">CBA-M1</button>
            <button class="btn" @click="cbaM2Classify">CBA-M2</button>
            <button class="btn" @click="cmarClassify">CMAR</button>
        </div>
        <div class="slider-demo-block">
            <span class="demonstration">Min_Sup</span>
            <el-slider v-model="sup" @change="changeSup1" :format-tooltip="formatTooltip" />
        </div>
        <div class="slider-demo-block">
            <span class="demonstration">Min_Conf</span>
            <el-slider v-model="conf" @change="changeConf1" :format-tooltip="formatTooltip" />
        </div>

        <div class="programmer">
            <div class="title" v-if="fileName">
              文件:{{ fileName }}
            </div>
            <div>
               <div>最小支持度:{{ minSup }}</div> 
               <div>最小置信度:{{ minConf }}</div> 
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { httpReq } from "@/utils/httpReq.js"
import { useFileStore, useInfoStore, useRetStore,useBtnStore } from "@/store/index.js"
import Papa from 'papaparse'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'

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


const router = useRouter()
const fileRef = ref(null)
const fileStore = useFileStore()
const infoStore = useInfoStore()
const retStore = useRetStore()
const btnStore = useBtnStore()
const { fileName, file } = storeToRefs(fileStore)
const { minSup, minConf } = storeToRefs(infoStore)


const btnClick = () => {
    fileRef.value.click()
}
const loadFile = async (e) => {
    // 跳转路由后更新页面
    router.push("/")
    // fileT用于区分fileStore中的file
    let fileT = e.target.files[0]

    fileStore.changeName(fileT.name.split('.')[0])
    Papa.parse(fileT, {
        complete: (results) => {
            fileStore.changeFile(results.data)
        }
    })

    let formData = new FormData()
    formData.append('file', fileT)
    const ret = await httpReq('post', 'upload', formData, { "Content-Type": "multipart/form-data" })
    infoStore.changeSup(0)
    infoStore.changeConf(0)
    sup.value = 0
    conf.value = 0
    retStore.changeCBARet(null)
    retStore.changeCMARRet(null)

    // if (file.value) {
    //     title.value = file.value[0]
    //     data.value = file.value.slice(1).filter(row => row.length > 1);
    // }

}

const cbaM1Classify = async () => {
    let ret = await httpReq('post', '/cbam1',
        JSON.stringify({ minsup: minSup.value, minconf: minConf.value, filename: fileName.value }),
        { "Content-Type": "application/json" })
    router.push('/result')
    retStore.changeCBARet(ret)
    console.log('cbam1', ret)
    btnStore.changeBtn('CBA-M1')
}
const cbaM2Classify = async () => {
    let ret = await httpReq('post', '/cbam2',
        JSON.stringify({ minsup: minSup.value, minconf: minConf.value, filename: fileName.value }),
        { "Content-Type": "application/json" })
    router.push('/result')
    retStore.changeCBARet(ret)
    console.log('cbam1', ret)
    btnStore.changeBtn('CBA-M2')

}
const preProcess = async()=>{
    let ret = await httpReq('get','/pre_process/'+fileName.value,'',{})
    console.log('preprocess',ret)
    fileStore.changeFile(ret)
}
const cmarClassify = async () => {
    let ret = await httpReq('get', 'cmar/' + fileName.value, '', {})
    retStore.changeCMARRet(ret)
    console.log('cmar', ret)
    btnStore.changeBtn('CMAR')
}


const formatTooltip = (val) => {
    return val / 100
}
const changeSup1 = () => {
    infoStore.changeSup(sup.value / 100)
    retStore.changeCBARet(0)
    retStore.changeCMARRet(0)
}
const changeConf1 = () => {
    infoStore.changeConf(conf.value / 100)
    retStore.changeCBARet(0)
    retStore.changeCMARRet(0)
}

</script>

<style lang="scss" scoped>
.operate {
    width: 20vw;
    height: 100vh;
    border-right: 2px solid #eee;
    .programmer{
        position: absolute;
        bottom: 15vh;
        // margin-bottom: 6vh;
        left: 7vw;
    }
}

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
        background-color: rgb(237, 242, 246);
    }

    .btn:hover {
        cursor: pointer;
        color: #fff;
        background-color: var(--el-color-primary);
    }
}

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

.preview {
    width: 80vw;
    height: 100vh;
    overflow: auto;
    display: flex;
    justify-content: center;
    background-color: rgb(237, 242, 246);
    border-top: none;

    .tip {
        align-self: center;
        font-size: 30px;
    }
}
</style>
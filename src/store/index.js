import { defineStore } from 'pinia'
import { ref } from 'vue'

// export const useFileStore = defineStore('file',() => {
//     const file = ref(null)
//     function changeFile(newFile){
//         file.value = newFile
//     }
//     return {file,changeFile}
// })

export const useFileStore = defineStore('file', () => {
    const file = ref([])
    const fileName = ref()
    function changeFile(newFile) {
        file.value = newFile
    }
    function changeName(newName) {
        fileName.value = newName
    }
    return { file, fileName, changeFile, changeName }
},{
    persist: {
        enabled: true,
    }
}

)

export const useInfoStore = defineStore('info', () => {
    const minSup = ref(0)
    const minConf = ref(0)
    function changeSup(newSup) {
        minSup.value = newSup
    }
    function changeConf(newConf) {
        minConf.value = newConf
    }
    return { minSup, minConf, changeSup, changeConf }
}, {
    persist: {
        enabled: true,
    }
})

export const useRetStore = defineStore('ret', () => {
    const CBARet = ref()
    function changeCBARet(newValue) {
        CBARet.value = newValue
    }
    const CMARRet = ref()
    function changeCMARRet(newValue) {
        CMARRet.value = newValue
    }

    return { CBARet, CMARRet, changeCBARet, changeCMARRet }
})
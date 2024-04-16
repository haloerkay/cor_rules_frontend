import { defineStore } from 'pinia'
import { ref } from 'vue'
// export const useFileStore = defineStore('file',() => {
//     const file = ref(null)
//     function changeFile(newFile){
//         file.value = newFile
//     }
//     return {file,changeFile}
// })

export const useFileStore = defineStore('file',()=>{
    const file = ref(null)
    const fileName = ref()
    function changeFile(newFile){
        file.value = newFile
    }
    function changeName(newName){
        fileName.value = newName
    }
    return {file,fileName,changeFile,changeName}
})
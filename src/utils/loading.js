
import { ElLoading } from 'element-plus';
 
let loadingRequestCount = 0;
let loadingInstance;
 
const showLoading = (target) => {
    if (loadingRequestCount === 0) {
        loadingInstance = ElLoading.service({ target,text: 'Loading', });
    }
    loadingRequestCount++
}
 
const hideLoading = () => {
    if (loadingRequestCount <= 0) return
    loadingRequestCount--
    if (loadingRequestCount === 0) {
        loadingInstance.close();
    }
 }
 
 export {
    showLoading,
    hideLoading
 }
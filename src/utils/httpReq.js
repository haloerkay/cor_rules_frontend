import axios from 'axios'

import { ElMessage, ElMessageBox } from 'element-plus'
import { showLoading, hideLoading } from '@/utils/loading'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  // withCredentials: true
  // timeout:30000
})

instance.interceptors.request.use(config => {
  // 请求拦截进来调用显示loading效果
  showLoading()

  if (!navigator.onLine) {
    ElMessageBox.alert(
      '您的网络故障，请检查!',
      '温馨提示',
      {
        confirmButtonText: '好的',
        type: 'warning'
      }
    )}


  return config
})


instance.interceptors.response.use((res) => {
  // setTimeout(() => {/
    hideLoading()

  return res.data
})

export const httpReq = (method, url, data, headerMsg) => {
  return new Promise((resolve, reject) => {
    instance({
      method: method,
      url: url,
      data: data,
      headers: { ...headerMsg }
    }).then(
      (data) => {
        resolve(data)
      },
      (err) => {
        reject({ err })
      }
    )
  })
}
import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    // withCredentials: true
    // timeout:30000
})
instance.interceptors.response.use((res) => {
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
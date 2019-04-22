import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(config => {
  // 拦截器 给config添加新的信息
  // config可以给请求头追加属性
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

export default axios

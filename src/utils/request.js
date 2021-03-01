import axios from 'axios'

// 创建一个axios实例

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

export default request

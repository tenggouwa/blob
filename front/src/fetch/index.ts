import axios from 'axios';
// import { Message } from '@arco-design/web-react';
import api from './api'

// import httpErrorHandler from './httpErrorHandler.js' // http错误处理

// 公共参数配置
const instance = axios.create({
    baseURL: '/api',
    // baseURL,
    timeout: 30000,
    // contentType: 'application/json',
    headers: {
        // 'content-type': 'application/json'
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    },
})

// 在实例已创建后修改默认值
// 返回结果公共处理
instance.interceptors.response.use((res) => {
  if (!res) {
      return Promise.reject(res)
  }
  return res.data
})

// 创建单个请求
function createApi(config: any) {
    return (data: any) => {
        const date = new Date().getTime();
        // const headerParams = filterHeaderByReqType(data, config.method, date)
        // Object.assign(config, {
        //     headers: {
        //         ...headerParams
        //     },
        // })
        if (config.method === 'get') {
            return instance({
                ...config,
                params: {
                    ...data,
                    _t: date,
                }
            }).catch((e) => {
                // if (e) Message.error(e.message || e.msg)
                if (e) console.error(e.message || e.msg)
                return e || {}
            })
        }
        return instance({
            ...config,
            data: {
                ...data,
            }
        }).catch((e) => {
            // if (e) Message.error(e.message || e.msg)
            if (e) console.error(e.message || e.msg)
            return e || {}
        })
    }
}
interface Apis {
  [key: string]: (data?: any) => Promise<any>;
}
const apis:Apis = {}

Object.entries(api).forEach((item) => {
    apis[item[0]] = createApi(item[1])
})

export default apis

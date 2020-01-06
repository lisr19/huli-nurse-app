import { fetch, post, patch, del } from '../http'

// 查询版本信息
export function getEdition (params){
    return fetch ('apkVersion/getLatestVersion',params)
}
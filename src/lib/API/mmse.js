import { fetch, post, patch, del } from '../http'

// 添加
export function addMmse (params){
    return post ('mmse/add',params)
}

// 查询
export function getMmse (params){
    return fetch ('mmse/listByUser',params)
}

// 修改
export function updataMmse (params){
    return patch ('mmse/update',params)
}

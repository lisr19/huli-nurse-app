import { fetch, post, patch, del } from '../http'

// 添加
export function addFRA (params){
    return post ('fallRiskAssessment/add',params)
}

// 查询
export function getFRA (params){
    return fetch ('fallRiskAssessment/listByUser',params)
}

// 修改
export function updataFRA (params){
    return patch ('fallRiskAssessment/update',params)
}

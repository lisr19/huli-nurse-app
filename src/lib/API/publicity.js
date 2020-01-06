import { fetch, post, patch, del } from '../http'

//获取标签
export function getLabel (params) {
    return fetch('label/list', params)
}

//获取宣教内容
export function getHealthEducation (params) {
    return fetch('healthEducation/list', params)
}
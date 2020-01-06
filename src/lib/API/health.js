import { fetch, post, patch, del } from '../http'

// 获取民族
export function getNation (params) {
    return fetch('nationalityList/list', params)
}

// 获取区
export function getDistrict (params) {
    return fetch('subordinateAreaList/list', params)
}

// 获取籍贯
export function getProvince (params) {
    return fetch('province/list', params)
}

// 获取健康档案
export function getHealth (params) {
    return fetch('userHealthRecord/listByUser',params)
}

// 上传健康档案
export function pushHealth (params) {
    return post('userHealthRecord/add',params)
}

// 更新健康档案
export function updateHealth (params) {
    return patch('userHealthRecord/update',params)
}
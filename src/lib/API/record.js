import { fetch, post, patch, del } from '../http'

// 上传记录
export function addRecord (params) {
    return post('nursingRecord/add', params)
}

// 获取护理问题
export function getproblem (params) {
    return fetch('nursingProblem/list', params)
}

// 获取措施
export function getSettlement (params) {
    return fetch('nursingSettlementTemplate/list', params)
}

// 获取记录
export function getRecord (params) {
    return fetch('nursingRecord/list',params)
}

// 获取历史记录
export function getOldRecord (params) {
    return fetch('nursingRecord/listByUser',params)
}

// 修改记录
export function updataRecord (params) {
    return patch('nursingRecord/update',params)
}

// 删除记录
export function delRecord (params) {
    return del('nursingRecord/del',params)
}
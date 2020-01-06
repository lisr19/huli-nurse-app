import { fetch, post, patch, del } from '../http'

// 查询班表
export function getScheduling (params) {
    return fetch('nurseSchedule/list', params)
}

// 添加班表
export function addScheduling (params) {
    return post('nurseSchedule/add', params)
}

// 修改班表
export function updataScheduling (params) {
    return patch('nurseSchedule/updata', params)
}

// 删除多个班表
export function delsScheduling (params) {
    return del('nurseSchedule/deleteMany', params)
}
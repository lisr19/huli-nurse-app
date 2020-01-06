import { fetch, post, patch, del } from '../http'

// 查询用户资质
export function getAptitude (params) {
    return fetch('nurseQualifyRel/list', params)
}

// 删除资质
export function delAptitude (params) {
    return del('nurseQualifyRel/del', params)
}

// 查询护理资质列表
export function getAptitudeList (params) {
    return fetch('nursingQualify/list', params)
}

// 上传多个资质
export function addManys (params) {
    return post('nurseQualifyRel/addMany', params)
}

// 上传资质
export function addMany (params) {
    return post('nurseQualifyRel/add', params)
}

// 修改资质
export function aupdateMany (params) {
    return patch('nurseQualifyRel/update', params)
}
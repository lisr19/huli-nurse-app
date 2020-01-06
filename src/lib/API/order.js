import { fetch, post, patch, del } from '../http'

// 获取表的状态
export function getATS (params) {
    return fetch('nurse/getAssessmentTablesStatus', params)
}

// 获取订单
export function getOrder (params) {
    return fetch('nurse/getOrder', params)
}

// 获取新派订单
export function getNewOrder (params) {
    return fetch('nurse/getDispatch', params)
}

// 护士接单
export function acceptOrder (params) {
    return fetch('nurse/takeOrder', params)
}

// 护士拒单
export function rejectOrder (params) {
    return fetch('nurse/refuseOrder', params)
}

// 护士出发
export function startOrder (params) {
    return patch('nurse/processOrder', params)
}

// 完成订单
export function overOrder (params) {
    return patch('nurse/endOrder', params)
}

// 查询客户健康档案
export function getUserRecord (params) {
    return fetch('userHealthRecord/listByUser', params)
}

// 添加留痕
export function addTrack (params) {
    return post('orderTrack/add', params)
}

// 查找留痕
export function seekTrack (params) {
    return fetch('orderTrack/listByOrderId', params)
}

// 修改留痕
export function updataTrack (params) {
    return patch('orderTrack/update', params)
}

// 删除留痕
export function delTrack (params) {
    return del('orderTrack/del', params)
}

// 护士下单
export function addOrder (params) {
    return post('orderList/add', params)
}

// SOS
export function SOS (params) {
    return post('sos/add', params)
}
import { fetch, post, patch, del } from '../http'

// 注册
export function newNurse (params) {
    return post('nurse/add', params)
}

// 登录
export function nurseLogin (params) {
    return post('nurse/login', params)
}

// 修改密码
export function newPass (params) {
  return fetch('nurse/resetPassword', params)
}

// 护士修改信息
export function nuserUptate (params) {
    return patch('nurse/update', params)
}

// 护士详情
export function getNuser (params) {
  return fetch('nurse/detail', params)
}

// 护士信息
export function getNuserDate (params) {
  return fetch('nuser/list', params)
}

//发送短信
export function SMS (params) {
  return fetch('SMS/sendCode1', params)
}

// 获取服务区
export function getArea (params) {
  return fetch('subordinateAreaList/list', params)
}
import { fetch, post, patch, del } from '../http'

// 首次评估表添加
export function doUserHealthFirstAssessmentAdd (params) {
  return post('userHealthFirstAssessment/add', params)
}

// 首次评估表获取
export function doUserHealthFirstAssessmentGet (params) {
  return fetch('userHealthFirstAssessment/listByUser', params)
}

// 首次评估表修改
export function doUserHealthFirstAssessmentUpdate (params) {
  return patch('userHealthFirstAssessment/update', params)
}
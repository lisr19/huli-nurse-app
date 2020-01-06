import { fetch, post, patch, del } from '../http'

export function addLive (params){
    return post ('adlBarthel/add',params)
}

export function getLive (params){
    return fetch ('adlBarthel/listByUser',params)
}

export function updataLive (params){
    return patch ('adlBarthel/update',params)
}
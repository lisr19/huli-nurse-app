import {getArea} from "../../lib/API/login-enroll";

export default {
  state: {
    areaList: []
  },
  mutations: {
    setAreaList(state, areaList) {
      state.areaList = areaList
    },
  },
  getters: {},
  actions: {
    findAreaList({commit}) {
      return new Promise((resolve, reject) => {
        getArea({size: 100}).then((res) => {
          if (res.code === 200) {
            const data = res.data.list
            commit('setAreaList', data)
          }
          resolve(res)
        })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}

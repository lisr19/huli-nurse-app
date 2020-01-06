import {nurseLogin} from "../../lib/API/login-enroll";
// import utils from '@/utils/util'
export default {
  state: {
    userId: '',
    nurseAppToken: localStorage.getItem('nurseAppToken'),
    nurseAppInfo: null,
    username: '',//账号、手机
    name: '',//姓名
    gender: '',//性别
    birthday: '',
    idNumber: '',//身份证
    avatar: '',//头像URL
    status:'',//使用状态
    serviceArea: '',//服务区域
    grade: '',//护士评分
    hospital: '',//所属医院
    department: '',//部门
	  speciality: '',//专长
    evaluateNum: '',//被评价数
    workYears: '',//工作年限
    hasGetInfo: false
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id
    },
    setNurseAppToken(state, nurseAppToken) {
      state.nurseAppToken = nurseAppToken
      localStorage.setItem('nurseAppToken', nurseAppToken)
    },
    setNurseAppInfo(state, nurseAppInfo) {
      state.nurseAppInfo = nurseAppInfo
      localStorage.setItem('nurseAppInfo', JSON.stringify(nurseAppInfo))
    },
    setUsername(state, username) {
      state.username = username
    },
    setName(state, name) {
      state.name = name
    },
    setGender(state, gender) {
      state.gender = gender
    },
    setIdNumber(state, idNumber) {
      state.idNumber = idNumber
    },
    setAvatar(state, avatar) {
      state.avatar = avatar
    },
    setStatus(state, status) {
      state.status = status
    },
    setServiceArea(state, serviceArea) {
      state.serviceArea = serviceArea
    },
    setGrade(state, grade) {
      state.grade = grade
    },
    setHospital(state, hospital) {
      state.hospital = hospital
    },
    setDepartment(state, department) {
      state.department = department
    },
	  setSpeciality(state, speciality) {
		  state.speciality = speciality
	  },
    setEvaluateNum(state, evaluateNum) {
      state.evaluateNum = evaluateNum
    },
    setWorkYears(state, workYears) {
      state.workYears = workYears
    },
    setBirthday(state, birthday) {
      state.birthday = birthday
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
  },
  getters: {},
  actions: {
    // 登录
    handleLogin({commit}, params) {
      return new Promise((resolve, reject) => {
        nurseLogin(params).then((res) => {
          if (res.code === 200) {
            // 登录成功s
            const data = res.data
            const info = data.userInfo
            if(info.status === 1){
              console.log(data)
              commit('setNurseAppToken', data.token)
              commit('setNurseAppInfo', info)
              commit('setAvatar', info.avatar)
              commit('setUserId', info.id)
              commit('setUsername', info.username)
              commit('setName', info.name)
              commit('setGender', info.gender)
              commit('setStatus', info.status)
              commit('setIdNumber', info.idNumber)
              commit('setServiceArea', info.serviceArea)
              commit('setGrade', info.grade)
              commit('setHospital', info.hospital)
              commit('setDepartment', info.department)
              commit('setSpeciality', info.speciality)
              commit('setEvaluateNum', info.evaluateNum)
              commit('setWorkYears', info.workYears)
              // commit('setBirthday', info.name)
              commit('setHasGetInfo', true)
            }
          }
          resolve(res)
        })
          .catch((err) => {
            reject(err)
          })

      })
    },

    // 退出登录
    handleLogOut({state, commit}) {
      commit('setNurseAppToken', '')
      commit('setNurseAppInfo', null)
    },
    // 获取用户相关信息
    getUserInfo({state, commit}) {
      const info = JSON.parse(localStorage.getItem('nurseAppInfo'))
      commit('setAvatar', info.avatar)
      commit('setUserId', info.id)
      commit('setUsername', info.username)
      commit('setName', info.name)
      commit('setGender', info.gender)
      commit('setIdNumber', info.idNumber)
      commit('setServiceArea', info.serviceArea)
      commit('setGrade', info.grade)
      commit('setStatus', info.status)
      commit('setHospital', info.hospital)
      commit('setDepartment', info.department)
      commit('setSpeciality', info.speciality)
      commit('setEvaluateNum', info.evaluateNum)
      commit('setWorkYears', info.workYears)
      commit('setHasGetInfo', true)
    }
  }
}

<template>
  <div class="myeSet-body">
    <div v-if="ifArea" class="area-box" >
      <div class="area-type">
        <CheckboxGroup v-model="newAreaList">
            <Checkbox v-for="(item,index) in areaList" :key="index" :label="item.itemName" style="width: 90%;height: 0.8rem;">
                <span>{{item.itemName}}</span>
            </Checkbox>
        </CheckboxGroup>
      </div>
      <div @click="offArea" class="area-type-btn">取消</div>
      <div @click="newArea" class="area-type-btn">确认</div>
    </div>
    <div class="set-box">
      <h1>照片：</h1>
      <imgUpdata class="upImg" ref="imgUpdata" @imgUpload='imgUpload' @delImg='delImg'></imgUpdata>
      <p>姓名:</p>
      <input class="name" @blur="validateName('nameIf')" v-model="newUserName" placeholder='输入姓名' type="text">
      <div class="sex">
        <span>性别：</span>
        <RadioGroup v-model="newUserSex">
          <Radio label="1">
            <span>男</span>
          </Radio>
          <Radio label="2">
            <span>女</span>
          </Radio>
        </RadioGroup>
      </div>
      <button class="aptitude" @click="openAptitude"> 编辑资质</button>
      <button class="area-btn" @click="openArea"> 
        <span v-if="!newAreaList.length">选择服务区</span>
        <span v-else>已选：{{newAreaList}}</span>
      </button>
      <p>医院:</p>
      <input class="hospital" @blur="validateName('hospitalIf')" v-model="newUserHospital" placeholder='护士所在医院' type="text">
      <p>科室:</p>
      <input class="department" @blur="validateName('departmentIf')" v-model="newUserDepartment" placeholder='所在科室' type="text">
	    <p>专长:</p>
	    <textarea class="speciality" @blur="validateName('specialityIf')"  v-model="newUserSpeciality" placeholder='专长简介' oninput="if(value.length>999)value=value.slice(0,999)"></textarea>
      <p>工作年限:</p>
      <input @blur="ageLimit" v-model="newUserAgeLimit" placeholder='工作年限' type="text">
      <p>身份证号码:</p>
      <input class="id-card" @blur="validateIdCard" v-model="newUserIDCards" placeholder='身份证号码' type="text">
      <div class="upDataBtn" @click="clickUpdata">修 改</div>
      <div class="backBtn" @click="back()">返 回</div>
    </div>
    
  </div>
</template>

<script>
  import imgUpdata from '@/components/img-upload/img-upload-login.vue'
  import {SMS, getArea, nuserUptate, newPass, getNuser} from "@/lib/API/login-enroll";
  import { Indicator , MessageBox , Toast } from 'mint-ui';
  import {mapActions} from 'vuex'

  export default {
    name: 'mySet',
    components: {
      imgUpdata
    },
    computed: {
      nuserId() {
        return this.$store.state.user.userId //护士ID
      },
      username() {
        return this.$store.state.user.username //账号、手机
      },
      name() {
        return this.$store.state.user.name //姓名
      },
      gender() {
        return this.$store.state.user.gender //性别
      },
      idNumber() {
        return this.$store.state.user.idNumber //身份证
      },
      avatar() {
        return this.$store.state.user.avatar //头像URL
      },
      serviceArea() {
        return this.$store.state.user.serviceArea //服务区域
      },
      hospital() {
        return this.$store.state.user.hospital //所属医院
      },
      department() {
        return this.$store.state.user.department //部门
      },
	    speciality() {
		    return this.$store.state.user.speciality //专长
	    },
      workYears() {
        return this.$store.state.user.workYears //工作年限
      }
    },
    data() {
      return {
        imgLock:true,
        userImg: '',
        newUserName: '',
        nameIf:true,
        newUserPhoneNum: '',
        newUserSex: '',
        newUserIDCards: '',
        idNumIf:true,
        newUserHospital: '',
        hospitalIf:true,
        newUserDepartment: '',
	      newUserSpeciality: '',
        departmentIf:true,
        newUserAgeLimit: '',
        newUserArea: '',
        areaList: [],

        newAreaList:[],
        newAreaListCopy:[],

        newUserPassWord: '',
        newUserverification: '',

        noteButtonText: '获取验证码',
        note60SLock: true,
        SMSNum: '111111',

        ifArea:false,
        ifPassWord:false
      }
    },
    created() {
      this.getArea();
      this.userImg = this.avatar
      this.newUserName = this.name
      // this.newUserPhoneNum = this.username
      this.newUserSex = (this.gender) + ''
      this.newUserIDCards = this.idNumber
      this.newUserHospital = this.hospital
      this.newUserDepartment = this.department
      this.newUserSpeciality = this.speciality
      this.newUserAgeLimit = this.workYears
      this.newUserArea = this.serviceArea
      this.newAreaList = this.serviceArea.split(',')
    },
    mounted() {
      this.$refs.imgUpdata.uploadList.push({
        'name': "头像",
        'url': this.avatar,
        'status': 'finished'
      })
    },
    methods: {
      ...mapActions(['getUserInfo']),
      back(){
        MessageBox({
          title: '提示',
	        message: '是否放弃修改?',
          showCancelButton: true
        }).then((active) => {
          if (active !== 'cancel') {
            this.$router.push({
              name:'我的信息'
            })
          }
        });
        this.$toastDel()
      },
      imgUpload(url) {
        this.userImg = url;
        this.imgLock = true;
      },
      delImg(index){
        this.imgLock = false;
      },
      openArea(){
        this.ifArea = true;
        this.newAreaListCopy = this.newAreaList.slice(0)
      },
      offArea(){
        this.ifArea = false;
        this.newAreaList = this.newAreaListCopy.slice(0)
      },
      // 获取服务区
      async getArea() {
        let res = await getArea({
          size:13
        });
        if (res.code === 200) {
          this.areaList = res.data.list;
        } else {
          this.$toast(res.message)
        }
      },
      // 确认选着区
      newArea(){
        if(this.newAreaList.length){
          this.newUserArea = this.newAreaList.join()
          this.ifArea=false
        }else{
          this.$toast('服务区不能为空')
        }
      },
      // 发送信息
      async SMS() {
        let res = await SMS({phone: this.username});
        if (res.code === 200) {
          this.SMSNum = res.data;
          this.onClickGetNote()
        } else {
          this.warningTextShow(index, res.message);
        }
      },
      // 获取验证码
      onClickGetNote() {
        //倒计时
        if (this.note60SLock) {
          this.note60SLock = false;
          let second = 60;
          let countDown = setInterval(() => {
            this.noteButtonText = second + 'S';
            second--;
            if (second == 0) {
              clearInterval(countDown);
              this.note60SLock = true;
              this.noteButtonText = '重新发送';
            }
          }, 1000)
        }
      },
      async getdetail() {
        let res = await getNuser({
          id: this.nuserId,
        })
        if (res.code === 200) {
          let listJosn = JSON.stringify(res.data)
          localStorage.setItem('nurseAppInfo', listJosn)
          console.log(listJosn)
          this.getUserInfo()
        }
        this.$router.push({path: '/my'})
      },

      async clickUpdata() {
        Indicator.open();
        this.validateName('nameIf')
        this.validateName('hospitalIf')
        this.validateName('departmentIf')
        this.validateName('specialityIf')
        this.validateIdCard(this.newUserIDCards)
        if(this.userImg != ''&&this.nameIf&&this.idNumIf&&this.hospitalIf&&this.departmentIf&&this.imgLock){
          let Y = new Date().getFullYear() + '';
          let M = new Date().getMonth() + 1 + '';
          let D = new Date().getDate() + '';
          if (M.length === 1) M = '0' + M;
          if (D.length === 1) D = '0' + D;
          let toDay = Y + '-' + M + '-' + D + ' ' + ((new Date() + '').split(' ')[4]);
          let overTxt = '';
          let upOverIndex = 0;
          console.log(this.newUserPhoneNum)
          let res = await nuserUptate({
            id: this.nuserId,
            idNumber: this.newUserIDCards,
            username: this.newUserPhoneNum,
            name: this.newUserName,
            gender: this.newUserSex,
            avatar: this.userImg,
            serviceArea: this.newUserArea,
            hospital: this.newUserHospital,
            department: this.newUserDepartment,
	          speciality: this.newUserSpeciality,
            workYears: this.newUserAgeLimit
          })
          if (res.code === 200) {
            this.$toast('修改成功')
            this.getdetail()
          }else{
            console.log(res)
            this.$toast('修改失败')
          }
        }else{
          this.$toast('请填写所有正确信息')
        }
        setTimeout(function(){
          Indicator.close();
        },50)
        
      },
      openAptitude() {
        this.$router.push({path: '/aptitude', query: {upLock: true}})
      },
      // 工作年限限制
      ageLimit(){
        if(this.newUserAgeLimit < 1){
          this.newUserAgeLimit = 1
        }else if(this.newUserAgeLimit > 42){
          this.newUserAgeLimit = 42
        }
      },
      // 其他验证
      validateName(index){
        let name;
        let inputBox
        if(index == 'nameIf'){
          name = this.newUserName
          inputBox = document.getElementsByClassName('name')[0]
        }else if(index == 'hospitalIf'){
          name = this.newUserHospital
          inputBox = document.getElementsByClassName('hospital')[0]
        }else if(index == 'departmentIf'){
          name = this.newUserDepartment
          inputBox = document.getElementsByClassName('department')[0]
        }else if(index == 'specialityIf'){
	        name = this.newUserSpeciality
	        inputBox = document.getElementsByClassName('speciality')[0]
        }
        let msg = '';
        const regex = /^[0-9\u4E00-\u9FA5]+$/;
        if(name === '' || name === null){
          this[index] = false;
          if(index == 'nameIf'){
            msg = '姓名不能为空';
          }else if(index == 'hospitalIf'){
            msg = '医院不能为空';
          }else if(index == 'departmentIf'){
            msg = '科室不能为空';
          }else if(index == 'specialityIf'){
	          msg = '专长不能为空';
          }
          this.$toast(msg)
          inputBox.style=('color:rgba(253,98,98,1)')
        }else if(!regex.test(name)){
          this[index] = false;
          if(index == 'nameIf'){
            msg = '请填写合法中文姓名';
          }else if(index == 'hospitalIf'){
            msg = '请填写合法中文院名';
          }else if(index == 'departmentIf'){
            msg = '请填写合法中文科室';
          }
          this.$toast(msg)
          inputBox.style=('color:rgba(253,98,98,1)')
        }else{
          this[index] = true;
          inputBox.style=('')
        }
      },
      // 身份证验证
      validateIdCard () {
        let code = this.newUserIDCards
        let inputBox = document.getElementsByClassName('id-card')[0]
        let city = {
          11: '北京',
          12: '天津',
          13: '河北',
          14: '山西',
          15: '内蒙古',
          21: '辽宁',
          22: '吉林',
          23: '黑龙江 ',
          31: '上海',
          32: '江苏',
          33: '浙江',
          34: '安徽',
          35: '福建',
          36: '江西',
          37: '山东',
          41: '河南',
          42: '湖北 ',
          43: '湖南',
          44: '广东',
          45: '广西',
          46: '海南',
          50: '重庆',
          51: '四川',
          52: '贵州',
          53: '云南',
          54: '西藏 ',
          61: '陕西',
          62: '甘肃',
          63: '青海',
          64: '宁夏',
          65: '新疆',
          71: '台湾',
          81: '香港',
          82: '澳门',
          91: '国外 '
        };
        // if (code === undefined || code.length === 0) {
        //   return false;
        // }
        if (code.length !== 15 && code.length !== 18) {
          this.$toast('请填写合法身份证号码')
          inputBox.style=('color:rgba(253,98,98,1)')
          this.idNumIf = false
        }
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
          this.$toast('请填写合法身份证号码')
          inputBox.style=('color:rgba(253,98,98,1)')
          this.idNumIf = false
        } else if (!city[code.substr(0, 2)]) {
          this.$toast('请填写合法身份证号码')
          inputBox.style=('color:rgba(253,98,98,1)')
          this.idNumIf = false
        } else {
          // 18位身份证需要验证最后一位校验位
          if (code.length === 18) {
            code = code.split('');
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            // 校验位
            const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (var i = 0; i < 17; i++) {
              ai = parseInt(code[i]);
              wi = factor[i];
              sum += ai * wi;
            }
            if (parity[sum % 11] !== code[17].toUpperCase()) {
              this.$toast('请填写合法身份证号码')
              inputBox.style=('color:rgba(253,98,98,1)')
              this.idNumIf = false
            }else{
              this.idNumIf = true
              inputBox.style=('')
            }
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .myeSet-body {
    width: 100%;
    min-height: 100%;
    background: rgba(247, 247, 247, 1);
    position: relative;
    >.area-box{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10;
      >.area-type{
        background: rgba(247, 247, 247, 1);
        width: 670px;
        height: 512px;
        position: absolute;
        top: 298px;
        left: 50%;
        margin-left: -335px; 
        border-radius:10px;
        overflow-y: scroll;
        
      }
      >.area-type-btn{
          width: 250px;
          height: 72px;
          background: rgba(71, 189, 195, 1);
          box-shadow: 0px 4px 8px 4px rgba(80, 113, 203, 0.12);
          border-radius: 10px;
          font-size: 28px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 72px;
          position: absolute;
          top: 850px;
          left: 50%;
          margin-left: 30px;
      }
      >.area-type-btn:nth-of-type(2){
          margin-left:-280px ;
          background: #999999;
      }
    }
    > .set-box {
      position: absolute;
      width: 670px;
      padding-bottom: 20px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      top: 30px;
      left: 50%;
      margin-left: -335px;
      >p{
        text-align: left;
        margin-top: 30px; 
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding-left: 10px;
      }
      >p:nth-of-type(1){
        margin-top: 280px;
      }
      > .go-back {
        width: 68px;
        height: 48px;
        position: absolute;
        top: 0px;
        right: 20px;
        color: #333333;
        font-size: 34px;
        line-height: 48px;
        font-weight: 400;
        font-family: 'PingFangSC-Regular';
        > i {
          width: 28px;
          height: 28px;
          border-left: 5px solid #333333;
          border-bottom: 5px solid #333333;
          display: block;
          position: absolute;
          left: -30px;
          top: 12.5px;
          transform: rotate(45deg);
        }
      }
      > h1 {
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
        position: absolute;
        top: 50px;
        left: 10px;
      }
      > .upImg {
        width: 144px;
        height: 176px;
        position: absolute;
        top: 56px;
        left: 264px;
      }
      > input {
        width: 616px;
        height: 58px;
        outline: none;
        display: block;
        border: 0;
        border-bottom: 2px solid #C7C7C7;
        background: #fff;
        margin: 0 auto;
        // margin-top: 38px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        line-height: 58px;
        transition: all .3s;
      }
      .sex {
        width: 616px;
        height: 45px;
        margin: 42px auto;
        text-align: left;
        line-height: 45px;
        > span {
          display: inline-block;
          height: 40px;
          font-size: 28px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 45px;
          padding-right: 30px;
          // margin-top: -10px;
        }
        >span:nth-of-type(2){
          color: rgba(71, 189, 195, 1);
          margin-left:80px; 
        }
      }
      .aptitude {
        width: 456px;
        height: 52px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        border: 2px solid rgba(71, 189, 195, 1);
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(71, 189, 195, 1);
        line-height: 52px;
      }
      .area-btn{
        width: 456px;
        height: 52px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        border: 2px solid rgba(71, 189, 195, 1);
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(71, 189, 195, 1);
        line-height: 52px;
        margin-top: 30px;
        padding: 0 15px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > .get-note {
        position: absolute;
        bottom: 25px;
        right: 10px;
        padding: 0 10px;
        width: auto;
        min-width: 140px;
        height: 52px;
        font-size: 24px;
        line-height: 50px;
        border-radius: 10px;
        color: #47BDC3;
      }
      .upDataBtn {
        position: absolute;
        width: 250px;
        height: 72px;
        background: rgba(71, 189, 195, 1);
        box-shadow: 0px 4px 8px 4px rgba(80, 113, 203, 0.12);
        border-radius: 10px;
        font-size: 28px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 72px;
        bottom: 23px;
        left: 50%;
        margin-left: 30px;
      }
      .backBtn {
        // position: absolute;
        margin-top: 30px;
        width: 250px;
        height: 72px;
        background: #999999;
        box-shadow: 0px 4px 8px 4px rgba(80, 113, 203, 0.12);
        border-radius: 10px;
        font-size: 28px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 72px;
        bottom: 23px;
        left: 50%;
        margin-left: 50px
      }
    }
    
  }
	.speciality{
		width: 90%;
		height: 80px;
		overflow: auto;
		border: 0;
		border-bottom: 1px solid #C7C7C7;
	}
</style>
<style scoped>
  .sex >>> .ivu-radio-checked .ivu-radio-inner {
    border-color: #47BDC3;
  }

  .sex >>> .ivu-radio-inner:after {
    background-color: #47BDC3;
  }
  .area-type >>>.ivu-checkbox{
    width: 100%;
    height: 0.8rem;
    text-align: right;
    border-top: 1px solid #DFDFDF;
  }
  .area-type >>>.ivu-checkbox-inner{
    display: block;
    top: 18px;
    left:  90%;
    border-color: #47BDC3;
  }
  .area-type >>>.ivu-checkbox-checked .ivu-checkbox-inner{
    background-color: #47BDC3;
  }
  .area-type >>> .ivu-checkbox-wrapper{
    position: relative;
  }
  .area-type >>> .ivu-checkbox-wrapper > span{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
  .area-type >>> .ivu-checkbox-wrapper > span:nth-of-type(2){
    top: 13px;
    font-size: 28px;
    left: 30px;
  }
</style>

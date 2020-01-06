<template>
  <div class="loginEnroll-body">
    <!--<img src="@/assets/img/login-back.png" alt="">-->
    <div class="login-box">
      <img src="@/assets/icon/logo.png" alt="">
      <input v-model="userPhoneNum" type="text" placeholder='请输入手机号码'>
      <input v-model="userPassWord" v-if="showPass" type="text" placeholder='请输入密码' name="">
      <input v-model="userPassWord" v-else type="password" placeholder='请输入密码' name="">
      <div class="show-pass" @click="onClickPassShow">
        <img v-if="showPass" src="@/assets/icon/see2.png" alt="">
        <img v-else style="margin-top: 0.05rem;" src="@/assets/icon/see1.png" alt="">
      </div>
      <button class="login-but" @click="handleSubmit">登录</button>
      <h1 class="forget-pass" @click="openForget()">忘记密码？</h1>
      <h1 class="new-enroll" @click="onClickEnrollBox()">注册账号</h1>
      <p v-show="warningShow" class="warning">{{warningText}}</p>
    </div>
    <div class="enroll-box">
      <h3>注册</h3>
      <h2>上传照片：</h2>
      <div class="go-login" @click="onClickLoginBox">
        <i></i>
        <p>返回</p>
      </div>
      <imgUpdata class="upImg" @imgUpload='imgUpload'></imgUpdata>
      <input v-model="newUserName" style="" placeholder='输入姓名' @focus="warningShow=false"  @blur="validateName(newUserName)" type="text">
      <input v-model="newUserPhoneNum" placeholder='联系电话' @focus="warningShow=false" @blur="validatePhone(newUserPhoneNum)" type="text">
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
      <div class="area-btn" @click="areaIf=true">
        <span v-if="!newAreaList.length">选择服务区</span>
        <span v-else>已选：{{newAreaList}}</span>
      </div>
      <input v-model="newUserHospital" placeholder='护士所在医院' type="text">
      <input v-model="newUserDepartment" placeholder='所在科室' type="text">
      <input v-model="newUserAgeLimit" min="0" max="50" placeholder='工作年限 (填写阿拉伯数字)' type="number">
      <input v-model="newUserIDCards" placeholder='身份证号码' @focus="warningShow=false" @blur="validateIdCard(newUserIDCards)" type="text">
      <input v-model="newUserPassWord" placeholder='登录密码' type="password">
      <input v-model="newUserCopyPassWord" placeholder='重复密码' type="password">
      <input v-model="newUserverification" style="margin-bottom:80px;" type="Number" placeholder='验证码'>
      <h5 class="get-note" @click="SMS(1)">{{noteButtonText}}</h5>
      <button class="enroll-but" @click="newUser()">提交注册</button>
      <p v-show="warningShow" class="warning">{{warningText}}</p>
    </div>
    <div class="forget-box">
      <div class="go-login" @click="offForget">
        <i></i>
      </div>
      <input v-model="userPhone" placeholder='请输入手机号码' type="text">
      <input v-model="userVerification" type="text" placeholder='输入验证码'>
      <input v-model="userNewPass" placeholder='输入您的新密码' type="password">
      <input v-model="userNewPassCopy" placeholder='重复您的新密码' type="password">
      <h5 class="get-note" @click="SMS(2)">{{noteButtonText}}</h5>
      <button class="forget-but" @click="newPass()">修改密码，并立即登录</button>
      <p v-show="warningShow" class="warning">{{warningText}}</p>
    </div>
    <div v-if="areaIf" class="area-window">
      <p @click="clickOffAreaWindow()"></p>
      <div class="area-box">
        <CheckboxGroup v-model="newAreaList">
            <Checkbox v-for="(item,index) in areaList" :key="index" :label="item.itemName" style="width: 90%;height: 0.8rem;">
                <!-- <span>{{item.itemName}}</span> -->
            </Checkbox>
        </CheckboxGroup>
        <!-- <p>{{newAreaList}}</p> -->
      </div>
    </div>
    
  </div>
</template>
<script>
  import {newNurse, nurseLogin, SMS, newPass, getArea} from "@/lib/API/login-enroll";
  import {mapActions} from 'vuex'
  import {getAptitude} from "@/lib/API/aptitude";
  import {Toast,Indicator} from 'mint-ui'
  import imgUpdata from '@/components/img-upload/img-upload-login.vue'
  import utils from '../../utils/utils';

  export default {
    components: {
      imgUpdata
    },
    data() {
      return {
        SMSNum: 'NoSMS',// 验证码
        showPass: false,
        userId:'',
        upToDay: '',
        areaList: [
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
          {
            id:0,
            itemName:''
          },
        ],
        //登录的 账号 密码
        userPhoneNum: '',
        userPassWord: '',
        //新账号的 手机 验证码 密码 重复密码 身份证 头像 姓名 性别 医院 科室 年限 服务区
        newUserPhoneNum: '',
        newUserverification: '',
        newUserPassWord: '',
        newUserCopyPassWord: '',
        newUserIDCards: '',
        newUserImg: '',
        newUserName: '',
        newUserSex: '',
        newUserHospital: '南部战区总医院',
        newUserDepartment: '',
        newUserAgeLimit: '',
        newUserArea: '',
        noteButtonText: '获取验证码',
        note60SLock: true,
        areaIf:false,
        newAreaList: [],
        //忘记密码的 账号 验证码 新密码 重复密码
        userPhone: '',
        userVerification: '',
        userNewPass: '',
        userNewPassCopy:'',
        //错误提示
        warningTextList: ['手机号码有误', '验证码有误', '手机号码已存在', '密码长度不得小于6位', '账户或密码有误'],
        warningText: '',
        warningShow: false,
        loginButton: [],
        enrollButton: [],
        forgetButton: [],
        loginBox: [],
        enrollBox: [],
        forgetBox: [],
        isLogin: true,
        phoneIf:false,
        nameIf:false,
        idNumIf:false
      }
    },
    created() {
      this.getArea()
      // console.log(this.areaList)
    },
    mounted() {
      this.loginButton = document.getElementsByClassName('login-but')[0]
      this.loginBox = document.getElementsByClassName('login-box')[0]
      this.enrollButton = document.getElementsByClassName('enroll-but')[0]
      this.enrollBox = document.getElementsByClassName('enroll-box')[0]
      this.forgetButton = document.getElementsByClassName('forget-but')[0]
      this.forgetBox = document.getElementsByClassName('forget-box')[0]
      this.getDay()
    },
    updated() {
      this.forgetButtonDecide()
      this.enrollButtonDecide()
      this.loginButtonDecide()
      if(this.newUserAgeLimit){
        if(this.newUserAgeLimit>42){
          this.newUserAgeLimit = 42;
        }else if(this.newUserAgeLimit<0){
          this.newUserAgeLimit = 0;
        }
      }
    },
    methods: {
      ...mapActions(['handleLogin']),
      getDay() {
        let Y = new Date().getFullYear() + '';
        let M = new Date().getMonth() + 1 + '';
        let D = new Date().getDate() + '';
        if (M.length === 1) M = '0' + M;
        if (D.length === 1) D = '0' + D;
        this.upToDay = Y + '-' + M + '-' + D;
      },
      see(){
        console.log(this.newAreaList)
      },
      // 登录注册窗口切换
      onClickEnrollBox() {
        this.$toast('此功能暂不开放')
        // this.warningShow = false;
        // this.loginBox.style.left = '-50%';
        // this.enrollBox.style.left = '50%';
      },
      onClickLoginBox() {
        this.warningShow = false;
        this.loginBox.style.left = '';
        this.enrollBox.style.left = '';
      },
      // 打开、关闭忘记密码窗口
      openForget() {
        this.userPhone = this.userPhoneNum
        this.warningShow = false;
        this.loginBox.style.left = '-50%';
        this.forgetBox.style.left = '50%'
      },
      offForget() {
        this.warningShow = false;
        this.loginBox.style.left = '';
        this.forgetBox.style.left = ''
      },
      // 登录密码显示隐藏
      onClickPassShow() {
        if (this.showPass) {
          this.showPass = false;
        } else {
          this.showPass = true;
        }
      },
      //登录按钮颜色
      loginButtonDecide() {
        if (this.userPhoneNum && this.userPassWord) {
          this.loginButton.style.background = '#47BDC3';
        } else {
          this.loginButton.style.background = '#969696';
        }
      },
      //注册按钮颜色
      enrollButtonDecide() {
        if (this.newUserPhoneNum && this.newUserverification && this.newUserPassWord && this.newUserIDCards && this.newUserImg && this.newUserName && this.newUserSex) {
          this.enrollButton.style.background = '#47BDC3';
        } else {
          this.enrollButton.style.background = '#969696';
        }
      },
      //修改密码按钮变色
      forgetButtonDecide() {
        if (this.userPhone && this.userVerification && this.userNewPass && this.userNewPassCopy) {
          this.forgetButton.style.background = '#47BDC3';
        } else {
          this.forgetButton.style.background = '#969696';
        }
      },
      //获取用户上传头像
      imgUpload(url) {
        this.newUserImg = url
      },
      // 获取注册验证码
      onClickGetNote() {
        //倒计时
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
      },
      // 警告提示
      warningTextShow(index, TXT) {
        // console.log(document.getElementsByClassName('warning')[0])
        let warningBox = document.getElementsByClassName('warning')[index]
        warningBox.style = ('')
        this.warningShow = true;
        this.warningText = TXT;
        setTimeout(() => {
          if (this.warningShow) {
            warningBox.style = ('background:#fff;color:rgba(253,98,98,1);')
          }
        }, 100);
      },
      // 获取服务区
      async getArea() {
        let res = await getArea({
          size:13
        });
        // console.log(res)
        if (res.code === 200) {
          this.areaList = res.data.list;
        } else {
          this.$toast(res.message)
        }
      },
      // 用户登录
      handleSubmit() {
        // Indicator.open();
        let form = {
          username: this.userPhoneNum,
          password: this.userPassWord,
          type: 0,
        }
        form.loginStatus = this.loginStatus

        this.handleLogin(form).then((res) => {
          console.log(res)
          if (res.code === 200) {
            Indicator.close();
            if (res.data.userInfo.status === 1) {
              Toast({
                message: '登录成功',
                position: 'bottom',
                duration: 2000
              })
              this.userId = res.data.userInfo.id
              this.$router.push({name: '订单列表',query:{getEdition:1}})
            } else {
              Toast({
                message: '登录失败，该账号已被禁用',
                position: 'bottom',
                duration: 2000
              })
            }
          } else {
            // console.log(res)
            Indicator.close();
            if(res.message=="密码错误"){
              Toast({
                message: res.message,
                position: 'bottom',
                duration: 2000
              })
            }else if(res.message=="无此用户"){
              Toast({
                message: res.message,
                position: 'bottom',
                duration: 2000
              })
            }else{
              Toast({
                message: '登录失败',
                position: 'bottom',
                duration: 2000
              })
            }
            
          }
        })
        // }
      },
      // 新用户注册
      async newUser() {
        // Indicator.open();
        if (this.newUserverification == this.SMSNum) {
          if(this.nameIf&&this.phoneIf&&this.idNumIf&&this.newUserDepartment&&this.newUserAgeLimit&&this.newUserSex&&this.newUserImg&&this.newUserArea){
            if(this.newUserPassWord == this.newUserCopyPassWord&&this.newUserPassWord != ''&&this.newUserPassWord.length>5){
              let toTime = (new Date() + '').split(' ')[4];
              // let res = await newNurse({
              //   idNumber: this.newUserIDCards,
              //   username: this.newUserPhoneNum,
              //   name: this.newUserName,
              //   password: this.newUserPassWord,
              //   gender: this.newUserSex,
              //   avatar: this.newUserImg,
              //   addTime: this.upToDay + ' ' + toTime,
              //   hospital: this.newUserHospital,
              //   department: this.newUserDepartment,
              //   workYears: this.newUserAgeLimit,
              //   serviceArea: this.newUserArea
              // });
              if (res.code === 200) {
                Indicator.close();
                this.userPhoneNum = this.newUserPhoneNum;
                this.userPassWord = this.newUserPassWord;
                this.isLogin = false
                this.handleSubmit()
              } else {
                Indicator.close();
                this.$toast('注册失败')
                this.registerWarning('注册失败')
              }
            }else{
              Indicator.close();
              if(this.newUserPassWord==''){
                this.warningTextShow(1, '请输入密码');
                this.$toast('请输入密码')
              }else if(this.newUserPassWord.length<6){
                this.warningTextShow(1, '密码最少需要六位');
                this.$toast('密码最少需要六位')
              }else{
                this.warningTextShow(1, '两次密码不相同');
                this.$toast('两次密码不相同')
              }
            }
          }else{
            Indicator.close();
            if(!this.nameIf){
              this.warningTextShow(1, '请填写合法中文姓名');
              this.$toast('请填写合法中文姓名')
            }else if(!this.phoneIf){
              this.warningTextShow(1, '请填写合法手机号码');
              this.$toast('请填写合法手机号码')
            }else if(!this.idNumIf){
              this.warningTextShow(1, '请填写合法身份证号码');
              this.$toast('请填写合法身份证号码')
            }else if(!this.newUserIDCards){
              this.warningTextShow(1, '身份证不能为空')
              this.$toast('身份证不能为空')
            }else if(!this.newUserPhoneNum){
              this.warningTextShow(1, '手机号码不能为空')
              this.$toast('手机号码不能为空')
            }else if(!this.newUserName){
              this.warningTextShow(1, '姓名不能为空')
              this.$toast('姓名不能为空')
            }else if(!this.newUserPassWord){
              this.warningTextShow(1, '密码不能为空')
              this.$toast('密码不能为空')
            }else if(!this.newUserSex){
              this.warningTextShow(1, '请选择性别')
              this.$toast('请选择性别')
            }else if(!this.newUserImg){
              this.warningTextShow(1, '请上传头像')
              this.$toast('请上传头像')
            }else if(!this.newUserHospital){
              this.warningTextShow(1, '请填写所在医院')
              this.$toast('请填写所在医院')
            }else if(!this.newUserDepartment){
              this.warningTextShow(1, '请填写所在科室')
              this.$toast('请填写所在科室')
            }else if(!this.newUserAgeLimit){
              this.warningTextShow(1, '请填写工作年限')
              this.$toast('请填写工作年限')
            }else if(!this.newUserArea){
              this.warningTextShow(1, '请选择服务区')
              this.$toast('请选择服务区')
            }
          }
        } else {
          Indicator.close();
          if(this.SMSNum == 'NoSMS'){
            this.warningTextShow(1, '请获取验证码');
            this.$toast('请获取验证码')
          }else{
            this.warningTextShow(1, '验证码错误');
            this.$toast('验证码错误')
          }
        }
      },
      // 注册错误提示
      registerWarning(res){
        if(!this.newUserIDCards){
          this.warningTextShow(1, '身份证不能为空')
          this.$toast('身份证不能为空')
        }else if(!this.newUserPhoneNum){
          this.warningTextShow(1, '手机号码不能为空')
          this.$toast('手机号码不能为空')
        }else if(!this.newUserName){
          this.warningTextShow(1, '姓名不能为空')
          this.$toast('姓名不能为空')
        }else if(!this.newUserPassWord){
          this.warningTextShow(1, '密码不能为空')
          this.$toast('密码不能为空')
        }else if(!this.newUserSex){
          this.warningTextShow(1, '请选择性别')
          this.$toast('请选择性别')
        }else if(!this.newUserImg){
          this.warningTextShow(1, '请上传头像')
          this.$toast('请上传头像')
        }else if(!this.newUserHospital){
          this.warningTextShow(1, '请填写所在医院')
          this.$toast('请填写所在医院')
        }else if(!this.newUserDepartment){
          this.warningTextShow(1, '请填写所在科室')
          this.$toast('请填写所在科室')
        }else if(!this.newUserAgeLimit){
          this.warningTextShow(1, '请填写工作年限')
          this.$toast('请填写工作年限')
        }else if(!this.newUserArea){
          this.warningTextShow(1, '请选择服务区')
          this.$toast('请选择服务区')
        }else if(res.code === 400){
          this.warningTextShow(1, res.message)
          this.$toast(res.message)
        }
      },
      // 用户修改密码
      async newPass() {
        // Indicator.open();
        if (this.userVerification == this.SMSNum&&this.userNewPass == this.userNewPassCopy&&this.userNewPass != ''&&this.userNewPass.length>5) {
          let res = await newPass({
            phone: this.userPhone,
            password: this.userNewPass
          });
          if (res.code === 200) {
            Indicator.close();
            this.userPhoneNum = this.userPhone;
            this.userPassWord = this.userNewPass;
            this.isLogin = true;
            this.$toast('密码已更改')
            this.handleSubmit()
          } else {
            Indicator.close();
            if(res.code === 400){
              this.warningTextShow(2, res.message);
              this.$toast(res.message)
            }else{
              this.warningTextShow(2, '更改失败');
              this.$toast('更改失败')
            }
          }
        } else {
          Indicator.close();
          if(this.userVerification != this.SMSNum && this.SMSNum != 'NoSMS'){
            this.warningTextShow(2, '验证码错误');
            this.$toast('验证码错误')
          }else if(this.SMSNum == 'NoSMS'){
            this.warningTextShow(2, '请获取验证码');
            this.$toast('请获取验证码')
          }else if(this.userNewPass != this.userNewPassCopy){
            this.warningTextShow(2, '两次密码不相同');
            this.$toast('两次密码不相同')
          }else if(this.userNewPass == ''){
            this.warningTextShow(2, '请输入新密码');
            this.$toast('请输入新密码')
          }else if(this.userNewPass.length<6){
            this.warningTextShow(2, '密码最少需要六位');
            this.$toast('密码最少需要六位')
          }
        }
      },
      // 发送信息
      async SMS(index) {
        let res;
        if(this.note60SLock){
          this.note60SLock = false
          if (index == 1) {
            res = await SMS({phone: this.newUserPhoneNum})
          } else if (index == 2) {
            res = await SMS({phone: this.userPhone})
          }
          if (res.code === 200) {
            this.SMSNum = res.data;
            this.onClickGetNote()
          } else {
            this.warningTextShow(index, '请输入联系电话');
            this.$toast('请输入联系电话')
            this.note60SLock = true
          }
        }else{
          this.warningTextShow(index, '请勿多次点击获取验证码');
          this.$toast('请勿多次点击')
        }
      },
      // 查询资质
      async getAptitude() {
        let res = await getAptitude({id: this.userId})
        if (res.code === 200) {
          if (res.data.status) {
            if (res.data.status === 1) {
              this.$router.push({name: '订单列表'})
            } else {
              this.warningTextShow(0, '资质审核中...');
            }
          } else {
            this.$router.push({name: '选着资质'})
          }
        }
      },
      // 关闭选着区
      clickOffAreaWindow(){
        this.areaIf=false;
        this.newUserArea = this.newAreaList.join();
      },
      // 手机验证
      validatePhone(phone) {
        let msg = '';
        const regex = /^0?(1[3456789][0-9])[0-9]{8}$/;
        if(phone === '' || phone === null){
          msg = '手机号码不能为空'
          this.warningTextShow(1,msg);
          this.$toast(msg)
          this.phoneIf = false
        }else if(!regex.test(phone)){
          msg = '请填写合法手机号码'
          this.warningTextShow(1,msg);
          this.$toast(msg)
          this.phoneIf = false
        }else{
          this.phoneIf = true
        }
      },
      // 姓名验证
      validateName(name){
        let msg = '';
        const regex = /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/;
        if(name === '' || name === null){
          msg = '姓名不能为空'
          this.warningTextShow(1,msg);
          this.$toast(msg)
          this.nameIf = false
        }else if(!regex.test(name)){
          msg = '请填写合法中文姓名'
          this.warningTextShow(1,msg);
          this.$toast(msg)
          this.nameIf = false
        }else{
          this.nameIf = true
        }
      },
      // 身份证验证
      validateIdCard (code) {
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
          this.warningTextShow(1,'请填写合法身份证号码');
          this.$toast('请填写合法身份证号码')
          this.idNumIf = false
        }
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
          this.warningTextShow(1,'请填写合法身份证号码');
          this.$toast('请填写合法身份证号码')
          this.idNumIf = false
        } else if (!city[code.substr(0, 2)]) {
          this.warningTextShow(1,'请填写合法身份证号码');
          this.$toast('请填写合法身份证号码')
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
              this.warningTextShow(1,'请填写合法身份证号码');
              this.$toast('请填写合法身份证号码')
              this.idNumIf = false
            }else{
              this.idNumIf = true
            }
          }
        }
      }
    },
  }
</script>
<style lang="less" scoped>
  .loginEnroll-body {
    width: 100%;
    height: 100%;
    background-size: cover;
    background: rgba(247, 247, 247, 1);
    button {
      transition: all .5s;
    }
    > img {
      display: block;
      width: 100%;
      height: 100%;
    }
    > div {
      position: fixed;
      top: 50%;
      margin-left: -289px;
      background: #fff;
      border-radius: 10px;
      transition: all .5s;
      > input {
        width: 440px;
        height: 58px;
        outline: none;
        display: block;
        border: 0;
        border-bottom: 2px solid #C7C7C7;
        background: #fff;
        margin: 0 auto;
        margin-top: 38px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        line-height: 58px;
      }
      > input:nth-of-type(1) {
        margin-top: 68px;
      }
      > button {
        border: 0;
        width: 512px;
        height: 72px;
        background: rgba(150, 150, 150, 1);
        box-shadow: 0px 4px 8px 4px rgba(80, 113, 203, 0.12);
        border-radius: 10px;
        outline: none;
        font-size: 28px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 72px;
        margin-top: 64px;
      }
      > h1 {
        position: absolute;
        height: 34px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 34px;
      }
      > p {
        width: 100%;
        height: 34px;
        position: absolute;
        top: 20px;
        left: 0;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        line-height: 34px;
        background: rgba(253, 98, 98, 1);
        color: #fff;
        transition: all 1s;
      }
    }
    .login-box {
      width: 670px;
      height: 512px;
      // margin-top: -256px;
      top: 298px;
      margin-left: -335px;
      left: 50%;
      input {
        padding-left: 15px;
        width: 512px;
      }
      > img {
        position: absolute;
        top: -256px;
        width: 160px;
        height: 160px;
        left: 50%;
        margin-left: -80px;
      }
      > .show-pass {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 78px;
        top: 180px;
        > img {
          display: block;
          width: 100%;
        }
      }
      > h1:nth-of-type(1) {
        top: 426px;
        left: 270px;
      }
      > h1:nth-of-type(2) {
        top: 426px;
        left: 414px;
      }
    }
    .enroll-box {
      width: 670px;
      height: 1100px;
      margin-top: -538px;
      margin-left: -335px;
      left: 150%;
      overflow-y: scroll;
      >.area-btn{
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
        margin: 30px auto 0;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 15px;
      }
      > h3 {
        height: 48px;
        font-size: 34px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(3, 3, 3, 1);
        line-height: 48px;
        position: absolute;
        top: 50px;
        left: 302px;
      }
      > h2 {
        width: 140px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
        position: absolute;
        top: 150px;
        left: 30px;
      }
      > .go-login {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 30px;
        left: 10px;
        z-index: 10;
        > i {
          display: block;
          position: absolute;
        }
        > i:nth-of-type(1) {
          width: 30px;
          height: 30px;
          border: 4px solid #333333;
          border-top: 0;
          border-right: 0;
          transform: rotate(45deg);
          top: 50%;
          margin-top: -10px;
          margin-left: 11px;
        }
        > p {
          width: 68px;
          height: 48px;
          font-size: 34px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 48px;
          position: absolute;
          top: 5px;
          left: 40px;
        }
      }
      > .get-note {
        position: absolute;
        bottom: -25%;
        right: 26px;
        padding: 0 10px;
        width: auto;
        min-width: 140px;
        height: 52px;
        font-size: 24px;
        line-height: 50px;
        border-radius: 10px;
        color: #47BDC3;
        // border: 2px solid rgba(150,150,150,1);
      }
      > h1 {
        width: 100%;
        bottom: 24px;
        left: 0;
        height: auto;
        > span {
          color: #628CFD;
        }
      }
      > .enroll-but {
        position: absolute;
        left: 82px;
        bottom: -37%;
      }
      > .upImg {
        position: absolute;
        top: 156px;
        left: 264px;
      }
      > input {
        width: 616px;
      }
      > input:nth-of-type(1) {
        margin-top: 380px;
      }
      .sex {
        width: 616px;
        height: 40px;
        margin: 42px auto;
        text-align: left;
        > span {
          display: inline-block;
          height: 40px;
          font-size: 28px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 40px;
          padding-right: 30px;
        }
        > span:nth-of-type(2) {
          padding-left: 20px;
          padding-right: 0px;
        }
      }
    }
    .forget-box {
      width: 630px;
      height: 586px;
      margin-top: -258px;
      margin-left: -315px;
      left: 150%;
      z-index: 10;
      > .go-login {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 30px;
        left: 10px;
        z-index: 10;
        > i {
          display: block;
          position: absolute;
        }
        > i:nth-of-type(1) {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(150, 150, 150, 1);
          border-top: 0;
          border-right: 0;
          transform: rotate(45deg);
          top: 50%;
          margin-top: -10px;
          margin-left: 11px;
        }
      }
      > .get-note {
        position: absolute;
        top: 160px;
        right: 95px;
        padding: 0 10px;
        width: auto;
        min-width: 140px;
        height: 52px;
        font-size: 24px;
        line-height: 50px;
        border-radius: 10px;
        color: rgba(150, 150, 150, 1);
        border: 2px solid rgba(150, 150, 150, 1);
      }
    }
    .area-window {
      position: absolute;
      left: 0;
      top: 0;
      margin: 0 0;
      width: 750px;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 100;
      >p{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        background: transparent;
      }
      >.area-box{
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
    }
  }

</style>
<style scoped>
  .sex >>> .ivu-radio-checked .ivu-radio-inner {
    border-color: #47BDC3;
  }

  .sex >>> .ivu-radio-inner:after {
    background-color: #47BDC3;
  }
  .area-window >>>.ivu-checkbox{
    width: 100%;
    height: 0.8rem;
    text-align: right;
    border-top: 1px solid #DFDFDF;
  }
  .area-window >>>.ivu-checkbox-inner{
    display: block;
    top: 18px;
    left:  90%;
    border-color: #47BDC3;
  }
  .area-window >>>.ivu-checkbox-checked .ivu-checkbox-inner{
    background-color: #47BDC3;
  }
  .area-window >>> .ivu-checkbox-wrapper{
    position: relative;
  }
  .area-window >>> .ivu-checkbox-wrapper > span{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
  .area-window >>> .ivu-checkbox-wrapper > span:nth-of-type(2){
    top: 13px;
    font-size: 28px;
    left: 30px;
  }
</style>

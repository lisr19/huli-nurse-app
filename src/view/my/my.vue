<template>
  <div class="main">
    <div class="top-box">
      <img src="@/assets/img/bj.png" alt="">
	    <div class="code" @click="showCode">
		    <img src="@/assets/icon/code.png" alt="">
		    <span>二维码</span>
	    </div>
      <div class="nuser-logo" @click="clickSet">
        <img :src="avatar" alt="">
      </div>
      <!-- <img :src="avatar" alt="" @click="clickSet"> -->
      <!-- <div class="status" @click="clickStatus">
        <img src="@/assets/icon/status0.png" alt="">
        <span>{{userStatus}}中</span>
      </div> -->
      <div class="status-type">
        <img @click="clickStatusType(0)" src="@/assets/icon/status1.png" alt="">
        <img @click="clickStatusType(1)" src="@/assets/icon/status2.png" alt="">
        <img @click="clickStatusType(2)" src="@/assets/icon/status3.png" alt="">
        <p v-for="(item,index) in statusList" :key="index">{{item}}</p>
      </div>
      <h1 class="user-name">{{name}}</h1>
      <div class="box-bottom"></div>
    </div>
    <div class="scheduling" @click="clickScheduling">
      <img src="@/assets/icon/scheduling.png" alt="">
      <p>排班设置</p>
      <Icon type="ios-arrow-forward" />
    </div>
    <div class="about-hotel">
      <div class="item" v-for="item in tipList" :key="item.index" @click="clickBtns(item.index)">
        {{item.title}}
        <p v-if="item.text">{{item.text}}</p>
        <Icon type="ios-arrow-forward" />
      </div>
    </div>
    <button class="btn" @click="logout">退出账号</button>
    <div class="bottom-bar">
      <p v-if="newOrderIndex">{{newOrderIndex}}</p>
      <div @click="openOrder">
        <img src="@/assets/icon/order1.png" alt="">
                <p>订单</p>
        </div>
      <div >
        <img src="@/assets/icon/nurse2.png" alt="">
        <p>我的</p>
      </div>
    </div>
    <div v-if="ifPassWorde" class="new-pass-woder-box">
      <div class="forget-box">
        <input v-model="newPasswoder" placeholder='新密码' type="password">
        <input v-model="repetitionPass" placeholder='重复密码' type="password">
        <button @click="newPass(0)">取消</button>
        <button @click="newPass(1)">修改密码</button>
      </div>
    </div>
    <div class="updated-version" v-if="updatedVersionLock">
      <div class="updated">
        <img src="@/assets/img/newEdition.png" alt="">
        <p>{{updatedTxt}}</p>
        <div @click="download">版本更新中</div>
        <!-- <div @click="updatedVersionLock=false">以后再说</div> -->
      </div>
    </div>
	  <mt-popup v-model="popupVisible">
		  <div class="code-box">
			  <img class="qr-code" :src="qrcodeUrl" alt=" ">
			  <!--<img class="qr-code" src="@/assets/icon/code.png" alt="">-->
			  <p>扫描二维码下载用户端</p>
		  </div>
	  </mt-popup>
  </div>
</template>

<script>
  import { MessageBox,Toast,Indicator,Popup } from 'mint-ui';
  import { mapActions } from 'vuex'
  import { newPass } from "@/lib/API/login-enroll";
  import { getNewOrder } from "@/lib/API/order";
  import {getEdition} from "@/lib/API/edition";
  import Config from '@/Config'
  import mui from 'vue-awesome-mui'
  export default {
    computed:{
      nurseId(){
        return this.$store.state.user.userId
      },
      name(){
        return this.$store.state.user.name
      },
      avatar(){
        return this.$store.state.user.avatar
      },
      phone() {
        return this.$store.state.user.username //账号、手机
      },
      edition(){
        return Config.edition //当前版本号
      },
    },
    components:{
        mui
    },
    data() {
      return {
	      popupVisible:false,
	      qrcodeUrl:'',//二维码
        // 用户头像 姓名 状态
        userImg:'',
        userName:'NoName',
        userStatus:'值班',
        newOrderIndex:0,
        newPasswoder:'',
        repetitionPass:'',
        updatedVersionLock:false,
        updatedVersionUrl:'http://120.78.215.17:14011/download/app_nurse_',
        updatedTxt:'',
        statusList:['值班','忙碌','休息'],
        tipList:[
          {
            title:'修改密码',
            index:0
          },
          {
            title:'意见反馈',
            index:1
          },
          {
            title:'关于护士端',
            index:2,
            text:'已是最新版本'
          }
        ],
        ifPassWorde:false,
      }
    },
    created(){
      Indicator.close();
      this.getNewOrderIndex()
      this.getEdition()
    },
    mounted(){
      let _this = this
      setInterval(function(){
        _this.getNewOrderIndex()
      },300000)
    },
    methods: {
      ...mapActions(['handleLogOut']),
	    showCode(){
		    this.getQrcode()
			  this.popupVisible = true
	    },
	    async getQrcode(){
		    let res = await getEdition({appType:1})
		    if(res.code == 200){
			    this.qrcodeUrl = res.data.qrcodeUrl
		    }else {
		    	this.$toast('获取二维码失败')
		    }
	    },
      logout() {
        let self = this
        MessageBox({
          title: '提示',
          message: '您确定退出账户吗?',
          showCancelButton: true
        }).then((active) => {
          if (active !== 'cancel') {
            self.handleLogOut().then(() => {
              Toast({
                message: '注销成功',
                position: 'bottom',
                duration: 2000
              });
              localStorage.setItem('nurseOrderCopyDatas', '')
              localStorage.setItem('nurseClickOrderTypeData','')
              self.$router.push({path: '/login'})
            })
          }
        });
      },
      // 点击我的订单
      openOrder(){
        this.$router.push({name:'订单列表'})
      },
      // 点击打开选着状态
      clickStatus(){
        let btnBox = document.getElementsByClassName('status-type')[0];
        btnBox.style.height = '2.3rem'
      },
      // 选着状态
      clickStatusType(index){
        let btnBox = document.getElementsByClassName('status-type')[0];
        btnBox.style.height = '';
        this.userStatus = this.statusList[index];
      },
      // 设置信息
      clickSet(){
        this.$router.push({name:'设置我的信息'})
      },
      clickScheduling(){
        this.$router.push({name:'排班表'})
      },
      clickBtns(index){
        if(index == 0){
          this.ifPassWorde = true;
        }else if(index == 1){
          this.$toast('功能开发中')
        }else if(index == 2){
          if(this.tipList[2].text == '发现新版本'){
            this.updatedVersionLock = true
          }
        }
      },
      // 修改密码
      async newPass(index){
        if(index == 1){
          if(this.newPasswoder === this.repetitionPass&&this.newPasswoder != ''&&this.newPasswoder.length>5){
            let res = await newPass({
              phone : this.phone,
              password : this.newPasswoder
            })
            if(res.code === 200){
              this.ifPassWorde = false;
              this.newPasswoder = '';
              this.repetitionPass = '';
              this.$toast('修改成功')
            }else{
              this.$toast('修改失败')
            }
          }else{
            if(this.newPasswoder==''){
              this.$toast('请输入密码')
            }else if(this.newPasswoder.length<6){
              this.$toast('密码最少需要六位')
            }else{
              this.$toast('两次密码不相同')
            }
          }
        }else{
          this.newPasswoder = '';
          this.repetitionPass = '';
          this.ifPassWorde = false;
        }
      },
      // 获取新订单数量
      async getNewOrderIndex(){
        let res = await getNewOrder({
          nurseId:this.nurseId,
          page :0,
          size :10
        })
        if(res.code === 200){
          this.newOrderIndex = res.data.total
          if(this.newOrderIndex>10){
            this.newOrderIndex = '10+'
          }
        }
      },
      // 获取最新版本
      async getEdition(){
        if(localStorage.getItem('updatedVersionLock').length){
          let newEdition = localStorage.getItem('updatedVersionLock').split('|/|/|')[0]
          let versionNum1 = newEdition.split('.').join('')
          let versionNum2 = this.edition.split('.').join('')
          console.log('新版',Number(versionNum1) , '本机',Number(versionNum2))
          if(versionNum1 > versionNum2){
            this.tipList[2].text = '发现新版本'
            this.updatedVersionUrl = localStorage.getItem('updatedVersionLock').split('|/|/|')[1]
            this.updatedTxt = '本机版本为：'+this.edition+'/ 新版本为：'+newEdition
            this.updatedVersionLock = true
          }else{
            this.tipList[2].text += this.edition
          }
        }else{
          let res = await getEdition({appType : 2})
          if(res.code == 200){
            let data = res.data
            let newEdition = data.majorVersionNumber+'.'+data.minorVersionNumber+'.'+data.revisionNumber
            let versionNum1 = data.majorVersionNumber+''+data.minorVersionNumber+''+data.revisionNumber
            let versionNum2 = this.edition.split('.').join('')
            console.log('新版',Number(versionNum1) , '本机',Number(versionNum2))
            if(versionNum1 > versionNum2){
              this.tipList[2].text = '发现新版本'
              this.updatedVersionUrl = res.data.downloadUrl
              this.updatedTxt = '本机版本为：'+this.edition+'/ 新版本为：'+newEdition
              this.updatedVersionLock = true
            }else{
              this.tipList[2].text += this.edition
            }
          }
        }
        // console.log(this.updatedVersionUrl)
        if(this.updatedVersionLock){
          this.download()
        }
      },
      // 点击下载
      download(){
        console.log(this.updatedVersionUrl)
        var wgtWaiting = plus.nativeUI.showWaiting("开始下载");
        var url = this.updatedVersionUrl; // 下载文件地址
        var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
          if(status == 200) { // 下载成功
            wgtWaiting.setTitle("开始安装");
            var path = d.filename;
            plus.runtime.install(path);
          } else { //下载失败
            alert("Download failed: " + status);
          }
        });
        dtask.addEventListener("statechanged", function(download, status) {
          switch(download.state) {
            case 2:
            wgtWaiting.setTitle("已连接到服务器");
            break;
            case 3:
            var percent = download.downloadedSize / download.totalSize * 100;
            wgtWaiting.setTitle("下载中... " + parseInt(percent) + "%");
            break;
            case 4:
            wgtWaiting.setTitle("下载完成");
            break;
          }
        });
        dtask.start();
      }
    }
  }
</script>


<style lang="less" scoped>
	.mint-popup{
		border-radius:50px;
	}
  .top-box{
    // width: 750px;
    width: 100%;
    height: 353px;
    margin-bottom: 76px;
    // background: #47BDC3;
    position: relative;
    >img:nth-of-type(1){
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
	  .code{
		  position: absolute;
		  top: 40px;
		  left: 40px;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  font-size:22px;
		  font-family:PingFangSC-Regular,PingFang SC;
		  font-weight:400;
		  color:rgba(255,255,255,1);
		  line-height:32px;
		  img{
			  width:48px;
			  height:48px;
			  margin-bottom: 12px;
		  }
	  }
    >.nuser-logo{
      width: 160px;
      height: 160px;
      border-radius: 80px;
      display: block;
      position: absolute;
      top: 96px;
      // left: 296px;
      left: 50%;
      margin-left: -80px; 
      overflow: hidden;
      >img{
        width: 160px;
        height: auto;
      }
    }
    >.user-name{
      width: 100%;
    }
    .status{
      width: 180px;
      height: 50px;
      font-size: 36px;
      text-align: left;
      color: #fff;
      line-height: 50px;
      position: absolute;
      top: 50px;
      left: 44px;
      >img{
        width: auto;
        height: 80%;
        line-height: 50px;
      }
      >span{
        position: absolute;
        display: block;
        top: -5px;
        left: 72px;
        font-size:36px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:50px;
        text-shadow:0px 2px 4px rgba(47,108,111,1);
      }
    }
    .box-bottom{
      // background: #47BDC3;
      // width: 750px;
      width: 100%;
      height: 66px;
      position: absolute;
      bottom: -29px;
      left: 0;
      border-radius: 50%;
    }
    >h1{
      position: absolute;
      width: 750px;
      height:40px;
      font-size:28px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:40px;
      top:278px;
      left: 0;
      z-index: 10;
    }
    .status-type{
      position: absolute;
      top: 96px;
      left: 40px;
      width:416px;
      // height:164px;
      height: 0px;
      background:rgba(255,255,255,1);
      border-radius:10px;
      overflow: hidden;
      transition: all .5s;
      z-index: 11;
      >img{
        display: block;
        position: absolute;
        top: 42px;
        width: 54px;
        height: 54px;
      }
      >p{
        position: absolute;
        top: 101px;
      }
      >img:nth-of-type(1){
        left: 44px;
      }
      >img:nth-of-type(2){
        left: 182px;
      }
      >img:nth-of-type(3){
        left: 320px;
      }
      >p:nth-of-type(1){
        left: 44px;
      }
      >p:nth-of-type(2){
        left: 185px;
      }
      >p:nth-of-type(3){
        left: 323px;
      }
    }
  }
  .scheduling{
    width: 670px;
    height: 86px;
    background: #fff;
    position: relative;
    margin: 0 auto 40px;
    border-radius:20px;
    box-shadow:0px 4px 8px 0px rgba(183,183,183,0.18);
    >img{
      box-sizing: content-box;
      display: block;
      float: left;
      width: 52px;
      height: 46px;
      margin: 20px 32px;
    }
    >p{
      float: left;
      font-size:26px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:86px;
    }
    >.ivu-icon{
      position: absolute;
      top: 34px;
      right: 34px;
      color: #D6D6D6;
    }
  }
  .main {
    background-color: #f8f9fb;
    height: 100%;
    .back-bar{
      text-align: left;
      height:92px;
      background:rgba(255,255,255,1);
      font-size:26px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:92px;
      padding-left: 40px;
      display: flex;
      align-items: center;
    }
    .about-hotel{
      width:670px;
      // height:206px;
      background:rgba(255,255,255,1);
      box-shadow:0px 10px 16px 0px rgba(0,0,0,0.04);
      border-radius:20px;
      margin: 0px auto ;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 30px 0;
      margin-bottom: 200px;
      .item{
        height: 78px;
        line-height: 78px;
        font-size:26px;
        font-weight:400;
        color:rgba(51,51,51,1);
        text-align: left;
        padding: 0 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        >.ivu-icon{
          color: #D6D6D6;
        }
        .edition{
          height:36px;
          font-size:26px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:36px;
          display: flex;
          align-items: center;
        }
        >p{
          height:36px;
          font-size:26px;
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:36px;
          position: absolute;
          top: 22px;
          right: 68px;;
        }
      }
    }
    .btn{
      width:670px;
      height:96px;
      line-height: 96px;
      background:rgba(255,255,255,1);
      border-radius:20px;
      border: none;
      font-size:26px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#999999;
      position: absolute;
      bottom: 10%;
      left: 50%;
      margin-left: -335px; 
    }
    >.updated-version{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(51,51,51,0.4);
        z-index: 100;
        >.updated{
          width:670px;
          height:656px;
          background:rgba(255,255,255,1);
          border-radius:16px;
          position: absolute;
          top: 270px;
          left: 50%;
          margin-left: -335px;
          overflow: hidden;
          >img{
              width: 100%;
              height: auto;
          }
          >div{
              width: 100%;
              height: 88px;
              border: 1px solid #DFDFDF;
              font-size:32px;
              font-family:PingFangSC;
              font-weight:400;
              color:rgba(153,153,153,1);
              line-height:88px;
              position: absolute;
              bottom: 0;
              right: 0;
          }
          >div:nth-of-type(1){
              // right: 50%;
              font-weight:600;
              color:rgba(71,189,195,1);
          }
          >p{
            position: absolute;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFangSC;
            font-weight:400;
            color:rgba(3,3,3,1);
            width: 100%;
            bottom: 90px;
            left: 0;
          }
        }
    }
  }
  .bottom-bar{
        width: 100%;
        height: 98px;
        position: fixed;
        bottom: 0;
        left: 0;
        border-top:1px solid rgba(0,0,0,0.25);
        box-shadow:0px 1px 0px 0px rgba(0,0,0,0.25);
        background:#FAFAFA;
        display: flex;
        justify-content: space-around;
        >p{
          padding: 5px 5px;
          height:24px;
          background:rgba(252,70,52,1);
          border-radius: 12px;
          position: absolute;
          top: 0%;
          left: 27%;
          font-size:22px;
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:12px;
          z-index: 100;
        }
        >div{
            width: 375px;
            float: left;
            height: 100%;
            position: relative;
            >img{
                width: 54px;
                height: 54px;
                display: block;
                position: absolute;
                top: 10px;
                left: 50%;
                margin-left: -27px;
            }
            >p{
                width: 100%;
                height: 28px;
                font-size: 20px;
                line-height: 28px;
                text-align: center;
                float: left;
                margin: 70px auto 0;
                color: #8E8E93;
            }
        }
        >div:nth-of-type(2){
            >p{
                color: #47BDC3;
            }
        }
  }
  .new-pass-woder-box{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    >.forget-box{
      width: 630px;
      height: 516px;
      position: absolute;
      background: #FAFAFA;
      top: 50%;
      left: 50%;
      margin: -258px 0 0 -315px;
      border-radius: 10px;
      >input{
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
      >button{
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
      >button:nth-of-type(2){
        background: #47BDC3;
      }
    }
  }
  .code-box{
	  width:628px;
	  height:618px;
	  background:rgba(255,255,255,1);
	  border-radius:50px;
	  overflow: hidden;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  .qr-code{
		  width:328px;
		  height:328px;
		  padding: 5px;
	  }
	  p{
		  height:48px;
		  font-size:34px;
		  font-family:PingFangSC-Regular,PingFang SC;
		  font-weight:400;
		  color:rgba(51,51,51,1);
		  line-height:48px;
		  margin-top: 40px;
	  }
  }
</style>

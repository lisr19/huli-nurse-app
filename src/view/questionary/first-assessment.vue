<template>
  <div class="body">
    <div class="header">
      <div class="go-back" @click="goBack">
        <i></i>
        <span>返回</span>
      </div>
    </div>
    <div class="form-header">
      <h1>首次评估表</h1>
      <P>评估日期：{{nowDate}}</P>
      <span v-show="currentChild !== 1" @click="previousStep">返回上一页</span>
    </div>
    <div v-if="lock" class="form-body">
      <child-one v-if="currentChild ===1" ref="child1" :child="child1"></child-one>
      <child-two v-if="currentChild ===2" ref="child2" :child="child2"></child-two>
      <child-three v-if="currentChild ===3" ref="child3" :child="child3"></child-three>
      <child-four v-if="currentChild ===4" ref="child4" :child="child4"></child-four>
      <child-five v-if="currentChild ===5" ref="child5" :child="child5"></child-five>
      <child-six v-if="currentChild ===6" ref="child6" :child="child6"></child-six>
    </div>
    <div class="form-btn" @click="nextStep">
      保存，下一步
    </div>
  </div>
</template>

<script>
  import {doUserHealthFirstAssessmentAdd,doUserHealthFirstAssessmentGet,doUserHealthFirstAssessmentUpdate} from "../../lib/API/forms";
  import {getHealth} from "../../lib/API/health";
  import {Toast, MessageBox , Indicator} from 'mint-ui';
  // import exit from "../../exit"
  import utils from '../../utils/utils'
  import childOne from './assessment-child/child-one'
  import childTwo from './assessment-child/child-two' //多选
  // import childTwo from './assessment-child/child-two(copy)' //单选
  import childThree from './assessment-child/child-three'
  import childFour from './assessment-child/child-four'
  import childFive from './assessment-child/child-five'
  import childSix from './assessment-child/child-six'

  export default {
    name: 'first-assessment',
    components: {
      childOne,
      childTwo,
      childThree,
      childFour,
      childFive,
      childSix,
      // exit
    },
    computed: {
      userId() {
        return this.$store.state.user.userId
      }
    },
    data() {
      return {
        otherSpecialDiet:'',
        currentChild: 1,
        id:'',
        updataLock:false,
        lock:false,
        pushLock:true,
        child1: {
          name: '',
          gender: '',
          birthday: '',
          nationality: '',//民族
          residenceAddress: '',//地址
          residenceContact: '',//住所联系人
          residenceContactPhone: '',//住所联系人关系
          relation: '',//与用户关系
          workplace: '',//工作单位
          workplaceContact: '',//单位联系人
          workplaceContactPhone: '',//单位联系人电话
          maritalStatus: '',//婚姻状况
          workStatus: '',//工作状态
          medicalPaymentMethod: '',//医疗付款方式
        },
        child2: {
          cardiovascularSystem: '无',//心血管系统
          nervousSystem: '无',//系统神经
          respiratorySystem: '无',//呼吸系统
          endocrineSystem: '无',//内分泌系统
          alimentarySystem: '无',//消化系统
          musclesSkeletons: '无',//肌肉与骨骼
          fracturaPart: '无',//骨折部位
          tumour: '无',//肿瘤
          urinarySystem: '无',//泌尿系统
          gynecologicalSystem: '无',//妇科系统
          otherDisease: '无',//其他疾病
          operationHistory: '0',//手术史
          recentHospitalizationHistory: '0',//近期入院史
        },
        child3: {
          bloodPressur: '',//收缩压/舒张压(mmHg)
          pluse: '',//脉搏（次/分）
          rhythm: '1',//节律
          temperature: '',//体温（摄氏度）
          temperaturePart: '1',//体温测量部位
          respiratoryRate: '',//呼吸频率（次/分）
          oxygenSaturationOfBlood: '',//血氧饱和度（%）
          bloodGlucose: '',//血糖含量（mmol/L）
          bloodSampleTime: '1',//抽血时间
          hours: '',//抽血时间为餐后多少小时
          personalHygiene: '1',//个人卫生
          overallSituation: '1',//身体评估整体情况
        },
        child4: {
          consciousness: '1',//意识状态
          dialect: '',//语言和方言
          oral: '1',//口头表达
          auxiliaryCommunicationMode: '',//辅助方式
          auxiliaryCommunication: '',//其他辅助方式
          hearing: '1',//听力
          sleepQuality: '1',//睡眠质素
          frequency: '',//服用安眠药频次
          drugName: '',//安眠药名称
          adaptability: '1',//调适能力
          adaptability1: '1',//适应能力
        },
        child5: {
          cognitiveAbility: '1',//认知能力
          shortTermMemory: '1',//短期记忆
          longTermMemory: '1',//长期记忆
          mobility: '1',//活动能力
          auxiliaryWalk: '',//行走辅助工具
          auxiliaryWalkOther: '',//行走辅助工具其他
          adl: '1',//ADL自理能力
          rightUpperLimb: '2',//右上肢肌力
          rightLowerLimb: '2',//右下肢肌力
          leftUpperLimb: '2',//左上肢肌力
          leftLowerLimb: '2',//左下肢肌力
          falls: '0',//半年内的跌倒情况
          shape: '1',//体型
          weight: '',//体重(KG)
          height: '',//身高(M)
          bmi: '',//bmi(kg/m2)
          waistHipRatio: '',//腰臀比
          weightChange: '1',//3个月内体重变化
          weightChangeValue: '',//体重变化值（KG）
          oralFeeding: '0',//经口进食困难
          specialDiet: '',//特殊饮食
          avoidFoods: '',//避免食物
          otherAvoidFoods: '',//其他避免食物
          diabetesDiet: '',//糖尿病饮食
          lowProteinDiet: '',//低蛋白饮食
          otherSpecialDiet: '',//其他特殊饮食
          dehydration: '0',//脱水症状
        },
        child6: {
          stoolCondition: '',//大便情况
          stoolSoftener: '',//泻药/软便剂
          otherStoolCondition: '',//其他大便情况
          urineCondition: '',//小便情况
          exceptionUrineCondition: '',//异常小便情况
          replaceTime: '',//更换尿管日期
          urineTraits: '',//尿液性状
          skinColor: '1',//皮肤颜色
          lipColor: '1',//唇色
          skinIntegrity: '1',//完整性
          pruritus: '0',//瘙痒
          pain: '0',//疼痛
          drugUse: '0',//用药情况
          historyOfAllergy: '0',//过敏史
          allergens: '',//过敏源
          medicationCompliance: '1',//服药依从性
          drugs: '',//药物名称
          livingEnvironment: '1',//居住环境
          residence: '1',//住所
          residenceDesc: '自购房',//住所描述
          accessChannel: '2',//进出通道
        },
        nowDate: utils.formatDate(new Date(), 'yyyy-MM-dd'),
        queryData: {},
        customId: '',
        userData:{}
      }
    },
    created(){

    },
    mounted() {
      this.queryData = JSON.parse(localStorage.nurseOrderCopyDatas)
      this.customId = this.queryData.userId
      window.scrollTo(0,0);
      let lock = localStorage.getItem('firstAssessmentLock')
      if(lock == 'true'){
        localStorage.setItem('firstAssessmentLock','false')
        setTimeout(function(){
          location.reload();
        },50)
      }else{
        this.doUserHealthFirstAssessmentGet()
      }
      // this.doUserHealthFirstAssessmentGet()
      // document.addEventListener('plusready',function(){
      //   var webview = plus.webview.currentWebview();
      //   plus.key.addEventListener('backbutton',function(){
      //     webview.canBack(function(e){
      //       if(e.canBack){
      //         webview.back();
      //       }
      //     })
      //   })
      // })
    },
    methods: {
      //获取健康档案
      async getHealth(){
	      let res = await getHealth({userId:this.customId})
        if(res.code === 200){
          this.userData = res.data.list[0]
	        for(let a in this.userData){
		        for(let b in this.child1){
	              if(a == b){
	                if(this.userData[a] != 'null'){
	                  this.child1[b] = this.userData[a]
	                }else{
	                  this.child1[b] = ''
	                }
	              }
            }
          }
          this.lock = true;
        }
      },

      async doUserHealthFirstAssessmentGet(){
	      let res = await doUserHealthFirstAssessmentGet({
          userId:this.customId
        })
        if(res.code === 200){
          let list = res.data.list[0]
	        if(list){
            this.id = list.id
            for(let i in this.child1){
              for(let l in list){
                if(i == l&&list[l]!='null'){
                  this.child1[i] = list[l]
                }
              }
            }
            for(let i in this.child2){
              for(let l in list){
                if(i == l){
                  this.child2[i] = list[l]
                }
              }
            }
            for(let i in this.child3){
              for(let l in list){
                if(i == l){
                  this.child3[i] = list[l]
                }
              }
            }
            for(let i in this.child4){
              for(let l in list){
                if(i == l){
                  this.child4[i] = list[l]
                }
              }
            }
            for(let i in this.child5){
              for(let l in list){
                if(i == l){
                  this.child5[i] = list[l]
                }
              }
            }
            for(let i in this.child6){
              for(let l in list){
                if(i == l){
                  this.child6[i] = list[l]
                }
              }
            }
            // this.otherSpecialDiet = this.child5.otherSpecialDiet
            this.updataLock = true
            this.lock = true;
          }else{
            this.updataLock = false
            this.getHealth()
          }
        }
      },
      async doUserHealthFirstAssessmentAdd(params) {
        Indicator.open('保存中...');
        let res;
        if(params.replaceTime){
          params.replaceTime += ' 00:00:00'
        }
        if(this.updataLock){
          params.id = this.id
          res = await doUserHealthFirstAssessmentUpdate(params)
        }else{
          res = await doUserHealthFirstAssessmentAdd(params)
        }
        if (res.code === 200) {
          Indicator.close();
          Toast({
            message: '保存成功',
            position: 'bottom',
            duration: 2000
          });
          if (this.currentChild === 7){
            MessageBox({
              title: '提示',
              message: '《首次综合评估表》已填写完成，是否要打开《日常生活能力评定》表?',
              showCancelButton: true,
              closeOnClickModal:false,
              confirmButtonText:'是',
              cancelButtonText:'否(退回详情)'
            }).then((active) => {
              if (active == 'cancel') {
                this.$router.push({
                  path: '/details',
                  query: {
                    data:this.queryData
                  }
                })
              }else if (active == 'confirm') {
                this.$router.push({
                  path: '/live',
                  query: {
                    data:this.queryData
                  }
                })
              }
            });
          }
        } else {
          Indicator.close();
          Toast({
            message: res,
            position: 'bottom',
            duration: 2000
          });
        }
      },
      goBack() {
        MessageBox({
          title: '提示',
	        message: '是否放弃本页的修改?',
          showCancelButton: true
        }).then((active) => {
          if (active !== 'cancel') {
            this.$router.push({
              path: '/details',
              query: {
                data:this.queryData
              }
            })
          }
        });
      },
      async nextStep() {
        window.scrollTo(0,0);
        // console.log(this.child5,'111')
        // console.log(this.otherSpecialDiet , this.child5.otherSpecialDiet,'112')
        // if(this.otherSpecialDiet != this.child5.otherSpecialDiet){
        //   this.child5.otherSpecialDiet = this.otherSpecialDiet
        // }
        let canAdd = false;
        switch (this.currentChild) {
          case 1:
            if(this.$refs.child1.lock){
              canAdd = this.checkFormData(this.child1)
            }else{
              canAdd = this.$refs.child1.lock
            }
            break;
          case 2:
            this.$refs.child2.setValueToForm();
            if(this.child2.fracturaPart == ''){
              this.child2.fracturaPart = '无'
            }
            canAdd = this.$refs.child2.lock
            break;
          case 3:
            canAdd = this.$refs.child3.lock
            break;
          case 4:
            this.$refs.child4.setValueToForm();
            canAdd = this.$refs.child4.lock
            // console.log(this.child5.otherSpecialDiet,'121')
            break;
          case 5:
            // console.log(this.otherSpecialDiet , this.child5.otherSpecialDiet,'111')
            // if(this.otherSpecialDiet != this.child5.otherSpecialDiet){
            //   this.child5.otherSpecialDiet = this.otherSpecialDiet
            // }
            // console.log(this.child5.otherSpecialDiet,'122')
            this.$refs.child5.setValueToForm();
            canAdd = this.$refs.child5.lock
            break;
          case 6:
            this.$refs.child6.setValueToForm();
            canAdd = this.$refs.child6.lock
            break;
        }
        let obj
        let form = {}
        if(this.currentChild===1){
          obj = Object.assign(this.child1)
        }else if(this.currentChild===2){
          obj = Object.assign(this.child2)
        }else if(this.currentChild===3){
          obj = Object.assign(this.child3)
        }else if(this.currentChild===4){
          obj = Object.assign(this.child4)
        }else if(this.currentChild===5){
          obj = Object.assign(this.child5)
        }else if(this.currentChild===6){
          obj = Object.assign(this.child6)
        }
        if (canAdd && this.currentChild < 7) {
          this.currentChild++
        }
          // let obj = Object.assign({}, this.child1, this.child2, this.child3, this.child4, this.child5, this.child6)
          // let form = {}
          // if(!this.updataLock){
          //   this.updataLock=true
          // }
          for (let a in obj){
            if (obj[a] !== ''&& obj[a] !== null) {
              form[a] = obj[a]
            }else if(a=='workplaceContactPhone'||a=='workplace'||a=='workplaceContact'){
              form[a] = 'null'
            }else{
              form[a] = ''
            }
          }

          form.userId = this.customId
          form.nurseId = this.userId
          if(this.pushLock&&canAdd){
            this.doUserHealthFirstAssessmentAdd(form)
          }
      },

      //校验表格
      checkFormData(data) {
        let status = true
        let msg = ''
        for (let a in data) {
          if(a!='workplace'&&a!='workplaceContact'&&a!='workplaceContactPhone'){
            if (data[a] === '') {
              msg = '此表带*号为必填项'
            }
          }
          // console.log(a,data[a])
        }
        if (msg !== '') {
          status = false
          this.pushLock = false
          Toast({
            message: msg,
            position: 'bottom',
            duration: 2000
          });
        }else{
          this.pushLock = true
        }

        return status
      },

      //退一步
      previousStep() {
        if (this.currentChild > 1) {
          this.currentChild--
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .body {
    background: #F7F7F7;
    position: relative;
    float: left;
    width: 100%;
    min-height: 100%;
    > .header {
      width: inherit;
      height: 112px;
      > .go-back {
        width: 68px;
        height: 48px;
        position: absolute;
        top: 52px;
        left: 74px;
        color: #333333;
        font-size: 34px;
        line-height: 48px;
        font-weight: 400;
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
    }
    > .form-header {
      width: inherit;
      padding: 40px 32px;
      text-align: left;
      position: relative;
      h1 {
        font-size: 40px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 56px;
      }
      p {
        font-size: 28px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 40px;
      }
      span {
        position: absolute;
        right: 32px;
        bottom: 40px;
        font-size: 28px;
        font-weight: 400;
        color: rgba(98, 140, 253, 1);
        line-height: 40px;
      }
    }
    > .form-body {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      padding: 30px 32px 50px 32px;
    }
    > .form-btn {
      width: 690px;
      height: 80px;
      background: rgba(71, 189, 195, 1);
      border-radius: 10px;
      margin: 88px auto;
      padding-top: 20px;
      font-size: 30px;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 42px;
      text-align: center;
    }
  }
</style>

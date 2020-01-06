<template>
  <div class="form-content">
    <h1>综合评估</h1>
    <div class="content-card">
      <h2 style="padding-top: 0">(一)身体评估</h2>
      <h3>血压：</h3>
      <div class="flex">
        <div class="form-input">
          <span class="font3">收缩压/舒张压</span>
          <input style="width: 2.5rem;" @blur="validate(form.bloodPressur,'bloodPressur')" v-model="form.bloodPressur"/>
          <span class="font3">mmhg</span>
        </div>
      </div>
      <h3>脉搏/心率：</h3>
      <div class="form-input">
        <input style="width: 3rem;" @blur="validate(form.pluse,'pluse')" v-model="form.pluse"/>
        <span class="font3">次/分</span>
        <input type="radio" name="rhythm" v-model="form.rhythm" value="1" id="rhythm1"><label for="rhythm1" class="range-right"
                                                                         style="margin-left: 20px">规律</label>
        <input type="radio" name="rhythm" v-model="form.rhythm" value="0" id="rhythm2"><label for="rhythm2" class="range-right">不规律</label>
      </div>
      <h3>体温：</h3>
      <div class="form-input">
        <input style="width: 3rem;" @blur="validate(form.temperature,'temperature')" v-model="form.temperature"/>
        <span class="font3">℃</span>
        <input type="radio" name="temperaturePart" v-model="form.temperaturePart" value="1" id="temperaturePart1"><label for="temperaturePart1"
                                                                                          class="range-right"
                                                                                          style="margin-left: 10px">腋温</label>
        <input type="radio" name="temperaturePart" v-model="form.temperaturePart" value="2" id="temperaturePart2"><label for="temperaturePart2"
                                                                                          class="range-right">耳温</label>
        <input type="radio" name="temperaturePart" v-model="form.temperaturePart" value="3" id="temperaturePart3"><label for="temperaturePart3"
                                                                                          class="range-right">额温</label>
      </div>
      <h3>呼吸频率：</h3>
      <div class="form-input">
        <input style="width: 3rem;" @blur="validate(form.respiratoryRate,'respiratoryRate')" v-model="form.respiratoryRate"/>
        <span class="font3">次/分</span>
      </div>
      <h3>血氧饱和度：</h3>
      <div class="form-input">
        <input style="width: 3rem;" @blur="validate(form.oxygenSaturationOfBlood,'oxygenSaturationOfBlood')" v-model="form.oxygenSaturationOfBlood"/>
        <span class="font3">%</span>
      </div>
      <h3>血糖：</h3>
      <div class="form-input">
        <input style="width: 3rem;" @blur="validate(form.bloodGlucose,'bloodGlucose')" v-model="form.bloodGlucose"/>
        <span class="font3">mmol/L</span><br/>
        <input type="radio" name="bloodSampleTime" v-model="form.bloodSampleTime" value="1" id="bloodSampleTime1"><label for="bloodSampleTime1"
                                                                                          class="range-right"
                                                                                          style="margin-top: 10px">空腹</label>
        <input type="radio" name="bloodSampleTime" v-model="form.bloodSampleTime" value="2" id="bloodSampleTime2"><label for="bloodSampleTime2"
                                                                                          class="range-right"
                                                                                          style="margin-top: 10px">餐前</label>
        <input type="radio" name="bloodSampleTime" v-model="form.bloodSampleTime" value="3" id="bloodSampleTime3"><label for="bloodSampleTime3"
                                                                                          class="range-right"
                                                                                          style="margin-top: 10px">餐后</label>
        <div v-if="form.bloodSampleTime == 3" style="display: inline-block">
          <input style="width: 1rem;margin-top: 10px" @blur="validate(form.hours,'hours')" v-model="form.hours"  placeholder="餐后"/>
          <span class="font3" style="margin-top: 10px">小时</span>
        </div>
        <input type="radio" name="bloodSampleTime" v-model="form.bloodSampleTime" value="4" id="bloodSampleTime4"><label for="bloodSampleTime4"
                                                                                          class="range-right"
                                                                                          style="margin-top: 10px">随机</label>
      </div>
    </div>
    <div class="content-card">
      <div class="form-input">
        <span class="font2">个人卫生：</span>
        <input type="radio" name="personalHygiene" v-model="form.personalHygiene" value="1" id="personalHygiene1"><label for="personalHygiene1"
                                                                                          class="range-right">好</label>
        <input type="radio" name="personalHygiene" v-model="form.personalHygiene" value="2" id="personalHygiene2"><label for="personalHygiene2"
                                                                                          class="range-right">有异味</label>
        <input type="radio" name="personalHygiene" v-model="form.personalHygiene" value="3" id="personalHygiene3"><label for="personalHygiene3"
                                                                                          class="range-right">未清洁</label>
      </div>
      <div class="form-input">
        <span class="font2">总体情况：</span>
        <input type="radio" name="overallSituation" v-model="form.overallSituation" value="1" id="overallSituation1"><label for="overallSituation1"
                                                                                            class="range-right">好</label>
        <input type="radio" name="overallSituation" v-model="form.overallSituation" value="2" id="overallSituation2"><label for="overallSituation2"
                                                                                            class="range-right">满意</label>
        <input type="radio" name="overallSituation" v-model="form.overallSituation" value="3" id="overallSituation3"><label for="overallSituation3"
                                                                                            class="range-right">一般</label>
        <input type="radio" name="overallSituation" v-model="form.overallSituation" value="4" id="overallSituation4"><label for="overallSituation4"
                                                                                            class="range-right">差</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "child-three",
    props: ['child'],
    data() {
      return {
        lock:true,
        form: {
          
        }
      }
    },
    methods:{
      validate(data,type){
        const regex = /^[0-9]*$/
        if(type == 'bloodPressur' ||  type == "pluse"){
          if(data.split('/').length == 2&&data!=''){
            if(Number(data.split('/')[0])<0||
               Number(data.split('/')[0])>200||
               Number(data.split('/')[1])<0||
               Number(data.split('/')[1])>200){
              this.form[type] = ''
              this.$toast('输入信息有误')
              this.lock = false
            }else if( !Number(data.split('/')[0])|| !Number(data.split('/')[1])){
              this.form[type] = ''
              this.$toast('输入信息有误')
              this.lock = false
            }
          }else if(data!=''){
            this.form[type] = ''
            this.$toast('输入信息有误')
            this.lock = false
          }
        }else{
          if(!Number(data)&&data!=''){
            this.form[type] = ''
            this.$toast('输入信息有误')
            this.lock = false
          }
          if(data<0||data>100){
            this.form[type] = ''
            this.$toast('输入信息有误')
            this.lock = false
          }
          console.log(type)
          if(!regex.test(data)&&type !='bloodGlucose'&&type != 'temperature'){
            this.form[type] = ''
            this.$toast('输入信息有误')
            this.lock = false
          }
        }
        let self = this
        setTimeout(function(){
          self.lock = true
        },1500)
      },

    },
    mounted() {
      this.form = this.child
    },
  }
</script>

<style lang="less" scoped>
  @import "child";
</style>

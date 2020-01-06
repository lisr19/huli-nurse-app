<template>
  <div class="form-content">
    <h1>基本情况</h1>
    <div class="content-card">
      <div class="flex">
        <div>
          <div class="form-input">
            <span class="font1">姓名*</span>
            <input style="width: 3rem;" disabled="disabled" @blur="validateName(form.name,'name')" v-model="form.name"/>
          </div>
          <div class="form-input" @click="handlerOpen">
            <span class="font1">年龄*</span>
            <input style="width: 3rem;" disabled="disabled" v-model="form.birthday"/>
          </div>
        </div>
        <div>
          <div class="form-input flex">
            <span class="font1">性别*</span>
            <input type="radio" disabled="disabled" v-model="form.gender" name="gender" value="1" id="man"><label for="man" style="font-size: 0.43rem">男</label>
            <input type="radio" disabled="disabled" v-model="form.gender" name="gender" value="2" id="woman"><label for="woman" style="font-size: 0.43rem">女</label>
          </div>
          <div class="form-input">
            <span class="font1">民族*</span>
            <input style="width: 3rem;" @blur="validateName(form.nationality,'nationality')" v-model="form.nationality"/>
          </div>
        </div>
      </div>
      <div class="form-input">
        <span class="font1">婚姻*</span>
        <input type="radio" name="maritalStatus" v-model="form.maritalStatus" value="0" id="maritalStatus0"><label for="maritalStatus0" class="range-right">未婚</label>
        <input type="radio" name="maritalStatus" v-model="form.maritalStatus" value="1" id="maritalStatus1"><label for="maritalStatus1" class="range-right">已婚</label>
        <input type="radio" name="maritalStatus" v-model="form.maritalStatus" value="2" id="maritalStatus2"><label for="maritalStatus2" class="range-right">离异</label>
        <input type="radio" name="maritalStatus" v-model="form.maritalStatus" value="3" id="maritalStatus3"><label for="maritalStatus3" class="range-right">丧偶</label>
      </div>
    </div>
    <div class="content-card">
      <div class="form-input">
        <span class="font1" style="width: 2rem">住所地址*</span>
        <textarea style="width: 6.9rem" maxlength="100" rows="2" v-model="form.residenceAddress"></textarea>
      </div>
      <div class="form-input">
        <span class="font1" style="width: 2rem">联系人*</span>
        <input style="width: 3rem;" @blur="validateName(form.residenceContact,'residenceContact')" v-model="form.residenceContact"/>
      </div>
      <div class="form-input">
        <span class="font1">联系人电话*</span>
        <input style="width: 5rem;" @blur="validatePhone(form.residenceContactPhone,'residenceContactPhone')" v-model="form.residenceContactPhone"/>
      </div>
      <h2>与用户关系*</h2>
      <div class="form-input">
        <input type="radio" name="relation" v-model="form.relation" value="1" id="relation1"><label for="relation1" class="range-right">夫妻</label>
        <input type="radio" name="relation" v-model="form.relation" value="2" id="relation2"><label for="relation2" class="range-right">子女</label>
        <input type="radio" name="relation" v-model="form.relation" value="3" id="relation3"><label for="relation3" class="range-right">亲属</label>
        <input type="radio" name="relation" v-model="form.relation" value="4" id="relation4"><label for="relation4" class="range-right">保姆</label>
        <input type="radio" name="relation" v-model="form.relation" value="5" id="relation5"><label for="relation5" class="range-right">同事</label>
        <input type="radio" name="relation" v-model="form.relation" value="6" id="relation6"><label for="relation6" class="range-right">其他</label>
      </div>
    </div>
    <div class="content-card">
      <div class="form-input">
        <span class="font1" style="width: 2rem">工作单位</span>
        <textarea style="width: 6.9rem" maxlength="100" rows="2" v-model="form.workplace"></textarea>
      </div>
      <div class="form-input">
        <span class="font1" style="width: 2rem">联系人</span>
        <input style="width: 3rem;" @blur="validateName(form.workplaceContact,'workplaceContact')" v-model="form.workplaceContact"/>
      </div>
      <div class="form-input">
        <span class="font1">联系人电话</span>
        <input style="width: 5rem;" @blur="validatePhone(form.workplaceContactPhone,'workplaceContactPhone')" v-model="form.workplaceContactPhone"/>
      </div>
    </div>
    <div class="content-card">
      <h2>工作状况*</h2>
      <div class="form-input flex">
        <input type="radio"  v-model="form.workStatus" name="workStatus" value="1" id="zaizhi"><label for="zaizhi">在职</label>
        <input type="radio" name="workStatus" v-model="form.workStatus" value="2" id="tuixiu"><label for="tuixiu">退休</label>
        <input type="radio" name="workStatus" v-model="form.workStatus" value="3" id="lixiu"><label for="lixiu">离休</label>
        <input type="radio" name="workStatus" v-model="form.workStatus" value="4" id="qitagongzuo"><label for="qitagongzuo">其他</label>
      </div>
      <h2>医疗付费方式*</h2>
      <div class="form-input" style="padding-bottom: 0">
        <input type="radio" v-model="form.medicalPaymentMethod" name="medicalPaymentMethod" value="1" id="shehui"><label for="shehui"
                                                                                                       class="range-right">社会基本医疗</label>
        <input type="radio" v-model="form.medicalPaymentMethod" name="medicalPaymentMethod" value="2" id="gongfei"><label for="gongfei" class="range-right">公费医疗</label>
        <input type="radio" v-model="form.medicalPaymentMethod" name="medicalPaymentMethod" value="3" id="dabing"><label for="dabing" class="range-right">大病统筹</label>
        <input type="radio" v-model="form.medicalPaymentMethod" name="medicalPaymentMethod" value="4" id="zifei"><label for="zifei"
                                                                                    class="range-right">自费医疗</label>
        <input type="radio" v-model="form.medicalPaymentMethod" name="medicalPaymentMethod" value="5" id="jundui"><label for="jundui" class="range-right">军队医疗</label>
        <input type="radio" v-model="form.medicalPaymentMethod" name="medicalPaymentMethod" value="6" id="qitayiliao"><label for="qitayiliao"
                                                                                         class="range-right">其他</label>
      </div>
    </div>

    <mt-datetime-picker
      ref="picker"
      type="date"
      :startDate="startDate"
      :endDate="endDate"
      @confirm=confirmDate
      >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import utils from '../../../utils/utils';
  export default {
    name: "child-one",
    props:['child'],
    data() {
      return {
        startDate: new Date('1920-01-01'),
        endDate: new Date(),
        form:{},
        lock:true,
      }
    },
    mounted(){
      this.form = this.child
    },
    methods:{
      handlerOpen(){
        this.$refs.picker.open()
      },
      confirmDate(val) {
        this.$set(this.form, 'birthday', utils.formatDate(val, 'yyyy-MM-dd'))
      },
      validatePhone(phone,item) {
        let msg = '';
        const regexI = /^1[345789][0-9]{9}$/;
        const regexII = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
        if(phone){
          if(!regexI.test(phone)&&!regexII.test(phone)){
            msg = '号码有误'
            this.$toast(msg)
            this.form[item]=''
            this.lock = false
          }
        }
        let self = this
        setTimeout(function(){
          self.lock = true
        },1500)
      },
      validateName(item,data){
        const regex1 = /^[\u4e00-\u9fa5]+$/;
        const regex2 = /^[\u4e00-\u9fa5_a-zA-Z]+$/;
        if(data == 'nationality'){
          if(!regex1.test(item)&&item){
            this.form[data]=''
            this.$toast('请输入合法内容')
            this.lock = false
          }
        }else{
          if(!regex2.test(item)&&item){
            this.form[data]=''
            this.$toast('请输入合法内容')
            this.lock = false
          }
        }
        let self = this
        setTimeout(function(){
          self.lock = true
        },1500)
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "child";
</style>

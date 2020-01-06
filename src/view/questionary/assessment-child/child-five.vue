<template>
  <div class="form-content">
    <div class="content-card" style="padding-top: 0">
      <h2>(六)认知能力：</h2>
      <div class="form-input">
        <input type="radio" name="cognitiveAbility" v-model="form.cognitiveAbility" value="0"
               id="cognitiveAbility0"><label for="cognitiveAbility0"
                                             class="range-right">无</label>
        <input type="radio" name="cognitiveAbility" v-model="form.cognitiveAbility" value="1"
               id="cognitiveAbility1"><label for="cognitiveAbility1"
                                             class="range-right">有</label>
      </div>

      <div v-if="form.cognitiveAbility == '1'">
        <!--认知能力为有时填写-->
        <h3>短期记忆：</h3>
        <div class="form-input">
          <input type="radio" name="shortTermMemory" v-model="form.shortTermMemory" value="0"
                 id="shortTermMemory0"><label for="shortTermMemory0"
                                              class="range-right">不能确定</label>
          <input type="radio" name="shortTermMemory" v-model="form.shortTermMemory" value="1"
                 id="shortTermMemory1"><label for="shortTermMemory1"
                                              class="range-right">未受损</label>
          <input type="radio" name="shortTermMemory" v-model="form.shortTermMemory" value="2"
                 id="shortTermMemory2"><label for="shortTermMemory2"
                                              class="range-right">受损</label>
        </div>
        <!--认知能力为有时填写-->
        <h3>长期记忆：</h3>
        <div class="form-input">
          <input type="radio" name="longTermMemory" v-model="form.longTermMemory" value="0" id="longTermMemory0"><label
          for="longTermMemory0"
          class="range-right">不能确定</label>
          <input type="radio" name="longTermMemory" v-model="form.longTermMemory" value="1" id="longTermMemory1"><label
          for="longTermMemory1"
          class="range-right">未受损</label>
          <input type="radio" name="longTermMemory" v-model="form.longTermMemory" value="2" id="longTermMemory2"><label
          for="longTermMemory2"
          class="range-right">受损</label>
        </div>
      </div>
    </div>
    <div class="content-card">
      <h2>(七)功能&活动能力：</h2>
      <h3>活动能力：</h3>
      <div class="form-input">
        <input type="radio" name="mobility" v-model="form.mobility" value="1" id="mobility1"><label for="mobility1"
                                                                                                    class="range-right">自理</label>
        <input type="radio" name="mobility" v-model="form.mobility" value="2" id="mobility2"><label for="mobility2"
                                                                                                    class="range-right">卧床</label>
        <input type="radio" name="mobility" v-model="form.mobility" value="3" id="mobility3"><label for="mobility3"
                                                                                                    class="range-right">轮椅</label>
        <input type="radio" name="mobility" v-model="form.mobility" value="4" id="mobility4"><label for="mobility4"
                                                                                                    class="range-right">行走需要辅助工具</label>
      </div>
      <!--行走辅助工具，活动能力为4时填写-->
      <div class="form-input" v-if="form.mobility == '4'">
        <span class="font2">（</span>
        <input type="radio" name="auxiliaryWalk" v-model="form.auxiliaryWalk" value="1" id="auxiliaryWalk1"><label
        for="auxiliaryWalk1"
        class="range-right">拐杖</label>
        <input type="radio" name="auxiliaryWalk" v-model="form.auxiliaryWalk" value="2" id="auxiliaryWalk2"><label
        for="auxiliaryWalk2"
        class="range-right">三脚架</label>
        <input type="radio" name="auxiliaryWalk" v-model="form.auxiliaryWalk" value="3" id="auxiliaryWalk3"><label
        for="auxiliaryWalk3"
        class="range-right">四脚架</label>
        <input type="radio" name="auxiliaryWalk" v-model="form.auxiliaryWalk" value="4" id="auxiliaryWalk4"><label
        for="auxiliaryWalk4"
        class="range-right">行走架</label>
        <input type="radio" name="auxiliaryWalk" v-model="form.auxiliaryWalk" value="5" id="auxiliaryWalk5"><label
        for="auxiliaryWalk5"
        class="range-right">其他</label>
        <!--行走辅助工具其他，行走辅助工具为5时填写-->
        <div v-if="form.auxiliaryWalk == '5'">
          <span class="font1">其他</span>
          <input style="width: 3rem;" placeholder="行走辅助工具" v-model="form.auxiliaryWalkOther"/>
          <span class="font2">）</span>
        </div>
      </div>
    </div>
    <div class="content-card">
      <h3>ADL自理能力：</h3>
      <div class="form-input">
        <input type="radio" name="adl" v-model="form.adl" value="1" id="adl1"><label for="adl1"
                                                                                     class="range-right">自理</label>
        <input type="radio" name="adl" v-model="form.adl" value="2" id="adl2"><label for="adl2"
                                                                                     class="range-right">轻度依赖</label>
        <input type="radio" name="adl" v-model="form.adl" value="3" id="adl3"><label for="adl3"
                                                                                     class="range-right">完全依赖</label>
        <input type="radio" name="adl" v-model="form.adl" value="4" id="adl4"><label for="adl4"
                                                                                     class="range-right">严重依赖</label>
      </div>
    </div>
    <div class="content-card">
      <h3>肌肉能力：</h3>
      <div class="form-input">
        <span class="font2">右上肢肌力1/2/3/4/5</span>
        <input @blur="validateLimb(form.rightUpperLimb,'rightUpperLimb')" style="width: 1.5rem;" type="number" v-model="form.rightUpperLimb"/>
      </div>
      <div class="form-input">
        <span class="font2">右下肢肌力1/2/3/4/5</span>
        <input @blur="validateLimb(form.rightLowerLimb,'rightLowerLimb')" style="width: 1.5rem;" type="number" v-model="form.rightLowerLimb"/>
      </div>
      <div class="form-input">
        <span class="font2">左上肢肌力1/2/3/4/5</span>
        <input @blur="validateLimb(form.leftUpperLimb,'leftUpperLimb')" style="width: 1.5rem;" type="number" v-model="form.leftUpperLimb"/>
      </div>
      <div class="form-input">
        <span class="font2">左下肢肌力1/2/3/4/5</span>
        <input @blur="validateLimb(form.leftLowerLimb,'leftLowerLimb')" style="width: 1.5rem;" type="number" v-model="form.leftLowerLimb"/>
      </div>
    </div>
    <div class="content-card">
      <h3>半年内的跌倒情况：</h3>
      <div class="form-input">
        <input type="radio" name="falls" v-model="form.falls" value="0" id="falls0"><label for="falls0"
                                                                                           class="range-right">无</label>
        <input type="radio" name="falls" v-model="form.falls" value="1" id="falls1"><label for="falls1"
                                                                                           class="range-right">有</label>
      </div>
    </div>
    <div class="content-card">
      <h3>体型：</h3>
      <div class="form-input">
        <input type="radio" name="shape" v-model="form.shape" value="1" id="shape1"><label for="shape1"
                                                                                           class="range-right">正常</label>
        <input type="radio" name="shape" v-model="form.shape" value="2" id="shape2"><label for="shape2"
                                                                                           class="range-right">肥胖</label>
        <input type="radio" name="shape" v-model="form.shape" value="3" id="shape3"><label for="shape3"
                                                                                           class="range-right">瘦</label>
        <input type="radio" name="shape" v-model="form.shape" value="4" id="shape4"><label for="shape4"
                                                                                           class="range-right">消瘦</label>
      </div>
      <div class="form-input">
        <span class="font2">体重</span>
        <input type="number" @blur="validate(weight,'weight')" style="width: 2rem;" v-model="weight"/>
        <span class="font3">KG</span>

        <span class="font2" style="margin-left: 20px">身高</span>
        <input type="number"  @blur="validate(height,'height')" style="width: 2rem;" v-model="height"/>
        <span class="font3">M</span>
      </div>
      <div class="form-input">
        <span class="font2">bmi</span>
        <input style="width: 2rem;" type="number" v-model="form.bmi" disabled="=disabled"/>
        <span class="font3">kg/m2</span>

        <span class="font2" style="margin-left: 20px">腰臀比</span>
        <input type="number" style="width: 2rem;" @blur="validate(form.waistHipRatio,'waistHipRatio')" v-model="form.waistHipRatio"/>
      </div>
    </div>
    <div class="content-card">
      <h3>3个月内体重变化：</h3>
      <div class="form-input">
        <input type="radio" name="weightChange" v-model="form.weightChange" value="0" id="weightChange0"><label
        for="weightChange0"
        class="range-right">不能确定</label>
        <input type="radio" name="weightChange" v-model="form.weightChange" value="1" id="weightChange1"><label
        for="weightChange1"
        class="range-right">无</label>
        <input type="radio" name="weightChange" v-model="form.weightChange" value="2" id="weightChange2"><label
        for="weightChange2"
        class="range-right">增加</label>
        <input type="radio" name="weightChange" v-model="form.weightChange" value="3" id="weightChange3"><label
        for="weightChange3"
        class="range-right">减少</label>
      </div>
      <!--体重变化值（KG），体重变化为2或3时填写-->
      <div class="form-input" v-if="form.weightChange == '2' || form.weightChange == '3'">
        <span class="font2">体重变化值</span>
        <input style="width: 2rem;" @blur="validate(form.weightChangeValue,'weightChangeValue')" v-model="form.weightChangeValue"/>
        <span class="font3">KG</span>
      </div>
    </div>
    <div class="content-card">
      <h3>经口进食困难：</h3>
      <div class="form-input">
        <input type="radio" name="oralFeeding" v-model="form.oralFeeding" value="0" id="oralFeeding0"><label
        for="oralFeeding0"
        class="range-right">无</label>
        <input type="radio" name="oralFeeding" v-model="form.oralFeeding" value="1" id="oralFeeding1"><label
        for="oralFeeding1"
        class="range-right">有</label>
      </div>
    </div>
    <div class="content-card">
      <h3>特殊饮食：（多选）</h3>
      <div class="form-input">
        <input type="checkbox" name="specialDiet" value="无" @click="setValue('specialDiet','无')" id="specialDiet0"><label
        for="specialDiet0"
        class="range-right">无</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','避免')" id="specialDiet1"><label
        for="specialDiet1"
        class="range-right">避免</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','糖尿病饮食')" id="specialDiet2"><label
        for="specialDiet2"
        class="range-right">糖尿病饮食</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','低蛋白饮食')" id="specialDiet3"><label
        for="specialDiet3"
        class="range-right">低蛋白饮食</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','低盐饮食')" id="specialDiet4"><label
        for="specialDiet4"
        class="range-right">低盐饮食</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','低磷饮食')" id="specialDiet5"><label
        for="specialDiet5"
        class="range-right">低磷饮食</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','低脂饮食')" id="specialDiet6"><label
        for="specialDiet6"
        class="range-right">低脂饮食</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','高纤维饮食')" id="specialDiet7"><label
        for="specialDiet7"
        class="range-right">高纤维饮食</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','低胆固醇饮食')" id="specialDiet8"><label
        for="specialDiet8"
        class="range-right">低胆固醇饮食</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','低嘌呤饮食')" id="specialDiet9"><label
        for="specialDiet9"
        class="range-right">低嘌呤饮食</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','素食主义者')" id="specialDiet10"><label
        for="specialDiet10"
        class="range-right">素食主义者</label>
        <input type="checkbox" name="specialDiet" @click="setValue('specialDiet','其他特殊饮食')" id="specialDiet11"><label
        for="specialDiet11"
        class="range-right">其他特殊饮食</label>
      </div>
      <div v-show="specialDiet.indexOf('避免') !== -1">
        <h3>避免饮食：（多选）</h3>
        <div class="form-input">
          <!--特殊饮食包含“避免”时填写-->
          <input type="checkbox" name="avoidFoods" @click="setValue('avoidFoods','牛肉')" id="avoidFoods0"><label
          for="avoidFoods0"
          class="range-right">牛肉</label>
          <input type="checkbox" name="avoidFoods" @click="setValue('avoidFoods','猪肉')" id="avoidFoods1"><label
          for="avoidFoods1"
          class="range-right">猪肉</label>
          <input type="checkbox" name="avoidFoods" @click="setValue('avoidFoods','鱼肉')" id="avoidFoods2"><label
          for="avoidFoods2"
          class="range-right">鱼肉</label>
          <input type="checkbox" name="avoidFoods" @click="setValue('avoidFoods','牛奶')" id="avoidFoods3"><label
          for="avoidFoods3"
          class="range-right">牛奶</label>
          <input type="checkbox" name="avoidFoods" @click="setValue('avoidFoods','海鲜')" id="avoidFoods4"><label
          for="avoidFoods4"
          class="range-right">海鲜</label>
          <input type="checkbox" name="avoidFoods" @click="setValue('avoidFoods','酒')" id="avoidFoods5"><label
          for="avoidFoods5"
          class="range-right">酒</label>
          <input type="checkbox" name="avoidFoods" @click="setValue('avoidFoods','香料')" id="avoidFoods6"><label
          for="avoidFoods6"
          class="range-right">香料</label>
          <input type="checkbox" name="avoidFoods" @click="setValue('avoidFoods','其他')" id="avoidFoods7"><label
          for="avoidFoods7"
          class="range-right">其他</label>
          <div v-if="avoidFoods.indexOf('其他') !== -1">
            <span class="font1">其他</span>
            <input style="width: 8rem;" v-model="form.otherAvoidFoods"/>
          </div>
        </div>
      </div>
      <div v-show="specialDiet.indexOf('糖尿病饮食') !== -1">
        <h3>糖尿病饮食：</h3>
        <div class="form-input">
          <!--特殊饮食包含“糖尿病饮食”时填写-->
          <input type="radio" name="diabetesDiet" v-model="form.diabetesDiet" value="1" id="diabetesDiet1"><label
          for="diabetesDiet1"
          class="range-right">1500KCal/日</label>
          <input type="radio" name="diabetesDiet" v-model="form.diabetesDiet" value="2" id="diabetesDiet2"><label
          for="diabetesDiet2"
          class="range-right">1800KCal/日</label>
        </div>
      </div>
      <div v-show="specialDiet.indexOf('低蛋白饮食') !== -1">
        <h3>低蛋白饮食：</h3>
        <div class="form-input">
          <!--特殊饮食包含“低蛋白饮食”时填写-->
          <input type="radio" name="lowProteinDiet" v-model="form.lowProteinDiet" value="1" id="lowProteinDiet1"><label
          for="lowProteinDiet1"
          class="range-right">40gm</label>
          <input type="radio" name="lowProteinDiet" v-model="form.lowProteinDiet" value="2" id="lowProteinDiet2"><label
          for="lowProteinDiet2"
          class="range-right">60gm</label>
          <input type="radio" name="lowProteinDiet" v-model="form.lowProteinDiet" value="3" id="lowProteinDiet3"><label
          for="lowProteinDiet3"
          class="range-right">80gm</label>
          <input type="radio" name="lowProteinDiet" v-model="form.lowProteinDiet" value="4" id="lowProteinDiet4"><label
          for="lowProteinDiet4"
          class="range-right">HBV</label>
        </div>
      </div>
      <div v-show="specialDiet.indexOf('其他特殊饮食') !== -1">
        <h3>其他特殊饮食：</h3>
        <div class="form-input">
          <!--特殊饮食包含“其他”时填写-->
          <input style="width: 100%;" v-model="form.otherSpecialDiet"/>
        </div>
      </div>
    </div>
    <div class="content-card">
      <h3>脱水症状：</h3>
      <div class="form-input">
        <input type="radio" name="dehydration" v-model="form.dehydration" value="0" id="dehydration0"><label
        for="dehydration0"
        class="range-right">无</label>
        <input type="radio" name="dehydration" v-model="form.dehydration" value="1" id="dehydration1"><label
        for="dehydration1"
        class="range-right">有</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "child-five",
    components: {},
    props: ['child'],
    watch: {
      weight: {
        handler(newVal) {
          let reg = new RegExp('^[0-9]+(.[0-9]{0,3})?$')
          if (reg.test(newVal) && reg.test(this.height)) {
            let he = this.height
            this.form.bmi = (this.weight /(he * he)).toFixed(2)
          }
        }
      },
      height: {
        handler(newVal) {
          let reg = new RegExp('^[0-9]+(.[0-9]{0,3})?$')
          if (reg.test(newVal) && reg.test(this.weight)) {
            let he = this.height
            this.form.bmi = (this.weight /(he * he)).toFixed(2)
          }
        }
      }
    },
    data() {
      return {
        lock:true,
        form: {},
        specialDiet: [],
        avoidFoods: [],
        weight: '',
        height: '',
      }
    },
    mounted() {
      console.log(this.child.otherSpecialDiet)
      // if(this.child.otherSpecialDiet != this.otherSpecialDiet){
      //   this.child.otherSpecialDiet = this.otherSpecialDiet
      // }
      // console.log(this.child.otherSpecialDiet)
      this.form = this.child
      this.weight = this.form.weight
      this.height = this.form.height
      // console.log(this.form)
      this.dispose('specialDiet')
      if(this.form.avoidFoods){
        this.dispose('avoidFoods')
      }
    },
    methods: {
      setValue(key, val) {
        // console.log(key,val)
        switch (key) {
          case 'specialDiet':
            if (val == '无'){
              this.specialDiet = ['无']
              this.avoidFoods = []
              this.form.otherSpecialDiet = '无'
              this.form.otherAvoidFoods = '无'
              let btn = document.getElementsByTagName('input')
              for(let i=0;i<btn.length;i++){
                if((btn[i].getAttribute('name')=='specialDiet'||
                    btn[i].getAttribute('name')=='avoidFoods')&&
                    btn[i].getAttribute('value')!=='无'){
                  btn[i].checked = false
                }
              }
            }else if (!this.specialDiet.includes(val)) {
              if(this.specialDiet.includes('无')){
                this.specialDiet.splice(this.specialDiet.indexOf('无'), 1)
                let btn = document.getElementsByTagName('input')
                for(let i=0;i<btn.length;i++){
                  if((btn[i].getAttribute('name')=='specialDiet'||
                      btn[i].getAttribute('name')=='avoidFoods')&&
                      btn[i].getAttribute('value')==='无'){
                    btn[i].checked = false
                  }
                }
              }
              this.specialDiet.push(val)
            } else {
              this.specialDiet.splice(this.specialDiet.indexOf(val), 1)
            }
            break;
          case 'avoidFoods':
            if (!this.avoidFoods.includes(val)) {
              this.avoidFoods.push(val)
            } else {
              this.avoidFoods.splice(this.avoidFoods.indexOf(val), 1)
            }
            break;
        }
      },
      dispose(item){
        let list = this.form[item].split(',')
        console.log(list)
        for(let i=0;i<list.length;i++){
          this.setValue(item,list[i])
        }
        let btn = document.getElementsByTagName('input')
        let typeList = []
        for(let i=0;i<this[item].length;i++){
          let typeIndex = 0
          let typeLength = 0
          for(let l=0;l<btn.length;l++){
            if(btn[l].getAttribute('name')==item){
              typeLength++
              if(this[item][i]==btn[l].nextSibling.innerText){
                btn[l].checked = true
              }else{
                typeIndex++
              }
            }
          }
          if(typeIndex == typeLength){
            typeList.push(this[item][i])
            let name = 'other'+(item[0].toUpperCase())+(item.substr(1))
            this.form[name] = typeList.join()
          }
        }
      },
      setValueToForm() {
        this.form.height = this.height
        this.form.weight = this.weight
        this.form.specialDiet = this.specialDiet.join(',')
        this.form.avoidFoods = this.avoidFoods.join(',')
        console.log(this.form)
      },
      validateLimb(data,type){
        if((Number(data)||data==0)&&data!=''){
          if(Number(data)!==5&&
              Number(data)!==4&&
              Number(data)!==3&&
              Number(data)!==2&&
              Number(data)!==1){
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
      validate(data,type){
        if((Number(data)||data==0)&&data!=''){
	        if(type=='weight'){
		        if(Number(data)<10||Number(data)>300){
			        this[type] = ''
              this.$toast('体重只能10~300')
              this.lock = false
		        }
	        }else if(type=='height'){
		        if(Number(data)<0.5||Number(data)>3){
			        this[type] = ''
              this.$toast('身高只能0.5M~3M')
              this.lock = false
		        }
          }else if(type=='waistHipRatio'){
            if(Number(data)<0||Number(data)>10){
			        this.form[type] = ''
              this.$toast('腰臀比只能输入0.1~10')
              this.lock = false
		        }
          }else{
		        if(Number(data)<=0||Number(data)>300){
			        if(type =='weightChangeValue'){
				        this.form[type]=''
			        }else{
				        this[type] = ''
			        }
              this.$toast('输入信息有误')
              this.lock = false
		        }
	        }
        }else{
          if(this[type]){
            this[type] = ''
          }else if(this.form[type]){
            this.form[type]=''
          }
          this.$toast('输入信息有误')
          this.lock = false
        }
        let self = this
        setTimeout(function(){
          self.lock = true
        },1500)
      },
      // 其他验证
      // validateName(item,data){
      //   const regex = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
      //   if(!regex.test(item)&&item){
      //     this.form[data]=''
      //     this.$toast('请输入合法内容')
      //     this.lock = false
      //   }else if(!item){
      //     this.form[data]=''
      //   }
      //   let self = this
      //   setTimeout(function(){
      //     self.lock = true
      //   },1500)
      // },
    },
  }
</script>

<style lang="less" scoped>
  @import "child";
</style>

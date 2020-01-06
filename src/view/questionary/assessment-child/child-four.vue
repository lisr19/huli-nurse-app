<template>
  <div class="form-content">
    <div class="content-card">
      <h2>(二)意识状态评估</h2>
      <div class="form-input">
        <input type="radio" name="consciousness" v-model="form.consciousness" value="1" id="consciousness1"><label
        for="consciousness1"
        class="range-right">清醒</label>
        <input type="radio" name="consciousness" v-model="form.consciousness" value="2" id="consciousness2"><label
        for="consciousness2"
        class="range-right">意识模糊</label>
        <input type="radio" name="consciousness" v-model="form.consciousness" value="3" id="consciousness3"><label
        for="consciousness3"
        class="range-right">嗜睡</label>
        <input type="radio" name="consciousness" v-model="form.consciousness" value="4" id="consciousness4"><label
        for="consciousness4"
        class="range-right">昏睡</label>
        <input type="radio" name="consciousness" v-model="form.consciousness" value="5" id="consciousness5"><label
        for="consciousness5"
        class="range-right">浅昏迷</label>
        <input type="radio" name="consciousness" v-model="form.consciousness" value="6" id="consciousness6"><label
        for="consciousness6"
        class="range-right">深昏迷</label>
      </div>
    </div>
    <div class="content-card">
      <h2>(三)方言/沟通/感官</h2>
      <h3>语言和方言：(多选)</h3>
      <div class="form-input">
        <input type="checkbox" name="dialect" @click="setValue('dialect','不能确定')" id="dialect1"><label for="dialect1"
                                                                                                       class="range-right">不能确定</label>
        <input type="checkbox" name="dialect" @click="setValue('dialect','普通话')" id="dialect2"><label for="dialect2"
                                                                                                      class="range-right">普通话</label>
        <input type="checkbox" name="dialect" @click="setValue('dialect','广东话')" id="dialect3"><label for="dialect3"
                                                                                                      class="range-right">广东话</label>
        <input type="checkbox" name="dialect" @click="setValue('dialect','英语')" id="dialect4"><label for="dialect4"
                                                                                                     class="range-right">英语</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" v-model="dialectOther" />
      </div>
    </div>
    <div class="content-card">
      <h3>口头表达：</h3>
      <div class="form-input">
        <input type="radio" name="oral" v-model="form.oral" value="0" id="oral0"><label for="oral0" class="range-right">不能确定</label>
        <input type="radio" name="oral" v-model="form.oral" value="1" id="oral1"><label for="oral1" class="range-right">清楚</label>
        <input type="radio" name="oral" v-model="form.oral" value="2" id="oral2"><label for="oral2" class="range-right">含糊不清</label>
        <input type="radio" name="oral" v-model="form.oral" value="3" id="oral3"><label for="oral3" class="range-right">简单词语</label>
        <input type="radio" name="oral" v-model="form.oral" value="4" id="oral4"><label for="oral4" class="range-right">失语</label>
        <input type="radio" name="oral" v-model="form.oral" value="5" id="oral5"><label for="oral5" class="range-right">语言障碍</label>
        <input type="radio" name="oral" v-model="form.oral" value="6" id="oral6"><label for="oral6" class="range-right">辅助交流方式</label>
      </div>
      <div class="form-input">
        <!--辅助方式，口头表达为6时填写-->
        <div style="display: inline-block" v-if="form.oral == '6'">
          <span class="font1">(</span>
          <input type="radio" name="auxiliaryCommunicationMode" v-model="form.auxiliaryCommunicationMode" value="1"
                 id="auxiliaryCommunicationMode1"><label
          for="auxiliaryCommunicationMode1" class="range-right">手语</label>
          <input type="radio" name="auxiliaryCommunicationMode" v-model="form.auxiliaryCommunicationMode" value="2"
                 id="auxiliaryCommunicationMode2"><label
          for="auxiliaryCommunicationMode2" class="range-right">文字</label>
          <input type="radio" name="auxiliaryCommunicationMode" v-model="form.auxiliaryCommunicationMode" value="3"
                 id="auxiliaryCommunicationMode3"><label
          for="auxiliaryCommunicationMode3" class="range-right">其他</label>
          <span class="font1">)</span>
        </div>
      </div>
      <div class="form-input" style="padding-top: 0" v-if="form.oral == '6' && form.auxiliaryCommunicationMode == '3'">
        <!--其他辅助方式，口头表达为6时填写，且辅助方式为3时填写-->
        <span class="font1">其他</span>
        <input style="width: 3rem;" v-model="form.auxiliaryCommunication" placeholder="其他辅助方式"/>
      </div>
    </div>
    <div class="content-card">
      <h3>听力：</h3>
      <div class="form-input">
        <input type="radio" name="hearing" v-model="form.hearing" value="0" id="hearing0"><label for="hearing0"
                                                                                                 class="range-right">不能确定</label>
        <input type="radio" name="hearing" v-model="form.hearing" value="1" id="hearing1"><label for="hearing1"
                                                                                                 class="range-right">正常</label>
        <input type="radio" name="hearing" v-model="form.hearing" value="2" id="hearing2"><label for="hearing2"
                                                                                                 class="range-right">大声（右耳/左耳）</label>
        <input type="radio" name="hearing" v-model="form.hearing" value="3" id="hearing3"><label for="hearing3"
                                                                                                 class="range-right">助听器（右耳/左耳）</label>
        <input type="radio" name="hearing" v-model="form.hearing" value="4" id="hearing4"><label for="hearing4"
                                                                                                 class="range-right">漏听</label>
        <input type="radio" name="hearing" v-model="form.hearing" value="5" id="hearing5"><label for="hearing5"
                                                                                                 class="range-right">完全耳聋</label>
      </div>
    </div>
    <div class="content-card">
      <h2>(四)睡眠质量：</h2>
      <div class="form-input">
        <input type="radio" name="sleepQuality" v-model="form.sleepQuality" value="0" id="sleepQuality0"><label
        for="sleepQuality0"
        class="range-right">不能确定</label>
        <input type="radio" name="sleepQuality" v-model="form.sleepQuality" value="1" id="sleepQuality1"><label
        for="sleepQuality1"
        class="range-right">正常</label>
        <input type="radio" name="sleepQuality" v-model="form.sleepQuality" value="2" id="sleepQuality2"><label
        for="sleepQuality2"
        class="range-right">易醒</label>
        <input type="radio" name="sleepQuality" v-model="form.sleepQuality" value="3" id="sleepQuality3"><label
        for="sleepQuality3"
        class="range-right">失眠</label>
      </div>
      <div class="form-input">
        <div style="display: inline-block">
          <input type="radio" name="sleepQuality" v-model="form.sleepQuality" value="4" id="sleepQuality4"><label
          for="sleepQuality4"
          class="range-right">服用安眠药</label>
          <!--服用安眠药频次，睡眠质素为4时填写-->
          <div style="display: inline-block" v-if="form.sleepQuality == '4'">
            <span class="font1">(</span>
            <input type="radio" name="frequency" v-model="form.frequency" value="1" id="frequency1"><label
            for="frequency1"
            class="range-right">偶尔</label>
            <input type="radio" name="frequency" v-model="form.frequency" value="2" id="frequency2"><label
            for="frequency2"
            class="range-right">经常</label>
            <span class="font1">)</span>
          </div>

        </div>
      </div>
      <div class="form-input" style="padding-top: 0" v-if="form.sleepQuality == '4'">
        <!--安眠药名称，睡眠质素为4时填写-->
        <span class="font1">安眠药名称</span>
        <input style="width: 3rem;" @blur="validateName(form.drugName,'drugName')" v-model="form.drugName"/>
      </div>
    </div>
    <div class="content-card">
      <h2>(五)调适能力：</h2>
      <div class="form-input">
        <input type="radio" name="adaptability" v-model="form.adaptability" value="0" id="adaptability0"><label
        for="adaptability0"
        class="range-right">不能确定</label>
        <input type="radio" name="adaptability" v-model="form.adaptability" value="1" id="adaptability1"><label
        for="adaptability1"
        class="range-right">正常</label>
        <input type="radio" name="adaptability" v-model="form.adaptability" value="2" id="adaptability2"><label
        for="adaptability2"
        class="range-right">其他</label>
      </div>
      <h2>适应能力评估：</h2>
      <div class="form-input">
        <input type="radio" name="adaptability1" v-model="form.adaptability1" value="0" id="adaptability10"><label
        for="adaptability10"
        class="range-right">不能确定</label>
        <input type="radio" name="adaptability1" v-model="form.adaptability1" value="1" id="adaptability11"><label
        for="adaptability11"
        class="range-right">正常</label>
        <input type="radio" name="adaptability1" v-model="form.adaptability1" value="2" id="adaptability12"><label
        for="adaptability12"
        class="range-right">其他</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "child-four",
    props: ['child'],
    data() {
      return {
        lock:true,
        form: {},
        dialect: [],
        dialectOther: '',
      }
    },
    mounted() {
      this.form = this.child
      this.dispose()
    },
    methods: {
      setValue(key, val) {
        switch (key) {
          case 'dialect':
            if (!this.dialect.includes(val)) {
              this.dialect.push(val)
            } else {
              this.dialect.splice(this.dialect.indexOf(val), 1)
            }
            break;
        }
      },
      setValueToForm() {
        this.form.dialect = ''
        if(this.dialect.length > 0){
          if(this.dialectOther !== ''){
            let list = this.dialectOther.split(',')
            for(let i=0;i<list.length;i++){
              for(let l=0;l<this.dialect.length;l++){
                if(list[i] == this.dialect[l]){
                  this.dialect.splice(l,1)
                }
              }
            }
            this.form.dialect = this.dialectOther + ',' + this.dialect.join(',')
          }else{
            this.form.dialect = this.dialect.join(',')
          }
        }else{
          this.form.dialect = this.dialectOther
        }
      },
      dispose(){
        let list = this.form.dialect.split(',')
        // console.log(list)
        let btn = document.getElementsByTagName('input')
        let bel = document.getElementsByTagName('label')
        for(let i=0;i<list.length;i++){
          for(let l=0;l<bel.length;l++){
            if(bel[l].innerText==list[i]){
              this.setValue('dialect',list[i])
            }
          }
        }
        let typeList = []
        for(let i=0;i<list.length;i++){
          let typeIndex = 0
          for(let l=0;l<btn.length;l++){
             if(btn[l].getAttribute('name')=='dialect'){
               if(list[i]==btn[l].nextSibling.innerText){
                 btn[l].setAttribute('checked','checked')
               }else{
                 typeIndex++
               }
             }
          }
          if(typeIndex == 4){
            typeList.push(list[i])
            this.dialectOther = typeList.join()
          }
        }
      },
      validateName(item,data){
        const regex = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
        if(!regex.test(item)&&item){
          if(data == 'dialectOther'){
            this[data]=''
          }
          this.form[data]=''
          this.$toast('请输入合法内容')
          this.lock = false
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
  @import 'child';
</style>

<template>
  <div class="form-content">
    <h1>健康情况（既往史）</h1>
    <div class="content-card" >
      <h2 style="padding-top: 0">心血管系统</h2>
      <div class="form-input">
        <input type="radio" name="cardiovascularSystem" v-model="cardiovascularSystem" @click="setValue('cardiovascularSystem','无')" value="无" id="cardiovascularSystem0"><label for="cardiovascularSystem0" class="range-right">无</label>
        <input type="radio" name="cardiovascularSystem" v-model="cardiovascularSystem" @click="setValue('cardiovascularSystem','房颤')" value="房颤" id="cardiovascularSystem1"><label for="cardiovascularSystem1" class="range-right">房颤</label>
        <input type="radio" name="cardiovascularSystem" v-model="cardiovascularSystem" @click="setValue('cardiovascularSystem','高血压')" value="高血压" id="cardiovascularSystem2"><label for="cardiovascularSystem2" class="range-right">高血压</label>
        <input type="radio" name="cardiovascularSystem" v-model="cardiovascularSystem" @click="setValue('cardiovascularSystem','室上性心动过速')" value="室上性心动过速" id="cardiovascularSystem3"><label for="cardiovascularSystem3" class="range-right">室上性心动过速</label>
        <input type="radio" name="cardiovascularSystem" v-model="cardiovascularSystem" @click="setValue('cardiovascularSystem','房室传导阻滞')" value="房室传导阻滞" id="cardiovascularSystem4"><label for="cardiovascularSystem4" class="range-right">房室传导阻滞</label>
        <input type="radio" name="cardiovascularSystem" v-model="cardiovascularSystem" @click="setValue('cardiovascularSystem','安装起搏器')" value="安装起搏器" id="cardiovascularSystem5"><label for="cardiovascularSystem5" class="range-right">安装起搏器</label>
        <input type="radio" name="cardiovascularSystem" v-model="cardiovascularSystem" @click="setValue('cardiovascularSystem','')" value="" id="cardiovascularSystem6"><label for="cardiovascularSystem6" class="range-right">其他</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" @blur="validateName(cardiovascularSystemOther,'cardiovascularSystemOther')" v-model="cardiovascularSystemOther"/>
      </div>
    </div>
    <div class="content-card">
      <h2>神经系统</h2>
      <div class="form-input">
        <input type="radio" name="nervousSystem" v-model="nervousSystem" @click="setValue('nervousSystem','无')" value="无" id="nervousSystem0"><label for="nervousSystem0" class="range-right">无</label>
        <input type="radio" name="nervousSystem" v-model="nervousSystem" @click="setValue('nervousSystem','痴呆')" value="痴呆" id="nervousSystem1"><label for="nervousSystem1" class="range-right">痴呆</label>
        <input type="radio" name="nervousSystem" v-model="nervousSystem" @click="setValue('nervousSystem','帕金森')" value="帕金森" id="nervousSystem2"><label for="nervousSystem2" class="range-right">帕金森</label>
        <input type="radio" name="nervousSystem" v-model="nervousSystem" @click="setValue('nervousSystem','脑出血')" value="脑出血" id="nervousSystem3"><label for="nervousSystem3" class="range-right">脑出血</label>
        <input type="radio" name="nervousSystem" v-model="nervousSystem" @click="setValue('nervousSystem','癫痫')" value="癫痫" id="nervousSystem4"><label for="nervousSystem4" class="range-right">癫痫</label>
        <input type="radio" name="nervousSystem" v-model="nervousSystem" @click="setValue('nervousSystem','脑梗塞')" value="脑梗塞" id="nervousSystem5"><label for="nervousSystem5" class="range-right">脑梗塞</label>
        <input type="radio" name="nervousSystem" v-model="nervousSystem" @click="setValue('nervousSystem','')" value="" id="nervousSystem6"><label for="nervousSystem6" class="range-right">其他</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" @blur="validateName(nervousSystemOther,'nervousSystemOther')" v-model="nervousSystemOther"/>
      </div>
    </div>
    <div class="content-card">
      <h2>呼吸系统</h2>
      <div class="form-input">
        <input type="radio" name="respiratorySystem" v-model="respiratorySystem" @click="setValue('respiratorySystem','无')" value="无" id="respiratorySystem0"><label for="respiratorySystem0" class="range-right">无</label>
        <input type="radio" name="respiratorySystem" v-model="respiratorySystem" @click="setValue('respiratorySystem','慢性阻塞性肺气肿')" value="慢性阻塞性肺气肿" id="respiratorySystem1"><label for="respiratorySystem1" class="range-right">慢性阻塞性肺气肿</label>
        <input type="radio" name="respiratorySystem" v-model="respiratorySystem" @click="setValue('respiratorySystem','肺结核')" value="肺结核" id="respiratorySystem2"><label for="respiratorySystem2" class="range-right">肺结核</label>
        <input type="radio" name="respiratorySystem" v-model="respiratorySystem" @click="setValue('respiratorySystem','肺炎')" value="肺炎" id="respiratorySystem3"><label for="respiratorySystem3" class="range-right">肺炎</label>
        <input type="radio" name="respiratorySystem" v-model="respiratorySystem" @click="setValue('respiratorySystem','哮喘')" value="哮喘" id="respiratorySystem4"><label for="respiratorySystem4" class="range-right">哮喘</label>
        <input type="radio" name="respiratorySystem" v-model="respiratorySystem" @click="setValue('respiratorySystem','')" value="" id="respiratorySystem5"><label for="respiratorySystem5" class="range-right">其他</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" @blur="validateName(respiratorySystemOther,'respiratorySystemOther')" v-model="respiratorySystemOther"/>
      </div>
    </div>
    <div class="content-card">
      <h2>内分泌系统</h2>
      <div class="form-input">
        <input type="radio" name="endocrineSystem" v-model="endocrineSystem" @click="setValue('endocrineSystem','无')" value="无" id="endocrineSystem0"><label for="endocrineSystem0" class="range-right">无</label>
        <input type="radio" name="endocrineSystem" v-model="endocrineSystem" @click="setValue('endocrineSystem','糖尿病')" value="糖尿病" id="endocrineSystem1"><label for="endocrineSystem1" class="range-right">糖尿病</label>
        <input type="radio" name="endocrineSystem" v-model="endocrineSystem" @click="setValue('endocrineSystem','甲亢')" value="甲亢" id="endocrineSystem2"><label for="endocrineSystem2" class="range-right">甲亢</label>
        <input type="radio" name="endocrineSystem" v-model="endocrineSystem" @click="setValue('endocrineSystem','甲状腺功能低下')" value="甲状腺功能低下" id="endocrineSystem3"><label for="endocrineSystem3" class="range-right">甲状腺功能低下</label>
        <input type="radio" name="endocrineSystem" v-model="endocrineSystem" @click="setValue('endocrineSystem','')" value="" id="endocrineSystem4"><label for="endocrineSystem4" class="range-right">其他</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" @blur="validateName(endocrineSystemOther,'endocrineSystemOther')" v-model="endocrineSystemOther"/>
      </div>
    </div>
    <div class="content-card">
      <h2>消化系统</h2>
      <div class="form-input">
        <input type="radio" name="alimentarySystem" v-model="alimentarySystem" @click="setValue('alimentarySystem','无')" value="无" id="alimentarySystem0"><label for="alimentarySystem0" class="range-right">无</label>
        <input type="radio" name="alimentarySystem" v-model="alimentarySystem" @click="setValue('alimentarySystem','胃溃疡')" value="胃溃疡" id="alimentarySystem1"><label for="alimentarySystem1" class="range-right">胃溃疡</label>
        <input type="radio" name="alimentarySystem" v-model="alimentarySystem" @click="setValue('alimentarySystem','十二指肠溃疡')" value="十二指肠溃疡" id="alimentarySystem2"><label for="alimentarySystem2" class="range-right">十二指肠溃疡</label>
        <input type="radio" name="alimentarySystem" v-model="alimentarySystem" @click="setValue('alimentarySystem','肠梗阻')" value="肠梗阻" id="alimentarySystem3"><label for="alimentarySystem3" class="range-right">肠梗阻</label>
        <input type="radio" name="alimentarySystem" v-model="alimentarySystem" @click="setValue('alimentarySystem','')" value="" id="alimentarySystem4"><label for="alimentarySystem4" class="range-right">其他</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" @blur="validateName(alimentarySystemOther,'alimentarySystemOther')" v-model="alimentarySystemOther"/>
      </div>
    </div>
    <div class="content-card">
      <h2>肌肉与骨骼</h2>
      <div class="form-input">
        <input type="radio" name="musclesSkeletons" v-model="musclesSkeletons" @click="setValue('musclesSkeletons','无')" value="无" id="musclesSkeletons0"><label for="musclesSkeletons0" class="range-right">无</label>
        <input type="radio" name="musclesSkeletons" v-model="musclesSkeletons" @click="setValue('musclesSkeletons','关节炎')" value="关节炎" id="musclesSkeletons1"><label for="musclesSkeletons1" class="range-right">关节炎</label>
        <input type="radio" name="musclesSkeletons" v-model="musclesSkeletons" @click="setValue('musclesSkeletons','颈椎病')" value="颈椎病" id="musclesSkeletons2"><label for="musclesSkeletons2" class="range-right">颈椎病</label>
        <input type="radio" name="musclesSkeletons" v-model="musclesSkeletons" @click="setValue('musclesSkeletons','椎间盘突出')" value="椎间盘突出" id="musclesSkeletons3"><label for="musclesSkeletons3" class="range-right">椎间盘突出</label>
        <input type="radio" name="musclesSkeletons" v-model="musclesSkeletons" @click="setValue('musclesSkeletons','骨质疏松')" value="骨质疏松" id="musclesSkeletons4"><label for="musclesSkeletons4" class="range-right">骨质疏松</label>
        <input type="radio" name="musclesSkeletons" v-model="musclesSkeletons" @click="setValue('musclesSkeletons','骨折')" value="骨折" id="musclesSkeletons5"><label for="musclesSkeletons5" class="range-right">骨折</label>
        <input style="width: 2rem;margin-left: -10px" placeholder="具体部位"  @blur="validateName(form.fracturaPart,'fracturaPart')" v-model="form.fracturaPart" v-show="form.musclesSkeletons == '骨折'"/>
        <input type="radio" name="musclesSkeletons" v-model="musclesSkeletons" @click="setValue('musclesSkeletons','')" value="" id="musclesSkeletons6"><label for="musclesSkeletons6" class="range-right">其他</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" @blur="validateName(musclesSkeletonsOther,'musclesSkeletonsOther')" v-model="musclesSkeletonsOther"/>
      </div>
    </div>
    <div class="content-card">
      <h2>肿瘤</h2>
      <div class="form-input">
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','无')" value="无" id="tumour0"><label for="tumour0" class="range-right">无</label>
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','脑瘤')" value="脑瘤" id="tumour1"><label for="tumour1" class="range-right">脑瘤</label>
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','鼻咽癌')" value="鼻咽癌" id="tumour2"><label for="tumour2" class="range-right">鼻咽癌</label>
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','肺癌')" value="肺癌" id="tumour3"><label for="tumour3" class="range-right">肺癌</label>
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','肝癌')" value="肝癌" id="tumour4"><label for="tumour4" class="range-right">肝癌</label>
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','膀胱癌')" value="膀胱癌" id="tumour5"><label for="tumour5" class="range-right">膀胱癌</label>
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','乳癌')" value="乳癌" id="tumour6"><label for="tumour6" class="range-right">乳癌</label>
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','结肠癌')" value="结肠癌" id="tumour7"><label for="tumour7" class="range-right">结肠癌</label>
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','直肠癌')" value="直肠癌" id="tumour8"><label for="tumour8" class="range-right">直肠癌</label>
        <input type="radio" name="tumour" v-model="tumour" @click="setValue('tumour','')" value="" id="tumour9"><label for="tumour9" class="range-right">其他</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" @blur="validateName(tumourOther,'tumourOther')" v-model="tumourOther"/>
      </div>
    </div>
    <div class="content-card">
      <h2>泌尿系统</h2>
      <div class="form-input">
        <input type="radio" name="urinarySystem" v-model="urinarySystem" @click="setValue('urinarySystem','无')" value="无" id="urinarySystem0"><label for="urinarySystem0" class="range-right">无</label>
        <input type="radio" name="urinarySystem" v-model="urinarySystem" @click="setValue('urinarySystem','良性前列腺增生')" value="良性前列腺增生" id="urinarySystem1"><label for="urinarySystem1" class="range-right">良性前列腺增生</label>
        <input type="radio" name="urinarySystem" v-model="urinarySystem" @click="setValue('urinarySystem','泌尿系感染')" value="泌尿系感染" id="urinarySystem2"><label for="urinarySystem2" class="range-right">泌尿系感染</label>
        <input type="radio" name="urinarySystem" v-model="urinarySystem" @click="setValue('urinarySystem','肾结石')" value="肾结石" id="urinarySystem3"><label for="urinarySystem3" class="range-right">肾结石</label>
        <input type="radio" name="urinarySystem" v-model="urinarySystem" @click="setValue('urinarySystem','肾功能损害')" value="肾功能损害" id="urinarySystem4"><label for="urinarySystem4" class="range-right">肾功能损害</label>
        <input type="radio" name="urinarySystem" v-model="urinarySystem" @click="setValue('urinarySystem','')" value="" id="urinarySystem5"><label for="urinarySystem5" class="range-right">其他</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" @blur="validateName(urinarySystemOther,'urinarySystemOther')" v-model="urinarySystemOther"/>
      </div>
    </div>
    <div class="content-card">
      <h2>妇科系统</h2>
      <div class="form-input">
        <input type="radio" name="gynecologicalSystem" v-model="gynecologicalSystem" @click="setValue('gynecologicalSystem','无')" value="无" id="gynecologicalSystem0"><label for="gynecologicalSystem0" class="range-right">无</label>
        <input type="radio" name="gynecologicalSystem" v-model="gynecologicalSystem" @click="setValue('gynecologicalSystem','子宫纤维肌瘤')" value="子宫纤维肌瘤" id="gynecologicalSystem1"><label for="gynecologicalSystem1" class="range-right">子宫纤维肌瘤</label>
        <input type="radio" name="gynecologicalSystem" v-model="gynecologicalSystem" @click="setValue('gynecologicalSystem','囊肿')" value="囊肿" id="gynecologicalSystem2"><label for="gynecologicalSystem2" class="range-right">囊肿</label>
        <input type="radio" name="gynecologicalSystem" v-model="gynecologicalSystem" @click="setValue('gynecologicalSystem','')" value="" id="gynecologicalSystem3"><label for="gynecologicalSystem3" class="range-right">其他</label>
      </div>
      <div class="form-input" style="padding-top: 0">
        <span class="font1">其他</span>
        <input style="width: 6.9rem;" @blur="validateName(gynecologicalSystemOther,'gynecologicalSystemOther')" v-model="gynecologicalSystemOther"/>
      </div>
    </div>
    <div class="content-card">
      <h2>其他疾病</h2>
      <div class="form-input">
        <textarea style="width: 100%" maxlength="200" rows="3" @blur="validateName(form.otherDisease,'otherDisease')" v-model="form.otherDisease"></textarea>
      </div>
      <div class="form-input">
        <span class="font1">手术史</span>
        <input type="radio"  name="operationHistory" v-model="form.operationHistory" value="0" id="operationHistory1"><label for="operationHistory1" class="range-right" style="margin-left: 1.5rem;">无</label>
        <input type="radio"  name="operationHistory" v-model="form.operationHistory" value="1" id="operationHistory2"><label for="operationHistory2" class="range-right">有</label>
      </div>
      <div class="form-input">
        <span class="font1">近期入院史</span>
        <input type="radio"  name="recentHospitalizationHistory" v-model="form.recentHospitalizationHistory" value="0" id="recentHospitalizationHistory1"><label for="recentHospitalizationHistory1" class="range-right" style="margin-left: 0.65rem;">无</label>
        <input type="radio"  name="recentHospitalizationHistory" v-model="form.recentHospitalizationHistory" value="1" id="recentHospitalizationHistory2"><label for="recentHospitalizationHistory2" class="range-right">有</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "child-two",
    props:['child'],
    watch:{
      cardiovascularSystemOther:{
        handler(newVal){
          this.cardiovascularSystem = ''
          if(newVal != ''){
            this.form.cardiovascularSystem = newVal
          }
        }
      },
      nervousSystemOther:{
        handler(newVal){
          this.nervousSystem = ''
          if(newVal != ''){
            this.form.nervousSystem = newVal
          }
        }
      },
      endocrineSystemOther:{
        handler(newVal){
          this.endocrineSystem = ''
          if(newVal != ''){
            this.form.endocrineSystem = newVal
          }
        }
      },
      alimentarySystemOther:{
        handler(newVal){
          this.alimentarySystem = ''
          if(newVal != ''){
            this.form.alimentarySystem = newVal
          }
        }
      },
      musclesSkeletonsOther:{
        handler(newVal){
          this.musclesSkeletons = ''
          if(newVal != ''){
            this.form.musclesSkeletons = newVal
          }
        }
      },
      tumourOther:{
        handler(newVal){
          this.tumour = ''
          if(newVal != ''){
            this.form.tumour = newVal
          }
        }
      },
      urinarySystemOther:{
        handler(newVal){
          this.urinarySystem = ''
          if(newVal != ''){
            this.form.urinarySystem = newVal
          }
        }
      },
      gynecologicalSystemOther:{
        handler(newVal){
          this.gynecologicalSystem = ''
          if(newVal != ''){
            this.form.gynecologicalSystem = newVal
          }
        }
      },
    },
    data() {
      return {
        form:{},
        cardiovascularSystem:'',
        cardiovascularSystemOther:'',
        nervousSystem:'',
        nervousSystemOther:'',
        respiratorySystem:'',
        respiratorySystemOther:'',
        endocrineSystem:'',
        endocrineSystemOther:'',
        alimentarySystem:'',
        alimentarySystemOther:'',
        musclesSkeletons:'',
        musclesSkeletonsOther:'',
        tumour:'',
        tumourOther:'',
        urinarySystem:'',
        urinarySystemOther:'',
        gynecologicalSystem:'',
        gynecologicalSystemOther:''
      }
    },
    mounted(){
      this.form = this.child
      console.log(this.form)
      this.dispose('cardiovascularSystem')
      this.dispose('nervousSystem')
      this.dispose('respiratorySystem')
      this.dispose('endocrineSystem')
      this.dispose('alimentarySystem')
      this.dispose('musclesSkeletons')
      this.dispose('tumour')
      this.dispose('urinarySystem')
      this.dispose('gynecologicalSystem')
    },
    methods:{
      setValue(key, val) {
        switch (key) {
          case 'cardiovascularSystem':
            this.cardiovascularSystemOther = '';
            this.form.cardiovascularSystem = val
            break;
          case 'nervousSystem':
            this.nervousSystemOther = '';
            this.form.nervousSystem = val
            break;
          case 'respiratorySystem':
            this.respiratorySystemOther = '';
            this.form.respiratorySystem = val
            break;
          case 'endocrineSystem':
            this.endocrineSystemOther = '';
            this.form.endocrineSystem = val
            break;
          case 'alimentarySystem':
            this.alimentarySystemOther = '';
            this.form.alimentarySystem = val
            break;
          case 'musclesSkeletons':
            this.musclesSkeletonsOther = '';
            this.form.musclesSkeletons = val
            break;
          case 'tumour':
            this.tumourOther = '';
            this.form.tumour = val
            break;
          case 'urinarySystem':
            this.urinarySystemOther = '';
            this.form.urinarySystem = val
            break;
          case 'gynecologicalSystem':
            this.gynecologicalSystemOther = '';
            this.form.gynecologicalSystem = val
            break;
        }
      },
      dispose(item){
        let data = this.form[item]
        let btn = document.getElementsByTagName('input')
        let typeIndex = 0
        let typeLength = 0
        this[item] = data
        for(let l=0;l<btn.length;l++){
          btn[l].removeAttribute('checked')
          if(btn[l].getAttribute('name')==item){
            btn[l].setAttribute('checked','checked')
            typeLength++
            if(data != btn[l].nextSibling.innerText){
              typeIndex++
            }
          }
          
        }
        if(typeLength == typeIndex){
          console.log(typeLength,typeIndex,data)
          let name = item+'Other'
          this[name] = data
        }
      },
      // 其他验证
      validateName(item,data){
        const regex = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
        if(!regex.test(item)&&item){
          if(data == 'otherDisease' || data == 'fracturaPart'){
            this.form[data]=''
          }else{
            this[data] = ''
          }
          console.log(this[data],this.form[data])
          this.$toast('请输入合法内容')
        }else if(!item){
          if(data == 'otherDisease' || data == 'fracturaPart'){
            this.form[data]=''
          }else{
            this[data] = ''
          }
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "child";
</style>

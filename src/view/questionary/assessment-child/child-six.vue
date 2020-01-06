<template>
  <div class="form-content">
    <div class="content-card" style="padding-top: 0">
      <h2>(八)排泄</h2>
      <h3>大便：（多选）</h3>
      <div class="form-input">
        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','规律')" id="stoolCondition1"><label for="stoolCondition1"
                                                                                            class="range-right">规律</label>
        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','便秘')" id="stoolCondition2"><label for="stoolCondition2"
                                                                                            class="range-right">便秘</label>
        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','腹泻')" id="stoolCondition3"><label for="stoolCondition3"
                                                                                            class="range-right">腹泻</label>
        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','黑便/柏油样便')" id="stoolCondition4"><label for="stoolCondition4"
                                                                                                  class="range-right">黑便/柏油样便</label>
        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','痔疮')" id="stoolCondition5"><label for="stoolCondition5"
                                                                                            class="range-right">痔疮</label>
        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','失禁')" id="stoolCondition6"><label for="stoolCondition6"
                                                                                            class="range-right">失禁</label>
        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','泻药/软便剂')" id="stoolCondition7"><label for="stoolCondition7"
                                                                                                class="range-right"
                                                                                                style="margin-right: 0">泻药/软便剂</label>
        <div v-show="stoolCondition.indexOf('泻药/软便剂') !== -1" style="display: inline-block">
          <span class="font2">（</span>
          <input style="width: 7.5rem;" placeholder="药剂名称" v-model="form.stoolSoftener"/>
          <span class="font2">）</span>
        </div>

        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','结肠造瘘')" id="stoolCondition8"><label for="stoolCondition8"
                                                                                              class="range-right">结肠造瘘</label>
        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','直肠造瘘')" id="stoolCondition9"><label for="stoolCondition9"
                                                                                              class="range-right">直肠造瘘</label>
        <input type="checkbox" name="stoolCondition" @click="setValue('stoolCondition','其他')" id="stoolCondition10"><label for="stoolCondition10"
                                                                                             class="range-right">其他</label>
        <div v-show="stoolCondition.indexOf('其他') !== -1" style="display: inline-block">
          <span class="font2">（</span>
          <input style="width: 7.5rem;" placeholder="其他" v-model="form.otherStoolCondition"/>
          <span class="font2">）</span>
        </div>

      </div>
    </div>
    <div class="content-card">
      <h3>排尿：（多选）</h3>
      <div class="form-input">
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','正常')" id="urineCondition1"><label for="urineCondition1"
                                                                                            class="range-right">正常</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','异常')" id="urineCondition2"><label for="urineCondition2"
                                                                                            class="range-right">异常</label>
        <!--小便情况包含“异常”时填写-->
        <div v-show="urineCondition.indexOf('异常') !== -1" style="display: inline-block">
          <span class="font2">(</span>
          <input type="checkbox" name="exceptionUrineCondition" @click="setValue('exceptionUrineCondition','阻力')" id="exceptionUrineCondition1"><label
          for="exceptionUrineCondition1" class="range-right">阻力</label>
          <input type="checkbox" name="exceptionUrineCondition" @click="setValue('exceptionUrineCondition','刺激')" id="exceptionUrineCondition2"><label
          for="exceptionUrineCondition2" class="range-right">刺激</label>
          <input type="checkbox" name="exceptionUrineCondition" @click="setValue('exceptionUrineCondition','失禁')" id="exceptionUrineCondition3"><label
          for="exceptionUrineCondition3" class="range-right">失禁</label>
          <input type="checkbox" name="exceptionUrineCondition" @click="setValue('exceptionUrineCondition','功能障碍')" id="exceptionUrineCondition4"><label
          for="exceptionUrineCondition4" class="range-right">功能障碍</label>
          <span class="font2">)</span>
        </div>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','造瘘')" id="urineCondition3"><label for="urineCondition3"
                                                                                            class="range-right">造瘘</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','间歇导尿')" id="urineCondition4"><label for="urineCondition4"
                                                                                              class="range-right">间歇导尿</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','留置尿管')" id="urineCondition5"><label for="urineCondition5"
                                                                                              class="range-right">留置尿管</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','失禁')" id="urineCondition6"><label for="urineCondition6"
                                                                                            class="range-right">失禁</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','尿管(临时)')" id="urineCondition7"><label for="urineCondition7"
                                                                                                class="range-right">尿管(临时)</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','尿管(长期)')" id="urineCondition8"><label for="urineCondition8"
                                                                                                class="range-right">尿管(长期)</label>
        <!--小便情况包含“尿管（长期）”时填写-->
        <div v-show="urineCondition.indexOf('尿管(长期)') !== -1" style="display: inline-block;"  @click="handlerOpen">
          <span class="font2">(更换日期</span>
          <input style="width: 3rem;"  disabled="disabled" v-model="form.replaceTime"/>
          <span class="font2">)</span>
        </div>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','少尿')" id="urineCondition9"><label for="urineCondition9"
                                                                                      class="range-right">少尿</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','多尿')" id="urineCondition10"><label for="urineCondition10"
                                                                                      class="range-right">多尿</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','排尿困难')" id="urineCondition11"><label for="urineCondition11"
                                                                                        class="range-right">排尿困难</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','尿储留')" id="urineCondition12"><label for="urineCondition12"
                                                                                       class="range-right">尿储留</label>
        <input type="checkbox" name="urineCondition" @click="setValue('urineCondition','尿频')" id="urineCondition13"><label for="urineCondition13"
                                                                                      class="range-right">尿频</label>
      </div>
    </div>
    <div class="content-card">
      <h3>尿液性状：（多选）</h3>
      <div class="form-input">
        <input type="checkbox" name="urineTraits" @click="setValue('urineTraits','清')" id="urineTraits1"><label for="urineTraits1"
                                                                                     class="range-right">清</label>
        <input type="checkbox" name="urineTraits" @click="setValue('urineTraits','淡黄色')" id="urineTraits2"><label for="urineTraits2"
                                                                                       class="range-right">淡黄色</label>
        <input type="checkbox" name="urineTraits" @click="setValue('urineTraits','深黄色')" id="urineTraits3"><label for="urineTraits3"
                                                                                       class="range-right">深黄色</label>
        <input type="checkbox" name="urineTraits" @click="setValue('urineTraits','淡红色')" id="urineTraits4"><label for="urineTraits4"
                                                                                       class="range-right">淡红色</label>
        <input type="checkbox" name="urineTraits" @click="setValue('urineTraits','浓茶色')" id="urineTraits5"><label for="urineTraits5"
                                                                                       class="range-right">浓茶色</label>
        <input type="checkbox" name="urineTraits" @click="setValue('urineTraits','浑浊')" id="urineTraits6"><label for="urineTraits6"
                                                                                      class="range-right">浑浊</label>
      </div>
    </div>
    <div class="content-card">
      <h2>(九)皮肤压疮风险评估</h2>
      <h3>皮肤颜色：</h3>
      <div class="form-input">
        <input type="radio" name="skinColor" v-model="form.skinColor" value="1" id="skinColor1"><label for="skinColor1"
                                                                              class="range-right">正常</label>
        <input type="radio" name="skinColor" v-model="form.skinColor" value="2" id="skinColor2"><label for="skinColor2"
                                                                              class="range-right">苍白</label>
        <input type="radio" name="skinColor" v-model="form.skinColor" value="3" id="skinColor3"><label for="skinColor3"
                                                                              class="range-right">潮红</label>
        <input type="radio" name="skinColor" v-model="form.skinColor" value="4" id="skinColor4"><label for="skinColor4"
                                                                              class="range-right">发绀</label>
        <input type="radio" name="skinColor" v-model="form.skinColor" value="5" id="skinColor5"><label for="skinColor5"
                                                                              class="range-right">黄疸</label>
      </div>
      <h3>唇色：</h3>
      <div class="form-input">
        <input type="radio" name="lipColor" v-model="form.lipColor" value="1" id="lipColor1"><label for="lipColor1"
                                                                            class="range-right">粉红</label>
        <input type="radio" name="lipColor" v-model="form.lipColor" value="2" id="lipColor2"><label for="lipColor2"
                                                                            class="range-right">青紫色</label>
        <input type="radio" name="lipColor" v-model="form.lipColor" value="3" id="lipColor3"><label for="lipColor3"
                                                                            class="range-right">发绀</label>
        <input type="radio" name="lipColor" v-model="form.lipColor" value="4" id="lipColor4"><label for="lipColor4"
                                                                            class="range-right">苍白</label>
      </div>
      <h3>完整性：</h3>
      <div class="form-input">
        <input type="radio" name="skinIntegrity" v-model="form.skinIntegrity" value="1" id="skinIntegrity1"><label for="skinIntegrity1"
                                                                                      class="range-right">完整</label>
        <input type="radio" name="skinIntegrity" v-model="form.skinIntegrity" value="2" id="skinIntegrity2"><label for="skinIntegrity2"
                                                                                      class="range-right">其他</label>
      </div>
      <h3>瘙痒：</h3>
      <div class="form-input">
        <input type="radio" name="pruritus" v-model="form.pruritus" value="0" id="pruritus0"><label for="pruritus0"
                                                                            class="range-right">无</label>
        <input type="radio" name="pruritus" v-model="form.pruritus" value="1" id="pruritus1"><label for="pruritus1"
                                                                            class="range-right">有</label>
        <input type="radio" name="pruritus" v-model="form.pruritus" value="2" id="pruritus2"><label for="pruritus2"
                                                                            class="range-right">不能确定</label>
      </div>
      <h3>疼痛：</h3>
      <div class="form-input">
        <input type="radio" name="pain" v-model="form.pain" value="0" id="pain0"><label for="pain0" class="range-right">无</label>
        <input type="radio" name="pain" v-model="form.pain" value="1" id="pain1"><label for="pain1" class="range-right">有</label>
        <input type="radio" name="pain" v-model="form.pain" value="2" id="pain2"><label for="pain2" class="range-right">不能确定</label>
      </div>
    </div>
    <div class="content-card">
      <h2>(十)用药评估</h2>
      <h3>用药情况：</h3>
      <div class="form-input">
        <input type="checkbox" name="drugUse" @click="setValue('drugUse','无')" v-model="drugUse" value="无" id="drugUse0"><label for="drugUse0" class="range-right">无</label>
        <input type="checkbox" name="drugUse" @click="setValue('drugUse','处方药')" v-model="drugUse" value="处方药" id="drugUse1"><label for="drugUse1" class="range-right">处方药</label>
        <input type="checkbox" name="drugUse" @click="setValue('drugUse','中草药')" v-model="drugUse" value="中草药" id="drugUse2"><label for="drugUse2" class="range-right">中草药</label>
        <input type="checkbox" name="drugUse" @click="setValue('drugUse','精神类药物')" v-model="drugUse" value="精神类药物" id="drugUse3"><label for="drugUse3"
                                                                          class="range-right">精神类药物</label>
        <input type="checkbox" name="drugUse" @click="setValue('drugUse','非处方药')" v-model="drugUse" value="非处方药" id="drugUse4"><label for="drugUse4"
                                                                          class="range-right">非处方药</label>
      </div>
      <h3>过敏史：</h3>
      <div class="form-input">
        <input type="radio" name="historyOfAllergy" v-model="form.historyOfAllergy" value="0" id="historyOfAllergy0"><label for="historyOfAllergy0"
                                                                                            class="range-right">无</label>
        <input type="radio" name="historyOfAllergy" v-model="form.historyOfAllergy" value="1" id="historyOfAllergy1"><label for="historyOfAllergy1"
                                                                                            class="range-right">未知</label>
        <input type="radio" name="historyOfAllergy" v-model="form.historyOfAllergy" value="2" id="historyOfAllergy2"><label for="historyOfAllergy2"
                                                                                            class="range-right">有</label>
        <!--过敏史为2时填写-->
        <div v-show="form.historyOfAllergy == '2'">
          <span class="font2">（</span>
          <span class="font2">药物</span>
          <input style="width: 2rem;" v-model="allergens[0]"/>
          <span class="font2">食物</span>
          <input style="width: 2rem;" v-model="allergens[1]"/>
          <span class="font2">接触物</span>
          <input style="width: 2rem;" v-model="allergens[2]"/>
          <span class="font2">其他</span>
          <input style="width: 2rem;" v-model="allergens[3]"/>
          <span class="font2">）</span>
        </div>

      </div>
      <h3>服药依从性：</h3>
      <div class="form-input">
        <input type="radio" v-model="form.medicationCompliance" name="medicationCompliance" value="0" id="medicationCompliance0"><label
        for="medicationCompliance0" class="range-right">无</label>
        <input type="radio" v-model="form.medicationCompliance" name="medicationCompliance" value="1" id="medicationCompliance1"><label
        for="medicationCompliance1" class="range-right">好，服药少于5种</label>
        <input type="radio" v-model="form.medicationCompliance" name="medicationCompliance" value="2" id="medicationCompliance2"><label
        for="medicationCompliance2" class="range-right">好，服药大于等于5种</label>
        <input type="radio" v-model="form.medicationCompliance" name="medicationCompliance" value="3" id="medicationCompliance3"><label
        for="medicationCompliance3" class="range-right">一般</label>
        <input type="radio" v-model="form.medicationCompliance" name="medicationCompliance" value="4" id="medicationCompliance4"><label
        for="medicationCompliance4" class="range-right">差</label>
      </div>
      <h3>药物名称：</h3>
      <div class="form-input">
        <textarea style="width: 100%" v-model="form.drugs" rows="3"></textarea>
      </div>
    </div>
    <div class="content-card">
      <h2>(十一)环境</h2>
      <h3>居住环境：</h3>
      <div class="form-input">
        <input type="radio" name="livingEnvironment" v-model="form.livingEnvironment" value="1" id="livingEnvironment1"><label for="livingEnvironment1"
                                                                                              class="range-right">安全</label>
        <input type="radio" name="livingEnvironment" v-model="form.livingEnvironment" value="2" id="livingEnvironment2"><label for="livingEnvironment2"
                                                                                              class="range-right">潜在危险</label>
      </div>
      <h3>住所：</h3>
      <div class="form-input">
        <input type="radio" name="residence" v-model="form.residence"  value="1" id="residence1"><label for="residence1"
                                                                              class="range-right">家庭</label>
        <!--住所为1时，选项有“经济适用房 房改房 租房 自购房 其他 _____-->
        <div v-show="form.residence == '1'" style="display: inline-block">
          <span class="font2">（</span>
          <input type="checkbox" name="residenceDesc1" @click="setValue('residenceDesc1','经济适用房')" id="residenceDesc1"><label for="residenceDesc1"
                                                                                               class="range-right">经济适用房</label>
          <input type="checkbox" name="residenceDesc1" @click="setValue('residenceDesc1','房改房')" id="residenceDesc2"><label for="residenceDesc2"
                                                                                             class="range-right">房改房</label>
          <input type="checkbox" name="residenceDesc1" @click="setValue('residenceDesc1','租房')" id="residenceDesc3"><label for="residenceDesc3"
                                                                                            class="range-right">租房</label>
          <input type="checkbox" name="residenceDesc1" @click="setValue('residenceDesc1','自购房')" id="residenceDesc4"><label for="residenceDesc4"
                                                                                             class="range-right">自购房</label>
          <span class="font2">其他:</span>
          <input style="width: 2rem;" @click="thisType = residenceDescOther1" @blur="validate(residenceDescOther1,'residenceDescOther1','residenceDesc1')" v-model="residenceDescOther1"/>
          <span class="font2">（多选））</span>
        </div>

        <input type="radio" name="residence" v-model="form.residence" value="2" id="residence2"><label for="residence2"
                                                                              class="range-right">公共机构</label>
        <!--否则选项为“养老院 干休所 其他 ______-->
        <div v-show="form.residence == '2'" style="display: inline-block">
          <span class="font2">（</span>
          <input type="checkbox" name="residenceDesc2" @click="setValue('residenceDesc2','养老院')" id="residenceDesc6"><label for="residenceDesc6"
                                                                                             class="range-right">养老院</label>
          <input type="checkbox" name="residenceDesc2" @click="setValue('residenceDesc2','干休所')" id="residenceDesc7"><label for="residenceDesc7"
                                                                                             class="range-right">干休所</label>
          <span class="font2">其他:</span>
          <input style="width: 2rem;" @click="thisType = residenceDescOther2" @blur="validate(residenceDescOther2,'residenceDescOther2','residenceDesc1')" v-model="residenceDescOther2"/>
          <span class="font2">（多选））</span>
        </div>

      </div>
      <h3>进出通道：</h3>
      <div class="form-input">
        <input type="radio" name="accessChannel" v-model="form.accessChannel" value="1" id="accessChannel1"><label for="accessChannel1"
                                                                                      class="range-right">电梯</label>
        <input type="radio" name="accessChannel" v-model="form.accessChannel" value="2" id="accessChannel2"><label for="accessChannel2"
                                                                                      class="range-right">楼梯和电梯</label>
        <input type="radio" name="accessChannel" v-model="form.accessChannel" value="3" id="accessChannel3"><label for="accessChannel3"
                                                                                      class="range-right">楼梯</label>
        <input type="radio" name="accessChannel" v-model="form.accessChannel" value="4" id="accessChannel4"><label for="accessChannel4"
                                                                                      class="range-right">人行道或斜坡</label>
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
    name: "child-six",
    props:['child'],
    data() {
      return {
        lock:true,
        thisType:'',
        startDate: new Date((new Date().getTime())-(86400000*90)),
        endDate: new Date(),
        form:{},
        stoolCondition:[],
        urineCondition:[],
        exceptionUrineCondition:[],
        urineTraits:[],
        allergens:['无','无','无','无'],
        residenceDesc1:[],
        residenceDescOther1:'',
        residenceDesc2:[],
        residenceDescOther2:'',
        drugUse:[]
      }
    },
    updated(){
      if(this.form.residence == '1'){
        this.residenceDesc2 = []
        this.residenceDescOther2 = ''
      }else if(this.form.residence == '2'){
        this.residenceDesc1 = []
        this.residenceDescOther1 = ''
      }
    },
    mounted() {
      this.form = this.child
      if(this.form.replaceTime){
        this.form.replaceTime = this.form.replaceTime.split(' ')[0]
      }
      this.dispose('stoolCondition')
      this.dispose('urineCondition')
      this.dispose('exceptionUrineCondition')
      this.dispose('urineTraits')
      this.dispose('drugUse')
      this.disposeResidence()
    },
    methods:{
      setValue(key, val) {
        // console.log(key,val)
        switch (key) {
          case 'stoolCondition':
            if (!this.stoolCondition.includes(val)) {
              this.stoolCondition.push(val)
            } else {
              this.stoolCondition.splice(this.stoolCondition.indexOf(val), 1)
            }
            break;
          case 'urineCondition':
            if (!this.urineCondition.includes(val)) {
              this.urineCondition.push(val)
            } else {
              this.urineCondition.splice(this.urineCondition.indexOf(val), 1)
            }
            break;
          case 'exceptionUrineCondition':
            if (!this.exceptionUrineCondition.includes(val)) {
              this.exceptionUrineCondition.push(val)
            } else {
              this.exceptionUrineCondition.splice(this.exceptionUrineCondition.indexOf(val), 1)
            }
            break;
          case 'urineTraits':
            if (!this.urineTraits.includes(val)) {
              this.urineTraits.push(val)
            } else {
              this.urineTraits.splice(this.urineTraits.indexOf(val), 1)
            }
            break;
          case 'residenceDesc1':
            if (!this.residenceDesc1.includes(val)) {
              this.residenceDesc1.push(val)
            } else {
              this.residenceDesc1.splice(this.residenceDesc1.indexOf(val), 1)
            }
            break;
          case 'residenceDesc2':
            if (!this.residenceDesc2.includes(val)) {
              this.residenceDesc2.push(val)
            } else {
              this.residenceDesc2.splice(this.residenceDesc2.indexOf(val), 1)
            }
            break;
          case 'drugUse':
            if(val=='无'){
              if (!this[key].includes(val)) {
                this[key] = []
                this[key+'Other'] = ''
                this[key].push(val)
                this.clickNot(key)
              }else{
                this[key].splice(this[key].indexOf(val), 1)
              }
            }else{
              if(this[key].includes('无')){
                this[key].splice(this[key].indexOf(val), 1)
                this.clickExist(key)
              }
              if (!this[key].includes(val)) {
                this[key].push(val)
              } else {
                this[key].splice(this[key].indexOf(val), 1)
              }
            }
            break;
        }
      },
      clickNot(item){
        let btn = document.getElementsByTagName('input')
        for(let l=0;l<btn.length;l++){
          if(btn[l].getAttribute('name')==item&&btn[l].getAttribute('value')!='无'){
            if(btn[l].checked){
              btn[l].checked = !btn[l].checked
            }
          }
        }
      },
      clickExist(item){
        let btn = document.getElementsByTagName('input')
        for(let l=0;l<btn.length;l++){
          if(btn[l].getAttribute('name')==item&&btn[l].getAttribute('value')=='无'){
            btn[l].checked = !btn[l].checked
          }
        }
      },
      setValueToForm() {
        this.form.drugUse = this.drugUse.join(',')
        this.form.stoolCondition = this.stoolCondition.join(',')
        this.form.urineCondition = this.urineCondition.join(',')
        this.form.exceptionUrineCondition = this.exceptionUrineCondition.join(',')
        this.form.urineTraits = this.urineTraits.join(',')
        this.form.allergens = this.allergens.join('/')
        if(this.form.residence == '1'){
          if(this.residenceDesc1.length > 0){
            for(let i=0;i<this.residenceDesc1.length;i++){
              if(this.residenceDesc1[i]!='经济适用房'&&this.residenceDesc1[i]!='房改房'&&this.residenceDesc1[i]!='租房'&&this.residenceDesc1[i]!='自购房'){
                let del = this.residenceDesc1.splice(i,1)
              }
            }
            if(this.residenceDescOther1 !== ''){
              this.form.residenceDesc = this.residenceDescOther1 + ',' + this.residenceDesc1.join(',')
            }else{
              this.form.residenceDesc = this.residenceDesc1.join(',')
            }
          }else{
            this.form.residenceDesc = this.residenceDescOther1
          }
        }else if(this.form.residence == '2'){
          if(this.residenceDesc2.length > 0){
            for(let i=0;i<this.residenceDesc2.length;i++){
              if(this.residenceDesc2[i]!='养老院'&&this.residenceDesc2[i]!='干休所'){
                let del = this.residenceDesc2.splice(i,1)
              }
            }
            if(this.residenceDescOther2 !== ''){
              this.form.residenceDesc = this.residenceDescOther2 + ',' + this.residenceDesc2.join(',')
            }else{
              this.form.residenceDesc = this.residenceDesc2.join(',')
            }
          }else{
            this.form.residenceDesc = this.residenceDescOther2
          }
        }
      },
      del(item){
        this.setValue(item,this.thisType)
      },
      dispose(item){
        if(this.form[item]){
          let list = this.form[item].split(',')
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
                  btn[l].setAttribute('checked','checked')
                }else{
                  typeIndex++
                }
              }
            }
          }
        }
      },
      async disposeResidence(){
        if(this.form.residenceDesc){
          let list = this.form.residenceDesc.split(',')
          let btn = document.getElementsByTagName('input')
          let typeList = []
          let type = ''
          if(this.form.residence == 1){
            for(let i=0;i<list.length;i++){
              if(type != list[i]&&list[i]!=''){
                this.setValue('residenceDesc1',list[i])
              }
              type = list[i]
            }
            for(let i=0;i<this.residenceDesc1.length;i++){
              let typeIndex = 0
              let typeLength = 0
              for(let l=0;l<btn.length;l++){
                if(btn[l].getAttribute('name')=='residenceDesc1'){
                  typeLength++
                  if(this.residenceDesc1[i]==btn[l].nextSibling.innerText){
                    btn[l].setAttribute('checked','checked')
                  }else{
                    typeIndex++
                  }
                }
              }
              if(typeIndex == typeLength){
                if(this.residenceDesc1[i] != ''){
                  typeList.push(this.residenceDesc1[i])
                }
                console.log(this.residenceDesc1,typeList)
                this.residenceDescOther1 = typeList.join()
              }
            }
          }else if(this.form.residence == 2){
            for(let i=0;i<list.length;i++){
              if(type != list[i]&&list[i]!=''){
                this.setValue('residenceDesc2',list[i])
              }
              type = list[i]
            }
            console.log(this.residenceDesc2,'2')
            for(let i=0;i<this.residenceDesc2.length;i++){
              let typeIndex = 0
              let typeLength = 0
              for(let l=0;l<btn.length;l++){
                if(btn[l].getAttribute('name')=='residenceDesc2'){
                  typeLength++
                  if(this.residenceDesc2[i]==btn[l].nextSibling.innerText){
                    btn[l].checked = !btn[l].checked
                  }else{
                    typeIndex++
                  }
                }
              }
              if(typeIndex == typeLength){
                if(this.residenceDesc2[i] != ''){
                  typeList.push(this.residenceDesc2[i])
                }
                // let del = this.residenceDesc2.splice(i,1)
                // console.log(this.residenceDesc2,typeList)
                this.residenceDescOther2 = typeList.join()
              }
            }
          }
        }
        
      },
      handlerOpen(){
        this.$refs.picker.open()
      },
      confirmDate(val) {
        this.$set(this.form, 'replaceTime', utils.formatDate(val, 'yyyy-MM-dd'))
      },
      // 其他验证
      validateName(item,data){
        const regex = /^[\u4e00-\u9fa5_a-zA-Z0-9\s\,\、\\\.\(\)\（\）]+$/
        if(!regex.test(item)&&item){
          this.form[data]=''
          this.$toast('请输入合法内容')
          this.lock = false
        }
        let self = this
        setTimeout(function(){
          self.lock = true
        },1500)
      },
      // 其他验证
      validate(item,data,type){
        const regex = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
        if(!regex.test(item)&&item){
          this[data]=''
          this.$toast('请输入合法内容')
          this.lock = false
        }else if(regex.test(item)&&item){
          this.del(type)
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

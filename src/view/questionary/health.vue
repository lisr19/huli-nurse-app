<template>
    <div class="health-body">
        <div class="top-bar">
            <div class="go-back" @click="back()">
                <Icon type="ios-arrow-back" />
                <span>返回</span>
            </div>
            <h2 class="table-name">{{tableName}}
                <span>{{secondaryName}}</span>
                <span class="warning" v-if="warningLock" > 10年风险心脑血管疾病高危人群 </span>
            </h2>
            <h3>评估日期：{{toDay}}</h3>
            <h4 v-if="lock">(*号为必填项)</h4>
            <h5 v-if="pageUpKey" @click="clickpageUpKey">返回上页</h5>
        </div>
        <div class="body-one" style="height">
            <div class="one-box1">
                <h1>转介来源 *</h1>
                <h1>居住方式 *</h1>
                <h1>隶属区域 *</h1>
                <Select v-if="lock" class="sourceOfReferral" v-model="upDataList.sourceOfReferral" >
                    <Option v-for="(item,index) in sourceOfReferral" :value="item.key" :key="index">{{ item.sourceOfReferral }}</Option>
                </Select>
                <Select v-else class="sourceOfReferral" disabled v-model="upDataList.sourceOfReferral" >
                    <Option v-for="(item,index) in sourceOfReferral" :value="item.key" :key="index">{{ item.sourceOfReferral }}</Option>
                </Select>
                <Select v-if="lock" class="living" v-model="upDataList.living" >
                    <Option v-for="(item,index) in living" :value="item.key" :key="index">{{ item.living }}</Option>
                </Select>
                <Select v-else class="living" disabled v-model="upDataList.living" >
                    <Option v-for="(item,index) in living" :value="item.key" :key="index">{{ item.living }}</Option>
                </Select>
                <Select v-if="lock" class="subordinateArea" v-model="upDataList.subordinateArea" >
                    <Option v-for="(item,index) in subordinateArea" :value="item.itemName" :key="index">{{ item.itemName }}</Option>
                </Select>
                <Select v-else class="subordinateArea" disabled v-model="upDataList.subordinateArea" >
                    <Option v-for="(item,index) in subordinateArea" :value="item.itemName" :key="index">{{ item.itemName }}</Option>
                </Select>
            </div>
            <div class="one-box2">
                <div>
                    <span>姓名*</span>
                    <!-- <Input v-if="lock" class="name" v-model="upDataList.name" placeholder=""  /> -->
                    <Input  disabled class="name" v-model="upDataList.name" placeholder=""  />
                    <span>性别*</span>
                    <!-- <RadioGroup v-if="lock" v-model="upDataList.gender">
                        <Radio v-for="(item,index) in gender" :key="index" :label="item.key">
                            <span>{{item.gender}}</span>
                        </Radio>
                    </RadioGroup> -->
                    <RadioGroup  v-model="upDataList.gender">
                        <Radio disabled v-for="(item,index) in gender" :key="index" :label="item.key">
                            <span>{{item.gender}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
                <div>
                    <span>出生年月*</span>
                    <!-- <DatePicker v-if="lock" v-model="fullBirthday" class="birthday" type="date" @on-change='getBirthday' format='yyyy-MM-dd' placeholder="Select date" ></DatePicker> -->
                    <DatePicker  disabled v-model="fullBirthday" class="birthday" type="date" @on-change='getBirthday' format='yyyy-MM-dd' placeholder="Select date" ></DatePicker>
                    <span>年龄</span>
                    <span>{{age}}</span>
                </div>
                <div>
                    <span>籍贯</span>
                    <Select v-if="lock" class="nativePlace" v-model="upDataList.nativePlace">
                        <Option v-for="item in nativePlace" :value="item.name" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Select v-else disabled class="nativePlace" v-model="upDataList.nativePlace">
                        <Option v-for="item in nativePlace" :value="item.name" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <span>文化*</span>
                    <Select v-if="lock" class="educationLevel" v-model="upDataList.educationLevel">
                        <Option v-for="item in educationLevel" :value="item.key" :key="item.key">{{ item.educationLevel }}</Option>
                    </Select>
                    <Select v-else disabled class="educationLevel" v-model="upDataList.educationLevel">
                        <Option v-for="item in educationLevel" :value="item.key" :key="item.key">{{ item.educationLevel }}</Option>
                    </Select>
                </div>
                <div>
                    <span>民族</span>
                    <Select v-if="lock" class="nationality" v-model="upDataList.nationality">
                        <Option v-for="item in nationality" :value="item.name" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Select v-else disabled class="nationality" v-model="upDataList.nationality">
                        <Option v-for="item in nationality" :value="item.name" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <span>职业</span>
                    <Input v-if="lock" class="occupation" v-model="upDataList.occupation" placeholder="输入职业"  />
                    <Input v-else disabled class="occupation" v-model="upDataList.occupation" placeholder="输入职业"  />
                </div>
                <div>
                    <span>婚姻状况*</span>
                    <Select v-if="lock" class="maritalStatus" v-model="upDataList.maritalStatus">
                        <Option v-for="(item,index) in maritalStatus" :value="item.key" :key="index">{{ item.maritalStatus }}</Option>
                    </Select>
                    <Select v-else disabled class="maritalStatus" v-model="upDataList.maritalStatus">
                        <Option v-for="(item,index) in maritalStatus" :value="item.key" :key="index">{{ item.maritalStatus }}</Option>
                    </Select>
                </div>
                <div>
                    <span>医疗付款方式*</span>
                    <Select v-if="lock" class="medicalPaymentMethod" v-model="upDataList.medicalPaymentMethod">
                        <Option v-for="item in medicalPaymentMethod" :value="item.key" :key="item.key">{{ item.medicalPaymentMethod }}</Option>
                    </Select>
                    <Select v-else disabled class="medicalPaymentMethod" v-model="upDataList.medicalPaymentMethod">
                        <Option v-for="item in medicalPaymentMethod" :value="item.key" :key="item.key">{{ item.medicalPaymentMethod }}</Option>
                    </Select>
                </div>
                <div>
                    <span>现居住地</span>
                    <Select v-if="lock" class="residenceAddress" v-model="upDataList.residence">
                        <Option v-for="(item,index) in residence" :value="item" :key="index">{{ item }}</Option>
                    </Select>
                    <Select v-else disabled class="residenceAddress" v-model="upDataList.residence">
                        <Option v-for="(item,index) in residence" :value="item" :key="index">{{ item }}</Option>
                    </Select>
                </div>
                <div>
                    <span>工作单位</span>
                    <Input v-if="lock" class="workplace" v-model="upDataList.workplace" placeholder="单位地址"  />
                    <Input v-else disabled class="workplace" v-model="upDataList.workplace" placeholder="单位地址"  />
                </div>
                <div>
                    <span>联系人</span>
                    <Input v-if="lock" class="workplaceContact" @on-blur="validateName(upDataList.workplaceContact,'workplaceContact')" v-model="upDataList.workplaceContact" placeholder="单位联系人"  />
                    <Input v-else disabled class="workplaceContact" v-model="upDataList.workplaceContact" placeholder="单位联系人"  />
                    <span>电话</span>
                    <Input v-if="lock" class="workplaceContactPhone" v-model="upDataList.workplaceContactPhone" placeholder="联系人电话"  />
                    <Input v-else disabled class="workplaceContactPhone" v-model="upDataList.workplaceContactPhone" placeholder="联系人电话"  />
                </div>
            </div>
            <div class="one-box3">
                <div>
                    <span>通讯地址*</span>
                    <Input v-if="lock" class="residenceAddress" v-model="upDataList.residenceAddress" placeholder=""  />
                    <Input v-else disabled class="residenceAddress" v-model="upDataList.residenceAddress" placeholder=""  />
                </div>
                <div>
                    <span>联系人</span>
                    <Input v-if="lock" class="residenceContact" @on-blur="validateName(upDataList.residenceContact,'residenceContact')" v-model="upDataList.residenceContact" placeholder=""  />
                    <Input v-else disabled class="residenceContact" v-model="upDataList.residenceContact" placeholder=""  />
                    <span>关系</span>
                    <Select v-if="lock" class="relation" v-model="upDataList.relation">
                        <Option v-for="item in relation" :value="item.key" :key="item.key">{{ item.relation }}</Option>
                    </Select>
                    <Select v-else disabled class="relation" v-model="upDataList.relation">
                        <Option v-for="item in relation" :value="item.key" :key="item.key">{{ item.relation }}</Option>
                    </Select>
                </div>
                <div>
                    <span>电话</span>
                    <Input v-if="lock" class="residenceContactPhone" v-model="upDataList.residenceContactPhone" placeholder=""  />
                    <Input v-else disabled class="residenceContactPhone" v-model="upDataList.residenceContactPhone" placeholder=""  />
                </div>
            </div>
        </div>
        <div class="body-two" style="height:0;">
            <h1>心脑血管疾病风险筛查：</h1>
            <div>
                <h5>1</h5>
                <CheckboxGroup v-if="lock" class="cerebralApoplexyFactor" v-model="cerebralApoplexyFactorList">
                    <Checkbox v-for="(item,index) in cerebralApoplexyFactor" :key="index" :label="item">
                        <span>{{item}}</span>
                    </Checkbox>
                </CheckboxGroup>
                <CheckboxGroup v-else class="cerebralApoplexyFactor" v-model="cerebralApoplexyFactorList">
                    <Checkbox disabled v-for="(item,index) in cerebralApoplexyFactor" :key="index" :label="item">
                        <span>{{item}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </div>
            <div>
                <h5>2</h5>
                <h4>当前血压水平(mmHg)</h4>
                <div style="padding-top:0.84rem;">
                    <span>舒张压(mmHg)</span>
                    <Input v-if="lock" class="diastolicBloodPressur" @on-blur="validate(upDataList.diastolicBloodPressur,'diastolicBloodPressur')" v-model="upDataList.diastolicBloodPressur" placeholder=""  />
                    <Input v-else disabled class="diastolicBloodPressur" v-model="upDataList.diastolicBloodPressur" placeholder=""  />
                    <span>收缩压(mmHg)</span>
                    <Input v-if="lock" class="systolicBloodPressur" @on-blur="validate(upDataList.systolicBloodPressur,'systolicBloodPressur')" v-model="upDataList.systolicBloodPressur" placeholder=""  />
                    <Input v-else disabled class="systolicBloodPressur" v-model="upDataList.systolicBloodPressur" placeholder=""  />
                </div>
                <div>
                    <span>正在服用降压药*</span>
                    <RadioGroup v-if="lock" v-model="upDataList.takeAntihypertensiveDrugs">
                        <Radio v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                    <RadioGroup v-else v-model="upDataList.takeAntihypertensiveDrugs">
                        <Radio disabled v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
            <div>
                <h5>3</h5>
                <h4>糖尿病*
                    <RadioGroup v-if="lock" class="diabetesMellitus" v-model="upDataList.diabetesMellitus">
                        <Radio v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                    <RadioGroup v-else class="diabetesMellitus" v-model="upDataList.diabetesMellitus">
                        <Radio disabled v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                </h4>
                <div></div>
            </div>
            <div>
                <h5>4</h5>
                <h4>血脂水平</h4>
                <div style="padding-top:0.84rem;">
                    <span>甘油三脂(TC)</span>
                    <Input v-if="lock" @on-blur="validate(upDataList.triglyceride,'triglyceride')" class="triglyceride" v-model="upDataList.triglyceride" placeholder=""  />
                    <Input v-else disabled class="triglyceride" v-model="upDataList.triglyceride" placeholder=""  />
                    <span>mmol/1</span>
                </div>
                <div>
                    <span>高密度脂蛋白胆固醇(HDL-C)</span>
                    <Input v-if="lock" @on-blur="validate(upDataList.highDensityLipteinCholesterol,'highDensityLipteinCholesterol')" class="highDensityLipteinCholesterol" v-model="upDataList.highDensityLipteinCholesterol" placeholder=""  />
                    <Input v-else disabled class="highDensityLipteinCholesterol" v-model="upDataList.highDensityLipteinCholesterol" placeholder=""  />
                    <span>mmol/1</span>
                </div>
                <div>
                    <span>低密度脂蛋白胆固醇(LDL-C)</span>
                    <Input v-if="lock" @on-blur="validate(upDataList.lowDensityLipteinCholesterol,'lowDensityLipteinCholesterol')" class="lowDensityLipteinCholesterol" v-model="upDataList.lowDensityLipteinCholesterol" placeholder=""  />
                    <Input v-else disabled class="lowDensityLipteinCholesterol" v-model="upDataList.lowDensityLipteinCholesterol" placeholder=""  />
                    <span>mmol/1</span>
                </div>
            </div>
            <div>
                <h5>5</h5>
                <h4>体育锻炼很少或轻体力劳动者*</h4>
                <div style="padding-top:0.84rem;">
                    <RadioGroup v-if="lock" class="littlePhysicalExercise" v-model="upDataList.littlePhysicalExercise">
                        <Radio v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                    <RadioGroup v-else class="littlePhysicalExercise" v-model="upDataList.littlePhysicalExercise">
                        <Radio disabled v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
                <div>
                    <p class="explain">{{explain[0]}}</p>
                </div>
            </div>
            <div>
                <h5>6</h5>
                <h4>
                    身高*
                    <InputNumber v-if="lock" class="height" @on-blur="validateNum()" v-model="upDataList.height" placeholder=""  />
                    <Input v-else disabled class="height" v-model="upDataList.height" placeholder=""  />
                    <span>m</span>
                    体重*
                    <InputNumber v-if="lock" class="weight" @on-blur="validateNum()" v-model="upDataList.weight" placeholder=""  />
                    <Input v-else disabled class="weight" v-model="upDataList.weight" placeholder=""  />
                    <span>kg</span>
                </h4>
                <div style="padding-top:0.84rem;">
                    <p class="explain">{{explain[1]}}</p>
                </div>
            </div>
            <div>
                <h5>7</h5>
                <h4>现在是否吸烟*</h4>
                <div style="padding-top:0.84rem;">
                    <RadioGroup v-if="lock" class="smokingStatus" v-model="upDataList.smokingStatus">
                        <Radio v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                    <RadioGroup v-else class="smokingStatus" v-model="upDataList.smokingStatus">
                        <Radio disabled v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
                <div v-if="upDataList.smokingStatus != 0">
                    <span>每天吸烟≥30支</span>
                    <RadioGroup v-if="lock" class="heavySmoking" v-model="upDataList.heavySmoking">
                        <Radio v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                    <RadioGroup v-else class="heavySmoking" v-model="upDataList.heavySmoking">
                        <Radio disabled v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
            <div>
                <h5>8</h5>
                <h4>心脑血管疾病家族史*</h4>
                <div style="padding-top:0.84rem;">
                    <RadioGroup v-if="lock" class="hereditaryDisease" v-model="upDataList.hereditaryDisease">
                        <Radio v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                    <RadioGroup v-else class="hereditaryDisease" v-model="upDataList.hereditaryDisease">
                        <Radio disabled v-for="(item,index) in whetherList" :key="index" :label="item.label">
                            <span>{{item.tpyr}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
                <div>
                    <p class="explain">{{explain[2]}}</p>
                </div>
            </div>
        </div>
        <div class="bottom-btn">
            <div class="btn" @click="clickBtn">{{btnTxt}}</div>
        </div>
    </div>
</template>

<script>
import {getNation, getDistrict, getProvince, getHealth, pushHealth, updateHealth} from "@/lib/API/health";
import { Indicator , MessageBox } from 'mint-ui';
    export default {
        name: 'health',
        data() {
            return {
                validateLock:true,
                data:{},
                lock:null,
                warningLock:false,
                btnTxt:'下一页',
                pageUpKey:false,
                saveIf:false,
                updataIf:false,
                fullBirthday:'',
                oldBirthday:'',
                tableName:'健康档案',
                secondaryName:'',
                toDay:'',//日期
                upToDay:'',//上传的日期
                totalPoints:'',
                age:'未输入',
                upDataList:{
                    userId:NaN,             //用户id
                    name:'',                //姓名
                    // smokingStatus:0
                },
                // 内容说明
                explain:[
                    '（次数<3次/周且<30分钟/次：经常参与工农业劳动视为有体育锻炼）',
                    '（计算出BMI值：体重/身高2(kg/m2，，如果BMI≥26Kg/m2，表示明显超重，表明是一个危险因素）',
                    '（指父母、兄弟姐妹中有人患有心肌梗死或脑卒中）'
                ],
                // 性别
                gender:[
                    {
                        gender:'男',
                        key:1
                    },
                    {
                        gender:'女',
                        key:2
                    },
                ],
                // 学历
                educationLevel:[
                    {
                        educationLevel:'小学',
                        key:1
                    },
                    {
                        educationLevel:'初中',
                        key:2
                    },
                    {
                        educationLevel:'中专',
                        key:3
                    },
                    {
                        educationLevel:'大专',
                        key:4
                    },
                    {
                        educationLevel:'大学本科',
                        key:5
                    },
                    {
                        educationLevel:'研究生',
                        key:6
                    },
                    {
                        educationLevel:'研究生以上',
                        key:7
                    },
                ],
                // 用户关系
                relation:[
                    {
                        relation:'夫妻',
                        key:1
                    },
                    {
                        relation:'子女',
                        key:2
                    },
                    {
                        relation:'亲属',
                        key:3
                    },
                    {
                        relation:'陪人',
                        key:4
                    },
                    {
                        relation:'保姆',
                        key:5
                    },
                ],
                // 转介来源
                sourceOfReferral:[
                    {
                        sourceOfReferral:'出院系统',
                        key:1
                    },
                    {
                        sourceOfReferral:'病房',
                        key:2
                    },
                    {
                        sourceOfReferral:'干休所',
                        key:3
                    },
                    {
                        sourceOfReferral:'个人',
                        key:4
                    },
                    {
                        sourceOfReferral:'互联网+',
                        key:5
                    },
                ],
                // 居住方式
                living:[
                    {
                        living:'独居',
                        key:0
                    },
                    {
                        living:'只与配偶同住',
                        key:1
                    },
                    {
                        living:'与家人同住',
                        key:2
                    },
                ],
                // 婚姻状况
                maritalStatus:[
                    {
                        maritalStatus:'未婚',
                        key:0
                    },
                    {
                        maritalStatus:'已婚',
                        key:1
                    },
                    {
                        maritalStatus:'离异',
                        key:2
                    },
                    {
                        maritalStatus:'丧偶',
                        key:3
                    },
                ],
                // 医疗付款方式
                medicalPaymentMethod:[
                    {
                        medicalPaymentMethod:'社会基本医疗',
                        key:1
                    },
                    {
                        medicalPaymentMethod:'公费医疗',
                        key:2
                    },
                    {
                        medicalPaymentMethod:'大病统筹',
                        key:3
                    },
                    {
                        medicalPaymentMethod:'自费医疗',
                        key:4
                    },
                    {
                        medicalPaymentMethod:'军队医疗',
                        key:5
                    },
                    {
                        medicalPaymentMethod:'其他',
                        key:6
                    },
                ],
                // 现居住地
                residence:[
                    '北方,城市',
                    '南方,城市',
                    '北方,农村',
                    '南方,农村',
                ],
                // 隶属区域
                subordinateArea:[],
                // 籍贯
                nativePlace:[],
                // 民族
                nationality:[],
                // 脑卒中因素
                cerebralApoplexyFactor:['既往有脑卒中','既往有短暂性脑缺血发作','冠心病'],
                cerebralApoplexyFactorList:[],
                whetherList:[
                    {
                        label:0,
                        tpyr:'否'
                    },
                    {
                        label:1,
                        tpyr:'是'
                    }
                ]
            }
        },
        methods:{
            // 获得日期
            getDay(){
                let Y = new Date().getFullYear()+'';
                let M = new Date().getMonth()+1+'';
                let D = new Date().getDate()+'';
                if(M.length === 1) M = '0' + M;
                if(D.length === 1) D = '0' + D;
                this.toDay = Y+'.'+M+'.'+D;
                this.upToDay = Y+'-'+M+'-'+D;
            },
            // 手机验证
            validatePhone(phoneI,phoneII) {
                const regexI = /^1[345789][0-9]{9}$/;
                const regexII = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
                let msg = '';
                let length = 0
                let trueIndex = 0
                if(phoneI){
                    length++
                    if(!regexI.test(phoneI)&&!regexII.test(phoneI)){
                        msg += '请填写合法联系电话 '
                    }else{
                        trueIndex++
                    }
                }
                if(phoneII){
                    length++
                    if(!regexI.test(phoneII)&&!regexII.test(phoneII)){
                        msg += '请填写合法关系人电话'
                    }else{
                        trueIndex++
                    }
                }
                if(length == trueIndex){
                    let self = this
                    setTimeout(function(){
                        if(self.validateLock){
                            self.pushHealth()
                        }
                    },500)
                }else{
                    this.clickpageUpKey()
                    this.$toast(msg)
                }
            },
            // 民族
            async getNation(){
                let res = await getNation({
                    page:0,
                    size:57
                })
                if(res.code === 200){
                    this.nationality=res.data.list
                }
            },
            // 隶属区域
            async getDistrict(){
                let res =await getDistrict({
                    page:0,
                    size:13
                })
                if(res.code === 200){
                    this.subordinateArea=res.data.list
                }
            },
            // 籍贯
            async getProvince(){
                let res =await getProvince({
                    page:0,
                    size:35
                })
                if(res.code === 200){
                    this.nativePlace=res.data.list
                }
            },
            // 计算年龄
            getBirthday(date){
                if(date!=''){
                    this.upDataList.birthday = date;
                    this.age = (new Date().getFullYear())-Number(date.split('-')[0])
                    this.validateAge()
                }
            },
            validateAge(){
                if(this.age<0){
                    let msg = '请选择'+new Date().getFullYear()+'年'+(new Date().getMonth()+1)+'月前的日期'
                    this.$toast(msg,2500)
                    this.fullBirthday=this.oldBirthday
                    this.age = Number(new Date().getFullYear()) - Number(new Date(this.oldBirthday).getFullYear())
                }
            },
            validate(data,type){
                const regex = /^[0-9]+$/;
                if(type=='diastolicBloodPressur'||type=='systolicBloodPressur'){
                    if(!regex.test(data)&&data!=''){
                    console.log(this.upDataList[type])
                        this.upDataList[type]=''
                        this.$toast('输入数据有误')
                        this.validateLock = false
                    }
                }else if((Number(data)<0||Number(data)>9999)&&data!=''){
                    this.upDataList[type]=''
                    this.$toast('输入数据有误')
                    this.validateLock = false
                }
                let self = this
                setTimeout(function(){
                    self.validateLock = true
                },2000)
            },
            // 返回订单详情
            back(){
                if(this.lock){
                    MessageBox({
                        title: '提示',
                        message: '是否放弃修改?',
                        showCancelButton: true
                    }).then((active) => {
                        if (active !== 'cancel') {
                            this.$router.push({
                                path: '/details',
                                query: {
                                    data:this.$route.query.data
                                }
                            })
                        }
                    });
                }else{
                    this.$router.push({
                        path: '/details',
                        query: {
                            data:this.$route.query.data
                        }
                    })
                }
            },
            // 返回上页
            clickpageUpKey(){
                window.scrollTo(0,0);
                let box1 = document.getElementsByClassName('body-one')[0];
                let box2 = document.getElementsByClassName('body-two')[0];
                box2.style=('height:0px;');
                box1.style=('');
                this.pageUpKey = false;
                this.saveIf = false;
                this.btnTxt = '下一页'
            },
            // 下页/保存/关闭
            async clickBtn(){
                if(this.validateLock){
                    let box1 = document.getElementsByClassName('body-one')[0];
                    let box2 = document.getElementsByClassName('body-two')[0];
                    this.pageUpKey = true;
                    if(!this.saveIf){
                        window.scrollTo(0,0);
                        this.saveIf = true;
                        box1.style=('height:0px;');
                        setTimeout(function(){
                            box2.style=('');
                        },50)
                        if(this.lock){
                            this.btnTxt='保存'
                        }else{
                            this.btnTxt='关闭'
                        }
                    }else{
                        if(this.lock){
                            if(this.cerebralApoplexyFactorList.length){
                                this.upDataList.cerebralApoplexyFactor = ''
                                // for(let i=0;i<this.cerebralApoplexyFactorList.length;i++){
                                //     if(this.cerebralApoplexyFactorList[i]=='null'){
                                //         let del = factorList.splice(i,1)
                                //         console.log(factorList,del)
                                //     }
                                // }
                                this.upDataList.cerebralApoplexyFactor = this.cerebralApoplexyFactorList.join()
                            }else{
                                this.upDataList.cerebralApoplexyFactor = 'null'
                            }
                            if(this.upDataList.residenceContactPhone||this.upDataList.workplaceContactPhone){
                                this.validatePhone(this.upDataList.workplaceContactPhone,this.upDataList.residenceContactPhone)
                            }else{
                                let self = this
                                setTimeout(function(){
                                    if(self.validateLock){
                                        self.pushHealth()
                                    }
                                },500)
                                
                            }
                        }else{
                            this.$router.push({
                                path: '/details',
                                query: {
                                    data:this.$route.query.data
                                }
                            })
                        }
                    }
                    console.log(this.upDataList)
                }
                    
            },
            // 获取健康档案
            async getHealth(){
                Indicator.open('获取档案中...');
                let res = await getHealth({
                    userId : this.data.userId
                })
                if(res.code === 200){
                    if(res.data.list.length){
                        let list = res.data.list[0];
                        if(list.birthday){
                            this.fullBirthday = new Date(list.birthday)
                            this.oldBirthday = new Date(list.birthday)
                            this.getBirthday(list.birthday)
                        }
                        if(list.cerebralApoplexyFactor&&list.cerebralApoplexyFactor!='null'){
                            this.cerebralApoplexyFactorList = list.cerebralApoplexyFactor.split(',')
                        }
                        for(let i in list) {
                            if( i == 'diastolicBloodPressur'||
                                i == 'systolicBloodPressur'||
                                i == 'triglyceride'||
                                i == 'highDensityLipteinCholesterol'||
                                i == 'lowDensityLipteinCholesterol'){
                                if(list[i]){
                                    this.$set(this.upDataList,i,list[i])
                                }
                            }else if(list[i] != null&&list[i] != 'null'){
                                this.$set(this.upDataList,i,list[i])
                            }
                        }
                        this.updataIf = true;
                        if(list.assessmentResult == 1){
                            this.warningLock = true
                        }
                    }else{
                        this.updataIf = false;
                    }
                    Indicator.close();
                }else{
                    Indicator.close();
                    // this.$toast('无法连接服务器')
                }
            },
            // 上传健康档案
            async pushHealth(){
                Indicator.open('保存中...');
                this.upDataList.addTime = this.upToDay +' '+ ((new Date()+'').split(' ')[4])
                if(
                    this.upDataList.name != ''&&
                    this.upDataList.gender != null&&
                    this.upDataList.birthday != ""&&
                    this.upDataList.educationLevel != null&&
                    this.upDataList.residenceAddress != ''&&
                    this.upDataList.sourceOfReferral != null&&
                    this.upDataList.subordinateArea != ''&&
                    this.upDataList.living != null&&
                    this.upDataList.maritalStatus != null&&
                    this.upDataList.medicalPaymentMethod != null&&
                    this.upDataList.smokingStatus != null&&
                    this.upDataList.hereditaryDisease != null&&
                    this.upDataList.takeAntihypertensiveDrugs != null&&
                    this.upDataList.diabetesMellitus != null&&
                    this.upDataList.littlePhysicalExercise != null&&
                    this.upDataList.height != 0&&
                    this.upDataList.weight != 0
                ){
                    for( let i in this.upDataList){
                        if((i == 'diastolicBloodPressur'||
                            i == 'systolicBloodPressur'||
                            i == 'triglyceride'||
                            i == 'highDensityLipteinCholesterol'||
                            i == 'lowDensityLipteinCholesterol')&&
                            (this.upDataList[i])+"" == "" ){
                            this.upDataList[i] = 0
                        }else if((this.upDataList[i])+"" == "" ){
                            this.upDataList[i] = "null"
                        }
                    }
                    let res;
                    if(this.upDataList.smokingStatus == 0){
                        this.upDataList.heavySmoking = 0
                    }
                    if(this.updataIf){
                        res = await updateHealth(this.upDataList);
                    }else{
                        res = await pushHealth(this.upDataList);
                    }
                    if(res.code === 200){
                        Indicator.close();
                        this.$toast('操作成功')
                        this.$router.push({
                            path: '/details',
                            query: {
                                data:this.$route.query.data
                            }
                        })
                    }else{
                        Indicator.close();
                        this.$toast('操作失败')
                    }
                }else{
                    this.$toast('请输入所有必填项')
                    setTimeout(function(){
                        Indicator.close();
                    },50)
                }
            },
            validateName(item,data){
                console.log(item,data)
                const regex = /^[\u4e00-\u9fa5_a-zA-Z]+$/;
                if(!regex.test(item)&&item){
                    this.upDataList[data]=''
                    this.$toast('请输入合法内容')
                    this.validateLock = false
                }
                let self = this
                setTimeout(function(){
                    self.validateLock = true
                },1500)
            },
            validateNum(){
                let height = this.upDataList.height
                let weight = this.upDataList.weight
                if(height<0.5||height>3){
                    this.upDataList.height = 0
                    this.$toast('身高输入有误')
                }
                if(weight<20||weight>300){
                    this.upDataList.weight = 0
                    this.$toast('身高输入有误')
                }
            }
        },
        created(){
            Indicator.close();
            if(this.$route.query.data == '[object Object]'){
                this.data = JSON.parse(localStorage.getItem('nurseOrderCopyDatas'))
                if(this.data.orderStatus==4){
                    this.lock = 1
                }
            }else{
                this.data = this.$route.query.data.contact
                this.lock = Number(this.$route.query.upLock.upLock)
            }
            this.secondaryName = this.data.contact
            this.upDataList.userId = this.data.userId
            this.upDataList.name = this.data.contact
            this.getNation()
            this.getDistrict()
            this.getProvince()
            this.getDay()
            this.getHealth()
        },
        mounted(){
            window.scrollTo(0,0);
        }
    }
</script>

<style lang="less" scoped>
.health-body{
    background: #F7F7F7;
    min-height: 100%;
    width: 100%;
    .top-bar{
        width: 100%;
        height: 306px;
        background: #F7F7F7;
        position: fixed;
        top:0;
        left: 0;
        z-index: 10;
        >h5{
            height:34px;
            font-size:24px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(0,123,255,1);
            line-height:34px;
            position: absolute;
            top: 244px;
            right: 32px;
        }
        >h4{
            height:40px;
            font-size:28px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgb(185, 57, 57);
            line-height:40px;
            position: absolute;
            top: 265px;
            left: 32px;
        }
        >.go-back{
            position: absolute;
            top: 56px;
            left: 15px;
            width: 180px;
            height: 52px;
            text-align: left;
            >.ivu-icon{
                line-height:28px;
                font-size: 52px; 
            }
            >span{
                font-size:34px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:52px; 
            }
        }
        >h1{
            height:48px;
            font-size:34px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(1,122,255,1);
            line-height:48px;
            position: absolute;
            top: 52px;
            right: 30px;
        }
        >h2{
            height:56px;
            font-size:40px;
            font-family:PingFangSC;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:56px;
            position: absolute;
            top: 170px;
            left: 32px;
            >span{
                font-size:28px;
            }
            .warning{
                color: #FC4634;
            }
        }
        >h3{
            height:40px;
            font-size:28px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:40px;
            position: absolute;
            top: 226px;
            left: 32px;
        }
    } 
    .body-one{
        width: 100%;
        height: 1490px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        margin-top: 306px;
        /*overflow: hidden;*/
        transition: all .3s;
        >.one-box1{
            width: 686px;
            height: 304px;
            border-bottom: 2px solid  #DEDEDE;
            margin: 0 auto;
            position: relative;
            >h1{
                height:44px;
                font-size:32px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(68,68,68,1);
                line-height:44px;
                position: absolute;
                left: 0;
            }
            >h1:nth-of-type(1){
                top: 42px;
            }
            >h1:nth-of-type(2){
                top: 130px;
            }
            >h1:nth-of-type(3){
                top: 218px;
            }
            >.sourceOfReferral{
                width:384px;
                background:rgba(248,248,248,1);
                border-radius:10px;
                border:2px solid rgba(230,230,230,1);
                position: absolute;
                top: 40px;
                left: 176px;
            }
            >.living{
                width:384px;
                background:rgba(248,248,248,1);
                border-radius:10px;
                border:2px solid rgba(230,230,230,1);
                position: absolute;
                top: 128px;
                left: 176px;
            }
            >.subordinateArea{
                width:384px;
                background:rgba(248,248,248,1);
                border-radius:10px;
                border:2px solid rgba(230,230,230,1);
                position: absolute;
                top: 216px;
                left: 176px;
            }
        }
        >.one-box2{
            width: 686px;
            height: 820px;
            margin: 0 auto;
            border-bottom: 2px solid  #DEDEDE;
            position: relative;
            >div{
                width: 100%;
                height: 48px;
                margin-bottom: 42px; 
                position: relative;
                text-align: left;
                >span{
                    padding-right: 20px; 
                    font-size:32px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(68,68,68,1);
                    line-height:44px;
                }
                >.name{
                    width: 204px;
                    margin-right: 80px; 
                }
                >.birthday{
                    width: 204px;
                    margin-right: 16px; 
                }
                >.nativePlace{
                    width: 204px;
                    margin-right: 70px;
                }
                >.educationLevel{
                    width: 204px;
                }
                >.nationality{
                    width: 204px;
                    margin-right: 80px;
                }
                >.occupation{
                    width: 204px;
                }
                >.maritalStatus{
                    width: 204px;
                }
                >.medicalPaymentMethod{
                    width: 204px;
                }
                >.residenceAddress{
                   width:498px; 
                }
                >.residenceAddress{
                    width:204px; 
                }
                >.workplace{
                    width:498px; 
                }
                >.workplaceContact{
                    width:204px; 
                }
                >.workplaceContactPhone{
                    width:204px; 
                }
            }
            >div:nth-of-type(1){
                margin-top: 42px;
            }
        }
        >.one-box3{
            width: 686px;
            height: 300px;
            margin: 0 auto;
            position: relative;
            >div{
                width: 100%;
                height: 48px;
                margin-bottom: 40px;
                text-align: left;
                >span{
                    font-size:32px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(68,68,68,1);
                    line-height:48px;
                    padding-right: 20px;
                }
                >.residenceAddress{
                    width: 498px;
                }
                >.residenceContact{
                    width: 204px;
                    margin-left: 20px;
                }
                >.relation{
                    width: 204px;
                }
                >.residenceContactPhone{
                    width: 246px;
                }
            }
            >div:nth-of-type(1){
                margin-top: 40px;
            }
        }
    }
    .body-two{
        width: 100%;
        // height: 1900px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        position: relative;
        overflow: hidden;
        transition: all .3s;
        >h1{
            height:56px;
            font-size:40px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:56px;
            position: absolute;
            top: 40px;
            left: 32px;
        }
        >div{
            width: 686px;
            margin: 40px auto 0;
            position: relative;
            border-bottom: 2px solid #DEDEDE; 
            >h5{
                width:44px;
                height:44px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:2px solid rgba(102,102,102,1);
                position: absolute;
                top: 0;
                left: 0;
            }
            >h4{
                height:44px;
                font-size:32px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(68,68,68,1);
                line-height:44px;
                position: absolute;
                top: 0;
                left: 64px;
                text-align: left;
                >span{
                    font-size:24px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(153,153,153,1); 
                    margin-right: 20px; 
                }
                >.diabetesMellitus{
                    margin-left: 30px;
                }
                >.height{
                    width: 90px;
                }
                >.weight{
                    width: 90px;
                }
            }
            >div{
                width: 100%;
                min-height: 48px;
                text-align: left;
                margin-bottom: 40px;
                box-sizing: content-box;
                >.explain{
                    padding: 0 64px;
                    font-size:24px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                >span{
                    font-size:24px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
                >.diastolicBloodPressur{
                    width: 120px;
                    margin-right: 40px;
                }
                >.systolicBloodPressur{
                    width: 120px;
                }
                >.triglyceride{
                    width: 150px;
                }
                >.highDensityLipteinCholesterol{
                    width: 150px;
                }
                >.lowDensityLipteinCholesterol{
                    width: 150px;
                }
                >.littlePhysicalExercise{
                    padding-left: 170px;
                }
                >.smokingStatus{
                    padding-left: 170px;
                }
                >.hereditaryDisease{
                    padding-left: 170px;
                }
            }
            >.cerebralApoplexyFactor{
                width: 592px;
                text-align: left;
                position: relative;
                top: 0;
                left: 70px;
                font-size:28px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(102,102,102,1);
            }
        }
        >div:nth-of-type(1){
            margin-top: 142px;
            padding-bottom: 44px; 
        }
    }
    .bottom-btn{
        width:100%;
        height:232px;
        background:rgba(247,247,247,1);
        position: relative;
        >.btn{
            background:rgba(71,189,195,1);
            border-radius:10px;
            position: absolute;
            top: 72px;
            left: 50%;
            margin-left: -345px;
            width: 690px;
            height: 80px;
            font-size:30px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:80px;
        }
    }
}
</style>
<style scoped>
.health-body>>>.ivu-input{
    height:48px;
}
.health-body>>>.ivu-select{
    height:48px;
}
.health-body>>>.ivu-select-selection{
    height: 48px;
}
.health-body>>>.ivu-select-placeholder{
    height: 48px;
    line-height: 48px;
}
.body-one>>>.ivu-select-selected-value{
    height: 48px;
    line-height: 48px;
}
.health-body >>> .ivu-radio-checked .ivu-radio-inner {
    border-color: #47BDC3;
}
.health-body >>> .ivu-radio-inner:after {
    background-color: #47BDC3;
}
.body-two >>> .ivu-checkbox{
    /* border-radius: 50%;  */
    overflow: hidden;
    /* background:rgba(235,235,235,1); */
    width:100%;
    height:32px;
}
.body-two >>> .ivu-checkbox-wrapper{
    position: relative;
    margin-bottom: 30px;
}
.body-two >>> .ivu-checkbox-wrapper span:nth-of-type(2){
    /* position: absolute;
    right: 0;
    min-width: 6em; */
    float: right;
    margin-top: -1.5em;
}
.body-two >>> .ivu-checkbox-checked>.ivu-checkbox-inner{
    background:rgba(71,189,195,1);
}
.body-two >>> .ivu-checkbox-inner{
    border: 0;
    border-radius: 50%; 
    background:rgba(235,235,235,1);
    width:32px;
    height:32px;
}
.body-two >>> .ivu-checkbox-inner:after{
    position: relative;
    top: 6px;
    left: 12px;
}
.health-body>>>.ivu-select-disabled .ivu-select-selection{
    color: #000;
}
.health-body>>>.ivu-input[disabled], fieldset[disabled] .ivu-input{
    color: #000;
}
.ivu-input-number>>>.ivu-input-number-handler-wrap{
    display: none;
}
.ivu-date-picker >>> input{
    pointer-events: none; 
}
.ivu-date-picker >>> .ivu-input-suffix{
    display: none
}
.ivu-date-picker >>> .ivu-input-with-suffix{
    padding-right: 0;
}
</style>
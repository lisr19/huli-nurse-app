<template>
    <div class="FRA-body">
        <div class="top-bar">
            <div class="go-back" @click="back()">
                <Icon type="ios-arrow-back" />
                <span>返回</span>
            </div>
            <h1 class="browse" @click="openBrowse">预览</h1>
            <h2 class="table-name">{{tableName}}
                <span>{{secondaryName}}</span>
            </h2>
            <h3>评估日期：{{toDay}}</h3>
        </div>
        <p></p>
        <div v-for="(item,index) in FRADataList" :key="index" @click="clickIndex = index" class="type-box">
            <h1>{{item.name}}</h1>
            <h2>{{item.score}}分</h2>
            <p></p>
            <span v-for="(types,indexs) in item.types" :key="indexs" @click="getTypeScore()">
                <Checkbox v-model="types.status">{{types.type}}</Checkbox>
            </span>
        </div>
        <div class="btn-box">
            <div class="btn" @click="clickUpdataFRA">保存表格</div>
        </div>
        <div v-if="browseLock" class="browse-box">
            <p @click="browseLock = false"></p>
            <div class="browse">
                <h1>{{tableName}}</h1>
                <h3>评估日期：{{toDay}}</h3>
                <h2>{{browseScore}}<span>分</span></h2>
                <h4>{{level}}</h4>
            </div>
        </div>
    </div>
</template>

<script>
    import { addFRA , getFRA , updataFRA } from '@/lib/API/FRA'
    import { MessageBox , Indicator } from 'mint-ui';
    export default {
        name: '',
        computed:{
            nuserId(){
                return this.$store.state.user.userId
            }
        },
        data() {
            return {
                toDay:'',
                upToDay:'',
                tableName:'跌倒风险评估量表',
                secondaryName:'',
                level:'',
                browseScore:0,
                FRAId:null,
                clickIndex:null,
                browseLock:false,
                updataLock:false,
                FRADataList:[
                    {
                        name:'运动',
                        score:0,
                        types:[
                            {type:'步态异常/假肢',name:'gaitAbnormality',score:3,status:false},
                            {type:'行走需要辅助设施',name:'needAuxiliaryFacilities',score:3,status:false},
                            {type:'行走需要旁人帮助',name:'needHelp',score:3,status:false},
                        ]
                    },
                    {
                        name:'跌倒史',
                        score:0,
                        types:[
                            {type:'有跌倒史',name:'fallHistory',score:2,status:false},
                            {type:'因跌倒住院',name:'hospitalizationForFall',score:3,status:false},
                        ]
                    },
                    {
                        name:'精神不稳定状态',
                        score:0,
                        types:[
                            {type:'谵妄',name:'delirium',score:3,status:false},
                            {type:'痴呆',name:'dementia',score:3,status:false},
                            {type:'兴奋/行为异常',name:'abnormalBehavior',score:2,status:false},
                            {type:'意识恍惚',name:'consciousnessTrance',score:3,status:false},
                        ]
                    },
                    {
                        name:'自控能力',
                        score:0,
                        types:[
                            {type:'大便/小便失禁',name:'incontinence',score:1,status:false},
                            {type:'频率增加',name:'increasedFrequency',score:1,status:false},
                            {type:'保留导尿',name:'retentionCatheterization',score:1,status:false},
                        ]
                    },
                    {
                        name:'感觉障碍',
                        score:0,
                        types:[
                            {type:'视觉受损',name:'visualImpairment',score:1,status:false},
                            {type:'听觉受损',name:'hearingImpairment',score:1,status:false},
                            {type:'感觉性失语',name:'sensoryAphasia',score:1,status:false},
                            {type:'其他情况',name:'otherImpairment',score:1,status:false},
                        ]
                    },
                    {
                        name:'睡眠状况',
                        score:0,
                        types:[
                            {type:'多醒',name:'easyWakeup',score:1,status:false},
                            {type:'失眠',name:'insomnia',score:1,status:false},
                            {type:'夜游症',name:'noctambulism',score:1,status:false},
                        ]
                    },
                    {
                        name:'用药史',
                        score:0,
                        types:[
                            {type:'新药',name:'newDrug',score:1,status:false},
                            {type:'心血管药物',name:'cardiovascularDrug',score:1,status:false},
                            {type:'降压药',name:'antihypertensiveDrug',score:1,status:false},
                            {type:'镇静、催眠药',name:'hypnoticsDrug',score:1,status:false},
                            {type:'戒断治疗',name:'abstinenceTherapy',score:1,status:false},
                            {type:'糖尿病用药',name:'diabetesMellitusDrug',score:1,status:false},
                            {type:'抗癫痫药',name:'antiepileptic',score:1,status:false},
                            {type:'麻醉药',name:'narcotic',score:1,status:false},
                            {type:'其他',name:'otherDrug',score:1,status:false},
                        ]
                    },
                    {
                        name:'相关病史',
                        score:0,
                        types:[
                            {type:'神经科疾病',name:'neurologicalDiseases',score:1,status:false},
                            {type:'骨质疏松症',name:'osteoporosis',score:1,status:false},
                            {type:'骨折史',name:'fracture',score:1,status:false},
                            {type:'低血压',name:'hypotension',score:1,status:false},
                            {type:'药物/乙醇戒断',name:'drugWithdrawal',score:1,status:false},
                            {type:'缺氧症',name:'hypoxia',score:1,status:false},
                            {type:'年龄80岁及以上',name:'over80',score:3,status:false},
                        ]
                    },
                ]
            }
        },
        methods:{
            // 返回订单详情
            back(){
                // this.$router.push({name:'订单详情',query:{data:this.$route.query.data}})
                MessageBox({
                    title: '提示',
	                message: '是否放弃修改?',
                    showCancelButton: true
                }).then((active) => {
                    if (active !== 'cancel') {
                        this.$router.push({
                            path: '/details',
                            query: {
                                data:this.data
                            }
                        })
                    }
                });
            },
            // 获得日期
            getDay(){
                let Y = new Date().getFullYear()+'';
                let M = new Date().getMonth()+1+'';
                let D = new Date().getDate()+'';
                let T = (new Date()+'').split(' ')[4];
                if(M.length === 1) M = '0' + M;
                if(D.length === 1) D = '0' + D;
                this.toDay = Y+'.'+M+'.'+D;
                this.upToDay = Y+'-'+M+'-'+D+' '+T;
            },
            // 计算分数
            getTypeScore(){
                let _this = this
                setTimeout(function(){
                    _this.FRADataList[_this.clickIndex].score = 0;
                    let listIndex = _this.clickIndex
                    for(let i=0;i<_this.FRADataList[listIndex].types.length;i++){
                        if(_this.FRADataList[listIndex].types[i].status){
                            _this.FRADataList[listIndex].score += _this.FRADataList[listIndex].types[i].score
                        }
                    }
                },50)
            },
            // 上传表单
            async clickUpdataFRA(){
                Indicator.open('保存中...');
                let updataList = {
                    userId:this.data.userId,
                    nurseId:this.nuserId,
                    score:0
                };
                for(let i=0;i<this.FRADataList.length;i++){
                    for(let j=0;j<this.FRADataList[i].types.length;j++){
                        if(this.FRADataList[i].types[j].status){
                            updataList[this.FRADataList[i].types[j].name] = this.FRADataList[i].types[j].score
                        }else{
                            updataList[this.FRADataList[i].types[j].name] = 0
                        }
                    }
                    updataList.score += this.FRADataList[i].score
                }
                let res;
                if(this.updataLock){
                    updataList.id = this.FRAId
                    res = await updataFRA(updataList)
                }else{
                    res = await addFRA(updataList)
                }
                if(res.code === 200){
                    Indicator.close();
                    this.$toast('保存成功')
                    this.$router.push({
                        path: '/details',
                        query: {
                            data:this.data
                        }
                    })
                }else{
                    Indicator.close();
                    console.log(res)
                    this.$toast('操作失败')
                }
            },
            // 查询表单
            async getFRAList(){
                let res = await getFRA({
                    userId:this.data.userId,
                })
                if(res.code === 200){
                    if(res.data.list[0]){
                        this.updataLock = true
                        let list = res.data.list[0]
                        this.FRAId = list.id
                        for(let i in list){
                            if(list[i]!=0){
                                for(let j=0;j<this.FRADataList.length;j++){
                                    for(let l=0;l<this.FRADataList[j].types.length;l++){
                                        if(i == this.FRADataList[j].types[l].name){
                                            this.FRADataList[j].types[l].status = true;
                                            this.FRADataList[j].score += this.FRADataList[j].types[l].score;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            // 打开浏览
            openBrowse(){
                this.browseLock = true
                let score = 0;
                for(let i=0;i<this.FRADataList.length;i++){
                    score += this.FRADataList[i].score
                }
                this.browseScore = score
                if(score == 0){
                    this.level = '安全'
                }else if(score >= 1 && score < 3){
                    this.level = '低危'
                }else if(score >= 3 && score < 10){
                    this.level = '中危'
                }else if(score >= 10){
                    this.level = '高危'
                }
            }
        },
        created(){
            if(this.$route.query.data == '[object Object]'){
                this.data = JSON.parse(localStorage.getItem('nurseOrderCopyDatas'))
            }else{
                this.data = this.$route.query.data
            }
            this.getDay()
        },
        mounted(){
            this.getFRAList()
            window.scrollTo(0,0);
        }
    }
</script>

<style lang="less" scoped>
    .FRA-body{
        background:rgba(247,247,247,1);
        width: 100%;
        // min-height: 100%;
        .top-bar{
            width: 100%;
            height: 306px;
            background: #F7F7F7;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
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
        >p{
            margin-top: 306px;
        }
        >.type-box{
            width: 100%;
            background:rgba(255,255,255,1);
            border-radius:10px;
            margin-top: 22px;
            position: relative;
            >p{
                padding-top: 110px;
                width: 1px;
                height: 1px;
            }
            >h1{
                height:56px;
                font-size:40px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:56px; 
                position: absolute;
                top: 30px;
                left: 32px;
            }
            >h2{
                height:40px;
                font-size:28px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:40px;
                position: absolute;
                top: 38px;
                right: 64px;
            }
            >span{
                margin: 0 auto;
                width: 686px;
                display: block;
                border-top: 2px solid #DEDEDE; 
            }
            >span:nth-of-type(1){
                border-top:0;
            }
        }
        >.btn-box{
            width: 100%;
            height: 268px;
            background:rgba(247,247,247,1);
            position: relative;
            .btn{
                width:690px;
                height:80px;
                background: #47BDC3;
                border-radius:10px;
                font-size:30px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
                line-height:80px;
                position: absolute;
                top: 42px;
                left: 50%;
                margin-left: -345px;
            }
        }
        >.browse-box{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
            background:rgba(0,0,0,0.45);
            >p{
                width: 100%;
                height: 100%;
            }
            >.browse{
                width:686px;
                height:162px;
                background:rgba(255,255,255,1);
                border-radius:16px;
                position: absolute;
                top:148px;
                left: 32px;
                >h1{
                    height:44px;
                    font-size:32px;
                    font-family:PingFangSC;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    line-height:44px;
                    position: absolute;
                    top: 38px;
                    left: 26px;
                }
                >h3{
                    height:34px;
                    font-size:24px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:34px;
                    position: absolute;
                    bottom: 38px;
                    left: 26px;
                }
                >h2{
                    height:124px;
                    font-size:88px;
                    font-family:PingFangSC;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    line-height:124px;
                    position: absolute;
                    top: 14px;
                    left: 342px;
                    >span{
                        font-size:40px;
                    }
                }
                >h4{
                    height:80px;
                    font-size:56px;
                    font-family:PingFangSC;
                    font-weight:500;
                    color:rgba(71,189,195,1);
                    line-height:80px;
                    position: absolute;
                    top: 46px;
                    right: 24px;
                }
            }
        }
    }
</style>

<style scoped>
    .type-box >>> .ivu-checkbox-wrapper{
        display: block;
        margin: 0 auto;
        width: 686px;
        height: 86px;
        font-size: 28px;
        color: #666;
        text-align: left;
        line-height: 86px;
        border-top: 2px solid #DEDEDE; 
    }
    .type-box >>> .ivu-checkbox-wrapper:nth-of-type(1){
        border-top:0;
    }
    .ivu-checkbox-wrapper >>> .ivu-checkbox{
        display: block;
        float: right;
        width: 44px;
        height: 44px;
        border-radius: 22px;
        overflow: hidden;
        margin-top: 18px;
        margin-right: 46px;
    }

    .ivu-checkbox-wrapper >>> .ivu-checkbox-inner{
        width: 44px;
        height: 44px;
        border: 0px;
        background-color: #DDD;
    }
    .ivu-checkbox-wrapper >>> .ivu-checkbox-checked .ivu-checkbox-inner{
        background-color: #47BDC3;
    }
    .ivu-checkbox-wrapper >>> .ivu-checkbox-inner:after{
        width: 15px;
        height: 25px;
        top: 7px;
        left: 15px;
    }
</style>
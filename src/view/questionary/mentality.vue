<template>
    <div class="mentality-body">
        <div class="top-bar">
            <div class="go-back" @click="back()">
                <Icon type="ios-arrow-back" />
                <span>返回</span>
            </div>
            <h1 class="browse" @click="browseLock = true">预览</h1>
            <h2 class="table-name">{{tableName}}
                <span>{{secondaryName}}</span>
            </h2>
            <h3>评估日期：{{toDay}}</h3>
        </div>
        <div class="mentality-table-1">
            <h1>{{mentData.name}}
                <span>共{{mentData.issues.length}}分</span>
            </h1>
            <h2>得{{mentDataScores.length}}分</h2>
            <p></p>
            <CheckboxGroup v-model="mentDataScores">
                <Checkbox v-for="(item,index) in mentData.issues" :key="index" :label="item.name">
                    <span>{{item.issue}}</span>
                </Checkbox>
            </CheckboxGroup>
        </div>
        <div class="mentality-table-2">
            <h1>语言功能检测
                <span>共20分</span>
            </h1>
            <h2>得{{mentData2Scores.length}}分</h2>
            <p></p>
            <div v-for="(item,index) in mentData2" :key="index">
                <h3>{{item.name}}</h3>
                <img v-if="item.className=='img'" src="@/assets/img/mentality.png" alt="">
                <CheckboxGroup v-model="mentData2Scores">
                    <Checkbox v-for="(items,indexs) in item.issues" :key="indexs" :label="items.name">
                        <span>{{items.issue}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </div>
        </div>
        <div class="btn-box">
            <div class="btn" @click="clickUpdataMmse">保存表格</div>
        </div>
        <div v-if="browseLock" class="browse-box">
            <p @click="browseLock = false"></p>
            <div class="browse">
                <h1>{{tableName}}</h1>
                <h3>评估日期：{{toDay}}</h3>
                <h2>{{updataList.score}}<span>分</span></h2>
                <h4>{{level}}</h4>
            </div>
        </div>
    </div>
</template>

<script>
import { addMmse , getMmse , updataMmse } from '@/lib/API/mmse'
import { MessageBox , Indicator  } from 'mint-ui';
    export default {
        name: '',
        computed:{
            nuserId(){
                return this.$store.state.user.userId
            }
        },
        data() {
            return {
                data:{},
                toDay:'',
                upToDay:'',
                tableName:'简易精神状态量表',
                secondaryName:'',
                level:'',
                updataLock:false,
                browseLock:false,
                mmseId:null,
                mentData:{
                    name:'定向能力检测',
                    score:0,
                    className:'',
                    issues:[
                        {issue:'01.今年的年份？',name:'directionalAbilityQ1',score:1},
                        {issue:'02.现在是什么季节？',name:'directionalAbilityQ2',score:1},
                        {issue:'03.现在是几月？',name:'directionalAbilityQ3',score:1},
                        {issue:'04.今天是几号？',name:'directionalAbilityQ4',score:1},
                        {issue:'05.今天是星期几？',name:'directionalAbilityQ5',score:1},
                        {issue:'06.现在我们在哪个省、市？',name:'directionalAbilityQ6',score:1},
                        {issue:'07.你住在什么区（县）？',name:'directionalAbilityQ7',score:1},
                        {issue:'08.住在什么街道？',name:'directionalAbilityQ8',score:1},
                        {issue:'09.我们现在是第几层楼？',name:'directionalAbilityQ9',score:1},
                        {issue:'10.这儿是什么地方？',name:'directionalAbilityQ10',score:1},
                    ]
                },
                mentDataScores:[],
                mentData2:[
                    {
                        name:'01.现在我要说三样东西的名称,在我讲完之后,请你重复说一遍,请你记住这三样东西, 因为等一下要再问你的：“皮球、国旗、树木”。(以第一次答案记分)。',
                        score:0,
                        className:'',
                        issues:[
                            {issue:'皮球',name:'immediateRecollectionQ1',score:1},
                            {issue:'国旗',name:'immediateRecollectionQ2',score:1},
                            {issue:'树木',name:'immediateRecollectionQ3',score:1},
                        ]
                    },
                    {
                        name:'02.现在请你从100减去7，然后从所得的数目再减去7，如此一直计算下去，把每一个答案都告诉我，直到我说“停”为止。（若错了，但下一个答案是对的，那么只记一次错误）',
                        score:0,
                        className:'',
                        issues:[
                            {issue:'93',name:'calculationQ1',score:1},
                            {issue:'86',name:'calculationQ2',score:1},
                            {issue:'79',name:'calculationQ3',score:1},
                            {issue:'72',name:'calculationQ4',score:1},
                            {issue:'65',name:'calculationQ5',score:1},
                        ]
                    },
                    {
                        name:'03.现在请你告诉我,刚才我要你记住的三样东西是什么? ',
                        score:0,
                        className:'',
                        issues:[
                            {issue:'皮球',name:'delayedMemoryQ1',score:1},
                            {issue:'国旗',name:'delayedMemoryQ2',score:1},
                            {issue:'树木',name:'delayedMemoryQ3',score:1},
                        ]
                    },
                    {
                        name:'04.请问这是什么?(测试人员拿出对应物品)',
                        score:0,
                        className:'',
                        issues:[
                            {issue:'手表',name:'languageFunctionQ1',score:1},
                            {issue:'笔',name:'languageFunctionQ2',score:1}
                        ]
                    },
                    {
                        name:'05.现在我要说一句话, 请清楚地重复一遍, 这句话是:“四十四只石狮子”(只说一遍,只有正确、咬字清楚的才记1分)',
                        score:0,
                        className:'',
                        issues:[
                            {issue:'正确',name:'languageFunctionQ3',score:1}
                        ]
                    },
                    {
                        name:'06.（测试人员把写有“闭上你的眼睛” 大字的卡片交给受试者）请照着这张卡片所写的去做。',
                        score:0,
                        className:'',
                        issues:[
                            {issue:'闭上眼睛',name:'languageFunctionQ4',score:1}
                        ]
                    },
                    {
                        name:'07.(测试人员说下面一段话，并给他一张空白纸，不要重复说明，也不要示范) 用右手拿这张纸,再用双手把纸对折,将纸放在大腿上,',
                        score:0,
                        className:'',
                        issues:[
                            {issue:'用右手拿这张纸',name:'languageFunctionQ5',score:1},
                            {issue:'再用双手把纸对折',name:'languageFunctionQ6',score:1},
                            {issue:'将纸放在大腿上',name:'languageFunctionQ7',score:1}
                        ]
                    },
                    {
                        name:'08.请你说一句完整的、有意义的句子',
                        score:0,
                        className:'',
                        issues:[
                            {issue:'有主语、动词',name:'languageFunctionQ8',score:1}
                        ]
                    },
                    {
                        name:'09.请你按样子画图。',
                        score:0,
                        className:'img',
                        issues:[
                            {issue:'得分',name:'structuralImitation',score:1}
                        ]
                    },
                ],
                mentData2Scores:[],
                updataList:{
                    userId : '',
                    nurseId : '',
                    addTime : '',
                    directionalAbilityQ1: 0,
                    directionalAbilityQ2: 0,
                    directionalAbilityQ3: 0,
                    directionalAbilityQ4: 0,
                    directionalAbilityQ5: 0,
                    directionalAbilityQ6: 0,
                    directionalAbilityQ7: 0,
                    directionalAbilityQ8: 0,
                    directionalAbilityQ9: 0,
                    directionalAbilityQ10:0,
                    immediateRecollectionQ1: 0,
                    immediateRecollectionQ2: 0,
                    immediateRecollectionQ3: 0,
                    delayedMemoryQ1:0,
                    delayedMemoryQ2:0,
                    delayedMemoryQ3:0,
                    calculationQ1: 0,
                    calculationQ2: 0,
                    calculationQ3: 0,
                    calculationQ4: 0,
                    calculationQ5: 0,
                    languageFunctionQ1: 0,
                    languageFunctionQ2: 0,
                    languageFunctionQ3: 0,
                    languageFunctionQ4: 0,
                    languageFunctionQ5: 0,
                    languageFunctionQ6: 0,
                    languageFunctionQ7: 0,
                    languageFunctionQ8: 0,
                    structuralImitation: 0,
                    score: 0, 
                },
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
            // 总分计算
            mentOneScore(){
                this.updataList.score = this.mentDataScores.length+this.mentData2Scores.length;
                if(this.updataList.score < 10){
                    this.level = '重度'
                }else if(this.updataList.score >= 10 && this.updataList.score <= 20){
                    this.level = '中度'
                }else if(this.updataList.score >= 21 && this.updataList.score < 27){
                    this.level = '轻度'
                }else if(this.updataList.score >= 27){
                    this.level = '正常'
                }
            },
            // 获取mmse表数据
            async getMmseData(){
                let res = await getMmse({userId : this.data.userId})
                if(res.code === 200){
                    if(res.data.list[0]){
                        this.updataLock = true
                        this.mmseId = res.data.list[0].id
                        let list = res.data.list[0]
                        for(let i in list){
                            if(i.split('Q').length === 2){
                                if(i.split('Q')[0] == 'directionalAbility'&&list[i]===1){
                                    this.mentDataScores.push(i)
                                }else if(list[i]===1){
                                    this.mentData2Scores.push(i)
                                }
                            }else if(i.split('Q')[0] == 'structuralImitation'&&list[i]===1){
                                this.mentData2Scores.push(i)
                            }
                        }
                    }
                }
            },
            // 上传表
            async clickUpdataMmse(){
                Indicator.open('保存中...');
                for(let i=0;i<this.mentDataScores.length;i++){
                    this.updataList[this.mentDataScores[i]] = 1;
                }
                for(let i=0;i<this.mentData2Scores.length;i++){
                    this.updataList[this.mentData2Scores[i]] = 1;
                }
                this.updataList.nurseId = this.nuserId;
                this.updataList.userId = this.data.userId;
                // for(let i in this.updataList){
                //     this.updataList[i]+=''
                // }
                this.updataList.addTime = this.upToDay;
                let res ;
                console.log(this.updataList)
                if(this.updataLock){
                    this.updataList.id = this.mmseId;
                    res = await updataMmse(this.updataList);
                }else{
                    res = await addMmse(this.updataList);
                }
                if(res.code === 200){
                    Indicator.close();
                    this.$toast('保存成功')
                    MessageBox({
                        title: '提示',
                        message: '《MMSE简易精神量表》已填写完成，是否要打开《跌倒风险评估量表》?',
                        showCancelButton: true,
                        closeOnClickModal:false,
                        confirmButtonText:'是',
                        cancelButtonText:'否(退回详情)'
                    }).then((active) => {
                        if (active == 'cancel') {
                            this.$router.push({
                                path: '/details',
                                query: {
                                    data:this.data
                                }
                            })
                        }else if (active == 'confirm') {
                            this.$router.push({
                                path: '/tumble',
                                query: {
                                    data:this.data
                                }
                            })
                        }
                    });
                    // this.$router.push({
                    //     path: '/details',
                    //     query: {
                    //         data:this.data
                    //     }
                    // })
                }else{
                    Indicator.close();
                    console.log(res)
                    this.$toast('操作失败')
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
            this.getMmseData()
            window.scrollTo(0,0);
        },
        updated(){
            this.mentOneScore()
        }
    }
</script>

<style lang="less" scoped>
    .mentality-body{
        background: rgba(247,247,247,1);
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
        .mentality-table-1{
            width: 100%;
            padding-top: 306px;
            background: #fff;
            position: relative;
            >h1{
                font-size:40px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:56px;
                position: absolute;
                top: 336px;
                left: 32px;
                >span{
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:40px;
                    padding-left: 12px;
                }
            }
            >h2{
                height:40px;
                font-size:28px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:40px; 
                position: absolute;
                top: 348px;
                right: 62px;
            }
            >p{
                width: 1px;
                left: 1px;
                padding-top: 104px;
            }
        }
        .mentality-table-2{
            width: 100%;
            margin-top: 22px;
            background: #fff;
            position: relative;
            overflow-x: hidden;
            >h1{
                font-size:40px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:56px;
                position: absolute;
                top: 30px;
                left: 32px;
                >span{
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:40px;
                    padding-left: 12px;
                }
            }
            >h2{
                height:40px;
                font-size:28px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:40px; 
                position: absolute;
                top: 42px;
                right: 62px;
            }
            >p{
                width: 1px;
                left: 1px;
                padding-top: 104px;
            }
            >div{
                margin: 0 auto;
                width: 686px;
                border-top: 2px solid #DEDEDE; 
                padding-bottom: 42px;
                text-align: left;
                font-size:28px;
                font-family:PingFangSC;
                color:rgba(102,102,102,1);
                >h3{
                    margin-top: 38px;
                    font-weight:400;
                }
                >img{
                    display: block;
                    width: 90%;
                    height: auto;
                    margin: 10px auto 0;
                }
            }
            >div:nth-of-type(1){
                border: 0;
            }
        }
        .btn-box{
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
        .browse-box{
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
    .mentality-body >>> .ivu-checkbox-group{
        display: block;
    }
    .mentality-table-1 >>> .ivu-checkbox-group-item{
        display: block;
        margin: 0 auto;
        width: 686px;
        height: 86px;
        font-size: 28px;
        color: #666;
        text-align: left;
        line-height: 86px;
        border-top: 2px solid #DEDEDE; 
        position: relative;
    }
    .mentality-table-1 >>> .ivu-checkbox-group-item:nth-of-type(1){
        border-top: 0; 
    }
    .mentality-table-1 .ivu-checkbox-group-item >>> .ivu-checkbox{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .mentality-table-2 >>>.ivu-checkbox-group-item {
        position: relative;
    }
    .mentality-table-2 .ivu-checkbox-group-item >>> .ivu-checkbox{
        display: block;
        float:right;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0%;
    }
    .mentality-table-1 .ivu-checkbox-group-item >>> .ivu-checkbox-inner{
        width: 44px;
        height: 44px;
        border-radius: 22px;
        border: 0px;
        background-color: #DDD;
        top: 50%;
        left: 90%;
        margin-top: -22px; 
    }
    .mentality-table-2 .ivu-checkbox-group-item >>>.ivu-checkbox-input{
        left: 0px;
        width: 200%;
    }
    .mentality-table-2 .ivu-checkbox-group-item >>> .ivu-checkbox-inner{
        width: 44px;
        height: 44px;
        border-radius: 22px;
        border: 0px;
        background-color: #DDD;
        display: block;
        left: 98%;
        margin-right: 20px;
        box-sizing: content-box;
    }
    .mentality-table-1 .ivu-checkbox-group-item >>> span:nth-of-type(2){
        display: block;
        position: absolute;
        top: 10px;
    }
    .ivu-checkbox-group-item >>> .ivu-checkbox-checked .ivu-checkbox-inner{
        background-color: #47BDC3;
    }
    .ivu-checkbox-group-item >>> .ivu-checkbox-inner:after{
        width: 15px;
        height: 25px;
        top: 7px;
        left: 15px;
    }
    .mentality-table-2 >>> .ivu-checkbox-group{
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }
    .mentality-table-2 >>> .ivu-checkbox-wrapper{
        line-height: 44px;
        padding-right: 0px;
        margin-right: 40px;
        max-width: 22.5%;
    }
    .mentality-table-2 >>> .ivu-checkbox{
        margin: 0;
    }
</style>
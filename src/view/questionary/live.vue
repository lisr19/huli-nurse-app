<template>
    <div class="live-body">
        <div class="top-bar">
            <div class="go-back" @click="back()">
                <Icon type="ios-arrow-back" />
                <span>返回</span>
            </div>
            <h1 class="browse" @click="openGlance">预览</h1>
            <h2 class="table-name">{{tableName}}
                <span>{{secondaryName}}</span>
            </h2>
            <h3>评估日期：{{toDay}}</h3>
        </div>
        <ul class="live-table">
            <li v-for="(item,index) in tableData" :key="index" class="items">
                <h1>{{item.type}}
                    <h2 v-if="item.score!==null">{{item.score}}分</h2>
                </h1>
                <p v-for="(btnItem,btnIndex) in item.grade" :key="btnIndex" @click="clickScoreBtn(index,btnIndex,btnItem.score,btnItem.types,btnItem.index)">{{btnItem.types}}</p>
                <div class="string"></div>
            </li>
        </ul>
        <div class="enter-box">
            <div class="enter-btn" @click="clickUpData">保存表格</div>
        </div>
        <!-- 浏览 -->
        <div v-if="ifGlance" @click="openGlance" class="glance-box">
            <div class="glance-body">
                <h1>{{tableName}}
                    <span>{{secondaryName}}</span>
                </h1>
                <h2>评估日期：{{toDay}}</h2>
                <h3>{{totalPoints}}</h3>
                <ul>
                    <li v-for="(item,index) in tableData" :key="index">
                        <h1>{{item.type}}</h1>
                        <h2 v-if="item.choose !== null">{{item.choose}}</h2>
                        <h2 v-else>未选择</h2>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {addLive,getLive,updataLive} from "@/lib/API/live";
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
                data:{},
                tableName:'日常生活能力评定',
                secondaryName:'（ADL BARTHEL）',
                toDay:'',//日期
                upToDay:'',//上传的日期
                ADLUpdataIf:false,
                ADLId:0,
                totalPoints:'',
                ifGlance: false,
                ifUpDate: false,
                rank:['轻度残疾','中度残疾','重度残疾','完全残疾'],
                explain:[
                    '临床意义：评出分数后，可以按下列标准判断患者ADL独立程度。',
                    ' 60分以上者为虽然有轻度残疾，但生活基本自理；',
                    ' 60～40分者为中度残疾，生活需要帮助；',
                    ' 40～20分者为重度残疾，生活需要很大帮助；',
                    ' 20分以下者为完全残疾，生活完全依赖。'
                ],
                tableData:[
                    {
                        type:'进食',
                        name:'feed',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:10,index:0},
                            {types:'部分独立',score:5,index:1},
                            {types:'需要极大帮助',score:0,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
                    {
                        type:'洗澡',
                        name:'bath',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:5,index:0},
                            {types:'部分独立',score:0,index:1},
                            {types:'需要极大帮助',score:0,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
                    {
                        type:'修饰',
                        name:'adorn',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:5,index:0},
                            {types:'部分独立',score:0,index:1},
                            {types:'需要极大帮助',score:0,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
                    {
                        type:'穿衣',
                        name:'dress',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:10,index:0},
                            {types:'部分独立',score:5,index:1},
                            {types:'需要极大帮助',score:0,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
                    {
                        type:'控制大便',
                        name:'controllingStool',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:10,index:0},
                            {types:'部分独立',score:5,index:1},
                            {types:'需要极大帮助',score:0,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
                    {
                        type:'控制小便',
                        name:'controllingUrination',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:10,index:0},
                            {types:'部分独立',score:5,index:1},
                            {types:'需要极大帮助',score:0,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
                    {
                        type:'用厕',
                        name:'useToilet',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:10,index:0},
                            {types:'部分独立',score:5,index:1},
                            {types:'需要极大帮助',score:0,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
                    {
                        type:'床椅转移',
                        name:'moveBy',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:15,index:0},
                            {types:'部分独立',score:10,index:1},
                            {types:'需要极大帮助',score:5,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
                    {
                        type:'平地行走45米',
                        name:'walkBy',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:15,index:0},
                            {types:'部分独立',score:10,index:1},
                            {types:'需要极大帮助',score:5,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
                    {
                        type:'上下楼梯',
                        name:'stairActivity',
                        score:null,
                        choose:null,
                        index:null,
                        grade:[
                            {types:'独立',score:10,index:0},
                            {types:'部分独立',score:5,index:1},
                            {types:'需要极大帮助',score:0,index:2},
                            {types:'完全依赖',score:0,index:3}
                        ]
                    },
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
            // 评分按钮
            clickScoreBtn(items,index,score,choose,code){
                let btns = document.getElementsByClassName('items')[items].getElementsByTagName('p')
                for(let i=0;i<btns.length;i++){
                    btns[i].className = '';
                }
                btns[index].className = 'thisBtn';
                this.tableData[items].score = score;
                this.tableData[items].choose = choose;
                this.tableData[items].index = code;
                this.btnLight()
            },
            // 打开关闭预览
            openGlance(){
                if(this.ifGlance){
                    this.ifGlance = false;
                }else{
                    this.ifGlance = true;
                }
                this.getTotalPoints()
            },
            // 计算总分
            getTotalPoints(){
                let score = 0;
                this.totalPoints = 0;
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].score !== null){
                        score += this.tableData[i].score
                    }
                }
                // console.log(score)
                if(score == 100){
                    this.totalPoints = '健康'
                }else if(score>60&&score<100){
                    this.totalPoints = this.rank[0];
                }else if(score<=60&&score>40){
                    this.totalPoints = this.rank[1];
                }else if(score<=40&&score>20){
                    this.totalPoints = this.rank[2];
                }else if(score<=20){
                    this.totalPoints = this.rank[3];
                }
            },
            // 保存按钮变色
            async btnLight(){
                let getScore = 0;
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].score !== null){
                        getScore += 1;
                    }
                }
                if(getScore === 10){
                    document.getElementsByClassName('enter-btn')[0].style=('background:rgba(71,189,195,1);color:rgba(255,255,255,1);');
                    this.ifUpDate = true;
                }else{
                    document.getElementsByClassName('enter-btn')[0].style=('');
                    this.ifUpDate = false;
                }
            },
            // 保存
            async clickUpData(){
                Indicator.open('保存中...');
                if(this.ifUpDate){
                    let score = 0;
                    for(let i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].score !== null){
                            score += this.tableData[i].score
                        }
                    }
                    let toTime = (new Date()+'').split(' ')[4];
                    // userId=用户ID nurseId=护士ID addTime=评估日期 feed=进食 bath=洗澡 adorn=修饰 dress=穿衣
                    // controllingStool=控制大便 controllingUrination=控制小便 useToilet=用厕 moveBy=床椅转移 walkBy=行走45米
                    // stairActivity=上下楼 score=等分
                    let userId = this.data.userId
                    let upList = {
                        userId: userId,
                        nurseId:this.nuserId,
                        addTime: this.upToDay+' '+toTime,
                        feed: this.tableData[0].score,
                        feedIndex: this.tableData[0].index,
                        bath: this.tableData[1].score,
                        bathIndex: this.tableData[1].index,
                        adorn: this.tableData[2].score,
                        adornIndex: this.tableData[2].index,
                        dress: this.tableData[3].score,
                        dressIndex: this.tableData[3].index,
                        controllingStool: this.tableData[4].score,
                        controllingStoolIndex: this.tableData[4].index,
                        controllingUrination: this.tableData[5].score,
                        controllingUrinationIndex: this.tableData[5].index,
                        useToilet: this.tableData[6].score,
                        useToiletIndex: this.tableData[6].index,
                        moveBy: this.tableData[7].score,
                        moveByIndex: this.tableData[7].index,
                        walkBy: this.tableData[8].score,
                        walkByIndex: this.tableData[8].index,
                        stairActivity: this.tableData[9].score,
                        stairActivityIndex: this.tableData[9].index,
                        score: score
                    }
                    let res;
                    if(this.ADLUpdataIf){
                        upList.id = this.ADLId
                        res = await updataLive(upList)
                    }else{
                        res = await addLive(upList)
                    }
                    if(res.code === 200){
                        Indicator.close();
                        this.$toast('保存成功')
                        MessageBox({
                            title: '提示',
                            message: '《日常生活能力评定》已填写完成，是否要打开《MMSE简易精神量表》?',
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
                                    path: '/mentality',
                                    query: {
                                        data:this.data
                                    }
                                })
                            }
                        });
                    }else{
                        Indicator.close();
                        console.log(res)
                        this.$toast('操作失败')
                    }
                }else{
                    Indicator.close();
                    this.$toast('请完成表')
                }
                setTimeout(function(){
                    Indicator.close();
                },50)
            },
            // 获取表内容
            async getLiveList(){
                let res= await getLive({
                    userId:this.data.userId
                })
                if(res.code === 200){
                    if(res.data.list[0]){
                        this.ADLId = res.data.list[0].id
                        let list = res.data.list[0];
                        this.ADLUpdataIf = true;
                        for(let i in list){
                            for(let j=0;j<this.tableData.length;j++){
                                if(i==this.tableData[j].name){
                                    this.tableData[j].score = list[i]
                                    let dataIndex = i+'Index'
                                    this.tableData[j].index = list[dataIndex]
                                    this.tableData[j].choose = this.tableData[j].grade[list[dataIndex]].types
                                }
                            }
                        }
                        let itemsBoxs = document.getElementsByClassName('items')
                        for(let i=0;i<this.tableData.length;i++){
                            let btns = itemsBoxs[i].getElementsByTagName('p')
                            btns[this.tableData[i].index].className = 'thisBtn';
                        }
                        this.btnLight()
                    }
                }
            },
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
                                data:this.$route.query.data
                            }
                        })
                    }
                });
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
            this.getLiveList()
            window.scrollTo(0,0);
        }
    }
</script>

<style lang="less" scoped>
html { overflow-y: scroll; }
.live-body{
    width: 100%;
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
    .live-table{
        padding-top: 306px; 
        width: 100%;
        >li{
            width: 750px;
            height: 198px;
            position: relative;
            left: 50%;
            margin-left: -375px; 
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
                >h2{
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:40px;
                    position: absolute;
                    top: 15%;
                    right: -70px;
                }
            }
            
            >p{
                // width:134px;
                height:48px;
                background:rgba(245,245,245,1);
                border-radius:6px;
                font-size:28px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:48px;
                padding: 4px 12px;
                position: absolute;
                top: 114px;
                transition: all .3s;
            }
            >p:nth-of-type(1){
                left: 32px;
            }
            >p:nth-of-type(2){
                left: 166px;
            }
            >p:nth-of-type(3){
                left: 344px;
            }
            >p:nth-of-type(4){
                left: 584px;
            }
            >.thisBtn{
                background:rgba(71,189,195,1);
                color:rgba(255,255,255,1);
            }
            >.string{
                width:686px;
                height:2px;
                background: #DEDEDE;
                position: absolute;
                bottom: 0;
                left: 32px;
            }
        }
    }
    .enter-box{
        width: 100%;
        height: 196px;
        background:rgba(247,247,247,1);
        position: relative;
        >.enter-btn{
            width:690px;
            height:80px;
            background:rgba(172,172,172,1);
            border-radius:10px;  
            font-size:30px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:80px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -40px 0 0 -345px;
        }
    }
    .glance-box{
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.45);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        >.glance-body{
            width:686px;
            height:1102px;
            background:rgba(255,255,255,1);
            border-radius:16px; 
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -551px;
            margin-left: -343px;
            >h1{
                height:44px;
                font-size:32px;
                font-family:PingFangSC;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:44px;
                position: absolute;
                top: 38px;
                left: 24px;
                >span{
                    font-size: 24px; 
                }
            }
            >h2{
                height:34px;
                font-size:24px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:34px;
                position: absolute;
                top: 90px;
                left: 26px;
            }
            >h3{
                height:56px;
                font-size:40px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(71,189,195,1);
                line-height:56px;
                position: absolute;
                top: 30px;
                right: 24px;
                >span{
                    font-size: 40px;
                }
            }
            >ul{
                width: 539px;
                height: 944px;
                position: relative;
                overflow: auto;
                top: 158px;
                left: 34px;
                
                >li{
                    width: 539px;
                    height: 96px;
                    border-bottom: 2px solid #DEDEDE;
                    position: relative;
                    >h1{
                        height:56px;
                        font-size:40px;
                        font-family:PingFangSC;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height:56px;
                        position: absolute;
                        top: 26px;
                        left: 0;
                    }
                    >h2{
                        height:40px;
                        font-size:28px;
                        font-family:PingFangSC;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        line-height:40px;
                        position: absolute;
                        top: 36px;
                        left: 280px;
                    }
                }
            }
        }
    }
}
</style>
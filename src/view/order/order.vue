<template>
    <div class="body">
        <h1 class="logo">订单详情</h1>
	    <div class="sos" v-if="data.orderStatus === 4" @click="clickSOS">
		    <img src="@/assets/icon/sos.png" alt="">
		    <p>一键报警</p>
	    </div>
        <div class="go-back" @click="goBack">
            <i></i>
            <span></span>
        </div>
        <div class="status">
            <i v-show="this.data.orderStatus !== 2 && this.data.orderStatus !== 4 && this.data.orderStatus !== 5"></i>
            <span v-show=" this.data.orderStatus !== 4 ">{{statusTXT}}</span>
            <!-- <p v-else>保存</p> -->
        </div>
        <h1 class="arrival-time">
            <i v-if="this.data.orderStatus === 4"></i>
            <p v-if="this.data.orderStatus === 4">进行中</p>
            <span v-else>{{data.serviceTime}} 到达</span>
        </h1>
        <!-- 护理项目 -->
        <div class="items">
            <h1>护理项目：<span>{{data.serviceName}}</span></h1>
            <p v-for="(item,index) in data.serviceDetailList" :key="index">{{index+1}}:{{item}}</p>
        </div>
        <!-- 客户信息 -->
        <div :class="this.data.orderStatus==4?'user-data2':'user-data'"  >
            <h1>客户信息</h1>
            <img v-if="this.data.orderStatus !== 4" :src="data.userAvatar" alt="">
            <p v-if="this.data.orderStatus !== 4">姓名：{{data.contact}}<span>性别：{{data.sex}}</span></p>
            <p v-if="this.data.orderStatus !== 4">是否吸烟：{{smokingStatus}}</p>
            <p v-if="this.data.orderStatus !== 4">是否有糖尿病：{{diabetesMellitus}}</p>
            <p v-if="this.data.orderStatus !== 4">是否缺少锻炼：{{littlePhysicalExercise}}</p>
            <div v-if="this.data.orderStatus !== 4" class="data-btn1" @click="seeHealth">查看健康档案</div>
            <div class="data-btn2" @click="openHistory">查看护理记录表</div>
        </div>
        <!-- 联系方式 -->
        <div class="phone-data">
            <h1>联系方式</h1>
            <p>姓名：{{data.contact}}</p>
            <p>电话：<span>{{data.contactPhone}}</span></p>
            <p>地址：{{data.serviceAddress}}</p>
        </div>
        <!-- 留痕 -->
        <div v-if="this.data.orderStatus === 4" class="trace">
            <h1>留痕记录</h1>
            <div>
                <ul class="trace-window">
                    <li v-for="(item,index) in trackList" :key="index" @click="trackIndex=index">
                        <imgUpdata ref='imgUpdata' class="upImg" @imgUpload='addTrack' @delImg='delTrack'></imgUpdata>
                        <p>{{item.step}}</p>
                        <h1>{{index+1}}<span>/{{trackList.length}}</span></h1>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 选着评估表区 -->
        <div v-if="this.data.orderStatus === 4" class="questionary-box">
            <h1>填写评估列表</h1>
            <ul>
                <li v-for="(item,index) in questionaryList" :key="index" @click="openQuestionary(item)">
                    <img v-if="item.listLock" src="@/assets/icon/list.png" alt="">
                    <img v-else src="@/assets/icon/list(null).png" alt="">
                    <h1 :class="item.listLock?'':'listNull'">{{item.name}}</h1>
                    <i></i>
                </li>
            </ul>
        </div>
        <!-- 健康手册，护理表 -->
        <div v-if="this.data.orderStatus === 4" class="questionary-box-2">
            <div :class="item.listLock?'':'not'" v-for="(item,index) in questionaryList2" :key="index" @click="openQuestionary(item)">
                {{item.name}}
            </div>
        </div>
        <!-- 评价 -->
        <!-- <div v-if="this.data.orderStatus === 4" class="evaluate-box">
            <h1>对客户评分：</h1>
            <h1>对客户评级：</h1>
            <h1>对客户评价：</h1>
            <Select v-model="score" class="score-box" style="width:6rem;">
                <Option v-for="item in scoreList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="grade" class="score-box" style="width:6rem;">
                <Option v-for="(item,index) in gradeList" :value="item" :key="index">{{ item }}</Option>
            </Select>
            <Input v-model="comment" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="对客户的评价" style="width:9rem;" />
        </div> -->
        <!-- 完成按钮 -->
       <div @click="clickOverBtn()"
            v-if="this.data.orderStatus !== 2&&
                  this.data.orderStatus !== 5&&
                  this.data.orderStatus !== 6&&
                  this.data.orderStatus !== 7&&
                  this.data.orderStatus !== 8&&
                  this.data.orderStatus !== (-1)
                  &&this.data.orderStatus !== (-2)"
            class="over-btn">
            {{overBtnTxt}}
        </div>
       <!-- 接受/拒绝按钮 -->
        <div v-if="this.data.orderStatus === 2" class="choose-btn-box">
            <div @click="acceptOrder">确认接单</div>
            <div @click="rejectOrder">拒绝接单</div>
        </div>
        <div v-if="endIf" class="end-type" @click="endIf=false">
            <div class="ent-box">
                <h1 v-for="(item,index) in endBtn" :key='index' @click.stop="clickEnd(item.key)">{{item.name}}</h1>
            </div>
        </div>
    </div>
</template>

<script>
import imgUpdata from '@/components/img-upload/img-upload.vue'
import {doUserHealthFirstAssessmentGet} from "../../lib/API/forms";
import {getLive} from "@/lib/API/live";
import {getMmse} from '@/lib/API/mmse';
import {getFRA} from '@/lib/API/FRA';
import {getRecord} from "@/lib/API/record";
import {acceptOrder,
        rejectOrder,
        startOrder,
        overOrder,
        getUserRecord,
        addTrack,
        seekTrack,
        updataTrack,
        delTrack,
        getATS,
        SOS
        } from "@/lib/API/order";
import { Indicator , MessageBox } from 'mint-ui';
export default {
    name:'order',
    computed:{
      userId(){
        return this.$store.state.user.userId
      }
    },
    components:{
        imgUpdata
    },
    data(){
        return{
            orderStatus:'',
            smokingStatus:'(暂无)',//是否吸烟
            diabetesMellitus:'(暂无)',//是否糖尿病
            littlePhysicalExercise:'(暂无)',//是否经常锻炼

            HFACList:{},//首次评估表
            LiveList:{},//日常生活评估表
            MMSEList:{},//MMSE简易精神量表
            FRACList:{},//跌倒风险评估表

            startLock:true,
            time:'',
            overBtnTxt:'',
            data:null,
            score:'',
            grade:'',
            comment:'',
            userRecordData:{},
            scoreList:[
                {
                    value:5,
                    label:'5分'
                },
                {
                    value:4,
                    label:'4分'
                },
                {
                    value:3,
                    label:'3分'
                },
                {
                    value:2,
                    label:'2分'
                },
                {
                    value:1,
                    label:'1分'
                },
            ],
            gradeList:['无明显健康问题','现存高风险问题','现存中风险问题','现存低风险问题','待明确潜在风险','合作性风险问题'],
            questionaryList:[
                {
                    name:'首次综合评估表',
                    path:'/first_assessment',
                    listName:'HFACList',
                    listLock:false
                },
                {
                    name:'日常生活能力评定',
                    path:'/live',
                    listName:'LiveList',
                    listLock:false
                },
                {
                    name:'MMSE简易精神量表',
                    path:'/mentality',
                    listName:'MMSEList',
                    listLock:false
                },
                {
                    name:'跌倒风险评估量表',
                    path:'/tumble',
                    listName:'FRACList',
                    listLock:false
                },
            ],
            questionaryList2:[
                {
                    name:'编辑用户健康档案',
                    path:'/health',
                    listLock:true
                },
                {
                    name:'填写护理记录表',
                    path:'/record',
                    listLock:false
                },
            ],
            statusTXT:'',
            statusTXTs:['暂未接单','已接受','进行中','已完成','已拒绝','已取消'],
            statusColors:['#333333','#47C368','#47BDC3','#999999','#FF434A','#FF434A'],
            trackList:[
                {
                    step:'出发前',
                    processStep:4,
                    url:'',
                    id:'',
                    lock:false
                },
                {
                    step:'路途中',
                    processStep:5,
                    url:'',
                    id:'',
                    lock:false
                },
                {
                    step:'入门前',
                    processStep:6,
                    url:'',
                    id:'',
                    lock:false
                },
                {
                    step:'评估中',
                    processStep:8,
                    url:'',
                    id:'',
                    lock:false
                },
                {
                    step:'操作前',
                    processStep:7,
                    url:'',
                    id:'',
                    lock:false
                },
                {
                    step:'操作中',
                    processStep:9,
                    url:'',
                    id:'',
                    lock:false
                },
                {
                    step:'操作后',
                    processStep:10,
                    url:'',
                    id:'',
                    lock:false
                },
                {
                    step:'出门后',
                    processStep:11,
                    url:'',
                    id:'',
                    lock:false
                },
            ],
            trackIndex:null,
            endBtn:[
                {
                    name:'完成',
                    key:1
                },
                {
                    name:'再次预约',
                    key:2
                },
                {
                    name:'转院',
                    key:3
                }
            ],
            endIf:false,
            overOrderLock:[0,0,0,0,0],

            SOSLock:false
        }
    },
    methods:{
	    clickSOS(){
            MessageBox({
            title: '提示',
            message: '是否发出紧急求救?',
            showCancelButton: true
            }).then((active) => {
                if (active !== 'cancel') {
                    this.SOSLock = true
                    this.SOS()
                }
            });
        },
        againSOS(){
            MessageBox({
                title: '提示',
                message: '发送超时，是否重新发送?',
                showCancelButton: true
            }).then((active) => {
                if (active !== 'cancel') {
                    this.SOSLock = true
                    this.SOS()
                }
            });
        },
        async SOS(){
            Indicator.open();
            let _this = this
            setTimeout(function(){
                Indicator.close();
                if(_this.SOSLock){
                    _this.againSOS()
                }
            },30000)
            let res = await SOS({
                nurseId:this.userId
            })
            if(res.code === 200){
                this.SOSLock = false
                MessageBox('提示', '求救信息已发送成功');
                Indicator.close();
            }else if(res.code !== 200){
                Indicator.close();
                MessageBox({
                    title: '提示',
                    message: '发送失败，是否重新发送?',
                    showCancelButton: true
                }).then((active) => {
                    if (active !== 'cancel') {
                        this.SOSLock = true
                        this.SOS()
                    }
                });
            }
            Indicator.close();
        },
        //历史记录
	    openHistory(){
            this.$router.push({name:'历史记录',query:this.data})
	    },
        goBack(){
            this.$router.push({name:'订单列表'})
        },
        // 编辑传来的数据
        async selectStatus(){//判断状态 （暂定 1=未操作 2=已接受 3=进行中 4=已完成 5=已拒绝)
            console.log(this.data)
            this.orderStatus = this.data.orderStatus
            if(this.data.status === 2){
                this.overBtnTxt = '开始出发';
            }else if(this.data.status === 3){
                this.overBtnTxt = '完成订单';
            }
            let index
            if(this.data.orderStatus == 2){
                index = 0
            }else if(this.data.orderStatus == 3){
                index = 1
            }else if(this.data.orderStatus == 4){
                index = 2
            }else if(this.data.orderStatus == 5||this.data.orderStatus == 6||this.data.orderStatus == 7||this.data.orderStatus == 8){
                index = 3
            }else if(this.data.orderStatus == (-1)){
                index = 4
            }else if(this.data.orderStatus == (-2)){
                index = 5
            }
            this.statusTXT = this.statusTXTs[index];
            let LED = document.getElementsByClassName('status')[0].getElementsByTagName('i')[0];
            let text = document.getElementsByClassName('status')[0];
            if(index!==0&&index!==2&&index!==3){
                LED.style.background = (this.statusColors[index]);
            }
            text.style.color = (this.statusColors[index])
            // if(index == 1){
            //     let startDay = new Date(this.data.serviceTime.split(' ')[0]).getTime()
            //     let toDay = Number(new Date().getTime());
            //     if(startDay > toDay){
            //         let btn = document.getElementsByClassName('over-btn')[0]
            //         btn.style = ('background:#838383')
            //         this.startLock = false;
            //     }
            // }
        },
        day(type){
            let day = new Date().getTime();
            let ms = 86400000;
            let endMs = (type*ms);
            let endDay = new Date((day-endMs)*1).toLocaleString();
        },
        // 出发按钮/完成按钮
        // (2-未操作 3-已接受 4-进行中 5-已完成 (-1)-已拒绝 (-2)-已取消)
        async clickOverBtn(){
            let status = this.data.orderStatus;
            let orderId = this.data.id;
            let orderType;
            if( status == 3 && this.startLock){
                let res = await startOrder({
                    nurseId:this.userId,
                    orderId:orderId,
                })
                if(res.code === 200){
                    this.data.orderStatus = 4;
                    orderType = 4
                    this.overBtnTxt = '完成订单'
                    let locaDatas = JSON.stringify(this.data)
                    localStorage.setItem('nurseOrderCopyDatas', locaDatas)
                    this.$toast('操作成功')
                    this.selectStatus()
                }else{
                    this.$toast('操作失败')
                }
            }else if( status == 4 ){
                let overLock = true;
                for(let i=0;i<this.overOrderLock.length;i++){
                    if(this.overOrderLock[i]===0){
                        overLock = false;
                    }
                }
                if(overLock){
                    this.endIf=true;
                }else{
                    this.$toast('请完成所有评估表，以及护理记录表',3000)
                }
            }else if(!this.startLock){
                this.$toast('未到上门日期')
            }
        },
        orderChange(type){
            let userBox = document.getElementsByClassName("user-data")[0]
            let btn = document.getElementsByClassName("data-btn")[0]
            userBox.style = ''
            btn.style=''
            if(type == 4){
                userBox.style.height = '1.2rem'
                btn.style = 'top:0.2rem;margin-left:0;left:60%;'
                this.overBtnTxt = '完成订单';
            }
        },
        // 添加留痕
        async addTrack(url){
            Indicator.open();
            let Y = new Date().getFullYear()+'';
            let M = new Date().getMonth()+1+'';
            let D = new Date().getDate()+'';
            if(M.length === 1) M = '0' + M;
            if(D.length === 1) D = '0' + D;
            let day = Y+'-'+M+'-'+D+' '+((new Date()+'').split(' ')[4]);
            let res = await addTrack({
                orderId:this.data.id,
                processStep:this.trackList[this.trackIndex].processStep,
                processTime:day,
                processorId:this.userId,
                processData:url,
                processorType:2
            })
            if(res.code === 200){
                this.trackList[this.trackIndex].url = url;
                this.trackList[this.trackIndex].id = res.data;
                this.$toast('上传成功')
            }else{
                console.log(res,'操作失败')
                this.$toast('操作失败')
            }
            Indicator.close();
        },
        // 查询留痕
        async seekTrack(){
            let res = await seekTrack({
                orderId:this.data.id,
                page:'1',
                size:'15'
            })
            console.log(res)
            if(res.code === 200){
                let list = res.data.list;
                if(list.length){
                    for(let i=0;i<list.length;i++){
                        for(let j=0;j<this.trackList.length;j++){
                            if(list[i].processStep>3&&list[i].processStep == this.trackList[j].processStep && list[i].processData){
                                this.trackList[j].url = list[i].processData
                                this.trackList[j].id = list[i].id
                                this.trackList[j].lock = true
                                this.$refs.imgUpdata[j].uploadList.push({
                                    'name':"头像",
                                    'url' :list[i].processData,
                                    'status':'finished'
                                })
                            }
                        }
                    }
                }
                console.log(this.trackList)
            }else{
                this.$toast('查询留痕失败')
            }
        },
        del(){
            MessageBox({
                title: '提示',
                message: '是否要删除留痕照片?',
                showCancelButton: true
            }).then((active) => {
                this.delTrack()
            });
        },
        // 删除留痕
        async delTrack(){
            Indicator.open();
            console.log(this.trackIndex)
            let res = await delTrack({
                id:this.trackList[this.trackIndex].id
            })
            if(res.code === 200){
                this.trackList[this.trackIndex].url='';
                this.trackList[this.trackIndex].id = '';
                this.trackList[this.trackIndex].lock=false;
                this.$toast('留痕已删除')
            }else{
                this.$toast('操作失败')
                console.log(res)
            }
            Indicator.close();
        },
        // 查询健康档案
        async getUserRecord(){
            let res = await getUserRecord({
                userId:this.data.userId,
                page:'1',
                size:'41'
            })
            if(res.code === 200){
                // console.log(res)
                this.userRecordData = res
                if(res.data.list[0]){
                    if(res.data.list[0].smokingStatus != undefined){
                        if(res.data.list[0].smokingStatus == 1){
                            this.smokingStatus = '是'
                        }else if(res.data.list[0].smokingStatus == 0){
                            this.smokingStatus = '否'
                        }
                    }
                    if(res.data.list[0].diabetesMellitus != undefined){
                        if(res.data.list[0].diabetesMellitus == 1){
                            this.diabetesMellitus = '是'
                        }else if(res.data.list[0].diabetesMellitus == 0){
                            this.diabetesMellitus = '否'
                        }
                    }
                    if(res.data.list[0].littlePhysicalExercise != undefined){
                        if(res.data.list[0].littlePhysicalExercise == 1){
                            this.littlePhysicalExercise = '是'
                        }else if(res.data.list[0].littlePhysicalExercise == 0){
                            this.littlePhysicalExercise = '否'
                        }
                    }
                    if(res.data.list[0].gender != undefined){
                        if(res.data.list[0].gender == 1){
                            this.data.sex = '男'
                        }else if(res.data.list[0].gender == 2){
                            this.data.sex = '女'
                        }
                    }
                }
            }
        },
        // 跳转表单
        openQuestionary(item){
            let path = item.path
            let listData = this[item.listName]
            if(path == '/health'){
                this.$router.push({path:path,query:{data:this.data,upLock:{upLock:'1'}}})
            }else if(path == '/first_assessment'){
                this.$router.push({path:path,query:{data:this.data}})
                localStorage.setItem('firstAssessmentLock',true)
            }else{
                this.$router.push({path:path,query:{data:this.data}})
            }
        },
        // 查看健康档案
        seeHealth(){
            this.$router.push({path:'/health',query:{data:this.data,upLock:{upLock:'0'}}})
        },
        // 选着结局
        async clickEnd(key){
            if( key === 2 ){
                this.subscribeOrder()
            }else{
                let res = await overOrder({
                    orderId:this.data.id,
                    nurseId:this.userId,
                    flag:Number(key)
                })
                if(res.code === 200){
                    this.data.orderStatus = 5
                    this.statusTXT = this.statusTXTs[3];
                    let locaDatas = JSON.stringify(this.data)
                    localStorage.setItem('nurseOrderCopyDatas', locaDatas)
                    this.selectStatus()
                }
                this.endIf=false;
            }

        },
        // 抢单
        async acceptOrder(){
            // console.log(this.userId,this.data.id,this.data.distributeId)
            let res = await acceptOrder({
                nurseId:this.userId,
                orderId:this.data.id,
                id : this.data.distributeId
            })
            if(res.code === 200){
                this.data.orderStatus = 3
                let locaDatas = JSON.stringify(this.data)
                localStorage.setItem('nurseOrderCopyDatas', locaDatas)
                this.overBtnTxt = '开始出发'
                this.$toast('操作成功')
                this.selectStatus()
            }else{
                console.log(res)
                this.$toast('操作失败')
            }
        },
        // 拒单
        async rejectOrder(){
            let res = await rejectOrder({
                id : this.data.distributeId
            })
            if(res.code === 200){
                this.data.orderStatus = (-1)
                let locaDatas = JSON.stringify(this.data)
                localStorage.setItem('nurseOrderCopyDatas', locaDatas)
                this.$toast('操作成功')
                this.goBack()
            }else{
                console.log(res)
                this.$toast('操作失败')
            }
        },
        // 再次预约
        subscribeOrder(){
            this.$router.push({path:'/subscribe',query:{data:this.data}})
        },
        // 获取首次评估表数据
        async getHFACList(){
            let res = await doUserHealthFirstAssessmentGet({
                userId:this.data.userId
            })
            if(res.code === 200){
                if(res.data.list.length > 0){
                    this.HFACList = res
                    this.questionaryList[0].listLock = true
                }
            }
        },
        // 获取日常生活能力表数据
        async getLiveList(){
            let res = await getLive({
                userId:this.data.userId
            })
            if(res.code === 200){
                if(res.data.list.length > 0){
                    this.LiveList = res
                    this.questionaryList[1].listLock = true
                }
            }
        },
        // 获取MMSE简易精神表
        async getMMSEList(){
            let res = await getMmse({
                userId:this.data.userId
            })
            if(res.code === 200){
                if(res.data.list.length > 0){
                    this.MMSEList = res
                    this.questionaryList[2].listLock = true
                }
            }
        },
        // 获取跌倒风险评估表
        async getFRACList(){
            let res = await getFRA({
                userId:this.data.userId
            })
            if(res.code === 200){
                if(res.data.list.length > 0){
                    this.FRACList = res
                    this.questionaryList[3].listLock = true
                }
            }
        },
        // 获取护理记录表
        async getRecord(){
            let res = await getRecord({
                orderId:this.data.id
            })
            if(res.code === 200){
                if(res.data.list.length > 0){
                    this.questionaryList2[1].listLock = true
                    this.overOrderLock[4] = 1
                }
            }
        },
        // 获取四个表的状态
        async getATS(){
            let res = await getATS({
                userId:this.data.userId
            })
            if(res.code === 200){
                let list = res.data
                for(let i=0;i<list.length;i++){
                    if(list[i]==1){
                        this.overOrderLock[i] = 1
                        this.questionaryList[i].listLock = true
                    }
                }
            }
        }
    },
    created(){
        Indicator.close();
        let type = 60
        this.day(type)
        if(this.$route.query.data != '[object Object]'){
            this.data = this.$route.query.data
        }else{
            this.data = JSON.parse(localStorage.getItem('nurseOrderCopyDatas'))
        }
        this.getUserRecord()
        if(this.data.gender == 1){
            this.data.sex = '男'
        }else{
            this.data.sex = '女'
        }
        if(this.data.orderStatus == 4){
            this.seekTrack()
            this.overBtnTxt = '完成订单'
        }else if(this.data.orderStatus == 3){
            this.overBtnTxt = '开始出发'
        }
        if(this.data.serviceDetail){
            this.data.serviceDetailList = this.data.serviceDetail.split(',');
        }
    },
    mounted(){
        this.selectStatus()
        this.getATS()
        this.getRecord()
        // this.getHFACList()
        // this.getLiveList()
        // this.getMMSEList()
        // this.getFRACList()
        window.scrollTo(0,0);
        // this.orderChange(this.data.orderStatus)
    }
}
</script>

<style lang="less" scoped>
.body{
    background: #F7F7F7;
    position: relative;
    float: left;
    width: 100%;
    min-height: 100%;
	.sos{
		position: absolute;
		right: 30px;
		top: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		img{
			width: 42px;
			margin-bottom: 5px;
		}
		p{
			font-size:22px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:#FF0000;
			line-height:32px;
		}
	}
    >.logo{
        position: absolute;
        width: 2.68rem;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(3,3,3,1);
        line-height:48px;
        top: 54px;
        left: 50%;
        margin-left: -1.34rem
    }
    >.go-back{
        width: 68px;
        height: 48px;
        position: absolute;
        top: 52px;
        left: 74px;
        color: #333333;
        font-size: 34px;
        line-height: 48px;
        font-weight:400;
        font-family:'PingFangSC-Regular';
        >i{
            width: 28px;
            height: 28px;
            border-left: 5px solid #333333;
            border-bottom: 5px solid #333333;
            display: block;
            position: absolute;
            left: -30px;
            top: 12.5px;
            transform:rotate(45deg);
        }
    }
    >.status{
        height: 34px;
        position: absolute;
        line-height: 34px;
        font-size: 24px;
        font-family:'PingFangSC-Medium';
        font-weight:500;
        top: 60px;
        right: 30px;
        >i{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            position: absolute;
            top: 5px;
            left: -36px;
        }
        >p{
            float: left;
            margin-top: -8px;
            width:68px;
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(1,122,255,1);
            line-height:48px;
        }
    }
    >.arrival-time{
        width:410px;
        height:48px;
        background:rgba(237,240,240,1);
        border-radius:10px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(3,3,3,1);
        line-height:48px;
        position: absolute;
        top: 140px;
        left: 50%;
        margin-left: -205px;
        >i{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            position: absolute;
            top: 14px;
            left: 152px;
            display: block;
            background: #47BDC3;
        }
        >p{
            // width:72px;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(71,189,195,1);
            line-height:34px;
            display: block;
            position: absolute;
            top: 8px;
            left: 180px;
        }
    }
    //护理项目
    >.items{
        width: 690px;
        // height: 224px;
        min-height: 96px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        margin: 204px auto 0;
        position: relative;
        text-align: left;
        overflow: hidden;
        transition: all .3s;
        >h1{
            // position: relative;
            // height:48px;
            font-size:34px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:48px;
            padding: 24px 20px;
            z-index: 200;
            >span{
                color: #47BDC3;
            }
        }
        >p{
            position: relative;
            left: 20px;
            height:40px;
            font-size:28px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(3,3,3,1);
            line-height:40px;
        }
        >p:nth-of-type(1){
            margin-top: 86px;
        }
        >p:nth-of-type(2){
            margin-bottom: 40px;
        }
    }
    //客户信息
    >.user-data{
        width:690px;
        height:410px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        margin: 20px auto 0;
        position: relative;
        overflow: hidden;
        transition: all .3s;
        >h1{
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:48px;
            position: absolute;
            top:24px;
            left: 20px;
        }
        >img{
            width: 130px;
            height: 130px;
            background: #333333;
            display: block;
            position: absolute;
            top: 98px;
            left: 20px;
            border-radius: 10px;
        }
        >p{
            height:40px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:40px;
            position: absolute;
            left: 180px;
            >span{
                padding-left: 46px;
            }
        }
        >p:nth-of-type(1){
            top: 104px;
        }
        >p:nth-of-type(2){
            top: 152px;
        }
        >p:nth-of-type(3){
            top: 200px;
        }
        >p:nth-of-type(4){
            top:248px;
        }
        >.data-btn1{
            width:248px;
            height:60px;
            background:rgba(255,255,255,1);
            border-radius:10px;
            border:4px solid rgba(0,196,199,1);
            font-size:24px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(71,189,195,1);
            line-height:52px;
            position: absolute;
            bottom: 32px;
            left: 40px;
        }
        >.data-btn2{
            width:248px;
            height:60px;
            background:rgba(255,255,255,1);
            border-radius:10px;
            border:4px solid rgba(0,196,199,1);
            font-size:24px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(71,189,195,1);
            line-height:52px;
            position: absolute;
            bottom: 32px;
            right: 40px;
        }
    }
    >.user-data2{
        width:690px;
        height:98px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        margin: 20px auto 0;
        position: relative;
        overflow: hidden;
        transition: all .3s;
        >h1{
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:48px;
            position: absolute;
            top:24px;
            left: 20px;
        }
        >.data-btn2{
            width:248px;
            height:60px;
            background:rgba(255,255,255,1);
            border-radius:10px;
            border:4px solid rgba(0,196,199,1);
            font-size:24px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(71,189,195,1);
            line-height:52px;
            position: absolute;
            bottom: 18px;
            right: 32px;
        }
    }
    // 联系方式
    >.phone-data{
        width:690px;
        // height:266px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        margin: 20px auto 0;
        position: relative;
        >h1{
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:48px;
            position: absolute;
            top: 24px;
            left: 20px;
        }
        >p{
            text-align: left;
            // height:40px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:40px;
            margin: 4px 0 4px 20px;
            box-sizing: content-box;
            >span{
                color: #5393FF;
            }
        }
        >p:nth-of-type(1){
            padding-top: 90px
        }
        // >p:nth-of-type(2){
        //     top:138px;
        // }
        >p:nth-of-type(3){
            max-width: 95%;
            padding-bottom: 40px;
            word-break:break-all;
            // top:186px;
        }
    }
    //护理计划
    >.nurse-project{
        width: 690px;
        height: 444px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        margin: 20px auto 0;
        position: relative;
        >h1{
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:48px;
            text-align: left;
            margin: 24px 20px;
            float: left;
        }
        >.ivu-input-wrapper{
            width: 642px;
        }
    }
    // 留痕
    >.trace{
        width:750px;
        height:402px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        margin: 20px auto 0;
        position: relative;
        overflow: hidden;
        >h1{
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:48px;
            text-align: left;
            position: relative;
            top: 24px;
            left: 20px;
        }
        >div{
            width: 750px;
            height: 306px;
            overflow-x: scroll;
            overflow-y: hidden;
            float: left;
            margin-top: 45px;
            >.trace-window{
                float: left;
                width: 3880px;
                height: 306px;
                >li{
                    width: 450px;
                    height: 306px;
                    margin-right: 30px;
                    float: left;
                    position: relative;
                    >p{
                        height:34px;
                        font-size:24px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(3,3,3,1);
                        line-height:34px;
                        text-align: left;
                        position: absolute;
                        top: 240px;
                        left: 4px;
                    }
                    >h1{
                        height:44px;
                        font-size:32px;
                        font-family:PingFangSC;
                        font-weight:500;
                        color:rgba(0,192,197,1);
                        line-height:44px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        >span{
                            font-size:28px;
                            color:#999999;
                        }
                    }
                }
                >li:nth-of-type(1){margin-left: 34px}
            }
        }
    }
    //
    >.questionary-box{
        margin-top: 20px;
        width:750px;
        height:444px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        position: relative;
        left: 50%;
        margin-left: -375px;
        >h1{
            height:48px;
            font-size:34px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:48px;
            text-align: left;
            position: absolute;
            top: 24px;
            left: 50px;
        }
        >ul{
            width: 648px;
            position: relative;
            top: 74px;
            left: 52px;
            >li{
                width: 648px;
                height: 90px;
                border-top: 2px solid #DEDEDE;
                position: relative;
                >img{
                    display: block;
                    width: 36px;
                    height: 48px;
                    position: absolute;
                    top: 24px;
                    left: 0;
                }
                >h1{
                    position: absolute;
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(52,170,220,1);
                    line-height:40px;
                    top: 30px;
                    left: 46px;
                }
                >.listNull{
                    color:#999999;
                }
                >i{
                    width: 20px;
                    height: 20px;
                    border-left: 2px solid #979797;
                    border-bottom: 2px solid #979797;
                    display: block;
                    position: absolute;
                    right: 10px;
                    top: 35px;
                    transform:rotate(-135deg);
                }
            }
            >li:nth-of-type(1){
                border-top: 0px;
            }
        }
    }
    >.questionary-box-2{
        width: 750px;
        height: 90px;
        margin-top: 20px;
        margin-bottom: 134px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        position: relative;
        left: 50%;
        margin-left: -375px;
        >div{
            width: 50%;
            height: 48px;
            float: left;
            margin-top: 22px;
            font-size:28px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(71,189,195,1);
            line-height:48px;
            border-left:  2px solid #D4D4D4;
        }
        >div:nth-of-type(1){
            border-left:  0px;
        }
        >.not{
            color:#999999;
        }
    }
    // 评价
    >.evaluate-box{
        margin: 20px 0 134px;
        width: 750px;
        height: 404px;
        background: #fff;
        box-sizing: content-box;
        position: relative;
        >h1{
            height:40px;
            font-size:28px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:40px;
            position: absolute;
            left: 50px;
        }
        >h1:nth-of-type(1){
            top: 24px;
        }
        >h1:nth-of-type(2){
            top: 98px;
        }
        >h1:nth-of-type(3){
            top: 172px;
        }
    }
    // 完成按钮
    >.over-btn{
        position: absolute;
        bottom: 28px;
        left: 50%;
        width:690px;
        height:80px;
        background:rgba(71,189,195,1);
        border-radius:10px;
        font-size:30px;
        font-family:PingFangSC;
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:80px;
        margin-left: -345px;
    }
    // 接受/拒绝按钮
    >.choose-btn-box{
        width:750px;
        height:116px;
        background:rgba(255,255,255,1);
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-around;
        >div{
            width:234px;
            height:80px;
            background:rgba(71,189,195,1);
            border-radius:10px;
            font-size:30px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:80px;
            margin-top: 18px;
        }
        >div:nth-of-type(2){
            background:rgba(239,121,118,1);
        }
    }
    // 选着结局
    >.end-type{
        width: 100%;
        height: 100%;
        background:rgba(24,24,24,0.3);
        position: fixed;
        top: 0;
        left: 0;
        >.ent-box{
            width: 670px;
            height: 384px;
            background:rgba(255,255,255,1);
            border-radius:16px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -192px 0 0 -335px;
            >h1{
                width: 542px;
                height: 120px;
                border-top: 2px solid #DFDFDF;
                font-size:30px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:120px;
                margin: 0 auto;
            }
            >h1:nth-of-type(1){
                margin-top:  18px;
                border-top: 0;
                color: #47BDC3;
            }
        }
    }
}
</style>
<style scoped>
    .evaluate-box >>> .ivu-select{
        position: absolute;
        right: 60px;
    }
    .evaluate-box >>> .ivu-input{
        background:rgba(249,249,249,1);
        position: absolute;
        left: 10px;
        top: 210px;
    }
    .evaluate-box >>> .ivu-select:nth-of-type(1){
        top: 15px;
    }
    .evaluate-box >>> .ivu-select:nth-of-type(2){
        top: 90px;
    }
</style>

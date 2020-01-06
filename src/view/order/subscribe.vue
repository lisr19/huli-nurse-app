<template>
    <div class="body">
        <h1 class="logo">预约下次</h1>
        <div class="go-back" @click="goBack">
            <i></i>
            <span></span>
        </div>
        <!-- 护理项目 -->
        <!-- <div class="items">
            <h1>护理项目：<span>{{data.serviceName}}</span></h1>
            <p v-for="(item,index) in data.serviceDetailList" :key="index">{{index+1}}:{{item}}</p>
        </div> -->
        <!-- 联系方式 -->
        <!-- <div class="phone-data">
            <h1>联系方式</h1>
            <p>姓名：{{data.contact}}</p>
            <p>电话：<span>{{data.contactPhone}}</span></p>
            <p>地址：{{data.serviceAddress}}</p>
        </div> -->
        <!-- 选着时间 -->
        <div class="time-box">
            <h1>预约上门日期</h1>
            <div class="time" @click="openPicker('day')">{{performDay}}</div>
            <h1>上门时间</h1>
            <div class="time" @click="openPicker('time')">{{performTime}}</div>
        </div>
        <div class="btn-box">
            <div @click="goBack">取消</div>
            <div @click="addOrder">确认</div>
        </div>
        <mt-datetime-picker
            :startDate='ToDay'
            :endDate='endDay'
            @confirm='getTime("day")'
            ref="pickerDay"
            type="date"
            v-model="day">
        </mt-datetime-picker>
        <mt-datetime-picker
            :startHour = '8'
            :endHour = '19'
            @confirm='getTime("time")'
            ref="pickerTime"
            type="time"
            v-model="time">
        </mt-datetime-picker>
    </div>
</template>

<script>
import {overOrder} from "@/lib/API/order";
// import { DatetimePicker } from 'mint-ui';
    export default {
        name: '',
        // components:{
        //     DatetimePicker,
        // },
        data() {
            return {
                performDay:'选着上门日期',
                performTime:'选着上门时间',
                data:{},
                day:'',
                time:'',
                ToDay:'',
                endDay:'',
            }
        },
        methods:{
            openPicker(type) {
                if(type == 'day'){
                    this.$refs.pickerDay.open();
                }else if(type == 'time'){
                    this.$refs.pickerTime.open();
                }
                
            },
            // 获得日期
            getDay(){
                this.ToDay = new Date((Math.floor((Number(new Date().getTime()+86400000))/1000000))*1000000)
                console.log(this.ToDay,'111')
                let toDay = new Date().getDay();
                if(toDay === 0) toDay = 7;
                let toDaySm = new Date((Math.floor(((Number(new Date().getTime())-(86400000*(toDay-1)))/1000000)))*1000000+(86400000*13))
                console.log(toDaySm,'222')
                this.endDay =toDaySm
            },
            getTime(type){
                if(type == 'day'){
                    if(!this.day){
                        this.day = this.ToDay
                    }
                    let Y = new Date(this.day).getFullYear()+'';
                    let M = new Date(this.day).getMonth()+1+'';
                    let D = new Date(this.day).getDate()+'';
                    if(M.length === 1) M = '0' + M;
                    if(D.length === 1) D = '0' + D;
                    this.performDay = this.upToDay = Y+'-'+M+'-'+D;
                }else if(type == 'time'){
                    if(!this.time){
                        this.time = '08:00:00'
                    }else{
                        this.time += ':00'
                    }
                    this.performTime = this.time
                    console.log(this.time)
                }
                
            },
            goBack(){
                this.$router.push({path:'/details',query:{data:this.data}})
            },
            async addOrder(){
                if(this.performDay != '选着上门时间'&&this.performTime != '选着上门时间'){
                        let res = await overOrder({
                        orderId : this.data.id,
                        nurseId : this.data.userId,
                        serviceTime : this.performDay+' '+this.performTime,
                        flag : 2
                    })
                    if(res.code === 200){
                        this.data.orderStatus=6
                        this.data.serviceTime = this.performDay
                        let locaDatas = JSON.stringify(this.data)
                        localStorage.setItem('nurseOrderCopyDatas', locaDatas)
                        this.$toast('预约成功')
                        this.goBack()
                    }else{
                        this.$toast('预约失败')
                    }
                }else{
                    this.$toast('请选择上门时间')
                }
            },
            getDate(date){
                this.performDay = date;
            }
        },
        created(){
            console.log(this.DatetimePicker)
            this.data = this.$route.query.data
            this.getDay()
            // this.openPicker()
        },
        mounted(){
            // this.openPicker()
            console.log(this.data)
        }
    }
</script>

<style scoped>
</style>

<style lang="less" scoped>
.body{
    background: #F7F7F7;
    position: relative;
    float: left;
    width: 100%;
    min-height: 100%;
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
            position: absolute;
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:48px;
            left: 20px;
            top: 24px;
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
    // 联系方式
    >.phone-data{
        width:690px;
        height:266px;
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
            height:40px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:40px;
            position: absolute;
            left: 20px;
            >span{
                color: #5393FF;
            }
        }
        >p:nth-of-type(1){
            top:90px;
        }
        >p:nth-of-type(2){
            top:138px;
        }
        >p:nth-of-type(3){
            top:186px;
        }
    }
    >.time-box{
        width: 690px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        margin: 20px auto 0;
        position: relative;
        margin: 204px auto 0;
        >h1{
            height:48px;
            font-size:34px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:48px;
            position: absolute;
            top: 24px;
            left: 24px;
        }
        >div{
            position: absolute;
            height: 100px;
            background: #fff;
            width: 642px;
            top: 100px;
            left: 50%;
            margin-left: -321px;
            font-size:34px;
            font-family:PingFangSC-Semibold,PingFangSC;
            font-weight:600;
            color:rgba(3,3,3,1);
            line-height:100px;
        }
        >h1:nth-of-type(2){
            top: 250px;
        }
        >div:nth-of-type(2){
            top: 350px;
        }
    }
    >.btn-box{
        width:750px;
        height:116px;
        background:rgba(255,255,255,1);
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-around;
        >div{
            width:234px;
            height:80px;
            background:rgba(131,131,131,1);
            border-radius:10px;
            font-size:30px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:80px;
            margin-top: 18px;
        }
        >div:nth-of-type(2){
            background:rgba(0,196,199,1);
        }
    }
}
</style>
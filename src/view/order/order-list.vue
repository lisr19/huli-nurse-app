<template>
    <div class="body">
        <div class="top-bar">
            <h1 class="page-logo">我的订单</h1>
            <div class="tab-window">
                <p v-if="newOrderIndex">{{newOrderIndex}}</p>
                <h1 v-for="(item,index) in tabs" :placeholder='toDay' :key="index" @click="clickTab(index)">{{item}}</h1>
            </div>
            <div class="sos" @click="clickSOS">
                <img src="@/assets/icon/sos.png" alt="">
                <p>一键报警</p>
            </div>
        </div>
        <DatePicker v-if="orderType === 2" type="date" @on-change="getDate" format="yyyy-MM-dd" class="set-date"></DatePicker>
        <ul class="order-box" >
            <img v-if="!orderList.length" class="not-order" src="@/assets/icon/notOrder.png" alt="">
            <li v-for="(item,index) in orderList" :key="index" @click="clickOrder(item)">
                <!-- <h3>用户指定订单</h3> -->
                <h1 class="time">上门时间：{{item.serviceTime}}</h1>
                <h1 class="project" >护理项目：{{item.serviceName}}
                    <span v-show="item.serviceDetail">({{item.serviceDetail}})</span>
                    <h2 class="status1" v-if="item.orderStatus === 2"></h2>
                    <h2 class="status2" v-if="item.orderStatus === 3"><i></i>已接受</h2>
                    <h2 class="status3" v-if="item.orderStatus === 4"><i></i>进行中</h2>
                    <h2 class="status4" v-if="item.orderStatus >= 5"><i></i>已完成</h2>
                    <h2 class="status5" v-if="item.orderStatus === (-1)"><i></i>已拒绝</h2>
                    <h2 class="status5" v-if="item.orderStatus === (-2)"><i></i>已取消</h2>
                </h1>
                <img :src="item.userAvatar" alt="">
                <h1 class="name">姓名：{{item.contact}}</h1>
                <h1 class="phone">电话：{{item.contactPhone}}</h1>
                <h1 class="site">地址：{{item.serviceAddress}}</h1>
                <div class="details-but">
                    <div v-if="!item.distributeId">详情</div>
                    <div v-if="item.distributeId" class="yes" @click.stop="acceptOrder(item)">接受</div>
                    <div v-if="item.distributeId" class="no" @click.stop="clickReject(item)">拒绝</div>
                </div>
            </li>
            <h1 v-if="orderList.length!=0&&(orderList.length)%10==0" @click="addMore">获取更多订单</h1>
        </ul>
        <div class="bottom-bar">
            <div>
                <img src="@/assets/icon/order2.png" alt="">
                <p>订单</p>
            </div>
            <div @click="openMy">
                <img src="@/assets/icon/nurse1.png" alt="">
                <p>我的</p>
            </div>
        </div>
        <div class="updated-version" v-if="updatedVersionLock">
            <div class="updated">
                <img src="@/assets/img/newEdition.png" alt="">
                <p>{{updatedTxt}}</p>
                <div class="btn" >版本更新中</div>
                <!-- <div class="btn" @click="updatedVersionLock=false">以后再说</div> -->
            </div>
        </div>
    </div>
</template>

<script>
import {getOrder,getNewOrder,acceptOrder,rejectOrder,SOS} from "@/lib/API/order";
import {getEdition} from "@/lib/API/edition";
import { Indicator , MessageBox } from 'mint-ui';
import Config from '@/Config'
import mui from 'vue-awesome-mui'
export default {
    name:'orderList',
    computed:{
        nurseId(){
            return this.$store.state.user.userId
        },
        edition(){
            return Config.edition
        }
    },
    components:{
        mui
    },
    data(){
        return{
            tabs:['今日订单','新派订单','已接订单','已结束'],
            orderList:[],
            updatedVersionLock:false,
            updatedVersionUrl:'http://120.78.215.17:14011/download/app_nurse_',
            updatedTxt:'',
            newOrderIndex:0,
            upList:{
                status:1
            },
            seekTime:false,
            toDay:'',
            orderType:0,
            getOrderData:{
                nurseId:0,
                startDate: '',
                endDate: '',
                flag:0,
                page:1,
                size :10
            }
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
                nurseId:this.nurseId
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
        // 获得日期
        getDay(tpye){
            let Y = new Date().getFullYear()+'';
            let M = new Date().getMonth()+1+'';
            let D = new Date().getDate()+'';
            if(M.length === 1) M = '0' + M;
            if(D.length === 1) D = '0' + D;
            this.toDay = Y+'-'+M+'-'+D;
            if(!tpye){
                this.getOrder()
            }
        },
        getRem(){
            console.log(document)
        },
        async clickTab(index){
            localStorage.setItem('nurseClickOrderTypeData',index)
            window.scrollTo(0,0);
            this.getOrderData.page = 1
            this.seekTime = false;
            let tabs = document.getElementsByClassName('tab-window')[0].getElementsByTagName('h1')
            for(let i=0;i<tabs.length;i++){
                tabs[i].className=''
            }
            tabs[index].className='this-tab';
            this.upList.status = index;
            this.orderType = index;
            let orderBox = document.getElementsByClassName("order-box")[0]
            if(index!=2){
                this.getDay('type')
                orderBox.style=''
            }else{
                if(orderBox){
                    orderBox.style='padding-top: 0.36rem;'
                }
            }
            this.getOrder()
        },
        async clickOrder(data){
            let orderData = data
            // orderData.orderType = this.orderType
            let locaDatas = JSON.stringify(orderData)
            localStorage.setItem('nurseOrderCopyDatas', locaDatas)
            this.$router.push({name:'订单详情',query:{data:orderData}})
        },
        openMy(){
            this.$router.push({name:'我的信息'})
        },
        // 获取订单
        async getOrder(more){
            Indicator.open('获取订单中...');
            let nurseId = Number(this.nurseId);
            if(this.orderType === 0){
                let res = await getOrder({
                    nurseId:this.nurseId,
                    startDate:this.toDay+' 00:00:00',
                    endDate:this.toDay+' 23:59:59',
                    flag:'0',
                    page:this.getOrderData.page,
                    size:10,
                })
                if(res.code === 200){
                    if(more){
                        for(let i=0;i<res.data.list.length;i++){
                            this.orderList.push(res.data.list[i])
                        }
                    }else{
                        this.orderList = []
                        this.orderList = res.data.list;
                    }
                    Indicator.close();
                }else if(res.code === 401){
                    Indicator.close();
                    this.$toast('请重新登录')
                    localStorage.setItem('nurseAppToken', '')
                    localStorage.setItem('nurseOrderCopyDatas', '')
                    localStorage.setItem('nurseClickOrderTypeData','')
                    this.$router.push({path: '/login'})
                }else{
                    this.$toast(res.message)
                    Indicator.close();
                }
            }else if(this.orderType === 1){
                let res = await getNewOrder({
                    nurseId:this.nurseId,
                    page:this.getOrderData.page,
                    size:10,
                })
                if(res.code === 200){
                    this.newOrderIndex = res.data.total
                    if(more){
                        for(let i=0;i<res.data.list.length;i++){
                            if(Number(res.data.list[i].order[0].orderStatus)  === 2){
                                this.orderList.push(res.data.list[i].order[0])
                                this.orderList[i].distributeId = res.data.list[i].id
                            }
                        }
                    }else{
                        this.orderList = []
                        for(let i=0;i<res.data.list.length;i++){
                            if(Number(res.data.list[i].order[0].orderStatus) === 2){
                                this.orderList.push(res.data.list[i].order[0])
                                this.orderList[i].distributeId = res.data.list[i].id
                            }
                        }
                    }
                    Indicator.close();
                }else if(res.code === 401){
                    Indicator.close();
                    this.$toast('请重新登录')
                    localStorage.setItem('nurseAppToken', '')
                    localStorage.setItem('nurseOrderCopyDatas', '')
                    localStorage.setItem('nurseClickOrderTypeData','')
                    this.$router.push({path: '/login'})
                }else{
                    this.$toast(res.message)
                    Indicator.close();
                }
            }else if(this.orderType === 2){
                let res
                if(this.seekTime){
                    res = await getOrder({
                        nurseId:this.nurseId,
                        startDate:this.toDay+' 00:00:00',
                        endDate:this.toDay+' 23:59:59',
                        flag: '0',
                        page:this.getOrderData.page,
                        size:10,
                    })
                }else{
                    res = await getOrder({
                        nurseId:this.nurseId,
                        flag:'0',
                        page:this.getOrderData.page,
                        size:10,
                    })
                }
                if(res.code === 200){
                    let list = res.data.list
                    if(more){
                        for(let i=0;i<list.length;i++){
                            this.orderList.push(list[i])
                        }
                    }else{
                        this.orderList = []
                        this.orderList = list;
                    }
                    Indicator.close();
                }else if(res.code === 401){
                    Indicator.close();
                    this.$toast('请重新登录')
                    localStorage.setItem('nurseAppToken', '')
                    localStorage.setItem('nurseOrderCopyDatas', '')
                    localStorage.setItem('nurseClickOrderTypeData','')
                    this.$router.push({path: '/login'})
                }else{
                    this.$toast(res.message)
                    Indicator.close();
                }
            }else if(this.orderType === 3){
                let res = await getOrder({
                    nurseId:this.nurseId,
                    flag:'1',
                    page:this.getOrderData.page,
                    size:10,
                })
                if(res.code === 200){
                    let list = res.data.list
                    if(more){
                        for(let i=0;i<list.length;i++){
                            this.orderList.push(list[i])
                        }
                    }else{
                        this.orderList = []
                        this.orderList = list;
                    }
                    Indicator.close();
                }else if(res.code === 401){
                    Indicator.close();
                    this.$toast('请重新登录')
                    localStorage.setItem('nurseAppToken', '')
                    localStorage.setItem('nurseOrderCopyDatas', '')
                    localStorage.setItem('nurseClickOrderTypeData','')
                    this.$router.push({path: '/login'})
                }else{
                    this.$toast(res.message)
                    Indicator.close();
                }
            }
        },
        addMore(){
            this.getOrderData.page++
            this.getOrder('more')
        },
        getDate(date){
            this.seekTime = true;
            this.toDay = date
            this.getOrder()
        },
        // 抢单
        async acceptOrder(data){
            let res = await acceptOrder({
                nurseId:this.nurseId,
                orderId:data.id,
                id : data.distributeId
            })
            if(res.code === 200){
                this.getOrder()
                this.$toast('接单成功')
            }else{
                console.log(res)
                this.$toast('接单失败')
            }
        },
        // 拒单确认框
        clickReject(data){
            MessageBox({
                title: '提示',
                message: '确认拒绝订单吗？',
                showCancelButton: true
            }).then((active) => {
                if (active !== 'cancel') {
                    this.rejectOrder(data)
                }
            });
        },
        // 拒单
        async rejectOrder(data){
            let res = await rejectOrder({
                id : data.distributeId
            })
            if(res.code === 200){
                this.getOrder()
                this.$toast('已拒绝订单')
            }else{
                console.log(res)
                this.$toast('拒单失败')
            }
        },
        // 获取新订单数量
        async getNewOrderIndex(){
            let res = await getNewOrder({
                nurseId:this.nurseId,
                page:this.getOrderData.page,
                size:11,
            })
            if(res.code === 200){
                this.newOrderIndex = res.data.total
                if(this.newOrderIndex > 10){
                    this.newOrderIndex = '10+'
                }
            }
        },
        // 获取最新版本
        async getEdition(){
            let res = await getEdition({appType : 2})
            if(res.code == 200){
                let data = res.data
                let newEdition = data.majorVersionNumber+'.'+data.minorVersionNumber+'.'+data.revisionNumber
                let versionNum1 = data.majorVersionNumber+''+data.minorVersionNumber+''+data.revisionNumber
                let versionNum2 = this.edition.split('.').join('')
                console.log('新版',Number(versionNum1) , '本机',Number(versionNum2))
                if(versionNum1 > versionNum2){
                    this.updatedVersionLock = true
                    this.updatedVersionUrl = res.data.downloadUrl
                    this.updatedTxt = '本机版本为：'+this.edition+'/ 新版本为：'+newEdition
                    localStorage.setItem('updatedVersionLock',newEdition+'|/|/|'+res.data.downloadUrl)
                    this.download()
                }else{
                    localStorage.setItem('updatedVersionLock','')
                }
            }
        },
        // 点击下载
        download(){
            var wgtWaiting = plus.nativeUI.showWaiting("开始下载");
            var url = this.updatedVersionUrl; // 下载文件地址
            var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
                if(status == 200) { // 下载成功
                    wgtWaiting.setTitle("开始安装");
                    var path = d.filename;
                    plus.runtime.install(path);
                } else { //下载失败
                    alert("Download failed: " + status);
                }
            });
            dtask.addEventListener("statechanged", function(download, status) {
                switch(download.state) {
                    case 2:
                    wgtWaiting.setTitle("已连接到服务器");
                    break;
                    case 3:
                    var percent = download.downloadedSize / download.totalSize * 100;
                    wgtWaiting.setTitle("下载中 " + parseInt(percent) + "%...");
                    break;
                    case 4:
                    wgtWaiting.setTitle("下载完成");
                    break;
                }
            });
            dtask.start();
        }
    },
    created(){
        this.getDay()
        this.getEdition()
    },
    mounted(){
        if(localStorage.getItem('nurseClickOrderTypeData')!=undefined){
            this.clickTab(Number(localStorage.getItem('nurseClickOrderTypeData')))
        }else{
            document.getElementsByClassName('tab-window')[0].getElementsByTagName('h1')[0].className=('this-tab')
        }
        this.getNewOrderIndex()
        let _this = this
        setInterval(function(){
            _this.getNewOrderIndex()
        },300000)
    }
}
</script>

<style scoped>
.set-date >>> .ivu-input{
    height: 1rem;
}
.set-date >>>.ivu-date-picker,.set-date >>>.ivu-select-dropdown,.set-date >>>.ivu-picker-panel-body{
    width: 10rem;
}
.set-date >>>.ivu-date-picker-cells{
    margin: 10px auto;
}
</style>


<style lang="less" scoped>
.body{
    min-height: 100%;
    width: 100%;
    position: relative;
    background:rgba(248,249,251,1);
    >.top-bar{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background:#FAFAFA;
        z-index: 10;
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
        >.page-logo{
            height: 66px;
            font-size: 48px;
            color:rgba(72,72,72,1);
            line-height:66px;
            text-align: left;
            float: left;
            margin: 48px 0 0 0.40rem;
        }
        >.tab-window{
            width: 100%;
            height: 84px;
            background: #fff;
            color: #555555;
            float: left;
            margin: 36px 0;
            display: flex;
            position: relative;
            justify-content: space-around;
            align-items:center;
            >h1{
                font-size: 28px;
                transition: all .3s;
                border-bottom: 1px solid #fff;
            }
            >.this-tab{
                color: #47BDC3;
                border-bottom: 1px solid #47BDC3;
                padding: 8px 0 9px 0;
            }
            >p{
                // width:24px;
                padding: 5px 5px;
                height:24px;
                background:rgba(252,70,52,1);
                border-radius: 12px;
                position: absolute;
                top: 10%;
                left: 45%;
                font-size:22px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:12px;
            }
        }
    }
    >.set-date{
        width: 98%;
        height: 1rem;
        margin: 276px 0 0;
    }
    .order-box{
        width: 100%;
        // height: 100%;
        padding: 264px 0 98px 0;
        overflow-y: scroll;
        list-style: none;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        >li{
            position: relative;
            width: 698px;
            height: 396px;
            background: #fff;
            border-radius: 20;
            margin: 0 auto 24px;
            color:rgba(51,51,51,1);
            >h1{
                font-weight:400;
            }
            >h3{
                height:34px;
                font-size:24px;
                font-family:PingFangSC;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:34px;
                position: absolute;
                top: 24px;
                right: 14px;
            }
            >.time{
                width: 670px;
                height: 70px;
                font-size: 28px;
                text-align: left;
                float: left;
                margin: 22px 14px 0;
                padding-bottom: 0.12rem;
                border-bottom: 1px solid #E8E8E8;
                font-weight:500;
                font-family: 'PingFangSC-Medium';
                line-height: 70px;
            }
            >.project{
                position: relative;
                width: 670px;
                height: 40px;
                font-size: 23px;
                text-align: left;
                float: left;
                margin: 12px 14px 0;
                padding-bottom: 0.12rem;
                border-bottom: 1px solid #E8E8E8;
                font-weight:500;
                font-family: 'PingFangSC-Medium';
                >span{
                    font-size: 22px;
                }
                >h2{
                    position: absolute;
                    right: 12px;
                    height:34px;
                    top: 0;
                    line-height: 34px;
                    >i{
                        width: 24px;
                        height: 24px;
                        display:block;
                        border-radius:50%;
                        margin: 6px 12px 0 0;
                        box-sizing: content-box;
                        float: left;
                    }
                }
                >.status1{
                    color: #5A56EC;
                    >i{background: #5A56EC}
                }
                >.status2{
                    color: #47C368;
                    >i{background: #47C368}
                }
                >.status3{
                    color: #47BDC3;
                    >i{background: #47BDC3}
                }
                >.status4{
                    color: #999999;
                    >i{background: transparent}
                }
                >.status5{
                    color: #FF434A;
                    >i{background: #FF434A}
                }
            }
            >img{
                width: 132px;
                height: 132px;
                position: absolute;
                top:155px;
                left: 14px;
                border-radius: 20px;
                background: #999999;
            }
            >.name{
                position: absolute;
                font-size:24px;
                height:49px;
                top: 152px;
                left: 172px;
            }
            >.phone{
                position: absolute;
                font-size:24px;
                height:49px;
                left: 172px;
                top: 200px;
            }
            >.site{
                position: absolute;
                font-size:24px;
                height:100px;
                left: 172px;
                top: 246px;
                max-width: 510px;
                text-align: left;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            >.details-but{
                width: 100%;
                height: 64px;
                border-top: 1px solid #E6E6E6;
                bottom: 0;
                left: 0;
                position: absolute;
                line-height: 64px;
                text-align: center;
                font-size: 24px;
                color: #333333;
                font-weight:500;
                display: flex;
                justify-content: space-around;
                >div{
                    width: 348px;
                    height: 100%;
                    font-size:24px;
                    font-family:PingFangSC;
                    font-weight:400;
                    // color:rgba(71,195,104,1);
                    line-height:64px;
                }
                >.yes{
                    color: #47C368;
                    font-size:32px;
                }
                >.no{
                    color: #FC4634;
                    font-size:32px;
                    border-left: 4px solid #E6E6E6;
                }
            }
        }
        >h1{
            width:710px;
            height:84px;
            background:rgba(255,255,255,1);
            border-radius:20px;
            border:2px solid rgba(71,189,195,1);
            font-size:28px;
            font-family:PingFangSC;
            font-weight:500;
            color:rgba(71,189,195,1);
            line-height:84px;
            margin: 0 auto;
        }
    }
    .order-box::-webkit-scrollbar {
        width: 0 !important
    }
    .not-order{
        display: block;
        position: absolute;
        top: 388px;
        left: 50%;
        margin-left: -159px;
        width: 318px;
        height: 500px;
    }
    >.bottom-bar{
        width: 100%;
        height: 98px;
        position: fixed;
        display: flex;
        justify-content: space-around;
        bottom: 0;
        left: 0;
        border-top:1px solid rgba(0,0,0,0.25);
        box-shadow:0px 1px 0px 0px rgba(0,0,0,0.25);
        background:#FAFAFA;
        >div{
            width: 375px;
            float: left;
            height: 100%;
            position: relative;
            >img{
                width: 54px;
                height: 54px;
                display: block;
                position: absolute;
                top: 10px;
                left: 50%;
                margin-left: -27px;
            }
            >p{
                width: 100%;
                height: 28px;
                font-size: 20px;
                line-height: 28px;
                text-align: center;
                float: left;
                margin: 70px auto 0;
                color: #8E8E93;
            }
        }
        >div:nth-of-type(1){
            >p{
                color: #47BDC3;
            }
        }
    }
    >.updated-version{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(51,51,51,0.4);
        z-index: 100;
        >.updated{
            width:670px;
            height:656px;
            background:rgba(255,255,255,1);
            border-radius:16px;
            position: absolute;
            top: 270px;
            left: 50%;
            margin-left: -335px;
            overflow: hidden;
            >img{
                width: 100%;
                height: auto;
            }
            >.btn{
                width: 100%;
                height: 88px;
                border: 1px solid #DFDFDF;
                font-size:32px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:88px;
                position: absolute;
                bottom: 0;
                right: 0;
            }
            >p{
                position: absolute;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFangSC;
                font-weight:400;
                color:rgba(3,3,3,1);
                width: 100%;
                bottom: 90px;
                left: 0;
            }
            >.btn:nth-of-type(1){
                // right: 50%;
                font-weight:600;
                color:rgba(71,189,195,1);
            }
        }
    }
}
</style>

<template>
    <div class="record-body">
        <div v-show="issueIf" class="issue-body" >
            <p @click="issueIf=false"></p>
            <div class="issue-box">
                <h1>护理项目问题<span>（多选）</span></h1>
                <div class="confirm" @click="cilckIssue">确定</div>
                <CheckboxGroup class="issue-type" v-model="issueIdList">
                    <Checkbox v-for="(item,index) in issueList" :key="index" :label="item.id">
                        <span>{{item.problem}}</span>
                    </Checkbox>
                </CheckboxGroup>
                <span>其他问题</span>
                <input type="text" v-model="issueOther">
            </div>
        </div>
        <div v-show="meansIf" class="means-body">
            <p @click="meansIf=false"></p>
            <div class="issue-box">
                <h1>护理措施<span>（编辑）</span></h1>
                <img @click="meansIf=false" src="@/assets/icon/del.png" alt="">
                <Input v-model="meansList" class="means" type="textarea" :rows="6" placeholder="请先选择问题......" />
                <div class="preservation" @click="cilckMeans">保存</div>
            </div>
        </div>
        <div class="top-bar">
            <p @click="back()" class="go-back"><i></i></p>
            <h1>护理记录</h1>
            <h2 @click="openHistory">历史记录</h2>
        </div>
        <ul class="record-box" >
            <li v-for="(item,index) in recordList" :key="index">
                <span v-if="index>0" @click="clickMinuslist(index)">删除</span>
                <h1>日期：{{item.time}}</h1>
                <h2>{{index+1}}、{{data.serviceName}}</h2>
                <h3 @click="clickOpenIssue(index)">问题：<p>{{item.problems}}</p></h3>
                <h3 @click="clickOpenMeans(index)">措施：<p>{{item.settlement}}</p></h3>
                <h4>效果评价：</h4>
                <Input class="evaluate" v-model="item.impactAssessment" type="textarea" :rows="6" placeholder="效果评价" />
            </li>
        </ul>
        <div class="bottom-bar">
            <div class="add" @click="clickAddList">增加护理表</div>
            <div class="push" @click="clickPush">确认</div>
        </div>

        
    </div>
</template>

<script>
import { addRecord , getproblem , getSettlement , getRecord , updataRecord , delRecord } from "@/lib/API/record";
import { MessageBox , Indicator } from 'mint-ui';
import { async } from 'q';
// import exit from "../../exit"
    export default {
        name: 'record',
        components:{
            // exit
        },
        data() {
            return {
                id:'',
                data:{},
                toDay:'',
                upDay:'',

                // 护理记录数组
                recordList:[
                    {
                        id:null,
                        problems:'点击选择',
                        settlement:'点击编辑',
                        impactAssessment:null,
                    }
                ],
                thisListIndex:0,

                issue:'',
                evaluate:'',
                issueBtnTxt:'点击选择',
                meansIfBtnTxt:'点击编辑',
                issueList:[],  //获取回来的问题列表

                issueIdList:[],       //选着的问题ID
                issueOther:'',        //其他问题
                issueConfirmType:[],  //选着的问题
                
                getmeansList:'', //根据护理项目获取的措施
                means:'',
                meansList:'',    //护士编辑的措施
                issueIf:false,
                meansIf:false,
                updataLock:false,

                pushListLength:0,
                PushOverLength:0,
            }
        },
        methods:{
            //历史记录
	        openHistory(){
	        	this.$router.push({name:'历史记录',query:this.data})
	        },
            back(){
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
            getDay(){
                let Y = new Date().getFullYear()+'';
                let M = new Date().getMonth()+1+'';
                let D = new Date().getDate()+'';
                if(M.length === 1) M = '0' + M;
                if(D.length === 1) D = '0' + D;
                this.toDay = Y+'.'+M+'.'+D;
                this.upDay = Y+'-'+M+'-'+D+' '+((new Date()+'').split(' ')[4]);
                this.recordList[0].time = this.toDay;
                this.recordList[0].addTime = this.upDay;
            },
            // 点击确认
            async clickPush(){
                this.pushListLength = this.recordList.length
                for(let i=0;i<this.recordList.length;i++){
                    if(this.recordList[i].problems != '点击选择'&&
                        this.recordList[i].meansIfBtnTxt != '点击编辑'&&
                        this.recordList[i].impactAssessment != null){
                        this.addRecord(i)
                    }
                    
                }
            },
            // 保存
            async addRecord(index){
                Indicator.open('保存中...');
                let upList = {
                    orderId:this.data.id,
                    problems:this.recordList[index].problems,
                    settlement:this.recordList[index].settlement,
                    impactAssessment:this.recordList[index].impactAssessment,
                    addTime:this.recordList[index].addTime
                }
                let res
                if(this.recordList[index].id != null){
                    upList.id = this.recordList[index].id
                    res = await updataRecord(upList)
                }else{
                    res = await addRecord(upList)
                }
                if(res.code === 200){
                    this.$toast('保存成功')
                    this.PushOverLength++
                }
                setTimeout(function(){
                    Indicator.close();
                },50)
                if(this.pushListLength == this.PushOverLength){
                    this.$router.push({
                        path: '/details',
                        query: {
                            data:this.data
                        }
                    })
                }
            },
            // 获取问题
            async getproblem(){
                let res = await getproblem({
                    serviceId:this.data.serviceId
                })
                if(res.code===200){
                    if(res.data.list.length != 0){
                        this.issueList = res.data.list
                    }else{
                        this.issueBtnTxt = '暂无对应问题'
                    }
                    
                }
            },
            // 获取措施
            async getSettlement(){
                let res = await getSettlement({
                    serviceId:this.data.serviceId
                })
                if(res.code===200){
                    this.getmeansList = res.data.list[0].settlement
                    this.meansList = res.data.list[0].settlement
                }
                this.getRecord()
            },
            // 护理问题确认
            async cilckIssue(){
                for(let i=0;i<this.issueIdList.length;i++){
                    for(let j=0;j<this.issueList.length;j++){
                        if(this.issueIdList[i] == this.issueList[j].id){
                            this.issueConfirmType.push(this.issueList[j].problem);
                        }
                    }
                }
                this.recordList[this.thisListIndex].problems = ''
                if(this.issueOther!=''){
                    this.issueConfirmType.push(this.issueOther)
                }
                this.recordList[this.thisListIndex].problems = this.issueConfirmType.join(',');
                this.issueOther = ''
                this.issueConfirmType = []
                this.issueIdList = []
                if(this.recordList[this.thisListIndex].problems == ''){
                    this.recordList[this.thisListIndex].problems = '无'
                }
                this.issueIf = false;
            },
            // 保存护理措施
            async cilckMeans(){
                this.recordList[this.thisListIndex].settlement = this.meansList
                this.meansList = ''
                this.meansIf = false;
            },
            // 获取护理记录
            async getRecord(){
                let res = await getRecord({
                    orderId:this.data.id
                })
                console.log(res)
                if(res.code === 200){
                    let list = res.data.list
                    if(list.length>0){
                        this.recordList = []
                        for(let i=0;i<list.length;i++){
                            this.recordList.push(list[i])
                            this.recordList[i].time = list[i].addTime.split(' ')[0]
                        }
                    }
                }
            },
            // 增加护理表
            clickAddList(){
                this.recordList.push(
                    {
                        id:null,
                        problems:'点击选择',
                        settlement:'点击编辑',
                        impactAssessment:null,
                        time:this.toDay,
                        addTime:this.upDay
                    }
                )
            },
            // 删除护理表
            clickMinuslist(index){
                MessageBox({
                    title: '提示',
	                message: '是否删除此表单?',
                    showCancelButton: true
                }).then((active) => {
                    if (active !== 'cancel') {
                        if(this.recordList[index].id != null){
                            this.delRecord(this.recordList[index].id)
                        }
                        let del = this.recordList.splice(index,1)
                        console.log(this.recordList)
                    }
                });
            },
            async delRecord(id){
                Indicator.open('删除中...');
                let res = await delRecord({
                    id:id
                })
                if(res.code === 200){
                    this.$toast('删除成功')
                }
                setTimeout(function(){
                    Indicator.close();
                },50)
            },
            // 打开选着问题
            async clickOpenIssue(index){
                this.issueIdList = []
                this.issueOther = ''
                this.issueConfirmType = []
                this.thisListIndex = index
                this.issueIf = true
                let newIssueList = this.recordList[this.thisListIndex].problems.split(',')
                for(let i=0;i<newIssueList.length;i++){
                    if(newIssueList[i]=='无'||newIssueList[i]=='点击选择'){
                        let del = newIssueList.splice(i,1)
                    }
                    for(let l=0;l<this.issueList.length;l++){
                        if(newIssueList[i] == this.issueList[l].problem){
                            this.issueIdList.push(this.issueList[l].id)
                            let del = newIssueList.splice(i,1)
                        }
                    }
                }
                if(newIssueList.length>0){
                    this.issueOther = newIssueList.join(',')
                }
            },
            // 打开措施编辑
            async clickOpenMeans(index){
                this.thisListIndex = index
                if(this.recordList[this.thisListIndex].settlement != '点击编辑'){
                    this.meansList = this.recordList[this.thisListIndex].settlement
                }else{
                    this.meansList = this.getmeansList
                }
                this.meansIf = true
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
            this.getproblem()
            this.getSettlement()
            // this.getRecord()
        }
    }
</script>

<style lang="less" scoped>
    .record-body{
        width: 100%;
        // height: 100%;
        min-height: 550px;
        position: relative;
        >.top-bar{
            width: 100%;
            height: 140px;
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(255,255,255,1);
            z-index: 10;
            >.go-back{
                width: 68px;
                height: 48px;
                position: absolute;
                top: 52px;
                left: 80px;
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
            >h1{
                height:48px;
                font-size:34px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(3,3,3,1);
                line-height:48px;
                position: absolute;
                top:54px;
                left: 50%;
                margin-left: -2em;
            }
            >h2{
                height:48px;
                font-size:34px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:500;
                color:rgba(1,122,255,1);
                line-height:48px;
                position: absolute;
                top: 54px;
                right: 30px;
            }
        }
        >.record-box{
            width: 750px;
            min-height: 1000px;
            overflow-x: hidden;
            padding-top: 140px; 
            margin: 0 auto;
            >li{
                border-top: 40px solid #F7F7F7; 
                width: 100%;
                height: 850px;
                margin-top: 25px;
                margin-bottom: 25px;
                position: relative;
                >span{
                    display: block;
                    width: 50px;
                    height:34px;
                    font-size: 24px;
                    line-height: 34px;
                    text-align: left;
                    color: #017AFF;
                    position: absolute;
                    top: 50px;
                    right: 50px;
                }
                >h1{
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:40px;
                    position: absolute;
                    top: 40px;
                    left: 32px;
                    text-align: left;
                }
                >h2{
                    height:44px;
                    font-size:32px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:450;
                    color:rgba(51,51,51,1);
                    line-height:44px;
                    position: absolute;
                    left: 32px;
                    top: 120px;
                }
                >h3{
                    height: 64px;
                    font-size:28px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:64px;
                    position: absolute;
                    left: 32px;
                    >p{
                        display: inline-block;
                        width: 594px;
                        height: 64px;
                        background:rgba(255,255,255,1);
                        border-radius:10px;
                        border:2px solid rgba(225,225,225,1);
                        margin-bottom: -20px;
                        text-align: center;
                        line-height: 64px;
                        font-size:22px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        padding: 0 10px;
                    }
                }
                >h3:nth-of-type(1){
                    top: 204px;
                }
                >h3:nth-of-type(2){
                    top: 288px;
                }
                >h4{
                    height:44px;
                    font-size:32px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:44px;
                    position: absolute;
                    left: 32px;
                    top: 432px;
                }
                >.evaluate{
                    width: 690px;
                    position: absolute;
                    top: 496px;
                    left: 32px;
                }
            }
            >li:nth-of-type(1){
                border-top: 0; 
            }
        }
        >.bottom-bar{
            height: 218px;
            width: 100%;
            >div{
                width: 690px;
                height: 80px;
                margin: 0 auto;
                margin-bottom: 18px;
                font-size:30px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                line-height:80px;
                border-radius:10px;
            }
            >.add{
                background:rgba(255,255,255,1);
                border:2px solid rgba(71,189,195,1);
                color:rgba(71,189,195,1);
            }
            >.push{
                background:rgba(71,189,195,1);
                color:rgba(255,255,255,1);
            }
        }
        
        
        >.issue-body{
            width: 100%;
            height: 100%;
            background:rgba(51,51,51,0.4);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 15;
            >p{
                width: 100%;
                height: 100%;
            }
            >.issue-box{
                width: 750px; 
                background:rgba(255,255,255,1);
                border-radius:20px 20px 0px 0px;
                position: absolute;
                bottom: 0px;
                left: 0;
                min-height:70%;
                >span{
                    height:44px;
                    font-size:30px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:44px;
                }
                >input{
                    width: 70%;
                    margin-bottom: 20px
                }
                >h1{
                    height:44px;
                    font-size:32px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:44px;
                    position: absolute;
                    top: 30px;
                    left: 30px;
                    >span{
                        color: #999999;
                        font-size: 22px;
                    }
                }
                >.confirm{
                    width:80px;
                    height:44px;
                    background:rgba(71,189,195,1);
                    border-radius:4px;
                    font-size:26px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:44px;
                    position: absolute;
                    top: 26px;
                    right: 32px;
                }
                >.issue-type{
                    margin-top: 118px;
                    padding-bottom: 20px;
                }
            }
        }
        >.means-body{
            width: 100%;
            height: 100%;
            background:rgba(51,51,51,0.4);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 15;
            >p{
                width: 100%;
                height: 100%;
            }
            >.issue-box{
                width:750px;
                min-height:60%;
                background:rgba(255,255,255,1);
                border-radius:20px 20px 0px 0px;
                position: absolute;
                bottom: 0;
                left: 0;
                overflow-y:scroll;
                >h1{
                    height:44px;
                    font-size:32px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:44px; 
                    position: absolute;
                    top: 76px;
                    left: 30px;
                    >span{
                        color:#999999;
                        font-size: 22px;
                    }
                }
                >img{
                    width:52px;
                    height:52px;
                    position: absolute;
                    top:32px;
                    right: 32px;
                }
                >.means{
                    width: 686px;
                    height: 60%;
                    margin-top: 140px;
                    font-size: 26px;
                }
                >.preservation{
                    width:690px;
                    height:80px;
                    background:rgba(71,189,195,1);
                    border-radius:10px;
                    font-size:30px;
                    font-family:PingFangSC;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    line-height:80px;
                    margin: 40px auto;
                    // position: absolute;
                    // padding: 40px 30px;
                    // bottom: 40px;
                    // left: 30px;
                }
            }
        }
    }
</style>

<style scoped>
  .record-body >>>.ivu-checkbox-group-item{
      position: relative;
  }
  .ivu-checkbox-group-item>>>span:nth-of-type(2){
      padding: 35px;
    }
  .record-body >>>.ivu-checkbox{
      position: absolute;
      top: 0;
      width: 90%;
      height: 100%;
  }
  .record-body >>>.ivu-checkbox-group-item{
    font-size: 30px; 
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin: 35px 20px;
  }
  .record-body >>>.ivu-checkbox-group{
    text-align: left;
    padding: 0 20px;
    margin: 0 auto;
  }
  .record-body >>>.ivu-checkbox-inner{
    border-color: #47BDC3;
    top:11px;
  }
  .record-body >>>.ivu-checkbox-checked .ivu-checkbox-inner{
    background-color: #47BDC3;
  }
  .record-body >>>textarea.ivu-input{
    font-size:26px;
    padding: 44px 46px;
    height: 100%;
  }
</style>
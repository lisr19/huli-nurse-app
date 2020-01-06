<template>
    <div class="record-body">
        <div class="go-back" @click="back">
            <i></i>
            <p></p>
        </div>
        <h1>护理记录</h1>
        <h2>日期：{{toDay}}</h2>
        <h4>{{data.serviceName}}</h4>
        <h3>问题：</h3>
        <h3>措施：</h3>
        <h3>效果评价：</h3>
        <div class="issue-btn" @click="issueIf=true">{{issueBtnTxt}}</div>
        <div class="means-btn" @click="meansIf=true">{{meansIfBtnTxt}}</div>
        <Input class="evaluate" v-model="evaluate" type="textarea" :rows="6" placeholder="效果评价" />
        <div class="btn" @click="addRecord">确认</div>
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
    </div>
</template>

<script>
import { addRecord , getproblem , getSettlement , getRecord , updataRecord , delsRecord } from "@/lib/API/record";
import { MessageBox , Indicator } from 'mint-ui';
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
                issue:'',
                issueOther:'',
                means:'',
                evaluate:'',
                issueBtnTxt:'点击选择',
                meansIfBtnTxt:'点击编辑',
                issueList:[],

                issueIdList:[],
                issueConfirmType:[],

                meansList:'',
                issueIf:false,
                meansIf:false,
                updataLock:false,
            }
        },
        methods:{
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
            getDay(){
                let Y = new Date().getFullYear()+'';
                let M = new Date().getMonth()+1+'';
                let D = new Date().getDate()+'';
                if(M.length === 1) M = '0' + M;
                if(D.length === 1) D = '0' + D;
                this.toDay = Y+'.'+M+'.'+D;
                this.upDay = Y+'-'+M+'-'+D+' '+((new Date()+'').split(' ')[4]);
            },
            async addRecord(){
                Indicator.open('保存中...');
                let upList = {
                    orderId:this.data.id,
                    problems:this.issue,
                    settlement:this.means,
                    impactAssessment:this.evaluate,
                    addTime:this.upDay
                }
                let res
                if(this.updataLock){
                    upList.id = this.id
                    res = await updataRecord(upList)
                }else{
                    res = await addRecord(upList)
                }
                if(res.code === 200){
                    Indicator.close();
                    this.$toast('操作成功')
                    this.$router.push({
                        path: '/details',
                        query: {
                            data:this.data
                        }
                    })
                }else{
                    Indicator.close();
                    if(this.issue == ''){
                        this.$toast('请选择问题')
                    }else if(this.means == ''){
                        this.$toast('请选择措施')
                    }else if(this.evaluate == ''){
                        this.$toast('请输入效果评测')
                    }
                }
            },
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
            async getSettlement(){
                let res = await getSettlement({
                    serviceId:this.data.serviceId
                })
                if(res.code===200){
                    this.meansList = res.data.list[0].settlement
                    if(this.means){
                        this.meansList = this.means
                    }
                }
                this.getRecord()
            },
            async cilckIssue(){
                this.issueConfirmType = []
                for(let i=0;i<this.issueIdList.length;i++){
                    for(let j=0;j<this.issueList.length;j++){
                        if(this.issueIdList[i] == this.issueList[j].id){
                            this.issueConfirmType.push(this.issueList[j].problem);
                        }
                    }
                }
                this.issueIf = false;
                if(this.issueConfirmType.length||this.issueOther){
                    console.log(this.issueConfirmType.length,this.issueOther)
                    this.issue = ''
                    this.issue = this.issueConfirmType.join()
                    if(this.issueOther){
                        if(this.issueConfirmType.length){
                            this.issue += ','+this.issueOther
                        }else{
                            this.issue = this.issueOther
                        }
                    }
                    this.issueBtnTxt = this.issue
                }else{
                    this.issue = '无'
                    this.issueBtnTxt = '无'
                }
                console.log(this.issue)
            },
            cilckMeans(){
                this.means = this.meansList
                this.meansIfBtnTxt = this.means
                this.meansIf = false;
            },
            async getRecord(){
                let res = await getRecord({
                    orderId:this.data.id
                })
                if(res.code === 200){
                    let list = res.data.list[0]
                    console.log(res)
                    if(list){
                        this.id = list.id
                        this.issue = list.problems
                        this.means = list.settlement
                        if(list.impactAssessment&&list.impactAssessment!='null'){
                            this.evaluate = list.impactAssessment
                        }
                        if(this.issue&&this.issue!='null'){
                            this.issueBtnTxt = this.issue
                            let issueList = this.issue.split(',')
                            let list = []
                            let issueLength = this.issueList.length
                            for(let i=0;i<issueList.length;i++){
                                let issueOtherLength = 0
                                for(let l=0;l<this.issueList.length;l++){
                                    if(issueList[i] == this.issueList[l].problem){
                                        this.issueIdList.push(this.issueList[l].id)
                                    }else{
                                        issueOtherLength++
                                    }
                                    if(issueLength == issueOtherLength){
                                        list.push(issueList[i])
                                    }
                                }
                            }
                            this.issueOther = list.join()
                        }
                        if(this.means&&this.means != 'null'){
                            this.meansIfBtnTxt = this.means
                            this.meansList = this.means
                        }
                        this.issueIf = false;
                        this.meansIf = false;
                        this.updataLock = true;
                    }
                }
            },
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
        height: 100%;
        min-height: 550px;
        position: relative;
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
            height:40px;
            font-size:28px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:40px;
            position: absolute;
            top: 138px;
            left: 32px;
        }
        >h3{
            height:44px;
            font-size:28px;
            font-family:PingFangSC;
            font-weight:400;
            color:#666666;
            line-height:44px;
            position: absolute;
            left: 32px;
        }
        >h3:nth-of-type(1){
            top: 314px;
        }
        >h3:nth-of-type(2){
            top: 398px;
        }
        >h3:nth-of-type(3){
            top: 530px;
        }
        >h4{
            height:44px;
            font-size:32px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:44px;
            position: absolute;
            top: 218px;
            left: 32px;
        }
        >.issue{
            width:594px;
            height:80px;
            background:rgba(255,255,255,1);
            border-radius:10px;
            position: absolute;
            top: 218px;
            left: 124px;
        }
        >.means{
            width:594px;
            height:80px;
            background:rgba(255,255,255,1);
            border-radius:10px;
            position: absolute;
            top: 338px;
            left: 124px;
        }
        >.evaluate{
            width:690px;
            height:286px;
            background:rgba(255,255,255,1);
            border-radius:10px;
            position: absolute;
            top: 594px;
            left: 32px;
        }
        >.btn{
            float: left;
            width:690px;
            height:80px;
            background:rgba(71,189,195,1);
            border-radius:10px;
            font-size:30px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:80px;
            // position: absolute;
            margin: 150% 4% 20px;
            // top: 1186px;
            // left: 50%;
            // margin-left: -345px;
        }
        >.issue-btn{
            width:594px;
            height:64px;
            background:rgba(255,255,255,1);
            border-radius:10px;
            border:2px solid rgba(225,225,225,1);
            font-size:22px;
            font-family:PingFangSC;
            font-weight:400;
            color:#666666;
            line-height:64px;
            position: absolute;
            top: 302px;
            left: 118px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        >.means-btn{
            width:594px;
            height:64px;
            padding: 0 20px;
            background:rgba(255,255,255,1);
            border-radius:10px;
            border:2px solid rgba(225,225,225,1);
            font-size:22px;
            font-family:PingFangSC;
            font-weight:400;
            color:#666666;
            line-height:64px;
            position: absolute;
            top: 386px;
            left: 118px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        >.issue-body{
            width: 100%;
            height: 100%;
            background:rgba(51,51,51,0.4);
            position: fixed;
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
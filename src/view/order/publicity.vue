<template>
    <div class="publicity-body">
        <div class="top-bar">
            <div class="go-back" @click="goBack">
                <i></i>
                <span></span>
            </div>
            <h1>健康宣教</h1>
        </div>
        <div class="select-window">
            <ul :class="bottomHEList.length == 0?'ul1':'ul2'">
                <li class="label" v-for="(item,index) in labelList" :key="index">
                    <h1 @click="clickLabel(index,item.id)">{{item.content}}</h1>
                    <img src="@/assets/icon/arrows.png" class="arrows" style="" alt="">
                    <ul class="HE-box" style="height:0">
                        <li v-if="HEList.length == 0"><h2>暂无</h2></li>
                        <li v-for="(HEItem,HEIndex) in HEList" :key="HEIndex" @click="clickHE(index,item.id,HEItem,HEIndex)" class="">
                            <img src="@/assets/img/no.png" alt="">
                            <img src="@/assets/img/yes.png" alt="">
                            <h1>《{{HEItem.name}}》</h1>
                            <p></p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="bottom-bar">
            <div :class="bottomHEList.length == 0?'HE-list-false':'HE-list-true'" >
                <ul>
                    <li class="bottom-list" v-for="(item,index) in bottomHEList" :key="index" @click="clickBottomHE(item,index)">
                        <img src="@/assets/icon/close.png" alt="">
                        《{{item.data.name}}》
                    </li>
                </ul>
            </div>
            <div class="bottom-btn">
                <div>确认并发送</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getLabel , getHealthEducation } from "@/lib/API/publicity";
    import { Indicator } from 'mint-ui';
    export default {
        name: 'publicity',
        data() {
            return {
                data:{},
                labelList:[],
                HEList:[],
                pshuHEList:{},
                bottomHEList:[],
            }
        },
        methods:{
            goBack(){
                this.$router.push({
                    path: '/details',
                    query: {
                        data:this.data
                    }
                })
            },
            // 获取宣教标签
            async getLabel(){
                let res = await getLabel({size:60})
                if(res.code === 200){
                    this.labelList = res.data.list
                    for(let i=0;i<this.labelList.length;i++){
                        let typeName = 'label'+this.labelList[i].id
                        this.pshuHEList[typeName]=[]
                    }
                }
            },
            // 点击宣教标签
            clickLabel(index,id){
                let labelBox = document.getElementsByClassName('HE-box')
                let arrows = document.getElementsByClassName('arrows')
                for(let i=0;i<labelBox.length;i++){
                    if(i!=index){
                        labelBox[i].style = 'height:0'
                        arrows[i].style = ''
                    }
                }
                if(labelBox[index].style.height != '0px'){
                    labelBox[index].style = 'height:0'
                    arrows[index].style = ''
                    this.HEList = []
                }else{
                    arrows[index].style = 'transform: rotate(180deg);'
                    this.HEList = []
                    this.getHealthEducation(id,index)
                    labelBox[index].style = 'height: auto'
                }
            },
            // 获取宣教材料
            async getHealthEducation(id,index){
                Indicator.open();
                let res = await getHealthEducation({labelId : id})
                if(res.code === 200){
                    this.HEList = res.data.list
                    let typeName = 'label'+id
                    let HELi = document.getElementsByClassName('HE-box')[index].getElementsByTagName('li')
                    if(this.pshuHEList[typeName].length != 0){
                        for(let i=0;i<this.HEList.length;i++){
                            for(let l=0;l<this.pshuHEList[typeName].length;l++){
                                if(this.HEList[i].id == this.pshuHEList[typeName][l].id){
                                    setTimeout(function(){
                                        HELi[i].className = 'this-HE'
                                    },50)
                                }
                            }
                        }
                    }
                }
                Indicator.close();
            },
            // 点击选着宣教材料
            clickHE(index,labelID,item,HEIndex){
                let label = document.getElementsByClassName('label')[index]
                let HEBox
                let typeName = 'label'+labelID
                if(HEIndex!='false'){
                    HEBox = label.getElementsByClassName('HE-box')[0].getElementsByTagName('li')[HEIndex]
                    if(HEBox.className){
                        HEBox.className=''
                        for(let i=0;i<this.pshuHEList[typeName].length;i++){
                            if(this.pshuHEList[typeName][i].id == item.id){
                                let del = this.pshuHEList[typeName].splice(i,1)
                            }
                        }
                        this.bottomHE('del',item,labelID,index,HEIndex)
                    }else{
                        HEBox.className='this-HE'
                        this.pshuHEList[typeName].push(item)
                        this.bottomHE('add',item,labelID,index,HEIndex)
                    }
                }else{
                    for(let i=0;i<this.pshuHEList[typeName].length;i++){
                        if(this.pshuHEList[typeName][i].id == item.id){
                            let del = this.pshuHEList[typeName].splice(i,1)
                        }
                    }
                }
            },
            // 底部宣教列表
            bottomHE(operation,item,labelID,labelIndex,HEIndex){
                if(operation == 'add'){
                    this.bottomHEList.push({
                        data:item,
                        labelId:labelID,
                        index:labelIndex,
                        HEIndex:HEIndex
                    })
                }else if(operation == 'del'){
                    for(let i=0;i<this.bottomHEList.length;i++){
                        if( this.bottomHEList[i].data.id == item.id && this.bottomHEList[i].labelId == labelID ){
                            let del = this.bottomHEList.splice(i,1)
                        }
                    }
                }
            },
            // 点击底部宣教列表
            clickBottomHE(item){
                let HEBox = document.getElementsByClassName('HE-box')[item.index]
                if(HEBox.style.height != '0px'){
                    this.clickHE(item.index,item.labelId,item.data,item.HEIndex)
                }else{
                    this.clickHE(item.index,item.labelId,item.data,'false')
                }
                this.bottomHE('del',item.data,item.labelId,item.index)
            }
        },
        created(){
            this.data = JSON.parse(localStorage.getItem('nurseOrderCopyDatas'))
            this.getLabel()
        },
        mounted(){

        }
    }
</script>

<style lang="less" scoped>
    .publicity-body{
        background: #F8F9FB;
        width: 100%;
        min-height: 100%;
        float: left;
        position: relative;
        >.top-bar{
            width: 100%;
            height: 90px;
            background: #F5F5F5;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 20;
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
                    border-left: 3px solid #333333;
                    border-bottom: 3px solid #333333;
                    display: block;
                    position: absolute;
                    left: -30px;
                    top: -20.5px;
                    transform:rotate(45deg);
                }
            }
            >h1{
                height:40px;
                font-size:28px;
                font-family:PingFangSC-Medium,PingFangSC;
                font-weight:500;
                color:rgba(72,72,72,1);
                line-height:40px;
                position: absolute;
                top: 26px;
                left: 50%;
                margin-left: -2em;
            }
        }
        >.select-window{
            width: 100%;
            margin-top: 90px;
            >.ul1{
                padding-bottom: 150px; 
            }
            >.ul2{
                padding-bottom: 300px; 
            }
            >ul{
                width: 670px;
                padding-top: 22px;
                margin: 0 auto; 
                transition: all .5s;
                >.label{
                    width:670px;
                    margin: 20px 0;
                    text-align: left;
                    position: relative;
                    >.arrows{
                        position: absolute;
                        width: 26px;
                        height: 14px;
                        top: 36px;
                        right: 46px;
                        transform: rotate(0deg);
                        transition: all .3s;
                    }
                    >h1{
                        width: 670px;
                        height:88px;
                        min-height:88px;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 4px 8px 0px rgba(243,243,243,0.5);
                        border-radius:12px;
                        font-size:28px;
                        font-family:PingFangSC-Regular,PingFangSC;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height:88px;
                        padding-left: 28px;
                    }
                    >ul{
                        border-radius:0px 0px 12px 12px;
                        overflow: hidden;
                        height: auto;
                        transition: all .5s;
                        >li{
                            z-index: 9;
                            width: 648px;
                            height: 122px;
                            background:rgba(255,255,255,1);
                            margin: 0 auto;
                            position: relative;
                            >h1{
                                height:122px;
                                font-size:28px;
                                font-family:PingFangSC-Regular,PingFangSC;
                                font-weight:400;
                                color:rgba(102,102,102,1);
                                line-height:122px;
                                display: inline-block;
                                padding-left:112px; 
                            }
                            >h2{
                                height:122px;
                                font-size:28px;
                                font-family:PingFangSC-Regular,PingFangSC;
                                font-weight:400;
                                color:rgba(102,102,102,1);
                                line-height:122px;
                                text-align: center;
                            }
                            >img{
                                position: absolute;
                                height: 32px;
                                width: 32px;
                                top: 48px;
                                left: 48px;
                            }
                            >img:nth-of-type(1){
                                opacity:1;
                            }
                            >img:nth-of-type(2){
                                opacity:0;
                                transition: all .2s;
                            }
                            >p{
                                position: absolute;
                                bottom: 0;
                                left: 50%;
                                margin-left: -279px;
                                background: #E5E5E5;
                                height: 2px;
                                width: 558px;
                            }
                        }
                        >.this-HE{
                            >img:nth-of-type(2){
                                opacity:1;
                            }
                        }
                        >li:nth-of-type(1){
                            box-shadow:inset 0px 15px 10px -15px rgba(243,243,243,0.5);
                        }
                    }
                }
            }
        }
        >.bottom-bar{
            width: 100%;
            // height: 280px;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10;
            border-radius:28px 28px 0px 0px;
            overflow: hidden;
            >div{
                background: #FFF;
                width: 100%;
            }
            >div:nth-of-type(1){
                transition: all .5s;
                overflow-x: scroll;
                -ms-overflow-style: none;
                overflow: -moz-scrollbars-none;
                >ul{
                    height: 100%;
                    width: auto;
                    white-space: nowrap;
                    >li{
                        height: 100%;
                        padding: 44px 44px;
                        display: inline-block;
                        font-size:22px;
                        font-family:PingFangSC-Regular,PingFangSC;
                        font-weight:400;
                        color:rgba(71,189,195,1);
                        >img{
                            width: 16px;
                            height: auto;
                        }
                    }
                }
            }
            >div:nth-of-type(1)::-webkit-scrollbar {
                width: 0 !important 
            }
            >.HE-list-true{
                height: 128px;
            }
            >.HE-list-false{
                height: 0px;
                overflow: hidden;
            }
            >.bottom-btn{
                height: 152px;
                border-top: 3px solid rgba(248,249,251,1);
                >div{
                    width:690px;
                    height:80px;
                    background:rgba(71,189,195,1);
                    border-radius:10px; 
                    font-size:30px;
                    font-family:PingFangSC-Semibold,PingFangSC;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    line-height:80px;
                    margin: 0 auto;
                    position: relative;
                    top: 36px;
                }
            }
        }
    }
</style>
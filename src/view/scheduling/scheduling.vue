<template>
    <div class="scheduling-body">
        <div class="go-back" @click="$router.back()">
            <i></i>
            <p></p>
        </div>
        <h1>排班设置</h1>
        <h2 @click="verifyData()">保存</h2>
        <div class="thanking-box">
            <img src="@/assets/icon/Lily.png" alt="">
            <p>{{Thanking}}</p>
        </div>
        <div class="schedule-box">
            <div class="type-box">
                <h1 @click="clickWeek(0)" class="thisWeek">本周</h1>
                <h1 @click="clickWeek(1)" class="">下周</h1>
            </div>
            <div class="form-body">
                <div class="this-week">
                    <ul>
                        <li v-for="(item,index) in week" :key="index" class="week">
                            <h1>
                                {{item}}
                                <h2 class="this-week-day">{{toWeek.month[index]}}月{{toWeek.day[index]}}日</h2>
                            </h1>
                            <p class="" v-for="(item,btnIndex) in times" 
                                        :key='btnIndex' 
                                        :day='toWeek.year[index]+"-"+toWeek.month[index]+"-"+toWeek.day[index]' 
                                        @click="clickJobTime('this-week',index,btnIndex)">
                                {{item}}
                            </p>
                            <div class="string" style="height:1px;"></div>
                        </li>
                    </ul>
                </div>
                <div class="next-week">
                    <ul>
                        <li v-for="(item,index) in week" :key="index" class="week">
                            <h1>
                                {{item}}
                                <h2 class="next-week-day">{{nextWeek.month[index]}}月{{nextWeek.day[index]}}日</h2>
                            </h1>
                            <p class="" v-for="(item,btnIndex) in times" 
                                        :key='btnIndex' 
                                        :day='nextWeek.year[index]+"-"+nextWeek.month[index]+"-"+nextWeek.day[index]'
                                        @click="clickJobTime('next-week',index,btnIndex)">
                                {{item}}
                            </p>
                            <div class="string" style="height:1px;"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getScheduling , addScheduling , updataScheduling , delsScheduling } from '@/lib/API/scheduling';
import { Indicator } from 'mint-ui';
    export default {
        name: '',
        computed:{
            userId(){
                return this.$store.state.user.userId
            }
        },
        data() {
            return {
                week:['一','二','三','四','五','六','日'],
                times:['08:00-12:00','14:00-18:00','18:00-20:00'],
                // 本周日期
                toWeek:{
                    year:[],
                    month:[],
                    day:[]
                },
                // 下周日期
                nextWeek:{
                    year:[],
                    month:[],
                    day:[]
                },
                // 谢语
                Thanking:'洁白，是你的衣裳；微笑，是你的形象；无私，是你的奉献，感谢有你。',
                // 上传数据
                upDatas:[],
                delDatas:[],
                basicData:[],
                monitorData:[]
            }
        },
        methods:{
            // 计算两周日期
            getDay(){
                let toDay = new Date().getDay();
                if(toDay === 0) toDay = 7;
                let toDaySm = new Date((new Date().getTime())-(86400000*(toDay-1))).getTime()
                for(let i=0;i<(2*7);i++){
                    let thisD = new Date((toDaySm+(i*86400000))*1).getDate()+''
                    let thisM = (new Date((toDaySm+(i*86400000))*1).getMonth()+1)+''
                    if(thisD.length === 1)thisD = '0'+thisD;
                    if(thisM.length === 1)thisM = '0'+thisM;
                    if(i<7){
                        this.toWeek.year.push(new Date((toDaySm+(i*86400000))*1).getFullYear())
                        this.toWeek.month.push(thisM)
                        this.toWeek.day.push(thisD)
                    }else if(i<14){
                        this.nextWeek.year.push(new Date((toDaySm+(i*86400000))*1).getFullYear())
                        this.nextWeek.month.push(thisM)
                        this.nextWeek.day.push(thisD)
                    }
                }
                // this.getScheduling()
            },
            // 切换周
            clickWeek(index){
                let types = document.getElementsByClassName('type-box')[0].getElementsByTagName('h1');
                for(let i=0;i<types.length;i++){
                    types[i].className = '';
                }
                types[index].className = 'thisWeek';
                if(index === 1){
                    document.getElementsByClassName('form-body')[0].style.left = '-100.2%'
                }else{
                    document.getElementsByClassName('form-body')[0].style.left = ''
                }
            },
            // 选着上班时间
            clickJobTime(name,index,btnIndex){
                let thisBtn = document.getElementsByClassName(name)[0].getElementsByTagName('li')[index].getElementsByTagName('p')[btnIndex];
                // if(thisBtn.getAttribute("id")){
                //     this.delDatas.push(thisBtn.getAttribute("id"))
                //     thisBtn.removeAttribute('id')
                // }
                if(thisBtn.className === ''){
                    thisBtn.className = 'clickThisTime'
                }else{
                    thisBtn.className = ''
                }
            },
            // 上传查询班表
            async clickUpData(){
                this.delsScheduling()
                this.upDatas = [];
                let timeBtns = document.getElementsByClassName('clickThisTime');
                for(let i=0;i<timeBtns.length;i++){
                    if(!timeBtns[i].getAttribute('id')){
                        this.upDatas.push({
                            'nurseId':this.userId,
                            'scheduleStartTime':timeBtns[i].getAttribute('day')+' '+timeBtns[i].innerText.split('-')[0]+':00',
                            'scheduleEndTime':timeBtns[i].getAttribute('day')+' '+timeBtns[i].innerText.split('-')[1]+':00',
                            'isTake':0
                        })
                    }
                }
                let upOverIndex = 0;
                for(let i=0;i<this.upDatas.length;i++){
                    let res = await addScheduling(this.upDatas[i])
                    if(res.code === 200){
                        upOverIndex++
                    }
                }
                if(upOverIndex == this.upDatas.length){
                    Indicator.close();
                    this.$toast('保存成功')
                    this.$router.back()
                }else{
                    Indicator.close();
                    this.$toast('保存失败')
                }
            },
            // 删除班表
            async delsScheduling(){
                if(this.delDatas.length){
                    let res = await delsScheduling({
                        ids:this.delDatas.join()
                    })
                }
            },
            // 获取班表
            async getScheduling(){
                let scheduleStartTime = this.toWeek.year[0]+'-'+this.toWeek.month[0]+'-'+this.toWeek.day[0]+' 00:00:00';
                let scheduleEndTime = this.nextWeek.year[6]+'-'+this.nextWeek.month[6]+'-'+this.nextWeek.day[6]+' 23:59:59';
                let toWeekDayBoxs = document.getElementsByClassName('this-week-day')
                let nextWeekDayBoxs = document.getElementsByClassName('next-week-day')
                let nurseId = this.userId
                let res = await getScheduling({
                    nurseId: nurseId,
                    scheduleStartTime: scheduleStartTime,
                    scheduleEndTime: scheduleEndTime,
                    page: 1,
                    size:60
                })
                if(res.code === 200){
                    let lists = res.data.list;
                    this.basicData = lists;
                    let toWeekLastDay = this.toWeek.year[6]+'-'+this.toWeek.month[6]+'-'+this.toWeek.day[6]
                    for(let i=0;i<lists.length;i++){
                        let day = lists[i].scheduleStartTime.split(' ')[0];
                        let time = lists[i].scheduleStartTime.split(' ')[1];
                        let id = lists[i].id
                        let dayBox;
                        let timeBox;
                        if(new Date(day).getTime() <= new Date(toWeekLastDay).getTime()){
                            let dataDay = day.split('-')[1]+'月'+day.split('-')[2]+'日';
                            for(let j=0;j<toWeekDayBoxs.length;j++){
                                if(dataDay == toWeekDayBoxs[j].innerText){
                                    let weekDayBox = document.getElementsByClassName('this-week')[0].getElementsByClassName('week')[j];
                                    if(time == '08:00:00'){
                                        weekDayBox.getElementsByTagName('p')[0].className='clickThisTime';
                                        weekDayBox.getElementsByTagName('p')[0].setAttribute('id',id)
                                    }else if(time == '14:00:00'){
                                        weekDayBox.getElementsByTagName('p')[1].className='clickThisTime';
                                        weekDayBox.getElementsByTagName('p')[1].setAttribute('id',id)
                                    }else if(time == '18:00:00'){
                                        weekDayBox.getElementsByTagName('p')[2].className='clickThisTime';
                                        weekDayBox.getElementsByTagName('p')[2].setAttribute('id',id)
                                    }
                                }
                                
                            }
                        }else{
                            let dataDay = day.split('-')[1]+'月'+day.split('-')[2]+'日';
                            for(let j=0;j<nextWeekDayBoxs.length;j++){
                                if(dataDay == nextWeekDayBoxs[j].innerText){
                                    let weekDayBox = document.getElementsByClassName('next-week')[0].getElementsByClassName('week')[j];
                                    if(time == '08:00:00'){
                                        weekDayBox.getElementsByTagName('p')[0].className='clickThisTime';
                                        weekDayBox.getElementsByTagName('p')[0].setAttribute('id',id)
                                    }else if(time == '14:00:00'){
                                        weekDayBox.getElementsByTagName('p')[1].className='clickThisTime';
                                        weekDayBox.getElementsByTagName('p')[1].setAttribute('id',id)
                                    }else if(time == '18:00:00'){
                                        weekDayBox.getElementsByTagName('p')[2].className='clickThisTime';
                                        weekDayBox.getElementsByTagName('p')[2].setAttribute('id',id)
                                    }
                                }
                                
                            }
                        }
                    }
                }else{
                    this.$toast('获取班表失败')
                }
            },
            // 清空班表
            async emptyData(){
                let dayBoxs = document.getElementsByClassName('week')
                for(let i=0;i<dayBoxs.length;i++){
                    let timeBoxs = dayBoxs[i].getElementsByTagName('p')
                    for(let j=0;j<timeBoxs.length;j++){
                        timeBoxs[j].className=''
                        if(timeBoxs[j].getAttribute('id')){
                            timeBoxs[j].removeAttribute('id')
                        }
                    }
                }
                this.getScheduling()
            },
            // 班表验证
            async verifyData(){
                console.log('保存')
                Indicator.open();
                let scheduleStartTime = this.toWeek.year[0]+'-'+this.toWeek.month[0]+'-'+this.toWeek.day[0]+' 00:00:00';
                let scheduleEndTime = this.nextWeek.year[6]+'-'+this.nextWeek.month[6]+'-'+this.nextWeek.day[6]+' 23:59:59';
                let nurseId = this.userId
                let weekBoxs = document.getElementsByClassName('week')
                for(let i=0;i<weekBoxs.length;i++){
                    let timeBoxs = weekBoxs[i].getElementsByTagName('p')
                    for(let l=0;l<timeBoxs.length;l++){
                        if(timeBoxs[l].className == ''&&timeBoxs[l].getAttribute("id")){
                            this.delDatas.push(timeBoxs[l].getAttribute("id"))
                            timeBoxs[l].removeAttribute('id')
                        }
                    }
                }
                // console.log(weekBoxs)
                // let res = await getScheduling({
                //     nurseId: nurseId,
                //     scheduleStartTime: scheduleStartTime,
                //     scheduleEndTime: scheduleEndTime,
                //     page: 1,
                //     size:60
                // })
                // if(res.code === 200){
                //     this.monitorData = res.data.list
                //     let warningLock = false;
                //     if(this.monitorData.length === this.basicData.length){
                //         for(let i=0;i<this.monitorData.length;i++){
                //             if(this.monitorData[i].id != this.basicData[i].id){
                //                 warningLock =true
                //             }
                //         }
                //     }else{
                //         warningLock = true
                //     }
                //     if(warningLock){
                //         Indicator.close();
                //         this.$toast('您的排班表已在其他地方被修改')
                //     }else{
                //         this.clickUpData()
                //     }
                // }
                this.clickUpData()
            }
        },
        created(){
            this.getDay()
        },
        mounted(){
            // this.getScheduling()
            this.emptyData()
        }
    }
</script>

<style lang="less" scoped>
    .scheduling-body{
        width: 100%;
        height: 100%;
        background:rgba(248,249,251,1);
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
            height:40px;
            font-size:28px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(3,3,3,1);
            line-height:40px;
            position: absolute;
            top: 52px;
            left: 50%;
            margin-left: -2em;
        }
        >h2{
            height:48px;
            font-size:34px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(1,122,255,1);
            line-height:48px;
            position: absolute;
            top: 48px;
            right: 40px;
        }
        .schedule-box{
            width:670px;
            height:906px;
            background:rgba(255,255,255,1);
            border-radius:20px;
            position: absolute;
            top: 142px;
            left: 50%;
            margin-left: -335px;
            overflow: hidden;
            // z-index: 10;
            .type-box{
                width: 670px;
                height: 88px;
                border-bottom: 2px solid #E6E6E6;
                position: relative;
                display: flex;
                justify-content: space-around;
                >h1{
                    height:88px;
                    font-size:28px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    line-height:88px;
                    border-bottom:  0px solid #47BDC3;
                    transition: all .3s;
                    padding: 0 10px;
                }
                >.thisWeek{
                    color: #47BDC3;
                    border-bottom:  10px solid #47BDC3;
                    font-size: 40px;
                }
            }
            .form-body{
                position: absolute;
                top: 88px;
                left: 0;
                width: 1342px;
                height: 816px;
                transition: all .3s;
                >div{
                    position: relative;
                    width: 670px;
                    height: 816px;
                    float: left;
                    box-sizing: content-box;
                    >ul{
                        margin-top: 22px;
                        width: 100%;
                        >li{
                            width: 670px;
                            height: 110px;
                            position: relative;
                            >h1{
                                position: absolute;
                                width: 28px;
                                height:40px;
                                font-size:28px;
                                font-family:PingFangSC;
                                font-weight:500;
                                color:rgba(51,51,51,1);
                                line-height:40px;
                                top: 20px;
                                left: 60px;
                                >h2{
                                    position: absolute;
                                    top: 40px;
                                    left: 50%;
                                    margin-left: -75px;
                                    width: 150px;
                                    height:32px;
                                    font-size:22px;
                                    font-family:PingFangSC;
                                    font-weight:400;
                                    color:rgba(153,153,153,1);
                                    line-height:32px;
                                }
                            }
                            >.string{
                                width:604px;
                                background: #EDEDED;
                                position: absolute;
                                bottom: 0;
                                left: 50%;
                                margin-left: -302px; 
                            }
                            >p{
                                width:162px;
                                height:68px;
                                background:rgba(248,249,249,1);
                                border-radius:10px;
                                border:2px solid rgba(240,240,240,1);
                                position: absolute;
                                top: 22px;
                                line-height: 68px;
                                font-size:20px;
                                font-family:PingFangSC;
                                font-weight:400;
                                color:rgba(153,153,153,1);
                                transition: all .3s;
                            }
                            >p:nth-of-type(1){
                                left: 140px;
                            }
                            >p:nth-of-type(2){
                                left: 320px;
                            }
                            >p:nth-of-type(3){
                                left: 500px;
                            }
                            >.clickThisTime{
                                background:rgba(71,189,195,1);
                                color: #FFFFFF;
                            }
                        }
                    }
                }
                >div:nth-of-type(1){
                    border-right: 1px solid #999999;
                    width: 671px;
                }
            }
        }
        .thanking-box{
            width:670px;
            height:144px;
            background:rgba(255,255,255,1);
            border-radius:20px;
            position: absolute;
            bottom: 3.15%;
            left: 50%;
            margin-left: -335px;
            >img{
                display: block;
                width: 170px;
                height: 148px;
                position: absolute;
                top: -46px;
                left: -10px;
            }
            >p{
                width:424px;
                height:68px;
                font-size:24px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:34px;
                position: absolute;
                top: 38px;
                left: 204px;
                text-align: left;
            }
        }
    }
</style>
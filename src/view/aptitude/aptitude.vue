<template>
    <div class="aptitude-body">
        <div class="go-back" @click="goBack">
            <i></i>
            <p></p>
        </div>
        <h1>资质验证</h1>
        <h2>资质证书</h2>
        <ul class="up-window">
            <li v-for="(item,index) in aptitudeList" :key="index">
                <Select v-model="item.qualifyId" style="" placeholder='选择资质类型'>
                    <Option v-for="item in mustDataList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <div v-show="item.qualifyId" @click="upImgBtnIndex=index">
                    <img class="old-img" v-if="upImgs[index]" :src="upImgs[index]" alt="">
                    <Upload action="http://192.168.0.122:8899/upload/img"
                            name="imgFile"
                            :on-success='addUpImg'
                            :on-remove='deleteImg'>
                        <Button v-if="!item.qualifyDocument"> <img src="@/assets/icon/upData.png" alt=""> 上传资质证明</Button>
                    </Upload>
                </div>
                <img v-if="index === 0" class="add" @click="addList" src="@/assets/icon/add.png" alt="">
                <p v-else class="del" @click="delList(index)">删除</p>
            </li>
        </ul>
        <div class="upData-btn" @click="upList">上传验证</div>
    </div>
</template>

<script>
import imgUpdata from '@/components/img-upload/img-upload.vue'
import {getAptitudeList,addMany,getAptitude,delAptitude,aupdateMany} from "@/lib/API/aptitude";
import { Indicator } from 'mint-ui';
    export default {
        name: '',
        components:{
            imgUpdata
        },
        computed:{
            nuserId(){
                return this.$store.state.user.userId //护士ID
            },
        },    
        data() {
            return {
                mustDataList:[],
                aptitudeList:[
                    {
                        qualifyId:'',
                        qualifyDocument:'',
                        nurseId:0,
                    },
                ],
                upImgBtnIndex:null,
                // 所在医院 所在科室 工作年限 执业证书
                userHospital:'',
                userDepartment:'',
                userYear:'',
                VocationalCertificate:'',
                // 护理职称证书 护理服务专业培训证书
                userPost:'',
                userCultivate:'',
                // 上传的类型 0=必要 1=选填
                upDataType:null,
                // 输入、上传页类型
                inputBoxTxt:'',
                // 输入的内容
                theInput:'',
                // 上传的照片
                upImgs:[]
            }
        },
        methods:{
            async getAptitudeList(){
                let res = await getAptitudeList({
                    size:18
                })
                if(res.code === 200) {
                    this.mustDataList = res.data.list;
                }
            },
            // 上传图片
            addUpImg(res, file){
                if(res.code === 200){
                    let url = res.data.url
                    this.addImg(url)
                }
            },
            addImg(url){
                this.aptitudeList[this.upImgBtnIndex].qualifyDocument = url;
                this.upImgs[this.upImgBtnIndex] = url
            },
            deleteImg(){
                this.aptitudeList[this.upImgBtnIndex].qualifyDocument = ''
                this.upImgs[this.upImgBtnIndex] = ''
            },
            // 添加资质
            addList(){
                this.aptitudeList.push({
                    qualifyId:'',
                    qualifyDocument:'',
                    nurseId:0,
                })
                this.upImgs.push('')
                console.log(this.aptitudeList,this.upImgs)
            },
            // 删除资质
            async delList(index){
                if(this.$route.query.upLock && this.aptitudeList[index].id){
                    let res = await delAptitude({
                        id:this.aptitudeList[index].id
                    })
                    if(res.code === 200){
                        this.upImgs.splice(index,1)
                        this.aptitudeList.splice(index,1)
                        this.$toast('删除成功')
                    }else{
                        console.log(res)
                        this.$toast('删除失败')
                    }
                }else{
                    this.aptitudeList.splice(index,1)
                    this.upImgs.splice(index,1)
                    console.log(this.aptitudeList,this.upImgs)
                }
                
            },
            // 上传资质
            async upList(){
                // Indicator.open();
                let nurseId = Number(localStorage.getItem('nuresAppUserId'))
                let listLength = this.aptitudeList.length;
                let addLength = 0;
                console.log(this.aptitudeList,this.upImgs)
                for(let i=0;i<this.aptitudeList.length;i++){
                    this.aptitudeList[i].nurseId = nurseId;
                    let res;
                    if(this.aptitudeList[i].id||(this.aptitudeList[i].qualifyDocument!=''&&this.aptitudeList[i].qualifyId!='')){
                        if(this.aptitudeList[i].id){
                            res = await aupdateMany(this.aptitudeList[i]);
                        }else{
                            res = await addMany(this.aptitudeList[i]);
                        }
                        if(res.code === 200){
                            addLength++
                        }
                    }
                }
                if(listLength == addLength){
                    Indicator.close();
                    this.$toast('提交成功');
                    this.goBack()
                }else{
                    Indicator.close();
                    let msg = addLength+'个提交成功,'+(listLength-addLength)+'个提交失败'
                    this.$toast(msg)
                    this.getAptitude()
                }
            },
            // 查询资质
            async getAptitude(){
                let res = await getAptitude({
                    nurseId:this.nurseId,
                    size:50
                })
                console.log(res)
                if(res.code === 200){
                    this.aptitudeList = res.data.list;
                    for(let i=0;i<this.aptitudeList.length;i++){
                        this.upImgs.push(this.aptitudeList[i].qualifyDocument)
                        this.aptitudeList[i].qualifyDocument=''
                    }
                }
            },
            goBack(){
                if(this.$route.query.upLock){
                    this.$router.push({name:'设置我的信息'})
                }else{
                    this.$router.push({name:'我的信息'})
                }
            }
        },
        created(){
            this.getAptitudeList()
            console.log(this.$route.query)
            if(this.$route.query.upLock){
                this.getAptitude()
            }
        }
    }
</script>

<style lang="less" scoped>
    .aptitude-body{
        width: 100%;
        min-height: 100%;
        background: #F8F9FB;
        position: relative;
        overflow: hidden;
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
            height:44px;
            font-size:32px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(3,3,3,1);
            line-height:44px;
            position: absolute;
            top: 172px;
            left: 40px;
        }
        >.up-window{
            width: 100%;
            min-height: 795px;
            // overflow: auto;
            position: relative;
            padding-bottom: 50px;
            top: 256px;
            left: 0;
            >li{
                min-height: 200px;
                width: 750px;
                position: relative;
                text-align: left;
                >div{
                    padding-left: 40px; 
                    width: 634px;
                    margin-top: 20px;
                    >.old-img{
                        max-width: 84px;
                        max-height: 84px;
                        float: left;
                    }
                    >.ivu-upload{
                        width: 434px;
                        float: left;
                    }
                }
                img{
                    width: 36px;
                    height: auto;
                }
                >.ivu-select{
                    width: 534px;
                    padding-left: 40px;
                    text-align: center;
                }
                >.ivu-upload{
                    width: 534px;
                    height: 100px;
                }
                button{
                    color: #017AFF;
                }
                >.add{
                    display: block;
                    width: 46px;
                    height: 46px;
                    position: absolute;
                    top: 12px;
                    right: 98px;
                }
                >.del{
                    height:40px;
                    font-size:28px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(3,3,3,1);
                    line-height:40px;
                    position: absolute;
                    top: 12px;
                    right: 98px;
                }
            }
        }
        >.upData-btn{
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
            // position: relative;
            margin: 300px auto 94px;
            // bottom: 94px;
            // left: 50%;
            // margin-left: -355px;
        }
    }
</style>
<style scoped>
.up-window>>>.ivu-btn{
    background-color: transparent;
    border: 0;
    outline: none;
    z-index: 9;
}
.up-window>>>.ivu-upload-list{
    margin-top: -60px;
}
.up-window>>>.ivu-upload-list-file>span{
    background: #F8F9FB;
}
.up-window>>>.ivu-select .ivu-select-dropdown{
    width: 95%;
    margin-left: 125px;
    white-space:inherit;
    position: relative;
    z-index: 10;
}
.up-window>>>.ivu-select-item{
    /* height: auto; */
    width: 100%;
    white-space:inherit;
    display: inline-block;
    /* word-break:break-all; */
}
.up-window>>>.ivu-upload-list-file>span{
    word-break:break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
}
.up-window>>>.ivu-upload{
    height: 40px;
}
</style>
<template>
    <div class="main">
        <headBar title="护理历史记录"></headBar>
	    <div class="items">
		    <div class="item" v-for="(item,index) in historyList" :key="index">
			    <p class="time">
				    <img src="@/assets/icon/time.png" alt="">
				   {{item.addTime}}
			    </p>
			    <div class="content">
				    <h3 class="type">{{item.serviceName}}</h3>
				    <p> <span>问题：</span>{{item.problems}}</p>
				    <p> <span>措施：</span>{{item.settlement}}</p>
				    <div class="effect">
					    <p>效果评价：</p>
					   {{item.impact_assessment?item.impact_assessment:'无'}}
				    </div>
			    </div>
		    </div>
	    </div>
    </div>
</template>

<script>

import headBar from '@/components/header/head-bar'
import { getOldRecord} from "@/lib/API/record";
export default {
    components:{
        headBar,
    },
    data(){
        return{
	        historyList:[],
	        size:50
        }
    },
	created(){
    	// this.orderId = this.$route.query.orderId
		// this.serviceName = this.$route.query.serviceName
		// console.log(this.$route.query)
		this.getRecord()
	},
    methods:{
	    async getRecord(){
		    let res = await getOldRecord({
				userId :this.$route.query.userId,
				orderId :this.$route.query.id,
			    size:this.size
			})
		    if(res.code === 200){
				this.historyList=res.data.list
		    }
	    },
    },
}
</script>

<style lang="less" scoped>
	.main{
		padding-top: 100px;
		background-color: #F7F7F7;
		min-height: 100%;
		.items{
			text-align: left;
			padding: 20px 38px;
			line-height:40px;
			.time{
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:40px;
				padding: 32px 0 22px;
				display: flex;
				align-items: center;
				img{
					width: 38px;
					margin-right: 16px;
				}
			}
			.content{
				background:rgba(255,255,255,1);
				border-radius:10px;
				font-size:24px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:34px;
				padding: 32px;
				>p{
					margin: 20px 0;
					display: flex;
					span{
						font-size:28px;
						font-weight:400;
						color:rgba(102,102,102,1);
						line-height:40px;
						flex-shrink:0;
					}
				}
				.type{
					font-size:36px;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:50px;
				}
				.effect{
					margin-top: 10px;
					font-size:24px;
					font-weight:400;
					color:rgba(102,102,102,1);
					line-height:34px;
					word-break:break-all;
					p{
						font-size:28px;
						font-weight:400;
						color:rgba(51,51,51,1);
						line-height:40px;
					}
				}
			}
		}
	}
</style>

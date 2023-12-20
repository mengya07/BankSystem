<template>
	<view>
		<view>
		
		<uni-section>
				<text class="title1">操作结果</text>
					<uni-card padding="0" isFull="true" spacing="0">
						<template v-slot:cover>
							<view class="custom-cover">
							
								<view class="cover-content">
								<text>{{transferData.Amount.toFixed(2)}}元交易成功<br></text>
								<text>预计10秒内到账，具体时间取决于对方银行</text>
								</view>
							</view>
						</template>
						<uni-list>
							<uni-list-item title="付款后可用余额">
								<template v-slot:footer>
									<text class="reslutNumber">{{temp}}</text>
								</template>
							</uni-list-item>
							<uni-list-item title="付款账户" >
								<template v-slot:footer>
									<text class="reslutNumber">{{transferNumberOut}}</text>
								</template>
							</uni-list-item>
							<uni-list-item title="收款人名称" >
								<template v-slot:footer>
									<text class="reslutNumber">{{transferData.receiverName}}</text>
								</template>
							</uni-list-item>
							<uni-list-item title="收款账号" >
								<template v-slot:footer>
									<text class="reslutNumber">{{transferData.receiverCardNumber}}</text>
								</template>
							</uni-list-item>
							<uni-list-item title="收款银行" >
								<template v-slot:footer>
									<text class="reslutNumber">中国银行</text>
								</template>
							</uni-list-item>
							<uni-list-item title="转账方式" >
								<template v-slot:footer>
									<text class="reslutNumber">实时</text>
								</template>
							</uni-list-item>
							<uni-list-item title="交易序号" >
								<template v-slot:footer>
									<text class="reslutNumber">{{temp}}</text>
								</template>
							</uni-list-item>
						</uni-list>			                
					</uni-card>
				</uni-section>
				
				<uni-card isFull="true" @click= "backHome" >
				<text class="back">首页</text>
				</uni-card>
				</view>
				
	</view>
</template>

<script>
	export default {
		data() {
			return {
				temp:'12343',
				transferData: '',
				transferNumberOut: '',
			}
		},
		methods: {
			
			getDataFromStorage() {
			   const value1 = uni.getStorageSync('transferNumberOut');  
			    if (value1 !== undefined) { // 检查值是否存在  
			        this.transferNumberOut = value1; // 如果存在，设置到组件的数据属性中  
			    } else {  
			        console.log('transferNumberOut not found in storage'); // 否则输出错误消息或进行其他处理  
			    };
				
				const value2 = uni.getStorageSync('transfer');
				if (value2 !== undefined) { // 检查值是否存在  
				    this.transferData = value2; // 如果存在，设置到组件的数据属性中  
				} else {  
				    console.log('transfernot found in storage'); // 否则输出错误消息或进行其他处理  
				};

				
			},
			backHome()
			{
				uni.switchTab({
					url:'/pages/home/home'
				})
			}
			
			
		},
		onLoad(){
			 this.getDataFromStorage();  
		}
	}
</script>

<style>
	.back
	{
		color:red;
		display: flex;
		flex-direction: column;  
		align-items: center;  
		justify-content: center;
		font-size: 20px;
	}
	.title1
	{
		color:black;
		display: flex;
		font-weight: bold;
		flex-direction: column;  
		align-items: center;  
		justify-content: center;
		font-size: 20px;
		margin-bottom: 20px;
	}
	.cover-content
	{
		font-size: 15px;
	}

</style>

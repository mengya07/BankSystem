<template>
	<view v-for="transferRecode in transferRecodes">
		<view style="text-align: center;">
			<text>{{transferRecode.transferDate}}</text>
		</view>
		<view style="width: 700rpx;; margin-left: 20rpx; margin-bottom: 20rpx; background-color: white;" >
			<text style="font-weight: bold; margin-left: 20rpx;">借记卡动账提醒</text>
			<view style="text-align: center; margin-top: 20rpx;">
				<text>交易金额（人民币)</text>
			</view>
			<view style="text-align: center;">
				<text :class="transferRecode.movingAccountTpye == '支出' ? 'transferType' : 'receiptTpye'">{{transferRecode.movingAccountTpye}}</text>
				<text style="font-size: 120%;">{{transferRecode.transferNum}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">尊敬的用户：</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">您尾号为{{transferRecode.tailNumber}}的中国银行账户发生了一笔动账交易</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易时间：{{transferRecode.transferDate}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易类型：{{transferRecode.transferType}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">动账类型：{{transferRecode.movingAccountTpye}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易金额：{{transferRecode.transferNum}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">对方账户：{{transferRecode.otherAccount}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易渠道：{{transferRecode.tradeChannel}}</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				transferRecodes:[
					{
						tailNumber: '1234',
						transferDate: '2023/1/1',
						transferType: '网上快捷支付',
						movingAccountTpye: '收入',
						transferNum: '10.00',
						otherAccount: '123',
						tradeChannel: '1',
					},
					{
						tailNumber: '1234',
						transferDate: '2023/1/2',
						transferType: '网上快捷支付',
						movingAccountTpye: '支出',
						transferNum: '10.00',
						otherAccount: '123',
						tradeChannel: '2',
					},
					{
						tailNumber: '1234',
						transferDate: '2023/1/3',
						transferType: '网上快捷支付',
						movingAccountTpye: '支出',
						transferNum: '10.00',
						otherAccount: '123',
						tradeChannel: '3',
					},
					{
						tailNumber: '1234',
						transferDate: '2023/1/4',
						transferType: '网上快捷支付',
						movingAccountTpye: '收入',
						transferNum: '10.00',
						otherAccount: '123',
						tradeChannel: '4',
					},
					{
						tailNumber: '1234',
						transferDate: '2023/1/5',
						transferType: '网上快捷支付',
						movingAccountTpye: '支出',
						transferNum: '10.00',
						otherAccount: '123',
						tradeChannel: '5',
					},
					{
						tailNumber: '1234',
						transferDate: '2023/1/6',
						transferType: '网上快捷支付',
						movingAccountTpye: '收入',
						transferNum: '10.00',
						otherAccount: '123',
						tradeChannel: '6',
					},
				],		
			};
		},	
		
		methods: {
			
			
		},
		
		computed: {
			
		},
		
		onLoad() {	
			let that = this
			uni.getStorage({
				key: 'token',
				success: function (res) {
					console.log(res.data)
					let _token = res.data
					uni.request({
							  url: 'http://vpqs7u.natappfree.cc/query/transferRecord?pageNum=0&pageSize=5',  
							  method: 'POST',  
							  header: {  
								'token': _token
							  },
							  data:{
								
							  },
							  success: function (res) {
								console.log(res)
								res.data.data.list.forEach(item=>{
									let temp = {"tailNumber":"","transferDate":"","transferNum":"","otherAccount":""}
									temp.tailNumber = item.payerName
									temp.transferDate = item.transferAmount
									temp.date = item.transferTime
									temp.class = item.statusComments
									that.transferRecodes.push(temp)
								})
							  },  
							  fail: function (error) {  
								console.log("寄咯");  
							  }  
							})
				},
				fail: function(error) {
				            console.log("获取token失败", error);
				        }
			});
			
		},
	};	
</script>

<style lang="scss">
	.transferType{
		font-size: 60%; 
		padding: 5px; 
		color: #34ffc6; 
		vertical-align: 30%; 
		border-radius: 3px; 
		background-color: #bdffed;
	}
	.receiptTpye{
		font-size: 60%; 
		padding: 5px; 
		color: #ff1e2d; 
		vertical-align: 30%; 
		border-radius: 3px;
		background-color: #ffb0b2;
	}
</style>

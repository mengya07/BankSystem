<template>
	<view style="display: flex; flex-direction: column; align-items: center;">
		<view class="box">
			<view class="card">
				<uv-icon name="/static/icon/icon_card.svg" size=55 style="margin-left: 20rpx;margin-right: 20rpx;"></uv-icon>
				<view style="font-weight: bold;margin-right: 20rpx;">{{isvisible?card.wholeAccount:card.account}}</view>
				<uv-icon v-if="isvisible" name="/static/icon/icon_visible.svg" @click="clickInvisble"></uv-icon>
				<uv-icon v-else name="/static/icon/icon_invisible.svg" @click="clickVisble"></uv-icon>
			</view>
			<view class="text">
				<view class="text1">账户类别</view><view class="text2">{{card.class}}</view>
			</view>
		    <view class="text">
		    	<view class="text1">人民币元</view><view class="text2">{{card.balance}}</view>
		    </view>
			<view class="transfer" @click="clickTransfer">转账</view>
		</view>
		
		
		<view style="width: 700rpx;display: flex; justify-content: space-around;margin-top: 50rpx;align-items: center;">
			<view @click="clickTransferRecord"><uv-icon name="/static/icon/icon_transferRecord.svg" size="30" style="margin-left: 15rpx;"></uv-icon><text style="font-size: 0.8em;">转账记录</text></view>
			<view @click="clickCardLoss"><uv-icon name="/static/icon/icon_cardLoss.svg" size="30" style="margin-left: 15rpx;"></uv-icon><text style="font-size: 0.8em;">卡号挂失</text></view>
			<view @click="clickLimitSetting"><uv-icon name="/static/icon/icon_limitSetting.svg" size="30" style="margin-left: 15rpx;"></uv-icon><text style="font-size: 0.8em;">限额设置</text></view>
		</view>
		
		<view class="record-box">
			<view>最近3天转账记录</view>
			<uv-divider></uv-divider>
			<view v-for="(item,index) in recordItem" :key="index" class="record-item" @click="clickRecord(index)">
				<view class="column1">
					{{item.otherName}}
				</view>
				<view class="column2">
					<view v-if="item.class=='交易成功'" style="display: flex;">
						<uv-icon name="/static/icon/icon_success.svg"></uv-icon>
						<view>{{item.class}}</view>
					</view>
					<view v-else style="display: flex;">
						<uv-icon name="/static/icon/icon_fail.svg"></uv-icon>
						<view>{{item.class}}</view>
					</view>
					<view>{{item.date}}</view>
					<view>人民币元 {{item.amount}}</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isvisible: false,
				card:{
					id:"",
					account:"",
					class:"",
					balance:"",
					wholeAccount:"546546546546546"
				},
				recordItem:[{
					id:"4561586478",
					date:"2023/10/22 14:31:54",
					amount:"12.1",
					balance:"1002.65",
					name:"金正恩",
					account:"12346846513",
					otherName:"马化腾",
					otherAccount:"464861534165",
					class:"交易成功"
				},{
					id:"4561586478",
					date:"2023/10/22 14:31:54",
					amount:"12.1",
					balance:"1002.65",
					name:"金正恩",
					account:"12346846513",
					otherName:"马化腾",
					otherAccount:"464861534165",
					class:"交易失败"
				}]
			};
		},
		methods:{
			clickVisble(){
				this.isvisible=!this.isvisible
				// uni.request({  
				//   url: 'http://mk9fxg.natappfree.cc/query/bankCard',  
				//   method: 'POST',  
				//   header: {  
				// 	'Content-Type': 'application/json',  
				// 	'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzOTAwZjJhYzFjOTE0NjZjYjg5ZjBmZGM3YjdmZmY3NyIsInN1YiI6IjYiLCJpc3MiOiJwbSIsImlhdCI6MTcwMjM4MjI5OSwiZXhwIjoxNzAyMzg1ODk5fQ.onbix801VA8L0tPpyICtFPrYehoR6YW4J9gpVNT59ig'  
				//   },
				//   data:{
				// 	"startDate":"2023-01-01",
				// 	"endDate":"2023-12-31",
				// 	"cardNumber":"6216636109000220886",
				// 	"miniAmount":"10",
				// 	"maxAmount":"1100",
				// 	"payeeName":null,
				// 	"payeePhoneNumber":null,
				// 	"status":"1",
				// 	"payeeLimit":"false",
				//   },
				//   success: function (res) {  
				// 	console.log(res.data);  
				//   },  
				//   fail: function (error) {  
				// 	console.log(111);  
				//   }  
				// });
			},
			clickInvisble(){
				this.isvisible=!this.isvisible
			},
			clickTransfer(){
				uni.navigateTo({
					url:"/pages/transfer/transfer"
				})
			},
			clickTransferRecord(){
				uni.navigateTo({
					url:"/pages/transferRecord/transferRecord"
				})
			},
			clickCardLoss(){
				uni.navigateTo({
					url:""
				})
			},
			clickLimitSetting(){
				uni.navigateTo({
					url:""
				})
			},
			clickRecord(index){
				let that = this
				uni.navigateTo({
					url:"/pages/recordDetail/recordDetail",
					success: function(res){
						res.eventChannel.emit('acceptDataFromOpenerPage', that.recordItem[index])
					}
				})
			}
		},
		onLoad(option) {
			let that = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				that.card.id = data.id
				that.card.account = data.account
				that.card.class = data.class
				that.card.balance = data.balance
			})
		}
	}
</script>

<style lang="scss">
	.box{
		width: 700rpx;
		display: flex; 
		flex-direction: column;
		border-radius: 20rpx;
		background-color: #ffffff;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
		.card{
			display: flex;
			align-items: center;
		}
		.text{
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			.text1{
				margin-left: 20rpx;
			}
			.text2{
				margin-right: 20rpx;
				font-weight: bold;
			}
		}
		.transfer{
			border-radius: 20rpx;
			background-color: #f9f9f9;
		    text-align: center;
			padding: 20rpx;
			color: #1272EA;
			font-weight: bold;
		}
	}
	.record-box{
		width: 700rpx;
		margin-top: 60rpx;
		.record-item{
			margin: 15rpx;
			height: 120rpx;
			border-radius: 10rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			display: flex;
			justify-content: space-between;
			background-color: #FFFFFF;
			// border-style: solid;
			// border-width: 2px;
			// border-color: silver;
			box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
			padding: 10rpx;
			.column1{
				margin-left: 20rpx;
			}
			.column2{
				margin-right: 20rpx;
			}
		}
	}
</style>

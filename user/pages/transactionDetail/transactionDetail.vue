<template>
	<view>
		<view style="background-color: #FFFFFF;">
			<view style="display: flex; justify-content: space-between;">
				<view style="margin-left: 20rpx;">{{record.statusComments}}</view>
			</view>
			<view style="margin-left: 20rpx; font-size: 1.5em; font-weight: bold; margin-top: 40rpx; margin-bottom: 20rpx;">{{record.amount}}</view>
			<uv-divider></uv-divider>
			<uv-row>
				<uv-col span="5"><view style="margin-left: 20rpx; font-size: 0.9em;">对方账户名称/账号</view></uv-col>
				<uv-col span="7"><view class="right">{{record.counterpartyName}} {{record.counterpartyAccount}}</view></uv-col>
			</uv-row>
			<view style="height: 40rpx;"></view>
		</view>
		
		<view style="margin-top: 20rpx; background-color: #FFFFFF;">
			<view style="height: 1rpx"></view>
			<uv-row class="item">
				<uv-col span="5"><view class="left">交易时间</view></uv-col>
				<uv-col span="7"><view class="right">{{record.transferTime}}</view></uv-col>
			</uv-row>
			<uv-row class="item">
				<uv-col span="5"><view class="left">交易类型</view></uv-col>
				<uv-col span="7"><view class="right">{{record.statusComments.slice(0,4)}}</view></uv-col>
			</uv-row>
			<uv-row class="item">
				<uv-col span="5"><view class="left">交易后余额</view></uv-col>
				<uv-col span="7"><view class="right">人民币元{{record.balance}}</view></uv-col>
			</uv-row>
			<uv-row class="item">
				<uv-col span="5"><view class="left">附言</view></uv-col>
				<uv-col span="7"><view class="right">{{record.postscript}}</view></uv-col>
			</uv-row>
			<view style="height: 1rpx"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				transactionId: null,
				record: {
					"transactionAccount": "",
					"balance": "",
					"counterpartyName": "",
					"counterpartyAccount": "",
					"amount": "",
					"postscript": "",
					"status": null,
					"statusComments": "",
					"transactionId": null,
					"transferTime": ""
				}
			};
		},
		onLoad(option) {
			
			this.transactionId = option.transactionId
			
			let that = this
			console.log("jiaoyi"+ that.transactionId)
			uni.getStorage({
				key: 'token',
				success: function (res) {
					let _token = res.data
					uni.showLoading({
						title: "",
						mask: true
					})
					setTimeout(function () {
						uni.hideLoading();
					}, 1000);
					uni.request({
							  url: 'https://120.55.37.93/query/transactionDetail?transactionId=' + that.transactionId,  
							  method: 'GET',
							  header: {  
								'token': _token
							  },
							  success: function (res) {
								  if(res.data.code ==200){
									  console.log(res)
									  that.record.transactionAccount = res.data.data.transactionAccount
									  that.record.balance = res.data.data.balance
									  that.record.counterpartyName = res.data.data.counterpartyName
									  that.record.counterpartyAccount = res.data.data.counterpartyAccount
									  that.record.amount = res.data.data.amount
									  that.record.postscript = res.data.data.postscript
									  that.record.status = res.data.data.status
									  that.record.statusComments = res.data.data.statusComments
									  that.record.transactionId = res.data.data.transactionId
									  that.record.transferTime = res.data.data.transferTime
								  }
								 uni.hideLoading()
							  },  
							  fail: function (error) {  
								 uni.hideLoading()
								uni.showToast({
									title: '错误，稍后再试',
									icon: 'error',
									duration: 2000
								}) 
							  }  
							})
				}
			})
		}
	}
</script>

<style lang="scss">
	.left{
		margin-left: 20rpx;
	}
	.right{
		font-weight: bold;
	}
	.item{
		margin-top: 60rpx;
		margin-bottom: 60rpx;
	}
</style>

<template>
	<view>
		<view style="background-color: #FFFFFF;">
			<view style="display: flex; justify-content: space-between;">
				<view style="margin-left: 20rpx;">转账金额（人民币元）</view>
				<view v-if="record.class=='交易成功'" style="display: flex; margin-right: 20rpx;">
					<uv-icon name="/static/icon/icon_success.svg"></uv-icon>
					<view>{{record.class}}</view>
				</view>
				<view v-else style="display: flex;">
					<uv-icon name="/static/icon/icon_fail.svg"></uv-icon>
					<view>{{record.class}}</view>
				</view>
			</view>
			<view style="margin-left: 20rpx; font-size: 1.5em; font-weight: bold; margin-top: 40rpx;">{{record.amount}}</view>
			<view style="height: 60rpx;"></view>
		</view>
		
		<view style="margin-top: 20rpx; background-color: #FFFFFF;">
			<view style="height: 1rpx"></view>
			<uv-row class="item">
				<uv-col span="5"><view class="left">收款人名称</view></uv-col>
				<uv-col span="7"><view class="right">{{record.otherName}}</view></uv-col>
			</uv-row>
			<uv-row class="item">
				<uv-col span="5"><view class="left">收款账号</view></uv-col>
				<uv-col span="7"><view class="right">{{record.otherAccount}}</view></uv-col>
			</uv-row>
			<uv-row class="item">
				<uv-col span="5"><view class="left">附言</view></uv-col>
				<uv-col span="7"><view class="right">{{record.postscript}}</view></uv-col>
			</uv-row>
			<uv-row class="item">
				<uv-col span="5"><view class="left">付款账户</view></uv-col>
				<uv-col span="7"><view class="right">{{record.name}} {{record.account}}</view></uv-col>
			</uv-row>
			<uv-row class="item">
				<uv-col span="5"><view class="left">交易序号</view></uv-col>
				<uv-col span="7"><view class="right">{{record.id}}</view></uv-col>
			</uv-row>
			<uv-row class="item">
				<uv-col span="5"><view class="left">交易时间</view></uv-col>
				<uv-col span="7"><view class="right">{{record.date}}</view></uv-col>
			</uv-row>
			<view style="height: 1rpx"></view>
		</view>
		
	</view>
</template>

<script>
import { string } from '../../uni_modules/uv-ui-tools/libs/function/test';
	export default {
		data() {
			return {
				transactionId:"",
				record:{
					id:"",
					date:"",
					amount:"",
					//balance:"",
					name:"",
					account:"",
					otherName:"",
					otherAccount:"",
					class:"",
					postscript:""
				}
			};
		},
		onLoad(option) {
			let that = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('transferDetail', function(data) {
				that.transactionId = data
				uni.getStorage({
					key: 'token',
					success: function (res) {
						let _token = res.data
						uni.showLoading({
							title: "",
							mask: true
						})
						uni.request({
								  url: 'https://120.55.37.93/query/transferRecordDetail?transactionId=' + that.transactionId,  
								  method: 'GET',
								  header: {  
									'token': _token,
								  },
								  success: function (res) {
									  if(res.data.code == 200){
										  res = res.data.data
										  that.record.id = res.transactionId
										  that.record.date = res.transferTime
										  that.record.amount = parseFloat(res.amount).toFixed(2)
										  that.record.name = res.receiverName
										  that.record.account = res.receiverCardNumber
										  that.record.otherName = res.senderName
										  that.record.otherAccount = res.senderCardNumber
										  that.record.postscript = res.postscript
										  that.record.class = res.status ==1 ? "交易成功" : "交易失败"
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

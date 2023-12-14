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
				<uv-col span="7"><view class="right">待加入</view></uv-col>
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
	export default {
		data() {
			return {
				record:{
					id:"",
					date:"",
					amount:"",
					balance:"",
					name:"",
					account:"",
					otherName:"",
					otherAccount:"",
					class:""
				}
			};
		},
		onLoad(option) {
			let that = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				that.record.id = data.id
				that.record.date = data.date
				that.record.amount = data.amount
				that.record.balance = data.balance
				that.record.name = data.name
				that.record.account = data.account
				that.record.otherName = data.otherName
				that.record.otherAccount = data.otherAccount
				that.record.class = data.class
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

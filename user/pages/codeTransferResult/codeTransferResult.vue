<template>
	<view>
		<view style="background-color: white;">
			<view style="display: flex; justify-content: center;  background-color: white; " >
				<image src="../../static/success.jpg" style="justify-content: center; width: 100rpx; height: 100rpx; margin-top: 50rpx;" mode="scaleToFill"></image>
			</view>
			<view style="display: flex; justify-content: center;  margin-top: 30rpx; font-size: 120%; background-color: white;">
				<text style="margin-bottom: 40rpx;">向{{payee}}成功付款{{num}}元</text>
			</view>
			<view style="display: flex; margin-top: 20rpx;">
				<text style="margin-left: 20rpx;">付款账户</text>
				<text style="margin-left: 80rpx;">{{payerNumer}}</text>
			</view>
			<view style="display: flex; margin-top: 20rpx;">
				<text style="margin-left: 20rpx;">交易时间</text>
				<text style="margin-left: 80rpx;">{{time}}</text>
			</view>
			<view style="display: flex; margin-top: 20rpx;">
				<text style="margin-left: 20rpx;">付款凭证号</text>
				<text style="margin-left: 80rpx;">{{payNum}}</text>
			</view>
		</view>
		<view>
			<uv-tabbar active-color="red" style="color: red;" >
				<uv-tabbar-item text="返回首页" @click="returnHome"></uv-tabbar-item>
			</uv-tabbar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payee: '',
				num: '',
				payerNumer: '',
				payNum: '',
				time: '',
			}
		},
		methods: {
			returnHome() {
				uni.navigateTo({
					url:"/pages/home/home",
					success: function(res){
						
					}
				});
			},
		},
		onReady() {
			let that = this
			uni.getStorage({
				key:'transactionId',
				success(res) {
					that.payNum =  res.data
				}
			})
			uni.getStorage({
				key:'transactionTime',
				success(res) {
					that.time =  res.data
				}
			})
			uni.getStorage({
				key:'tNum',
				success(res) {
					that.num =  res.data
				}
			})
			uni.getStorage({
				key:'payeeName',
				success(res) {
					that.payee =  res.data
				}
			})
			uni.getStorage({
				key:'payerNumber',
				success(res) {
					that.payerNumer =  res.data
				}
			})
		}
	}
</script>

<style  lang="scss">

</style>

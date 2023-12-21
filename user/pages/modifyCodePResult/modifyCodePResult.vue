<template>
	<view>
		<view style="background-color: white;">
			<view style="display: flex; justify-content: center;  background-color: white;" >
				<image src="../../static/success.jpg" style="justify-content: center; width: 100rpx; height: 100rpx; margin-top: 50rpx;" mode="scaleToFill"></image>
			</view>
			<view style="display: flex; justify-content: center;  margin-top: 30rpx; font-size: 120%; background-color: white;">
				<text style="margin-bottom: 40rpx;">支付密码修改完成</text>
			</view>
			<view>
				<uv-tabbar active-color="red" style="color: red;" >
					<uv-tabbar-item text="返回首页" @click="returnHome"></uv-tabbar-item>
				</uv-tabbar>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
		}
	}
</script>

<style>

</style>

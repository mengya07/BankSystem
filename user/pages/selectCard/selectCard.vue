<template>
	<view style="margin-top: 10rpx;">
		<view v-for="c in card" @click="choose(c)">
			<view style="margin-left: 20rpx; margin-right: 20rpx; background-color: white; margin-top: 20rpx; height: 100rpx; display: flex; vertical-align: middle;">
				<uv-icon name="/static/icon/bankCard.jpg" size="50" style="margin-left: 20rpx;"></uv-icon>
				<text style="margin-top: 20rpx; margin-left: 20rpx; font-weight: bold;">{{c.cardNumber}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				card: [],
			}
		},
		onReady() {
			let that = this
			uni.getStorage({
				key: 'token',
				success: function (res) {
					let _token = res.data
					uni.request({
							  url: 'https://120.55.37.93/query/bankCard',  
							  method: 'GET',  
							  header: {  
								'token': _token
							  },
							  data:{
								
							  },
							  success: function (res) {
								  console.log(res)
								res.data.data.forEach(item=>{
									let temp = {"cardId":"","cardNumber":"","balance":""}
									temp.cardId = item.cardId
									temp.cardNumber = item.cardNumber
									temp.balance = item.balance
									that.card.push(temp)
								});
								console.log(that.card)
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
		methods: {
			choose(c) {
				console.log(c)
				uni.setStorage({
					key: 'codeCardId',
					data: c.cardId
				})
				uni.setStorage({
					key: 'codeCardNumber',
					data: c.cardNumber
				})
				uni.navigateTo({
					url:"/pages/codeTransfer/codeTransfer",
					success: function(res){
						
						
					}
				});
			},
		},
	}
</script>

<style>

</style>

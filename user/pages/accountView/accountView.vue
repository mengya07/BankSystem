<template>
	<view style="display: flex; flex-direction: column; align-items: center;">
		<view class="total-view">
			<view class="row1">
				<view class="text" style="margin-right: 40rpx;">总资产(折算人民币元)</view>
				<uv-icon v-if="isvisible" name="/static/icon/icon_visible.svg" @click="clickInvisble"></uv-icon>
				<uv-icon v-else name="/static/icon/icon_invisible.svg" @click="clickVisble"></uv-icon>
			</view>
			<view class="row2">{{totalAssets}}</view>
		</view>
        
		<view style="margin-top: 50rpx; display: flex; flex-direction: column; align-items: center;">
			<view style="display: flex;justify-content: flex-end;width: 750rpx; margin-right: 100rpx;"><uv-icon name="reload" size="18"></uv-icon></view>
			
			<view v-for="(item,index) in card" :key="index" class="card" @click="clickCard(index)">
				<view style="display: flex; height: 50%;align-items: center;">
					<uv-icon name="/static/icon/icon_card.svg" size=55 style="margin-left: 20rpx;"></uv-icon>
					<view style="display: flex;flex-direction: column;margin-left: 40rpx;">
						<view style="font-weight: bold;">{{item.account}}</view>
						<view style="color: #80817E;">{{item.class}}</view>
					</view>
				</view>
				<view style="background-color: #F9F9EF;display: flex;justify-content: space-between; height: 50%;align-items: center;">
					<view style="margin-left: 40rpx; color: #80817E;">账面余额</view>
					<view style="display: flex;">
						<view style="margin-right: 20rpx; color: #80817E;">人民币元</view>
						<view style="margin-right: 40rpx; font-weight: bold;">{{item.balance}}</view>
					</view>
				</view>
			</view>		
		</view>
		
		<view class="add-box">
			<view>+手动添加卡/账户</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isvisible: false,
				totalAssets: "******",
				card: [
				// 	{
				// 	id:"23",
				// 	account:"6216******5803",
				// 	class:"Ⅰ类账户",
				// 	balance:"533.26"
				// },{
				// 	id:"45",
				// 	account:"1235******5803",
				// 	class:"ⅠⅠ类账户",
				// 	balance:"99999999"
				// },
				]
			};
		},
		methods:{
			clickVisble(){
				this.isvisible=!this.isvisible
				let sum = 0
			    this.card.forEach(item=>{
					sum+=Number(item.balance)
				})
				this.totalAssets = sum.toString()
			},
			clickInvisble(){
				this.isvisible=!this.isvisible
				this.totalAssets = "******"
			},
			clickCard(index){
				let that = this
				uni.navigateTo({
					url:"/pages/accountDetail/accountDetail",
					success: function(res){
						res.eventChannel.emit('acceptDataFromOpenerPage', that.card[index])
					}
				})
			}
		},
		onLoad() {
			let that = this
			uni.setStorage({
				key: 'token',
				data: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNzY5OWMzMzU5NGI0ZWMzOTNkOWJkOTg4ZDBjZjQ5ZCIsInN1YiI6IjYiLCJpc3MiOiJwbSIsImlhdCI6MTcwMjU2NTQwMywiZXhwIjoxNzAyNTY5MDAzfQ.i6MsZIZnN4odh-PTcZkyhv56VlanF6auGkVUIttta1A',
				success: function () {
					console.log('success');
				}
			});
			uni.getStorage({
				key: 'token',
				success: function (res) {
					console.log(res.data)
					let _token = res.data
					uni.request({
						  url: 'http://vpqs7u.natappfree.cc/query/bankCard',  
						  method: 'GET',  
						  header: {  
							'token': _token
						  },
						  data:{
						  },
						  success: function (res) {
							console.log(res)
							res.data.data.forEach(item=>{
								let temp = {account:"",balance:""}
								temp.account = item.cardNumber
								temp.balance = item.balance
								that.card.push(temp)
							})
						  },  
						  fail: function (error) {  
							console.log("寄咯");  
						  }  
						})
				}
			})
		}
	}
</script>

<style lang="scss">
	.total-view{
		height: 250rpx;
		width: 700rpx;
		border-radius: 20rpx;
		//background: linear-gradient(to right, #EBDDC3, #E8D1B1);
		background: linear-gradient(to right, #F1E9D6, #E8D1B1);
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
		.row1{
			margin-top: 40rpx;
			margin-left: 60rpx;
			display: flex;
			.text{
				color: #7C5B34;
				font-weight: bold;
			}
		}
		.row2{
			margin-top: 30rpx;
			margin-left: 60rpx;
			color: #7C5B34;
			font-weight: bold;
			font-size: 1.3em;
		}
	}
	.card{
		height: 300rpx;
		width: 650rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		align-content: space-between;
		margin-top: 30rpx;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
	}
	.add-box{
		margin-top: 80rpx;
		height: 100rpx;
		width: 650rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		color: #6899EA;
		font-weight: bold;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
	}
</style>

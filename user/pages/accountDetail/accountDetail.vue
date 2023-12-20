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
				<view class="text1">账户类别</view><view class="text2">借记卡</view>
			</view>
		    <view class="text">
		    	<view class="text1">人民币元</view><view class="text2">{{card.balance}}</view>
		    </view>
			<view class="transfer" @click="clickTransfer">转账</view>
		</view>
		
		<uni-popup ref="popup" type="center" :isMaskClick="false">
			<view style="display: flex;justify-content: flex-end;background-color: #FFFFFF;"><uv-icon name="close" size="14" style="margin-right: 5rpx;" @click="this.$refs.popup.close()"></uv-icon></view>
			<view style="width: 600rpx; height: 350rpx; display: flex; flex-direction: column; align-items: center; background-color: #FFFFFF;">
				<view>手机交易码</view>
				<uv-line margin="10rpx"></uv-line>
				<view style="margin-top: 20rpx;">正在向尾号{{phoneTail}}的手机发送验证码</view>
				<uv-code-input mode="line" size="28" @finish="codeInputFinish" style="margin-top: 40rpx;"></uv-code-input>
				<uv-code ref="uCode" @change="codeChange" seconds="60"></uv-code>
				<button @click="getCode" style="border-radius: 10rpx; width: 300rpx; height: 60rpx; font-size: 0.8em; margin-top: 40rpx; background-color: red; color: #FFFFFF;">{{codeTips}}</button>
			</view>
		</uni-popup>
		
		
		<view style="width: 700rpx;display: flex; justify-content: space-around;margin-top: 50rpx;align-items: center;">
			<view @click="clickTransferRecord"><uv-icon name="/static/icon/icon_transferRecord.svg" size="30" style="margin-left: 15rpx;"></uv-icon><text style="font-size: 0.8em;">转账记录</text></view>
			<view @click="clickCardLoss"><uv-icon name="/static/icon/icon_cardLoss.svg" size="30" style="margin-left: 15rpx;"></uv-icon><text style="font-size: 0.8em;">卡号挂失</text></view>
			<view @click="clickLimitSetting"><uv-icon name="/static/icon/icon_limitSetting.svg" size="30" style="margin-left: 15rpx;"></uv-icon><text style="font-size: 0.8em;">限额设置</text></view>
		</view>
		
		<view class="record-box">
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeTips:"",
				isvisible: false,
				card:{
					id:"",
					account:"",
					class:"",
					balance:"",
					wholeAccount:""
				},
				recordItem:[]
			};
		},
		computed:{
			phoneTail: function(){
				let that = this
				let temp = ""
				uni.getStorage({
					key:'userName',
					success(res) {
						console.log(res)
						temp =  res.data.slice(-4)
					}
				})
				return temp
			}
		},
		methods:{
			codeChange(text){
				this.codeTips = text
			},
			getCode(){
				if(this.$refs.uCode.canGetCode) {
		            let that = this
		            uni.getStorage({
		            	key: 'token',
		            	success: function (res) {
		            		let _token = res.data
		            		uni.showLoading({
		            			title: "正在获取验证码",
		            			mask: true
		            		})
		            		uni.request({
		            				  url: 'http://x38h8d.natappfree.cc/sendsms/login',  
		            				  method: 'GET',  
		            				  header: {  
		            					'token': _token
		            				  },
		            				  success: function (res) {
		            					uni.hideLoading()
										that.$refs.uCode.start()
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
					   this.$refs.uCode.start()
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeInputFinish(e){
				    let that = this
				    uni.getStorage({
				    	key: 'token',
				    	success: function (res) {
				    		let _token = res.data
				    		uni.showLoading({
				    			title: "",
				    			mask: true
				    		})
				    		uni.request({
				    				  url: 'http://x38h8d.natappfree.cc/query/cardNumber',  
				    				  method: 'POST',  
				    				  header: {  
				    					'token': _token
				    				  },
									  data: {
										'cardId': that.card.id,
										'verifyCode' : String(e)
									  },
				    				  success: function (res) {
										 if(res.data.code=="110"){
											 uni.hideLoading()
											 that.$refs.popup.close()
											 uni.showToast({
											 	title:"验证码错误",
												icon:"none"
											 })
										 }
										 else {
											    that.record.wholeAccount = res.data.data
				    					        uni.hideLoading()
											}
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
			},
			clickVisble(){
				this.$refs.popup.open()
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
				let that = this
				uni.navigateTo({
					url:"/pages/transferRecord/transferRecord" + "?cardId=" + that.card.id,
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
				// uni.navigateTo({
				// 	url:"/pages/recordDetail/recordDetail",
				// 	success: function(res){
				// 		res.eventChannel.emit('cardId', that.recordItem[index])
				// 	}
				// })
			}
		},
		onLoad(option) {
			let that = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('card', function(data) {
				that.card.id = data.id
				that.card.account = data.account
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

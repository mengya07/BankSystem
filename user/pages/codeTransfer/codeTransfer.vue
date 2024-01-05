<template>
	<view>
		<view>
			<view style="margin-top: 50rpx;">
				<text style="margin-left: 20rpx;">收款方</text> 
				<text style="margin-left: 178rpx;">{{name}}</text>
			</view>
			<view style="margin-top: 10rpx;">
				<text style="margin-left: 20rpx;">收款账户</text> 
				<text style="margin-left: 150rpx;">{{user}}</text>
			</view>
			<view style="margin-top: 10rpx;">
				<text style="margin-left: 20rpx;">所属银行</text> 
				<text style="margin-left: 150rpx;">中国银行</text>
			</view>
		</view>
		
		<uv-form :model="model1" :rules="rule1" ref="form1" style="margin-top: 100rpx; margin-left: 30rpx; margin-right: 30rpx; background-color: white;">
			<view>
				<text style="font-weight: bold;">付款金额（人民币元）</text>
			</view>
			<uv-form-item prop="num">
				<uv-input v-model="model1.num" border="none" style="margin-left: 20rpx; margin-right: 20rpx; height: 60rpx; height: 150rpx; font-size: 200%;" placeholder="请输入" :clearable="true" input-align="center"></uv-input>
			</uv-form-item>
		</uv-form>
		<view>
			<view style="margin-top: 50rpx;">
				<text style="margin-left: 20rpx;">付款账户</text> 
				<text style="margin-left: 20rpx;">{{cardNum}}</text>
				<text style="color: blue; margin-left: 20rpx;" @click="modefiy">更改</text>
			</view>
			<view style="margin-top: 10rpx;">
				<text style="margin-left: 20rpx;">可用余额：</text> 
				<text style="">{{balance}}</text>
			</view>
		</view>
		<view style="margin-top: 50rpx;">
			<button style="color: white; background-color: blue;" @click="confirmTransfer">确认</button>
		</view>
	</view>
	<uni-popup ref="popup" type="center" :isMaskClick="false">
		<view style="display: flex;justify-content: flex-end;background-color: #FFFFFF;"><uv-icon name="close" size="14" style="margin-right: 5rpx;" @click="this.$refs.popup.close()"></uv-icon></view>
		<view style="width: 600rpx; height: 350rpx; display: flex; flex-direction: column; align-items: center; background-color: #FFFFFF;">
			<view>手机交易码</view>
			<uv-line margin="10rpx"></uv-line>
			<view style="margin-top: 20rpx;">请输入支付密码</view>
			<uv-code-input mode="line" size="28" @finish="codeInputFinish" style="margin-top: 40rpx;"></uv-code-input>
			<uv-code ref="uCode" @change="codeChange" seconds="60"></uv-code>
		</view>
	</uni-popup>
</template>

<script>
import confirmModifyPersonalInformationVue from '../confirmModifyPersonalInformation/confirmModifyPersonalInformation.vue'
	export default {
		data() {
			return {
				model1: {
					num: '',
				},
				balance: '',
				cardNum: '',
				cardId: '',
				card: [],
				token_: '',
				codeTips:"",
				orderId: '',
				rule1: {
					
				},
				name: '11',
				user: '11',	
			}
		},
		computed: {
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
		methods: {
			modefiy(){
				uni.navigateTo({
					url:"/pages/selectCard/selectCard",
					success: function(res){
						
					}
				});
			},
			confirmTransfer() {
				this.$refs.popup.open()
				let that=this
				
			},
			codeInputFinish(e) {
				let that = this
				console.log(that.model1.num)
				console.log(that.cardId)
				console.log(that.orderId)
				uni.getStorage({
					key: 'token',
					success: function (res) {
						let _token = res.data
						uni.showLoading({
							title: "",
							mask: true
						})
						uni.request({
								  url: 'https://120.55.37.93/TDCode/transferMoney',  
								  method: 'POST',  
								  header: {  
									'token': _token
								  },
								  data: {
									"amount": that.model1.num,
									"password": String(e),
									"payerCardId": that.cardId,
									"orderId": that.orderId
								  },
								  success: function (res) {
									uni.hideLoading()
									console.log(res)
										console.log(1)
										uni.setStorage({
											key: 'transactionId',
											data: res.data.data.transactionId
										})
										uni.setStorage({
											key: 'transactionTime',
											data: res.data.data.transactionTime

										})
										uni.setStorage({
											key: 'payerNumber',
											data: that.cardNum
										
										})
										uni.setStorage({
											key: 'tNum',
											data: that.model1.num
										
										})
										uni.setStorage({
											key: 'payeeName',
											data: that.name
										
										})
										uni.navigateTo({
											url:"/pages/codeTransferResult/codeTransferResult",
											success: function(res){
												
											}
										});
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
			getCode() {
				if(this.$refs.uCode.canGetCode) {
						            let that = this
									   this.$refs.uCode.start()
								} else {
									this.$u.toast('倒计时结束后再发送');
								}
			},
			codeChange(text) {
				this.codeTips = text
			},
		},
		onReady() {
			this.$refs.form1.setRules(this.rule1)
			let that = this
			uni.getStorage({
				key: 'orderId',
				success: function (res) {
					console.log(res.data)
					that.orderId=res.data
				}	
			})
			uni.getStorage({
				key: 'payeeName',
				success: function (res) {
					that.name=res.data
				}	,
				fail() {

				
				}
			})
			uni.getStorage({
				key: 'payeeCardNumber',
				success: function (res) {
					that.user=res.data
				}	
			})
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
								that.cardNum=res.data.data[0].cardNumber
								that.cardId=res.data.data[0].cardId
								that.balance=res.data.data[0].balance
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
		}
	}
</script>

<style lang="scss">

</style>

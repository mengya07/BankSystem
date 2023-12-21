<template>
	<view style="display: flex; justify-content: center; margin-top: 100rpx;">
		<text>打开扫一扫，向我付钱</text>
	</view>
	<view style="display: flex; justify-content: center; margin-top: 40rpx;">
	    <view class="qrcode">
	      <view v-for="(row, rowI) in modules" :key="rowI" style="display: flex;flex-direction: row;">
	        <view v-for="(col, colI) in row" :key="colI">
	          <view v-if="col.isBlack" style="width: 10px;height: 10px;background-color: black;">
	            <!-- 黑色码点 -->
	          </view>
	          <view v-else style="width: 10px;height: 10px;background-color: white;">
	            <!-- 白色码点 -->
	          </view>
	        </view>
	      </view>
	    </view>
	  </view>
	  <view style="display: flex; justify-content: center;" v-show="showBalance"> 
		  <text>￥{{parseFloat(defaultSum).toFixed(2)}}</text>
	  </view>
	  <view style="display: flex; justify-content: center;" v-show="showBalance">
	  		  <text>{{paymentReason}}</text>
	  </view>
	  <view style="margin-top: 80rpx;">
		  <text style="margin-left: 80rpx;">收款账户</text>
		  <text style="margin-left: 20rpx;">{{cardNum}}</text>
		  <text style="color: blue; margin-left: 20rpx;" @click="changeCard">更改</text>
	  </view>
	  <view>
	  	<button @click="transfer">扫一扫</button>
	  </view>
</template>

<script>
import QRcodeVue from './QRcode.vue';
import UQRCode from '../../uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js';
	export default {
		data() {
			return {
				defaultSum: '',
				paymentReason: '',
				number: '',
				showBalance: false ,
				cardNum: '',
				cardId: '',
				orderId: '111',
				card: [],
				token_: '',
				payeeId: '',
				op: {
					data: '1234',
				},
				modules: []
			}
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key: 'token',
				success: function (res) {
					that.token_=res.data
				},
			})
				
				
			//获取二维码信息
			
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
								that.cardNum=res.data.data[0].cardNumber
								that.cardId=res.data.data[0].cardId
										console.log(that.cardId)
										uni.request({
													  url: 'https://120.55.37.93/TDCode/generate?cardId='+that.cardId,  
													  method: 'GET',  
													  header: {  
														'token': that.token_
													  },
													  data:{
														
													  },
													  success: function (res) {
														console.log(res)
														that.orderId=res.data.data;
														let qr = new UQRCode();
														qr.data = that.orderId;//
														qr.make();
														that.modules = qr.modules;
														uni.setStorage({
															key: 'orderId',
															data: res.data.data
														})
													  },  
													  fail: function (error) {  
														console.log("寄咯");  
													  }  
													})
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
			
			
			//
				
			//
		
			
			//
		},
		methods: {
			transfer() {
				let that=this
				uni.scanCode({
					success: function(res) {
						if(res.scanType === "QR_CODE"){
							uni.request({
								  url: 'https://120.55.37.93/TDCode/verify?orderId='+that.orderId,  
								  method: 'GET',  
								  header: {  
									'token': that.token_,
								  },
								  data: {
									
								  },
								  success: function (res) {
									console.log(res)
									uni.setStorage({
										key: 'payeeName',
										data: res.data.data.payeeName
									})
									uni.setStorage({
										key: 'payeeCardNumber',
										data: res.data.data.payeeCardNumber
									})
									uni.getStorage({
										key: 'payeeName',
										success: function (res) {
											console.log(res)
										}	
									})
								  },  
								  fail: function (error) {  
									console.log("寄咯");  
								  }  
								})
								uni.navigateTo({
									url:"/pages/codeTransfer/codeTransfer",
									success: function(res){
										
									}
								});
						}
					}
				})
				
				
				
			},
			
			setNum() {
				
			},
			changeCard() {
				uni.navigateTo({
					url:"/pages/chooseCard/chooseCard",
					success: function(res){
						
					}
				});
			},
		},
		
		onReady() {
			
		}
	}
</script>

<style lang="scss">

</style>

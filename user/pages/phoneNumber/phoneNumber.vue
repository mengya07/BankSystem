<template>
	<view>
		<view class="info">
			手机号码验证
		</view>
		
		<input class="phone" @input="shishi" v-model="phoneNUmber"  maxlength="11" placeholder="手机号(中国内地)" />
		<view class="xiansi" v-if="xiansi" >请输入正确的手机号</view>
		<button class="xb"  v-on:click="clickNUM">下一步</button>
		<view class="uni-list">
			<checkbox-group @change="handleChange">
			<checkbox class="checkbox-3" >
				<text class="tonyi">
					我已阅读并接受《用户服务协议》《隐私政策》
				</text>
			</checkbox>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNUmber:'',
				xianshi:false,
				xiansi:false,
				ifchecked:false,
				refresh:false
			}
			},
			methods:{
				clickNUM(){
					let that = this
					if(this.phoneNUmber.length===11&&this.ifchecked) {
						
						//uni.request({
							//url:'https://120.55.37.93/sendsms/nologin?phoneNumber='+this.phoneNUmber,
							//success:function(res){
								//console.log(res)
												uni.navigateTo({
												url:"/pages/phoneCode/phoneCode",
												success: function(res){
													res.eventChannel.emit('setData', that.phoneNUmber)
												},	
								})
							//},
						// 	fail:function(error){
						// 		uni.showModal({
						// 			title:'发送失败请检查网络设置'
						// 		})
						// 	}
						// })
				
				}
						else {
							if(this.ifchecked){
								uni.showModal({
									title:'请输入正确的手机号'
								})
							}
							else{
							uni.showModal({
								title:"请同意相关协议"
							})
							}
					}
				},
				shishi(){
					const phoneReg = /^[1][3-9]\d{9}$/;
					 
					// 获取输入框的值
					const inputValue = this.phoneNUmber;
					 
					// 使用正则表达式进行匹配
					const isPhoneValid = phoneReg.test(inputValue);
					 
					if(isPhoneValid){
						this.xiansi=false;
						console.log("1")
					}
					else{
						this.xiansi=true;
						console.log("2")
					}
				},
				handleChange(e) {
							if(this.ifchecked){
							this.ifchecked=false;
							}else{
								this.ifchecked=true;
							}
						},
			}
		
	}
</script>

<style lang="scss">
	.info{
		font-size: 25px;
		font-weight: bold;
		margin: 100px 15px 40px 10px;
	}
	.phone{
		margin:5px 15px 10px 15px ;
		border-bottom: 1px solid black;
	}
	
	.xb{
		width: 650rpx;
		color: white;
		background-color: red;
		border-radius: 25px;
		margin: 40px 50px 40px 10px;
		left:4%;
		position: fixed;
		bottom:520px;
	}
	.xiansi{
		color: red;
		font-size: 15px;
		margin: 10px 15px 40px 10px;
	}
	.uni-list{
		bottom: 510px;
		position:fixed;
		margin:5px 15px 10px 15px ;
	}

</style>

<template>
	<view>
		<view>
			<view style="margin-top: 20rpx;">
				<uv-form style="margin-top: 20rpx; margin-left: 20rpx;" :model="model1" :rules="rule1" ref="form1">
					<uv-form-item label="原密码" label-width="120px" style="background-color: white;" prop="precode" ref="item1">
						<uv-input border="none" v-model="model1.precode" placeholder="请输入"></uv-input>
					</uv-form-item>
				</uv-form>
				<view style="text-align: right; margin-top: 30rpx;">
					<text style="color: blue;">忘记密码？</text>
				</view>
				<uv-form style="margin-top: 30rpx; margin-left: 20rpx;" :model="model1" :rules="rule1" ref="form1">
					<uv-form-item label="新密码" label-width="120px" style="background-color: white;" prop="newcode" ref="item1">
						<uv-input border="none" v-model="model1.newcode" placeholder="请输入"></uv-input>
					</uv-form-item>
					<uv-form-item label="确认密码" label-width="120px" style="background-color: white; margin-top: 40rpx;" prop="confirmcode" ref="item1">
						<uv-input border="none" v-model="model1.confirmcode" placeholder="请输入"></uv-input>
					</uv-form-item>
				</uv-form>
			</view>
			<view style="margin-top: 80rpx;">
				<button style="color: white; background-color: blue;" @click="turnToNext">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model1: {
					code: '',
					precode: '',
					newcode: '',
					confirmcode: '',
				},
				
				rule1: {
					
				},
			}
		},
		
		onReady() {
			this.$refs.form1.setRules(this.rule1)
			//查密码
		},
		methods: {
			turnToNext() {
				let that = this
				if(that.model1.newcode === that.model1.confirmcode){
					console.log(1)
					
					uni.getStorage({
						key: 'token',
						success: function (res) {
							let _token = res.data
							uni.request({
									  url: 'https://120.55.37.93/edit/setPaymentPassword',  
									  method: 'POST',  
									  header: {  
										'token': _token
									  },
									  data:{
											 "paymentPassword": that.model1.newcode
									  },
									  success: function (res) {
										  console.log(res)
										uni.navigateTo({
											url:"/pages/modifyCodePResult/modifyCodePResult",
											success: function(res){
												
											}
										});
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
				else{
					console.log(2)
				}
			}
		}
	}
</script>

<style>

</style>

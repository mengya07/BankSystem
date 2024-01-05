<template>
	<view>
		<view style="margin-top: 200rpx; margin-left: 30rpx; font-weight: bold; font-size: 160%;">
			<text>你好,</text>
		</view>
		<view style="font-weight: bold; margin-left: 30rpx; font-size: 160%">
			<text>欢迎来到中国银行</text>
		</view>
		<uv-form :model="model1" :rules="rule1" ref="form1" style="margin-top: 100rpx; margin-left: 30rpx; margin-right: 30rpx;">
			<uv-form-item label="+86" :borderBottom="true">
				<uv-input v-model="model1.phoneNumber" border="none" style="margin-left: 20rpx; margin-right: 20rpx; height: 60rpx;" placeholder="手机号(中国内地)" :clearable="true"></uv-input>
			</uv-form-item>
		</uv-form>
		<uv-form :model="model1" :rules="rule1" ref="form1" style="margin-top: 20rpx; margin-left: 30rpx; margin-right: 30rpx;">
			<uv-form-item :borderBottom="true">
				<uv-input v-model="model1.gcode" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" placeholder="验证码" :clearable="true"></uv-input>
				<canvas @click="generateCaptcha"   canvas-id="captchaCanvas" style="width:300rpx; height: 60rpx; display: inline; margin-right: 20rpx;"></canvas>
			</uv-form-item>
		</uv-form>
		<uv-form :model="model1" :rules="rule1" ref="form1" style="margin-top: 20rpx; margin-left: 30rpx; margin-right: 30rpx;">
			<uv-form-item label="手机验证码" :borderBottom="true" label-width="100">
				<uv-input v-model="model1.code" border="none" style="margin-left: 20rpx; margin-right: 20rpx; height: 60rpx;" placeholder="手机验证码" :clearable="true"></uv-input>
				<uv-code ref="uCode" @change="codeChange" keep-running start-text="获取验证码"></uv-code>
				<text @tap="getCode" style="color: blue;" >{{tips}}</text>
			</uv-form-item>
		</uv-form>
		<view style="margin-top: 60rpx;">
			<button style="margin-left: 30rpx; margin-right: 30rpx; border-radius: 30rpx; background-color: red; color: white;" @click="zhuce">注册</button>
		</view>
    </view>
	
</template>

<script> 
	export default {
		data() {
			return {
				model1: {
					phoneNumber: '',
					gcode: '',
					code: '',
				},
				yanzhenma: '',
				tips: '',
				rule1: {
					
				},
			}
		},
		mounted() {
		    this.generateCaptcha(); // 在 mounted 钩子中调用生成验证码的方法
		  },
		methods: {
			generateRandomString(length) {
			          const characters = '0123456789';
			          let randomString = '';
			          for (let i = 0; i < length; i++) {
			            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
			          }
			          return randomString;
			        },
					
			createCaptcha(text) {
						 const canvas = uni.createCanvasContext('captchaCanvas', this); // 获取 Canvas 上下文
						 canvas.setFillStyle('#fff');
						       canvas.fillRect(0, 0, 200, 50);
						       
						       let fontSize = 40; // 初始字体大小
						       let textWidth = 0;
						       
						       // 动态计算合适的字体大小以适应验证码长度
						       while (textWidth < 200 - 40) { // 10 是预留的间距
						         fontSize += 1;
						         canvas.setFontSize(fontSize);
						         textWidth = canvas.measureText(text).width;
						       }
						       
						       // 修正字体大小，确保验证码填满画布
						       fontSize -= 30;
						       canvas.setFontSize(fontSize);
						       
						       // 居中显示验证码文本
						       canvas.setFillStyle('#000');
						       canvas.setTextAlign('center');
						       canvas.setTextBaseline('middle');
						       canvas.fillText(text, 80, 20);
							   for (let i = 0; i < 50; i++) {
							       canvas.beginPath();
							       canvas.arc(Math.random() * 200, Math.random() * 50, 1, 0, Math.PI * 2);
							       canvas.setFillStyle('#000');
							       canvas.fill();
							     }
							   
							     // 添加随机线条
							     for (let i = 0; i < 5; i++) {
							       canvas.beginPath();
							       canvas.moveTo(Math.random() * 200, Math.random() * 50);
							       canvas.lineTo(Math.random() * 200, Math.random() * 50);
							       canvas.setStrokeStyle('#000');
							       canvas.stroke();
							     }
						       canvas.draw(); // 绘制到 Canvas
							   this.yanzhenma = text
			        },
			generateCaptcha() {
			          const captchaText = this.generateRandomString(4); // 验证码长度为4个字符
			          this.createCaptcha(captchaText, 'captchaCanvas');
			        },
					getCode() {
						let that = this
						if (this.$refs.uCode.canGetCode & this.model1.gcode===this.yanzhenma & this.model1.phoneNumber.length===11) {
							// 模拟向后端请求验证码
							uni.showLoading({
								title: '正在获取验证码'
							})
							uni.request({
									  url: 'https://120.55.37.93/sendsms/nologin'+'?phoneNumber='+this.model1.phoneNumber,  
									  method: 'GET',  
									  header: {  
							
									  },
									  data:{
										
									  },
									  success: function (res) {
									  },  
									  fail: function (error) {  
										console.log("获取验证码失败");  
									  }  
									})
							setTimeout(() => {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}, 2000);
						} else {
							uni.showLoading({
								title: '请先输入正确的图形验证码或手机号'
							})
							that.generateCaptcha()
							setTimeout(() => {
								uni.hideLoading();
							}, 1000);
						}
					},
					codeChange(text) {
						this.tips = text;
					},
					zhuce() {
						let that = this
						uni.request({
								  url: 'https://120.55.37.93/register/appAccount',  
								  method: 'POST',  
								  data:{
									"phoneNumber": that.model1.phoneNumber,
									"verifyCode": that.model1.code,
								  },
								  success: function (res) {
									 
									console.log(res)
									console.log(11)
									uni.setStorageSync('token',res.data.data.token)
									uni.navigateTo({
										url:"/pages/modifyPassword/modifyPassword",
										success: function(res){
											
										}
									});
								  },  
								  fail: function (error) {  
									console.log("寄咯");  
								  }  
								})
					}
		},
		onReady() {
			this.$refs.form1.setRules(this.rule1)
		}
	}
</script>

<style lang="scss">

</style>

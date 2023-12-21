<template>
	<view>
		<view class="wangji">忘记密码后，您可以重新设置支付密码</view>
		<view class="zhifumima">支付密码由 6位数字 组成</view>
		<view class="zhimi">
			<text class="textzhimi">支付密码</text>
			<input class="zimi"  v-model="value1" maxlength="6" type="password" placeholder="请输入六位支付密码" />
			
			<text class="textquemi">确认密码</text>
			<input class="quemi"  v-model="value2" maxlength="6" type="password" placeholder="请输入六位确认密码" />
			
		</view>
		<view class="wrong" v-if="fla">密码输入不一致，请重新输入</view>
		<button class="xbu" @click="clickSetpassword">下一步</button>
		
			<!-- <input v-model="codenum"/>
		<view class="codenumber">
			<u-button 
			type="error"
			:plain="true"
			size="medium">获取验证码</u-button>
		</view> -->
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				fla:false,
				value1:"",
				value2:"",
			};
		},
		methods:{
		clickSetpassword:function(e){
			if(this.value1===this.value2){
				let res=/^[0-9]{6}$/
				if(res.test(this.value1)){
				this.fla=false;
			// uni.request({
			// 	url:'https://120.55.37.93',
			// 	method:'POST',
			// 	data:{
			// 		value1:this.value1
			// 	},
			// 	success:function(res){
			// 		console.log(res);
			// 	},
			// 	fail:function(err){
			// 		console.log(err);
			// 	}
			// })
			}
			else{
				uni.showModal({
					title:"请输入六位数字密码"
				})
			}
			}else{
				this.value1="";
				this.value2="";
				this.fla=true;
			}
		},
					

		}
	}
</script>

<style lang="scss">
	.wangji{
		margin:10px 10px 10px 10px
	}
	.zimi{
		margin: 5px 15px 40px 15px;
		border-bottom: 1px solid black;
	}
	.textzhimi{
		margin: 50px 100px 0px 15px;
	}
	.textquemi{
		margin: 50px 100px 0px 15px;
	}
	.quemi{
		margin: 5px 15px 40px 15px;
		border-bottom: 1px solid black
	}
	.zhifumima{
		color:grey;
		margin: 20px 100px 20px 15px;
	}
	.wrong{
		margin: 5px 15px 40px 15px;
		color: red;
		font-size: 15px;
	}
	.xbu{
		width: 650rpx;
		color: white;
		background-color: red;
		border-radius: 25px;
		margin: 40px 50px 40px 10px;
		left:4%;
		position: fixed;
		bottom:470px;
	}
	// .codenumber{
	// 	height: 50rpx;
	// 	width: 200rpx;
	// 	margin: 10px 200px 10px 10px;
	// }
</style>

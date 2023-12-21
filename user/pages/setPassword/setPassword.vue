<template>
	<view>
		<view class="head">
			<view class="shezhi">
				设置六位支付密码
			</view>
			<view class="zuoy">
				用于交易时使用
			</view>
		</view>
		<view class="zhimi">
			<text class="textzhimi">支付密码</text>
			<input class="zimi"  @click="showkey1" v-model="value1" maxlength="6" type="password" placeholder="请输入六位支付密码" />
			
			<text class="textquemi">确认密码</text>
			<input class="quemi"  @click="showkey2" v-model="value2" maxlength="6" type="password" placeholder="请输入六位确认密码" />
			
		</view>
		<view class="wrong" v-if="fla">密码输入不一致，请重新输入</view>
		<button class="xbu" @click="clickSetpassword">下一步</button>
		<!-- <uv-keyboard
		ref="uKeyboard1"
		 mode="number"  
		 @change="valchange" 
		 @backspace="backspace" 
		 :show="show1" 
		 @cancel="Clickclose"
		@confirm="clickconfirm" 
		dotDisabled
		:overlay="false"
		:random="true"
		tips="安全键盘"
		></uv-keyboard>
		<uv-keyboard
		ref="uKeyboard2"
		 mode="number"  
		 @change="valchange1" 
		 @backspace="backspace1" 
		 :show="show2" 
		 @cancel="Clickclose1"
		@confirm="clickconfirm1" 
		dotDisabled
		:overlay="false"
		:random="true"
		tips="安全键盘"
		></uv-keyboard> -->
	</view>
</template>

<script>
	export default{
		data() {
				return {
					show1:false,
					show2:false,
				fla:false,
				value1:"",
				value2:"",
			}
		},
		methods:{
			clickSetpassword:function(event){
				if(this.value1===this.value2){
					this.fla=false;
					let res=/^[0-9]{6}$/
					if(res.test(this.value1))
					{
						uni.request({
							url:'https://120.55.37.93',
							method:'POST',
							data:{
								value1:this.value1
							},
							success:function(res){
								console.log(res);
							},
							fail:function(err){
								console.log(err);
							}
						})
					}
					else{
						uni.showModal({
							title:"请输入六位数字密码"
						})
						this.value1="";
						this.value2="";
					}
				
				
				}else{
					this.value1="";
					this.value2="";
					this.fla=true;
				}
			},
			showkey1(){
				if(this.show2){
					this.show2=false
			}
			this.show1=true
			},
			showkey2(){
			if(this.show1){
				this.show1=false
			}
			this.show2=true
			},
			valchange(val){
				if(this.value1.length<=5)
			this.value1+=val
			},
			backspace(){
			if(this.value1.length) this.value1 = this.value1.substr(0, this.value1.length - 1);
			},
			Clickclose(){
			this.show1=false
			},
				clickconfirm(){
					this.show1=false
				},
				valchange1(val){
					if(this.value2.length<=5)
					this.value2+=val
				},
				backspace1(){
				if(this.value2.length) this.value2 = this.value2.substr(0, this.value2.length - 1);
				},
				Clickclose1(){
				this.show2=false
				},
					clickconfirm1(){
						this.show2=false
					}
		}
	}
</script>


<style lang="scss" >
	.shezhi{
		margin: 50px 100px 0px 15px;
		width: 740rpx;
		height:100rpx;
		font-size: 30px;
		font-family: "黑体";
	}
	.zuoy{
		margin: 30px 100px 0px 15px;
		width: 740rpx;
		height:100rpx;
		
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
	.xbu{
		width: 650rpx;
		color: white;
		background-color: red;
		border-radius:25px;
	}
.wrong{
	margin: 5px 15px 40px 15px;
	color: red;
	font-size: 15px;
}
</style>

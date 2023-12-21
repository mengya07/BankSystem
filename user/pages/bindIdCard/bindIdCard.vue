<template>
	<view>
		<view class="info">
			绑定银行卡
		</view>

		<input class="kahao"  @click="showkey1" v-model="ID_card" maxlength="19" placeholder="请输入银行卡号" />
		<input class="yhang" @click="bankclick" v-model="institute" maxlength="10" placeholder="请选择银行" />
	<!-- 	<u-picker :show="showpick" :columns="columns" @cancel="cancel" @confirm="confirm" ></u-picker> -->
		<input class="mima"  @click="showkey2" v-model="password" type="password" maxlength="6" placeholder="请输入取款密码" />
		<view class="zhichi">
1.支持中行借记卡、信用卡。
2.他行卡，目前只支持工商银行、农业银行、建设银行、交通银行、邮储银行。
3.自助注册手机银行对外转账日限题20000元人民币，您可以前往中行网点柜台解除。
		
		</view>
		<button class="xbu" @click="clickcheck">下一步</button>
		<u-keyboard
		ref="uKeyboard"
		 mode="number"  
		 @change="valchange" 
		 @backspace="backspace" 
		 :show="show1" 
		 @cancel="Clickclose"
		@confirm="clickconfirm" 
		dotDisabled
		:overlay="false"
		></u-keyboard>
		<u-keyboard
		ref="uKeyboard"
		 mode="number"  
		 @change="valchange1" 
		 @backspace="backspace1" 
		 :show="show2" 
		 @cancel="Clickclose1"
		@confirm="clickconfirm1" 
		dotDisabled
		:overlay="false"
		></u-keyboard>
		<view>{{this.ID_card}}</view>
		<view>{{this.password}}</view>
	</view>
</template>

<script>
	export default{	
	data(){
		return{
		show1:false,
		show2:false,
		showpick:false,
		ID_card:'',
		institute:'',
		password:'',
		columns:[
			['中国银行','工商银行','农业银行','建设银行','交通银行','邮储银行']
		],
		}
	},
	methods:{
		clickcheck:function(e) {
			var reg = /^([1-9]{1})(\d{15}|\d{18})$/;
			if(!(reg.test(this.ID_card))){
				uni.showModal({
					title:"卡号错误"
				})
			}else
			 if (this.password.trim() === '') {
			 		console.log("111")
			 	  uni.showModal({
			 		title: '密码错误',
			 })
			 }else if (this.password.length!=6) {
			 	  uni.showToast({
			 	    title: '密码错误',
			 })
			 }
			//  else if (this.institute.trim() === '') {
			//     uni.showToast({
			//       title: '请选择银行',
			// })
			// }
			 
				let that=this
				uni.getStorage({
					key:"token",
					success(res) {
						let _token=res.data
						uni.request({
							url:'https://120.55.37.93/register/verifyCardAndIdentity',
							method:'POST',
							header:{
								"token" : _token
							},
							data:{
								"cardNumber":that.ID_card,
								"password":that.password
							},
							success(data) {
								console.log(data)
								uni.navigateTo({
									url:'/pages/phoneNumber/phoneNumber'
								})
							}
							// fail(error){
							// 	console.log(error)
							// }
						})
					}
				})
				
			
			
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
this.ID_card+=val
},
backspace(){
if(this.ID_card.length) this.ID_card = this.ID_card.substr(0, this.ID_card.length - 1);
},
Clickclose(){
this.show1=false
},
	clickconfirm(){
		this.show1=false
	},
	valchange1(val){
	this.password+=val
	},
	backspace1(){
	if(this.password.length) this.password = this.password.substr(0, this.password.length - 1);
	},
	Clickclose1(){
	this.show2=false
	},
		clickconfirm1(){
			this.show2=false
		},
		cancel(){
			this.showpick=false
		},
		confirm(index){
			this.institute=String(index.value)
			this.showpick=false
		},
		bankclick(){
			this.showpick=true
		}
	}
	}
</script>

<style lang="scss">
	.info{
		font-size: 25px;
		font-weight: bold;
		margin: 40px 15px 40px 10px;
	}
	.kahao{
		margin:5px 15px 40px 15px ;
		}
	.yhang{
		margin:5px 15px 40px 15px ;
		}
	.mima{
		margin:5px 15px 40px 15px ;
		}
		.xbu{
			width: 650rpx;
			color: white;
			background-color: red;
			border-radius: 25px;
		}
		.zhichi{
			width: 650;
			height: 200;
			color: grey;
			margin: 20px 15px 30px 15px;
			font-size: 15px;
		}
		
</style>

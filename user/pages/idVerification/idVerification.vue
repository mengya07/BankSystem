<template>
	<view class="title">
	
		<view class="info">
			填写身份信息
		</view>
		<view class="tixin">
			您已成功注册手机银行，填写身份信息绑定银行卡，畅享更多服务
		</view>
		
		<input class="xing"  v-model="surname" maxlength="10" placeholder="请输入姓" />
		<input class="ming" v-model="name" maxlength="10" placeholder="请输入名" />
		<view>
			<input class="idtype" @click="clickbuttom" v-model="ID_type" placeholder="请输入证件类型" />
			<uv-picker ref="picker" :columns="columns" @cancel="cancel" @confirm="confirm" @change="change"></uv-picker>
		</view>
		
		<input class="sfz" @click="showkey" v-model="ID" maxlength="19" placeholder="请输入证件号码" />
		
		
		<view class="uni-list">
			<checkbox-group @change="handleChange">
			<checkbox class="checkbox-3" >
				<text class="tonyi">
					本人(客户)已仔细阅读并理解《中国银行股份有限公司手机银行服务协议》《中国银行股份有限公司个人电子限行风险提示》完全同意和接受协议书全部欧和内容，愿融腊行和承担该协议书中约定的权利和义务。
				</text>
			</checkbox>
			</checkbox-group>
		</view>
		<button class="xbu" v-on:click="clickNUM">下一步</button>
		<uv-keyboard 
		ref="uKeyboard"
		 mode="card"  
		 @change="valchange" 
		 @backspace="backspace" 
		 @cancel="Clickclose"
		@confirm="clickconfirm" 
		dotDisabled
		:overlay="false"
		></uv-keyboard>
		</view>
</template>

<script>
	export default{	
		data() {
				return {
				show:false,
				showpick:false,
				ifchecked:false,
				tt:false,
				surname:'',
				name:'',
				ID:'',
				ID_type:'请选择证件类型',
				test:'',
				columns:[
					['居民身份证','护照','港澳通行证']
				],
			}
		},
		methods:{
			clickNUM:function(event){
				let that=this
				if(this.ifchecked){
					uni.getStorage({
							key:'token',
							success(res) {
								let _token=res.data
								uni.request({
									url:'https://120.55.37.93/register/identityVerification',
									method:'POST',
									header:{
										"token" :_token
									},
									data:{
										"surname":that.surname,
										"name":that.name,
										"identityCard":that.ID
									},
									success(data) {
										console.log(data)
									}
								})
							}
					})
						
				}else{
					uni.showModal({
						title:"请同意相关协议"
					})
				}
				if (this.surname.trim() === '') {
				  uni.showModal({
				    title: '姓不能为空',
				  
				  })
				  }
				  if (this.name.trim() === '') {
				    uni.showToast({
				      title: '名不能为空',
				    
				    })
					}
					
			if(this.ID_type=='请选择证件类型'){
				uni.showToast({
					title:"请选择证件类型"
				})
			}
			var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			if((p.test(this.ID))){
				 let reg = /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z.\s]{2,20})$/;
				 var arr = [this.surname, this.name]; 
				 this.test = arr.join('');
				 if(!(reg.test(this.test))){
					 uni.showToast({
					 	title:"姓名不正确"
					 })
				 }
			}
			else{
				uni.showModal({
					title:"身份证错误"
				})
			}
			},
			clickbuttom(){
				this.$refs.picker.open();
				uni.hideKeyboard();
			},
			handleChange(e) {
						if(this.ifchecked){
						this.ifchecked=false;
						}else{
							this.ifchecked=true;
						}
					},
					showkey(){
						this.$refs.uKeyboard.open();
					},
					valchange(val){
						this.ID+=val
						//uni.hideKeyboard();
					},
					backspace(){
						if(this.ID.length) this.ID = this.ID.substr(0, this.ID.length - 1);
						console.log(this.ID);
					},
					Clickclose(){
					this.show=false
					},
					clickconfirm(){
						this.show=false
					},
					cancel(){
						this.showpick=false
					},
					confirm(index){
						this.ID_type=String(index.value)
						this.showpick=false
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
	.tixin{
		font-size: 15px;
		margin: 10px 15px 40px 15px;
		color: grey;
	}
	.xing{
		margin:5px 15px 40px 15px ;
		
	}
	.ming{
		margin:5px 15px 40px 15px ;
	}
	.sfz{
		margin:5px 15px 40px 15px ;
	}
	.uni-list{
		width: 750rpx;
		height: 200rpx;
		margin: 50px 20px 20px 20px;
		.checkbox-3{
			
			.tonyi{
				width: 600rpx;
				height: 200rpx;
				font-size: 15px;
			}
		}
	}
	.xbu{
		width: 650rpx;
		color: white;
		background-color: red;
		border-radius: 25px;
	}
	.idtype{
		margin:5px 15px 40px 15px ;
		
	}
</style>
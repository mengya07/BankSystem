<template>
<view class="phone_code">
    <text class="phone_code_label">发送验证码</text>
    <view class="phone_code_count">
        <text class="phone_code_count_new">{{ suecurityphone }}</text>
        <view v-if="isReget" class="phone_code_count_reget">
            <button plain="true" type="warn" size="mini" @click="getCode">获取验证码</button>
        </view>  
        <text v-else class="phone_code_count_down">获取验证码<text>{{count}}</text>s</text>
    </view>
    <view class="phone_code_single">
        <input class="phone_code_single_cinput" 
            adjust-position="false" 
            auto-blur="true" 
            @blur="codeNumBlurFun" 
            @input="codeNumInputFun" 
            :focus="focus" 
            v-model="code" 
            type="number" 
            maxlength="6"/>
        <view class="phone_code_single_codeinput">
            <view v-for="(item,index) in 6" 
                :key="index" 
                @click="codefocusFun(index)" 
                :style="(index == code.length? 'background-color:#FEF2F2;':'color: #313131;background-color:#eee')">
                {{code[index]}}
            </view>
        </view> 
    </view>
    <button :disabled="isCode" class="btn" type="warn" @click="submitFun()">确定</button>
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
 </view>
 </template>
 
 <script> 
     export default {
         data() {
			
             return {
                 newPhone: 'aaaa', // 当前显示电话
                 isReget: true,  // 判断是否显示 ‘重新获取’按钮    
                 timer: null,   // 定时器
                 count: 0,  // 时间
                 code: "",  // 验证码  
                 focus: true,   // 焦点
                 isCode:true  ,// ‘确定’按钮是否禁用
				 suecurityphone:'',
				 show1:false
             } 
         },
         onLoad(e) {
			 			let that = this
			 			const eventChannel = this.getOpenerEventChannel();
			 			eventChannel.on('setData', function(data) {
							let num=String(data)
							that.suecurityphone=num.substring(0,3)+'****'+num.substring(7,11)
							that.newPhone=String(data)
			 			})
             //this.getTimer() // 开启定时器
             //this.getCode() // 获取验证码 
         },
         watch:{
             count(val){
                 if(val==0){
                     this.isReget = true 
                     clearInterval(this.timer)
                 }
             },
         },
         methods: {
                         /**
              * DESC: 定时器  
              * */ 
             getTimer(){
                 this.timer = setInterval(()=>{
                     if(this.count==0){
                         clearInterval(this.timer)
                         uni.navigateBack({delta: 1})
                         return
                     }
                     this.count-- 
                 }, 1000)
             },
             
             /**
              * DESC: 获取验证码   
              * */
             getCode(){
                 console.log("获取验证码", this.newPhone)
				 this.code=''
                 if(this.count==0){
                     this.count = 60 
                     this.isReget = false 
                     this.getTimer()
					 uni.request({
					 	url:'https://120.55.37.93/sendsms/nologin?phoneNumber='+this.newPhone,
						success(data) {
							console.log(data)
						}
					 })
                 }
             },
             /**
              * DESC: 输入框输入事件 
              * */ 
             codeNumInputFun(e){ 
                 let val = e.detail.value 
                 if(val.length=="6") this.isCode = false
                 else this.isCode = true 
             },
             /**
              * DESC: 输入框失去焦点事件 
              * */ 
             codeNumBlurFun(e){
                 let val = e.detail.value 
				 console.log(val)
                 this.focus = false
                 if(this.code.length=="6") 
					{		
						this.isCode = false
					 }
                 else this.isCode = true 
             },
             /**
              * DESC: 输入框点击事件
              * @param {Number} index 当前点击框索引
              * */ 
             codefocusFun(index){ 
                 this.focus = true 
				 this.show1=true
             },
                         /**
              * DESC: 按钮点击事件
              * */ 
             submitFun(){  
				 let that=this
                 uni.request({
                 	url:'https://120.55.37.93/register/bindBankCardForIdentity',
					method:'POST',
					header:{
						"token" : 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1MmRjMmJlYmUyODA0YzQ2YmMyNjFjNjYzZDUyYjI4MCIsInN1YiI6IjExIiwiaXNzIjoicG0iLCJpYXQiOjE3MDMwNTIwMjIsImV4cCI6MTcwMzEzODQyMn0.lpAOlrNRIOF0Ykoc-B6cRDEk-xwthwAwx1WwoYXvBqI',
					},
					data:{
						"phoneNumber":that.newPhone,
						"verifyCode":that.code
					},
					success(data) {
						console.log(data)
					}
                 })
             },
			 showkey1(){
			 this.show1=true
			 },
			 valchange(val){
				 if(this.code.length<=5)
				{
					this.code+=val
				}
			 console.log(1)
			 if(this.code.length=="6") this.isCode = false
			 else this.isCode = true 
			 },
			 backspace(){
			 if(this.code.length) this.code = this.code.substr(0, this.code.length - 1);
			 if(this.code.length!=6)this.isCode=true
			 },
			 Clickclose(){
			 this.show1=false
			 },
			 	clickconfirm(){
			 		this.show1=false
			 	},
         }
     }
 </script>
 
 <style lang="scss" scoped>
  .phone{
         background-color: #FFF;
         width: 100vw;
         height: 100vh; 
     &_code{
         padding: 30rpx;
         &_label{
             font-size: 30rpx;
             color: #999;
         }
         &_count{
             margin-top: 30rpx;
             display: flex;
             flex-direction: row;
             justify-content: space-between; 
             align-items: center;
             height: 100rpx;
             &_new{
                 color: #e64340;
                 font-size: 38rpx;
                 font-weight: bold; 
             }
             &_down{
                 border: 1rpx solid #eee;
                 border-radius: 10rpx; 
                 color: #999;
                 height: 60rpx;
                 line-height: 60rpx;
                 padding: 0 20rpx;
                 text{
                     margin-left: 10rpx;
                 }
             } 
         }
         &_single{
             margin-top: 30rpx; 
             &_cinput{
                 position: fixed;
                 left: -100rpx;
                 width: 50rpx;
                 height: 50rpx;
             }
             &_codeinput{
                 margin: auto;
                 width: 650rpx;
                 height: 100rpx;
                 display: flex;
             }
              
             &_codeinput>view {
                 margin-top: 5rpx;
                 margin-left: 15rpx;
                 width: 86rpx;
                 height: 86rpx;
                 line-height: 86rpx;
                 font-size: 60rpx;
                 font-weight: bold;
                 color: #313131;
                 text-align: center;
                 border-radius: 10rpx;
             }
          
             &_codeinput>view:nth-child(1) {
                 margin-left: 0rpx;
             } 
         }
		 
     }
	 
 }
 </style>
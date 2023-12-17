<template>  
  <view class="container">  
   <text class="title"></text>
   <text class="title"></text>
   <text class="title"></text>
   <text class="title"></text>
   <text class="title"></text>
   <text class="title"></text>
   <text class="title"></text>
   <text class="title"></text>
    <text class="title" >登录</text>  
    <input class="input"  type="text" maxlength="11"  placeholder="  请输入手机号" @input="onUsernameInput"> 
    <input class="input" type="password" placeholder="  请输入验证码" @input="onPasswordInput">
	<button class="button2" type="primary" @click="handleClick">获取验证码</button>
	<text class="title"></text>
    <button class="button" type="primary" @click="onLoginClick">登录</button>  
	<text class="title"></text>  
    <text class="error" v-if="error">{{ error }}</text>  
	<uni-fab
				:pattern="pattern"
				:content="content"
				:horizontal="horizontal"
				:vertical="vertical"
				:direction="direction"
				@trigger="trigger"
				@fabClick="fabClick" 
			></uni-fab>
  </view>  
 
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      username: '',  
      password: '',  
      error: ''  ,
	  title: 'uni-fab',
	  directionStr: '垂直',
	  horizontal: 'left',
	  vertical: 'bottom',
	  direction: 'horizontal',

	  pattern: {
	  					color: '#7A7E83',
	  					backgroundColor: '#fff',
	  					selectedColor: '#007AFF',
	  					buttonColor: '#007AFF',
	  					iconColor: '#fff'
	  				},
	  				is_color_type: false,
	  				content: [
						{
	  						iconPath: '/static/switch.png',		
	  						text: '密码登录',
	  						active: false
	  					},
	  					{
	  						iconPath: '/static/find.png',
	  						text: '找回密码',
	  						active: false
	  					},
	  					
				  ]

    }
  },
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},  
  methods: {  
    onUsernameInput(event) {  
      this.username = event.detail.value;  
    },  
    onPasswordInput(event) {  
      this.password = event.detail.value;  
    },  
    onLoginClick() {  
		
		
    
	
			uni.request({  
			  url: 'http://6a6vjt.natappfree.cc/vcodelogin',  
			  method: 'POST',  
			  data: {  
			    "phoneNumber": this.username,  "verifyCode": this.password  ,
				// "phoneNumber":'13106151700',  "verifyCode": '13106151700zhf' ,
			  },  
			  success: (res) => {  
				  console.log(res);
			    if (res.data.code === 200) {  
			      uni.showToast({  
			        title: '登录成功',  
			        icon: 'success'  
			      });  
			     uni.switchTab({  
			     url: "/pages/home/home"  
			      });  
				  uni.setStorageSync({
				    key: 'token',  
				    data: data.data.token,  
				  }); 
			    } else {  
			      uni.showToast({
			        title: '请输入正确的手机号和验证码',  
			        icon: 'error'  
			      }); 
			    }  
			  },  
			  fail: (error) => {  
			    if (error.data.code === 300) {  
			       
			    } else {  
			      console.log('登录失败，但原因未知');  
			      console.log(error); // 打印错误信息  
			    }  
			  }  
			});
			
    },
	handleClick(){
		if(username.length===11)
		uni.request({
		  url: 'http://6a6vjt.natappfree.cc/sendsms/nologin?phoneNumber='+this.username,  
		  method: 'POST',  
		  data: {  
		 
		  },
		success: (res) => {
			uni.showToast({
			  title: '发送成功',  
			  icon: ''  
			});
			}
		  })
		  else{
			uni.showToast({
			  title: '请输入正确格式的手机号',  
			  icon: ''  
			});  
		  }
	},
	
	
	
	trigger(e) {
					console.log(e)
					if(e.index==0)
					uni.navigateTo({
					  url:  "/pages/login/login"
					});
					if(e.index==1)
					uni.navigateTo({
					  url:  "/pages/register/register"
					});
					
				},
				fabClick() {
					
					
				},
				
				
	
				
	 

  } 
};  

</script>  
<style>  
.container {  
  width: 100%;  
  height: 100%;  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  justify-content: center;  
}  
.logo {  
  width: 200rpx;  
  height: 200rpx;  
  margin-bottom: 50rpx;  
}  
.title {  
  color: blue;
  font-weight: bold;
  font-size: 50rpx;  
  margin-bottom: 20rpx;
  
}  
.input {  
  width: 500rpx;  
  height: 80rpx;  
  margin-bottom: 20rpx; 
  border-collapse: collapse;
  border: 1px solid silver;
}  
.button {  
  width: 220rpx;  
  height: 100rpx;  
}  
.button2{
  font-size: 16px;
  width: 220rpx;
  height: 85rpx;
}
.error {  
  color: red;  
  font-size: 24rpx;  
  margin-bottom: 50rpx;  
}  
.find{
	color:blue;
}
.warp {
		padding: 10px;
	}
</style>
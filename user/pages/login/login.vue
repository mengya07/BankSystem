<template>  
  <view class="container">  
    <image class="logo" src="/static/logo.png"></image>  
    <text class="title">登录</text>  
    <input class="input" type="text" placeholder="请输入用户名" @input="onUsernameInput">
    <input class="input" type="password" placeholder="请输入密码" @input="onPasswordInput">
    <button class="button" @click="onLoginClick">登录</button>  
	 <button class="button2" @click="handleClick">注册</button>  
    <text class="error" v-if="error">{{ error }}</text>  
  </view>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      username: '',  
      password: '',  
      error: ''  
    };  
  },  
  methods: {  
    onUsernameInput(event) {  
      this.username = event.detail.value;  
    },  
    onPasswordInput(event) {  
      this.password = event.detail.value;  
    },  
    onLoginClick() {  
      // 模拟登录验证过程，实际开发中需要调用后端接口进行验证  
      if (this.username === 'admin' && this.password === 'password') {  
        uni.showToast({  
          title: '登录成功',  
          icon: 'success'  
        });
		uni.switchTab({
		  url:  "/pages/home/home"
		});
		this.error = '';
			
			
        // 登录成功后跳转到其他页面或执行其他操作  
      } else {  
        this.error = '用户名或密码错误';  
      }  
    },
	handleClick(){
		uni.navigateTo({
		  url:  "/pages/register/register"
		});
	}

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
  font-size: 36rpx;  
  margin-bottom: 20rpx;  
}  
.input {  
  width: 300rpx;  
  height: 50rpx;  
  margin-bottom: 20rpx;  
}  
.button {  
  width: 300rpx;  
  height: 100rpx;  
}  
.button2{
  width: 300rpx;
  height: 100rpx;
}
.error {  
  color: red;  
  font-size: 24rpx;  
  margin-bottom: 50rpx;  
}  
</style>
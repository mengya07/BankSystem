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
   
		<uv-form >
		  <uv-form-item label="+86" :border-bottom= 'true'>
			  <input class="input" type="text" placeholder="  请输入手机号" @input="onUsernameInput">
		  </uv-form-item>
		  <uv-form-item :border-bottom= 'true'>
			  <input class="input" type="password" placeholder="  请输入密码" @input="onPasswordInput">
		  </uv-form-item>
		</uv-form>


	<text class="title"></text>
    <button class="button" type="warn" @click="onLoginClick">登录</button>  
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
	  that:'',
	  pattern: {
	  					color: '#7A7E83',
	  					backgroundColor: '#fff',
	  					selectedColor: '#007AFF',
	  					buttonColor: '#ff0000',
	  					iconColor: '#fff'
	  				},
	  				is_color_type: false,
	  				content: [
						{
	  						iconPath: '/static/switch.png',		
	  						text: '短信登录',
	  						active: false
	  					},
	  					{
	  						iconPath: '/static/find.png',
	  						text: '找回密码',
	  						active: false
	  					},
						{
							iconPath: '/static/register.png',
							text: '注册',
							active: false
						},
	  					
				  ]

    }
  },
	
  methods: {  
    onUsernameInput(event) {  
      this.username = event.detail.value;  
    },  
    onPasswordInput(event) {  
      this.password = event.detail.value;  
    },  
    onLoginClick() {  
			let that = this;
			uni.request({  
			  url: 'https://120.55.37.93/login',  
			  method: 'POST',  
			  data: {  
			  "userName": that.username,  "password": that.password  ,
			//"userName":'18629153578',  "password": '18629153578ljf' ,
			  },  
			  success: (res) => {  
			    if (res.data.code === 200) {  
			      uni.showToast({  
			        title: '登录成功',  
			        icon: 'success'  
			      }); 
				  // uni.setStorageSync('islogin',true);
				  uni.setStorageSync('token',res.data.data.token);  //存token
				  uni.setStorageSync('userName',that.username); //存手机号
				  uni.request({
				    url: 'https://120.55.37.93/query/bankCard',  
				    method: 'GET',  
				    data: {},  
				    header: {  
				      "token": res.data.data.token,  
				    },  
				    success: (res) => {  
				      uni.setStorageSync('tranferCardId',res.data.data[0].cardId);
				    },  
				    fail: (error) => {  
				      console.log(error);  
				    }  
				  });  //请求初始卡id
				  uni.request({
				    url: 'https://120.55.37.93/query/customerInfo',  
				    method: 'GET',  
				    data: {},  
				    header: {  
				      "token": res.data.data.token,  
				    },  
				    success: (res) => {  
				      uni.setStorageSync('name',res.data.data.surname+res.data.data.name);//存姓名
				    },  
				    fail: (error) => {  
				      console.log(error);  
				    }  
				  }); 
				  
				  
				  
				  
				     uni.switchTab({  
			     url: "/pages/home/home"  
			      });  
				  
				  
			    } else {  
			      uni.showToast({
			        title: '请输入正确的手机号和密码',  
			        icon: 'error'  
			      }); 
				  
			    }  
				
				console.log(res);
				
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
	
	
	
	
	trigger(e) {
					console.log(e)
					if(e.index==0)
					uni.navigateTo({
					  url:  "/pages/login-message/login-message"
					});
					if(e.index==1)
					uni.navigateTo({
					  url:  "/pages/findOne/findOne"
					});	
					if(e.index==2)
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
  color: black;
  font-weight: bold;
  font-size: 50rpx;  
  margin-bottom: 20rpx;
  
}  
.input {  
  width: 500rpx;   
  margin-bottom: 20rpx; 
  border-collapse: collapse;
}  
.button {  
  width: 520rpx;  
  height: 100rpx;
  border-radius: 30rpx; 
}  
.button2{
  width: 220rpx;
  height: 100rpx;
 
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
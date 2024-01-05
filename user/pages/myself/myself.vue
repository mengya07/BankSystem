<template>
	<view>
	    <!-- 状态栏 -->
	    <view class="status" :style="{position:headerPosition}"></view>
	    <!-- 漂浮头部 -->
	    <view class="header" :style="{position:headerPosition}">
	    	<view class="menu">
	    		<image mode="widthFix" src="../../static/icon/icon_exit.svg" @click="clickExit"></image>
	    	</view>
<!-- 	    	<view v-else class="menu">
	    		<image mode="widthFix" src="../../static/icon/icon_exit.svg" @click="clickLogin"></image>
	    	</view> -->
	    	<view class="input">
	    		<view class="icon search"></view>
	    		<input placeholder="搜索一下" @click="toSearch()" />
	    	</view>
	    	<view class="scan">
	    		<view class="icon scan" @click="scan"></view>
	    	</view>
	    </view>
		<view class="place"></view>
		

	    <view class="swiper-view">
		<uv-row class="avatar-box">
			<uv-col span="3">
				<view class="avatar">
					<uv-avatar :text="name" random-bg-color size=50></uv-avatar>
				</view>
			</uv-col>
			<uv-col span="9">
				<view class="avatar-text">
					{{timePeriod}}，{{name}}
				</view>
			</uv-col>
		</uv-row>
		<view class="keep-out"></view>
        </view>
		
<!-- 		<view class="keep-out"></view> -->		
		
        <view class="category">
		<view class="gird-box">
		<uv-grid :border="false" :col="4">
			<uv-grid-item @click="clickAccountView">
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" name="/static/icon/icon_account.svg" :size="32"></uv-icon>
				<text class="grid-text" >账户</text>
			</uv-grid-item>
			<uv-grid-item @click="clickTransactionRecord">
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" name="/static/icon/icon_record.svg" :size="32"></uv-icon>
				<text class="grid-text" >交易明细</text>
			</uv-grid-item>
			<uv-grid-item @click="clickTransferRecord">
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" name="/static/icon/icon_transfer.svg" :size="32"></uv-icon>
				<text class="grid-text" >转账记录</text>
			</uv-grid-item>
			<uv-grid-item>
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" name="grid" :size="32"></uv-icon>
				<text class="grid-text" >全部</text>
			</uv-grid-item>
		</uv-grid>
		</view>
		</view>

		
        <view class="pick">
		<view class="list">
		    <view class="list-item" @click="clickAccount">我的账户</view>
			<uv-line margin="10rpx"></uv-line>
		    <view class="list-item" @click="clickSettings">安全与设置</view>
			<uv-line margin="10rpx"></uv-line>
			<view class="list-item" @click="clickRecord">收支记录</view>
			<uv-line margin="10rpx"></uv-line>
			<view class="list-item">关于我们</view>
			<uv-line margin="10rpx"></uv-line>
			<view class="list-item">隐私政策</view>
		</view>
		<view style="height: 600rpx;"></view>
		</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				headerPosition:"fixed",
				name:"",
			};
		},
		methods:{
			clickLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			clickAccount(){
				uni.navigateTo({
					url:"/pages/accountView/accountView"
				})
			},
			clickSettings(){
				uni.navigateTo({
					url:"/pages/securityAndSettings/securityAndSettings"
				})
			},
			clickRecord(){
				uni.navigateTo({
					url:"/pages/monthIE/monthIE"
				})
			},
		clickExit(){
			let that = this
			uni.showModal({
				content: "请确认是否退出当前登录账号？",
				success(res) {
					if(res.confirm){
						let that = this
						uni.getStorage({
							key: 'token',
							success: function (res) {
								let _token = res.data
								uni.showLoading({
									title: "",
									mask: true
								})
								uni.request({
										  url: 'https://120.55.37.93/user/logout',  
										  method: 'GET',
										  header: {  
											'token': _token
										  },
										  data:{
										  },
										  success: function (res) {
											if(res.data.code == 200){
												uni.showToast({
													title:"注销成功"
												})
												uni.navigateTo({
													url:"/pages/login/login"
												})
											}
											uni.hideLoading()
										  },  
										  fail: function (error) {  
											uni.hideLoading()
											uni.showToast({
												title: '错误，稍后再试',
												icon: 'error',
												duration: 2000
											}) 
										  }  
										})
							}
						})
					}
				}
			})
		},
			//扫一扫
			scan(){
				uni.scanCode({
					success:(res)=>{
						uni.showToast({title: '条码内容：' + res.result});
					}
				});
			},
			//搜索跳转
			toSearch(){
				uni.showToast({title: "建议跳转到新页面做搜索功能"});
			},
			clickTransferRecord(){
				// if(this.islogin){
					uni.navigateTo({
						url:"/pages/transferRecord/transferRecord"
					})
				// }else{
				// 	uni.navigateTo({
				// 		url:"/pages/login/login"
				// 	})
				// }
			},
			clickAccountView(){
				// if(this.islogin){
					uni.navigateTo({
						url:"/pages/accountView/accountView"
					})
				// }else{
				// 	uni.navigateTo({
				// 		url:"/pages/login/login"
				// 	})
				// }
			},
			clickTransactionRecord(){
				// if(this.islogin){
					uni.navigateTo({
						url:"/pages/transactionRecord/transactionRecord"
					})
				// }else{
				// 	uni.navigateTo({
				// 		url:"/pages/login/login"
				// 	})
				// }
			},
		},
		computed:{
			// islogin: function(){
			// 	return getApp().globalData.islogin
			// },
			// name: function(){
			// 	let temp = ""
			// 	uni.getStorage({
			// 		key:'name',
			// 		success(res) {
			// 			console.log(res)
			// 			temp = res.data
			// 		}
			// 	})
			// 	return temp
			// },
			timePeriod: function(){
				  const now = new Date();  
				  const hours = now.getHours();  
				  if (hours >= 6 && hours < 12) {  
				    return "早上好";  
				  } else if (hours >= 12 && hours < 18) {  
				    return "下午好";  
				  } else {  
				    return "晚上好";  
				  }  
			}
		},
		onLoad() {
			console.log("上面" + this.name)
			this.name = uni.getStorageSync('name')
			console.log("下面" + this.name)
		}
	}
</script>

<style lang="scss">
	@font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAP8AAsAAAAACFwAAAOwAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqEEINSATYCJAMQCwoABCAFhG0HTxtLBxHVmzvJfhS4scOeC1v4zNNRK/hO5b0IHqg/8838ye5XsIDanmAkhZ1NSZygm4SsbYYkp17ICsOUxIP/ZZm9xejtQAD8zzX10geY387mEtXapUd7A5xF6oAi2pJoE8YNY1dexGkIwCSZQoiq1es2RUdhTBKA6N2jWwf0lAlVky3QEYSUrFSIOTjQ5VR5GZjt/168obDQQeLQMGY27FqtMxWf5z5fpgWCgdYugng8B8DWgQYUAhSI7qWujmhhqBAaptJfURzQ0ZEwVkfB58uCQSTZi0o3//JAItBAhGBk2gAURUrtxMQ2BQnPC1IQ8HyZmpvE1XgdMIDtwHVEJt4qkThsZwFPVHiEFTHKtWBBYGGUe/HmsZu6TluCStw+fXGMY9GyUb4b133Xrze9etV77VqzxcuXbYq8bF6/7rtxo5lY6A1cLcuCQJS3oXHswOYKUSaI71xkXr3ayZy2SIix0YumRS6AwEnLmr58WS9z2pKlYcJCCGzcXOU81Xuhp1osIWbBiUQWehda7lTvaNeCJX0WbYgksMA0hdlLo6zDp1PEomIdVu7YE4wN7nH7uGPdHXz2R3uHnX68tcP6SPE5ZSdObNpN/9dybtfmr6tHoy6+rN+DqdvnW9lUbkHTdcUWfKp1yzVr5Ag5HCqGU0Hca3jpAt2GiWFRwxYvdpYFo2b3tN/HvLeFd+BAr5Bu7CXnzKFlJb8dtP3ucx1djc+589Pep+W7X706stfvml+7i8fsWunxp7/f/uzsrgzj9Sv3p+6T7yqwvrfdy3nk/J6eZ84fnHp2lSvf/m/7H7569dDvuY/fTX+Mwdog+QVAGyB/IHmGyK8/exQrX13Maucu+y23rrbi5tQ1T3yTor3oj4kV8a8VtyxSqtQwKyXLbJF2kaI5DgAkYGICPzQG4dwfQxPVOhMEOlExSEJJAg2dTFSRhcCBRVEIQacCmBSkxnqLCAaiIZQBFGAiAIGH3SBxcRo0PFxBFXkPHETzDkLwCA1MfCJiR4tswStWxeEccIPlAbXSxS1rYEH2G0U8ZpeU+sw/Oq+80JR1NjrghW6MOT6JNgQO3NEJPTgPj4PAONK4hlKGYLqq4mVvKlc6M0YVh3PADZYH1EoXd8sHlvv+G0U8ZldDq/D+0XnVPTRl3QIdVFcr2rX090m0IXA8jjs6oYcOPMwQgSkfpnENpewRMF2FSvG2qnJ+zfmE6wATY6YSUmhCCQehg9V8advwun0+nHuJ0VP0kYrcz/Qox5hl') format('woff2');}
	.icon {
		font-family:"HMfont-home" !important;
		font-size:60upx;
		font-style:normal;
		color:#ffffff;
		&.scan {
			&:before{content:"\e69a";}
		}
		&.menu {
			&:before{content:"\e62b";}
		}
		&.search {
			&:before{content:"\e628";}
		}
	}
	page {
		background-color: #fff;
	}
	.status {
		width: 100%;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff570a;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	.header {
		width: 100%;
		height: 100upx;
		background-color: #ff570a;
		display: flex;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		
		z-index: 996;
		.scan {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.input {
			width: calc(100% - 200upx);
			display: flex;
			justify-content: center;
			align-items: center;
			position:relative;
			input {
				width: calc(100% - 60upx);
				height: 60upx;
				background-color: #ffffff;
				border-radius: 60upx;
				padding-left: 60upx;
				font-size: 30upx;
				
			}
			.icon{
				width: 60upx;
				height: 60upx;
				position: absolute;
				color: #a18090;
				z-index: 996;
				top: 20upx;
				left: 0;
				font-size: 40upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.menu {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 60upx;
				height: 60upx;
				border-radius: 60upx;
			}
		}
	}
.avatar-box{
	height: 200rpx;
	width: 100%;
	//background-color: #3c9cff;
	//background-color: #ff570a;
	// backdrop-filter: blur(16px) saturate(180%);
	// -webkit-backdrop-filter: blur(16px) saturate(180%);
	// border-radius: 8px;
	// border: 1px solid rgba(209, 213, 219, 0.3);
	// box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
	//box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
	backdrop-filter: blur(20rpx);
	.avatar{
		margin-left: 50rpx;
	}
	.avatar-text{
		margin-left: -20rpx;
	}
}
.gird-box{
	height: 140rpx;
	margin: 10rpx;
	border-radius: 20upx;
	background-color: #FFFFFF;
	// box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
	.grid-text{
		font-size: 14px;
		color: "black";
	}
}
.list{
	// margin-top: 20rpx;
	display: flex;
	flex-direction: column;
    justify-content: center;
	margin-left: 10rpx;
	margin-right: 10rpx;
	padding-left: 10rpx;
	padding-right: 10rpx;
	border-radius: 20upx;
	//box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
	background-color: #FFFFFF;
    .list-item{
		margin-top: 40rpx;
		margin-left: 20rpx;
		height: 80rpx;
	}
}
.category{
	width: 95%;
	padding: 2.5vw 2.5vw;
	background-color: #ff570a;
}
	.keep-out {
		width: 100%;
		height: 30upx;
		border-radius: 100% 100% 0 0;
		background-color: #ff570a;
		margin-top: -8upx;
		position: absolute;
	}
	.place{
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff570a;
		height: 100upx;
	}
.swiper-view {
	background: repeating-linear-gradient(#ff570a 0%,#FDBEA6 105%);
	.swiper {
		width: 100%;
		height: 280upx;
		image {
			width: 100%;
			height: 280upx;
		}
	}
	.keep-out {
		width: 100%;
		height: 30upx;
		border-radius: 100% 100% 0 0;
		background-color: #ff570a;
		margin-top: -15upx;
		position: absolute;
	}
}
.pick{
	width: 95%;
	padding: 0 2.5vw 2.5vw 2.5vw;
	background: linear-gradient(to bottom, #ff570a 0%,#ffffff 105%);
}
</style>

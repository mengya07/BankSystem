<template>
	<view>
		<uni-section>
					<uni-card  :isFull="true" >
						<text>转账金额（人民币元)<br></text>
						<text class="aaaa">{{transferData.Amount}} <br></text>
					</uni-card>
		</uni-section>
		
		<uni-popup ref="popup" type="center" :isMaskClick="false">
			<view style="display: flex;justify-content: flex-end;background-color: #FFFFFF;"><uv-icon name="close" size="14" style="margin-right: 5rpx;" @click="this.$refs.popup.close()"></uv-icon></view>
			<view style="width: 600rpx; height: 350rpx; display: flex; flex-direction: column; align-items: center; background-color: #FFFFFF;">
				<view>手机交易码</view>
				<uv-line margin="10rpx"></uv-line>
				<view style="margin-top: 20rpx;">已发送至尾号{{phoneTail}}的手机</view>
				<uv-code-input mode="line" size="28" @finish="codeInputFinish" style="margin-top: 40rpx;"></uv-code-input>
				<uv-code ref="uCode" @change="codeChange" seconds="60">    </uv-code>
				<button @click="getCode" style="border-radius: 10rpx; width: 300rpx; height: 60rpx; font-size: 0.8em; margin-top: 40rpx; background-color: red; color: #FFFFFF;">{{codeTips}}</button>				
			</view>
		</uni-popup>		
				
		<uni-section>
					<uni-card :isFull="true">
						<view>
						<text class="uni-bodyy">收款人姓名</text>
						<text class="uni-ininin">{{transferData.receiverName}}<br></text>
						</view>
						<view>
						<text class="uni-body">收款账号</text>
						<text class="uni-ininin">{{transferData.receiverCardNumber}}<br></text>
						</view>
						<view>
						<text class="uni-body">收款银行</text>
						<text class="uni-ininin">中国银行<br></text>
						</view>
						<view>
						<text class="uni-body">转账方式</text>
						<text class="uni-ininin">实时<br></text>
						</view>
						<view>
						<text class="uni-body">付款账号</text>
						<text class="uni-ininin">{{transferNumberOut}}<br></text>
						</view>
					</uni-card>
		</uni-section>
		<button class="button" type="warn" @click="Confirm">确认</button>
	</view>
</template>

<script>  
export default {  
    data() {  
        return {  
            transferNumberOut: '', 
			transferData: '',
			cardId: '',
            codeTips: '', 
			title: '',
			transferCard: '',
			transferNumber: '',
			transferName: '',
			transferMoney: '',
			transferMessage: '',
			token: '',
			phoneNumber: '',
			phoneTail: '',
        }  
    },  
    methods: {  
    
        getDataFromStorage() {  
           const value1 = uni.getStorageSync('transferNumberOut');  
            if (value1 !== undefined) { // 检查值是否存在  
                this.transferNumberOut = value1; // 如果存在，设置到组件的数据属性中  
            } else {  
                console.log('transferNumberOut not found in storage'); // 否则输出错误消息或进行其他处理  
            };
			
			const value2 = uni.getStorageSync('transfer');
			if (value2 !== undefined) { // 检查值是否存在  
			    this.transferData = value2; // 如果存在，设置到组件的数据属性中  
			} else {  
			    console.log('transfernot found in storage'); // 否则输出错误消息或进行其他处理  
			};
			
			 const value3 = uni.getStorageSync('tranferCardId');
			 if (value3 !== undefined) { // 检查值是否存在  
			     this.cardId = value3; // 如果存在，设置到组件的数据属性中  
			 } else {  
			     console.log('transfernot found in storage'); // 否则输出错误消息或进行其他处理  
			 };  
			 const value4 = uni.getStorageSync('token');
			 if (value4 !== undefined) { // 检查值是否存在  
			     this.token = value4; // 如果存在，设置到组件的数据属性中  
			 } else {  
			     console.log('transfernot found in storage'); // 否则输出错误消息或进行其他处理  
			 };  
			 const value5 = uni.getStorageSync('token');
			 if (value5 !== undefined) { // 检查值是否存在  
			     this.phoneNumber = value5; // 如果存在，设置到组件的数据属性中  
			 } else {  
			     console.log('transfernot found in storage'); // 否则输出错误消息或进行其他处理  
			 };  
			 this.phoneTail=phoneNumber.substring(phoneNumber.length - 4); 
			
        },
		
		
		codeChange(text){
			this.codeTips = text
		},
		getCode(){
			if(this.$refs.uCode.canGetCode) {
		        let that = this
		        uni.getStorage({
		        	key: 'token',
		        	success: function (res) {
		        		uni.showLoading({
		        			title: "正在获取验证码",
		        			mask: true
		        		})
		        		uni.request({
		        				  url: 'https://120.55.37.93/sendsms/login',  
		        				  method: 'GET',  
		        				  header: {  
		        					'token': that.token
		        				  },
		        				  success: function (res) {
		        					uni.hideLoading()
									that.$refs.uCode.start()
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
				   this.$refs.uCode.start()
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		Confirm(){
			this.$refs.popup.open();
		},
		codeInputFinish(e){
			    let that = this
			    uni.getStorage({
			    	key: 'token',
			    	success: function (res) {
						
						uni.request({
								  url: 'https://120.55.37.93/user/transferMoney',  
								  method: 'POST',  
								  header: {  
									'token': that.token
								  },
								  data: {
									"pojo":{
									        "senderCardId":that.cardId,
									        "receiverCardNumber":that.transferData.receiverCardNumber,
									        "receiverName":that.transferData.receiverName,
									        "Amount":that.transferData.Amount,
									        "postscript":that.transferData.postscript
									    },
									    "verifyCode":String(e)
								  },
								  						 
								  success: function (res) {
									console.log(res);
									 if(res.data.code=="200"){
										console.log(res); 
										uni.navigateTo({
											url:'/pages/transferResult/transferResult'
										});
									
									 }
									 else {
										  
										  uni.showToast({
										  	title:"验证码错误",
										  	icon:"none"
										  })
										  
										  
										}
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
		},
		
	},
    onLoad() { 
        this.getDataFromStorage();  
		let value=transferData.Amount;
		this.transferMoney=value.toFixed(2);	
    }
} 
</script>

<style>
.uni-body
{
	
}
.uni-bodyy
{
	margin-right: -14px;
}
.uni-ininin
{
	margin-left: 44px;
	font-weight: bold;
}
.aaaa
{
	font-size: 25px;
	font-weight: 700;
}
.button
{
	 border-radius: 30rpx; 
}

</style>

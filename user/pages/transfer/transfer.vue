<template>  
  <view class="container">  
    <text class="transferNumber" @click="choose">付款账户：{{cardNumber}}</text>  
    <uni-section title="">  
	
	    <view style="display: flex; justify-content: flex-end;">  
          <text class="balance">可用余额：{{balance2}}</text>  
          <button class="mini-button" type="warn" size="mini" @click="allIn">全部转出</button>  
        </view>  
	
      <view class="example">  	  
        <!-- 自定义表单校验 -->  
        <uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">  
          <uni-forms-item label="转账金额" required name="money" label-width="40" >  
            <uni-easyinput v-model="customFormData.money"  style="margin-left: 29rpx; width: 510rpx;" placeholder="请输入转账金额" />  
          </uni-forms-item>  
          <uni-forms-item label="收款人姓名" required name="name" label-width="40">  
            <uni-easyinput v-model="customFormData.name"     placeholder="请输入收款人姓名" />  
          </uni-forms-item>  
          <uni-forms-item label="收款账号" required name="moneyid" label-width="40">  
            <uni-easyinput v-model="customFormData.moneyid" style="margin-left: 29rpx; width: 510rpx;"   placeholder="请输入收款账号" />  
          </uni-forms-item>  
          <uni-forms-item label="附言" name="write" label-width="40" style="margin-left: 14rpx;">  
            <uni-easyinput v-model="customFormData.write" style="margin-left: 85rpx; width: 510rpx;"   placeholder="请输入附言" />  
          </uni-forms-item>  
        </uni-forms>  
        <button class="next" type="warn" @click="submit('customForm')">提交</button>  
      </view>  
    </uni-section>  
  </view>  
</template>
<script>
	export default {
		data() {
			return {				
				balance: '',	
				cardNumber: '',
				cardId: '',
				that:'',
	            balance2: '',
				// 自定义表单数据
				customFormData: {
					money: '',
					name: '',
					moneyid: '',
					write: '',		
				},
				// 自定义表单校验规则
				customRules: {
					money: {
						rules: [{
							required: true,
							errorMessage: '转账金额不能为空'
						},{
							format: "number",
							errorMessage: '请输入数字'
						}]
					},
					name: {
						rules: [{
							required: true,
							errorMessage: '收款人姓名不能为空'
						},{
							format: "string",
							errorMessage: '请输入正确的姓名'
						}]
					},
					moneyid: {
						rules: [{
							required: true,
							errorMessage: '收款账号不能为空'
						},
						{
							format: "string",
							errorMessage: '请输入正确的收款账号'
						}]
					},
					write: {
						rules: [{
							required: false,
							errorMessage: ''
						}]
					},
				},	
			}
		},
		   
		methods: {
					choose() {
						uni.navigateTo({
							url: '/pages/transferCloose/transferCloose'
						});

					},
					allIn() {
						this.customFormData.money=this.balance;
					},
					onClickItem(e) {
						   console.log(e);
						   this.current = e.currentIndex;
					},
					del(id) {
						   let index = this.dynamicLists.findIndex(v => v.id === id);
						   this.dynamicLists.splice(index, 1);
					},									
					submit(ref) {
						this.$refs[ref].validate().then(res => {
							
						    console.log('success', res);
												
		
							let transferData = {  
							  Amount: res.money,  
							  receiverName: res.name,  
							  receiverCardNumber: res.moneyid,  
							  postscript: res.write,  
							};  
							  
							uni.setStorageSync('transfer', transferData);//把数据存入缓存
							
							
							const temp=uni.getStorageSync('transfer');	
							console.log(res.money);
							console.log(temp);		
																																																		
																																																		
							uni.navigateTo({
								url:'/pages/transferConfirm/transferConfirm'
							})																																											
																																																		
																																																		
							}).catch(err => {
						console.log('err', err);
						})					 						 																																							
					},
				},
				
				onLoad() {
				   let balance;
				   let cardNumber;
				   const cardId=uni.getStorageSync('tranferCardId');	
				   console.log( );
				   let that = this;
				   uni.request({  	
				     url: 'https://120.55.37.93/query/singleCard?cardId='+cardId,  
	
					 header:{
						 "token": uni.getStorageSync('token'),
					 },
				     success: (res) => {  
					 //  console.log(res);
					   balance=res.data.data.balance;
					   cardNumber=res.data.data.cardNumber;
					   that.balance = balance;   
					   that.cardNumber = cardNumber;  
					   uni.setStorageSync('transferNumberOut', this.cardNumber);
					   console.log(this.cardNumber);
					   let value=that.balance.toFixed(2);
					   that.balance2=value;	
				     }  	
				   }); 		
					  
				 },
				 
					 
					 
	}
</script>
<style>
	.example {
		padding: 15px;
		background-color: #fff;
	}
	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-right: 10px;
		 border-radius: 30rpx; 
	}
	.mini-button {
		display: flex;
		align-items: center;
		font-size: 19rpx;
		width:77px;
		height: 23px;
		margin-right: 10px;
	} 
	.balance
	{
		font-size: 16px;
		width: 400px;
		font-weight: bold;
		
	}
	.transferNumber
	{
		font-weight: bold;
	}
	.next
	{
		 border-radius: 30rpx; 
	}
	
</style>


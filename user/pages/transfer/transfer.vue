<template>
	
	<view class="container">

			<text >付款账户：00000000000000</text>
	
		
			<uni-section title="">
			<view class="example">
				<text size="50">可用余额：0        </text>
				<button class="mini-button" type="primary" size="mini">全部转出</button>
				<!-- 自定义表单校验 -->
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item label="转账金额" required name="money">
						<uni-easyinput v-model="customFormData.money" placeholder="请输入转账金额" />
					</uni-forms-item>
					<uni-forms-item label="收款人姓名" required name="name">
						<uni-easyinput v-model="customFormData.name" placeholder="请输入收款人姓名" />
					</uni-forms-item>
					<uni-forms-item label="收款账号" required name="moneyid">
						<uni-easyinput v-model="customFormData.moneyid" placeholder="请输入收款账号" />
					</uni-forms-item>
					<uni-forms-item label="附言" name="write">
						<uni-easyinput v-model="customFormData.write" placeholder="请输入附言" />
					</uni-forms-item>
					
				</uni-forms>
				<button class="next" type="primary" @click="submit('customForm')">提交</button>
			</view>
		</uni-section>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				
				
				
				// 自定义表单数据
				customFormData: {
					money: '',
					name: '',
					moneyid: '',
					write: ''
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
							format: "number",
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
					onClickItem(e) {
						console.log(e);
						this.current = e.currentIndex
					},
					del(id) {
						let index = this.dynamicLists.findIndex(v => v.id === id)
						this.dynamicLists.splice(index, 1)
					},
					submit(ref) {
						this.$refs[ref].validate().then(res => {
							console.log('success', res);
							uni.showToast({
								title: `校验通过`
							})
						}).catch(err => {
							console.log('err', err);
						})
					},
				}

		
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
	} 
	.mini-button {
		align-items: center;
		height: 29px;
		margin-left: 175px;
	} 
	
</style>


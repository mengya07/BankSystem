<template>
	<view>
		<uv-form style="margin-top: 20rpx;" :model="model1" :rules="rule1" ref="form1">
			<uv-form-item label="金额" style="background-color: white;" prop="balance" ref="item1">
				<uv-input border="none" v-model="model1.balance"></uv-input>
			</uv-form-item>
			<uv-form-item label="理由" style="background-color: white;" prop="reason" ref="item1">
				<uv-input border="none" v-model="model1.reason"></uv-input>
			</uv-form-item>
		</uv-form>
		<view>
			<button @click="returnPage">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model1: {
					balance: '',
					reason: '',
				},
				
				rule1: {
					'balance' : {
						type: 'number',
						required: true,
						trigger: ['change' ],
						message: '请输入有效数字',
					},
						
				},
			}
		},
		methods: {
			returnPage() {
				let that = this
				uni.navigateTo({
					url:"/pages/QRcode/QRcode",
					success: function(res){
						res.eventChannel.emit('qr',{
						'balance': that.model1.balance,
						'reason': that.model1.reason,
					})
				}
			})
			}
		},
		
		onReady() {
			this.$refs.form1.setRules(this.rule1)
		},
	}
</script>

<style lang="scss">

</style>

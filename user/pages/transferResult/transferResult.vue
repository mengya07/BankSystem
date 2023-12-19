<template>
	<view>
		<view>
		<uni-section>
					<uni-card padding="0" isFull="true" spacing="0">
						<template v-slot:cover>
							<view class="custom-cover">
							
								<view class="cover-content">
								<text>1.00元交易成功<br></text>
								<text>预计10秒内到账，具体时间取决于对方银行</text>
								</view>
							</view>
						</template>
						<uni-list>
							<uni-list-item title="付款后可用余额" ></uni-list-item>
							<uni-list-item title="付款账户" ></uni-list-item>
							<uni-list-item title="收款人名称" ></uni-list-item>
							<uni-list-item title="收款账号" ></uni-list-item>
							<uni-list-item title="收款银行" ></uni-list-item>
							<uni-list-item title="转账方式" ></uni-list-item>
							<uni-list-item title="交易序号" ></uni-list-item>
						</uni-list>			
					</uni-card>
				</uni-section>
				</view>
				
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
			
			
		}
	}
</script>

<style>

</style>

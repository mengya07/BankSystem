<template>
	<view v-for="transferRecode in transferRecodes">
		<view style="text-align: center;">
			<text>{{transferDate}}</text>
		</view>
		<view style="width: 700rpx;; margin-left: 20rpx; margin-bottom: 20rpx; background-color: white;" >
			<text style="font-weight: bold; margin-left: 20rpx;">借记卡动账提醒</text>
			<view style="text-align: center; margin-top: 20rpx;">
				<text>交易金额（人民币)</text>
			</view>
			<view style="text-align: center;">
				<text style="font-size: 60%; padding: 5px; color: #34ffc6; vertical-align: 30%; border-radius: 3px; background-color: #bdffed;">{{stage}}</text>
				<text style="font-size: 120%;">{{num}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">尊敬的用户：</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">您尾号为{{transferRecode.tailNumber}}的中国银行账户发生了一笔动账交易</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易时间：{{transferRecode.transferDate}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易类型：{{transferRecode.transferType}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">动账类型：{{transferRecode.movingAccountTpye}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易金额：{{transferRecode.transferNum}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">对方账户：{{transferRecode.otherAccount}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易渠道：{{transferRecode.tradeChannel}}</text>
			</view>
		</view>
	</view>
	
	
	<view v-for="receiptRecode in receiptRecodes">
		<view style="text-align: center;">
			<text>{{transferDate}}</text>
		</view>
		<view style="width: 700rpx;; margin-left: 20rpx; margin-bottom: 20rpx; background-color: white;" >
			<text style="font-weight: bold; margin-left: 20rpx;">借记卡动账提醒</text>
			<view style="text-align: center; margin-top: 20rpx;">
				<text>交易金额（人民币)</text>
			</view>
			<view style="text-align: center;">
				<text style="font-size: 60%; padding: 5px; color: #ff1e2d; vertical-align: 30%; border-radius: 3px; background-color: #ffb0b2;">{{stage}}</text>
				<text style="font-size: 120%;">{{num}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">尊敬的用户：</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">您尾号为{{receiptRecode.tailNumber}}的中国银行账户发生了一笔动账交易</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易时间：{{receiptRecode.transferDate}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易类型：{{receiptRecode.transferType}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">动账类型：{{receiptRecode.movingAccountTpye}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易金额：{{receiptRecode.transferNum}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">对方账户：{{receiptRecode.otherAccount}}</text>
			</view>
			<view>
				<text style="margin-left: 20rpx;">交易渠道：{{receiptRecode.tradeChannel}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				transferDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
				stage: "支出",
				num: "123.50",
				tailNumber: '1234',
				receiptRecodes:[
					{
						tailtailNumber: '1234',
						transferDate: '2023/1/1',
						transferType: '网上快捷支付',
						movingAccountTpye: '收入',
						transferNum: '人民币10.00',
						otherAccount: '123',
						tradeChannel: '1',
					},
					{
						tailtailNumber: '1234',
						transferDate: '2023/1/1',
						transferType: '网上快捷支付',
						movingAccountTpye: '收入',
						transferNum: '人民币10.00',
						otherAccount: '123',
						tradeChannel: '2',
					},
					{
						tailtailNumber: '1234',
						transferDate: '2023/1/1',
						transferType: '网上快捷支付',
						movingAccountTpye: '收入',
						transferNum: '人民币10.00',
						otherAccount: '123',
						tradeChannel: '3',
					},
					
				],
				
		        transferRecodes: [
					{
						tailtailNumber: '1234',
						transferDate: '2023/1/1',
						transferType: '网上快捷支付',
						movingAccountTpye: '支出',
						transferNum: '人民币10.00',
						otherAccount: '123',
						tradeChannel: '4',
					},
					{
						tailtailNumber: '1234',
						transferDate: '2023/1/1',
						transferType: '网上快捷支付',
						movingAccountTpye: '支出',
						transferNum: '人民币10.00',
						otherAccount: '123',
						tradeChannel: '5',
					},
					{
						tailtailNumber: '1234',
						transferDate: '2023/1/1',
						transferType: '网上快捷支付',
						movingAccountTpye: '支出',
						transferNum: '人民币10.00',
						otherAccount: '123',
						tradeChannel: '6',
					},
				],
			};
		}
	}
</script>

<style lang="scss">
	
</style>

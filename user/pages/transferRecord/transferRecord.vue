<template>
	<view>
		<view class="screen-button-box">
			<view class="column1">近{{textScreenDate}}查询结果</view>
			<view class="column2" @click="openScreen">
				<text>筛选</text>
				<uv-icon name="/static/icon/icon_screen.svg" size=22></uv-icon>
			</view>
		</view>
		
		<view class="record-box">
			<view v-for="(item,index) in recordItem" :key="index" class="record-item">
				<view class="column1">
					余额{{item.balance}}
				</view>
				<view class="column2">
					<view>{{item.otherName}}</view>
					<view>{{item.amount}}</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="right" background-color="#ffffff">
			<view><text style="margin-right: 20rpx; display: flex; justify-content: flex-end; color: red;padding-left: 500rpx;font-weight: bold;" @click="cancel">取消</text></view>
			<view style="font-weight: bold;margin-left: 20rpx; margin-top: 20rpx;">交易日期</view>
			<view style="margin-top: 20rpx; display: flex; justify-content: space-between;">
				<view><uni-datetime-picker v-model="dateStart" type="date" style="margin-left: 60rpx;">{{dateStart}}</uni-datetime-picker></view>
				<view>-</view>
				<view><uni-datetime-picker v-model="dateEnd" type="date" style="margin-right: 60rpx;">{{dateEnd}}</uni-datetime-picker></view>
			</view>
			<uv-divider></uv-divider>
			<view style="display: flex;justify-content: space-between;">
				<view style="margin-left: 20rpx; font-weight: bold;">付款账户</view>
				<view style="display: flex;" @click="buttonCard"><view>全部账户</view><uv-icon name="arrow-right"></uv-icon></view>
				<uv-picker ref="picker" :columns="cardPicker" @confirm="cardConfirm"></uv-picker>
			</view>
			<uv-divider></uv-divider>
			<view style="margin-top: 20rpx; display: flex; justify-content: space-between;">
				<view><text style="margin-left: 60rpx;" @click="inputStartMoney">{{moneyStart}}</text></view>
				<view>-</view>
				<view><text v-model="dateEnd" type="date" style="margin-right: 60rpx;" @click="inputEndMoney">{{moneyEnd}}</text></view>
			</view>
			<uv-divider></uv-divider>
			<view style="font-weight: bold;margin-left: 20rpx;">收款人</view>
			<uv-input placeholder="请输入收款人姓名/账号/手机号" border="bottom" inputAlign="center" v-model="payee" clearable @input="inputPayee"></uv-input>
			<view style="font-weight: bold;margin-left: 20rpx; margin-top: 30rpx;">交易状态</view>
			<view style="display: flex;justify-content: space-between;">
				<view style="width: 100rpx;"><uv-button type="primary" :plain="true" text="全部"></uv-button></view>
				<view><uv-button type="primary" :plain="true" text="交易成功"></uv-button></view>
				<view><uv-button type="primary" :plain="true" text="交易失败"></uv-button></view>
			</view>
		</uni-popup>
		<uv-keyboard ref="keyboardStart" mode="number" @change="keyboardStartChange" @backspace="startBackSpace"></uv-keyboard>
		<uv-keyboard ref="keyboardEnd" mode="number" @change="keyboardEndChange" @backspace="endBackSpace"></uv-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textScreenDate:"3个月",
				show: false,
				dateStart:new Date().getFullYear() + "-" + "01" + "-" + "01",
				dateEnd:new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
				moneyStart:"0.00",
				moneyEnd:"99999999999.99",
				payee:"",
				recordItem:[{
					date:"2023",
					amount:"12.1",
					balance:"1002.65",
					otherName:"马化腾",
				},{
					date:"2023",
					amount:"12.1",
					balance:"1002.65",
					otherName:"马化腾",
				}],
				cardItem:[{
					id:"1212123333",
					class:"朝鲜人民银行卡"
				},{
					id:"211214444",
					class:"日本人民银行卡"
				},
				{
					id:"3453455122",
					class:"美国农业银行卡"
				}],
				cardPicker:[[]]
			};
		},
		methods:{
			openScreen(){
				this.show = true
				this.$refs.popup.open()
			},
			cancel(){
				this.$refs.popup.close()
			},
			buttonCard(){
				this.cardPicker = [[]]
				this.cardItem.forEach(item=>{
					this.cardPicker[0].push(item.class+"("+item.id.slice(-4)+")")
				})
				this.$refs.picker.open()
			},
			cardConfirm(e){
				
			},
			inputStartMoney(){
				this.$refs.keyboardStart.open()
			},
			inputEndMoney(){
				this.$refs.keyboardEnd.open()
			},
			moneyNorm(val){
				
			},
			keyboardStartChange(val){
				this.moneyStart +=val
			},
			keyboardEndChange(val){
				this.moneyEnd +=val
			},
			startBackSpace(){
				if (this.moneyStart.length) this.moneyStart = this.moneyStart.substr(0, this.moneyStart.length - 1)
			},
			endBackSpace(){
				if (this.moneyEnd.length) this.moneyEnd = this.moneyEnd.substr(0, this.moneyEnd.length - 1)
			},
			inputPayee(val){
				this.payee = val
			}
		}
	}
</script>

<style lang="scss">
	.screen-button-box{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		.column1{
			margin-left: 20rpx;
		}
		.column2{
			margin-right: 20rpx;
			display: flex;
		}
	}
	.record-box{
		margin-top: 20rpx;
		.record-item{
			height: 120rpx;
			border-radius: 10rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			display: flex;
			justify-content: space-between;
			border-style: solid;
			border-color: gray;
			background-color: #FFFFFF;
			.column1{
				margin-left: 20rpx;
			}
			.column2{
				margin-right: 20rpx;
			}
		}
	}
</style>

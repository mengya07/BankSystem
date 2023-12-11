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
			<view v-for="(item,index) in recordItem" :key="index" class="record-item" @click="clickRecord(index)">
				<view class="column1">
					{{item.otherName}}
				</view>
				<view class="column2">
					<view v-if="item.class=='交易成功'" style="display: flex;">
						<uv-icon name="/static/icon/icon_success.svg"></uv-icon>
						<view>{{item.class}}</view>
					</view>
					<view v-else style="display: flex;">
						<uv-icon name="/static/icon/icon_fail.svg"></uv-icon>
						<view>{{item.class}}</view>
					</view>
					<view>{{item.date}}</view>
					<view>人民币元 {{item.amount}}</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="right" background-color="#ffffff" style="position: relative; ">
			<view><text style="margin-right: 20rpx; display: flex; justify-content: flex-end; color: red;padding-left: 500rpx;font-weight: bold;" @click="cancel">取消</text></view>
			<uv-divider></uv-divider>
			<view style="font-weight: bold;margin-left: 20rpx; margin-top: 30rpx;">交易日期</view>
			<view style="margin-top: 30rpx; display: flex; justify-content: space-between;">
				<view><uni-datetime-picker v-model="dateStart" type="date" style="margin-left: 60rpx;">{{dateStart}}</uni-datetime-picker></view>
				<view>-</view>
				<view><uni-datetime-picker v-model="dateEnd" type="date" style="margin-right: 60rpx;">{{dateEnd}}</uni-datetime-picker></view>
			</view>
			<uv-divider></uv-divider>
			<view style="display: flex;justify-content: space-between;">
				<view style="margin-left: 20rpx; font-weight: bold;">付款账户</view>
				<view style="display: flex;" @click="buttonCard"><view>{{card}}</view><uv-icon name="arrow-right"></uv-icon></view>
				<uv-picker ref="picker" :columns="cardPicker" @confirm="cardConfirm"></uv-picker>
			</view>
			<uv-divider></uv-divider>
			<view style="margin-top: 30rpx; display: flex; justify-content: space-between;">
				<view><text style="margin-left: 60rpx;" @click="inputStartMoney">{{moneyStart}}</text></view>
				<view>-</view>
				<view><text v-model="dateEnd" type="date" style="margin-right: 60rpx;" @click="inputEndMoney">{{moneyEnd}}</text></view>
			</view>
			<uv-divider></uv-divider>
			<view style="font-weight: bold;margin-left: 20rpx; margin-bottom: 20rpx;">收款人</view>
			<uv-input placeholder="请输入收款人姓名/账号/手机号" border="bottom" inputAlign="center" v-model="payee" clearable @input="inputPayee"></uv-input>
			<view style="font-weight: bold;margin-left: 20rpx; margin-top: 30rpx;">交易状态</view>
			<view style="display: flex;justify-content: space-between; margin-top: 30rpx;">
				<view><button type="primary" :class="selectedAll?'selected':'unselected'" @click="selectAll" style="margin-left: 20rpx;">全部</button></view>
				<view><button type="primary" :class="selectedScc?'selected':'unselected'" @click="selectScc">交易成功</button></view>
				<view><button type="primary" :class="selectedFail?'selected':'unselected'" @click="selectFail" style="margin-right: 20rpx;">交易失败</button></view>
			</view>
			<view style="position: absolute; bottom: 0; display: flex; justify-content: space-between;">
				<button type="primary" class="resetButton" @click="clickReset">重置</button>
				<button type="primary" class="confirmButton" @click="clickConfirm">确认</button>
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
				card:"全部账户",
				payee:"",
				selectedAll: true,
				selectedScc: false,
				selectedFail:false,
				recordItem:[{
					id:"4561586478",
					date:"2023/10/22 14:31:54",
					amount:"12.1",
					balance:"1002.65",
					name:"金正恩",
					account:"12346846513",
					otherName:"马化腾",
					otherAccount:"464861534165",
					class:"交易成功"
				},{
					id:"4561586478",
					date:"2023/10/22 14:31:54",
					amount:"12.1",
					balance:"1002.65",
					name:"金正恩",
					account:"12346846513",
					otherName:"马化腾",
					otherAccount:"464861534165",
					class:"交易失败"
				}],
				cardItem:[{
					id:"",
					class:"全部账户"
				},{
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
			clickRecord(index){
				let that = this
				uni.navigateTo({
					url:"/pages/recordDetail/recordDetail",
					success: function(res){
						res.eventChannel.emit('acceptDataFromOpenerPage', that.recordItem[index])
					}
				})
			},
			openScreen(){
				this.show = true
				this.$refs.popup.open()
			},
			cancel(){
				this.$refs.popup.close()
			},
			buttonCard(){
				this.cardPicker = [[]]
				let index = 0
				this.cardItem.forEach(item=>{
					if(index)this.cardPicker[0].push(item.class+"("+item.id.slice(-4)+")")
					else this.cardPicker[0].push(item.class)
					index++
				})
				this.$refs.picker.open()
			},
			cardConfirm(e){
				this.card = e.value[0]
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
			},
			selectAll(){
				this.selectedAll=true;this.selectedScc=false;this.selectedFail=false;
			},
			selectScc(){
				this.selectedAll=false;this.selectedScc=true;this.selectedFail=false;
			},
			selectFail(){
				this.selectedAll=false;this.selectedScc=false;this.selectedFail=true;
			},
			clickReset(){
				this.$refs.popup.close();
			},
			clickConfirm(){
				//保存筛选条件
				this.$refs.popup.close();
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
			background-color: #FFFFFF;
			border-style: solid;
			border-width: 2px;
			border-color: silver;
			padding: 10rpx;
			.column1{
				margin-left: 20rpx;
			}
			.column2{
				margin-right: 20rpx;
			}
		}
	}
	.unselected{
		width: 170rpx;
		height: 70rpx;
		background-color: #F4F4F4;
		color: black;
		border-radius: 10rpx;
		font-size: 0.85em;
	}
	.selected{
		width: 170rpx;
		height: 70rpx;
		background-color: #FCECEC;
		color: red;
		border-radius: 10rpx;
		border-style: none;
		font-size: 0.85em;
		font-weight: bold;
	}
	.confirmButton{
		width: 300rpx;
		height: 80rpx;
		background-color: red;
		color: white;
        font-size: 0.98em;
	}
	.resetButton{
		width: 300rpx;
		height: 80rpx;
		background-color: white;
		color: red;
		font-size: 0.98em;
	}
</style>

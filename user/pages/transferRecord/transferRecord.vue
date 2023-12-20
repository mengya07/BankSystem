<template>
	<view>
		<view class="screen-button-box">
			<view class="column1">查询结果</view>
			<view class="column2" @click="openScreen">
				<text>筛选</text>
				<uv-icon name="/static/icon/icon_screen.svg" size=22></uv-icon>
			</view>
		</view>
		
		<scroll-view v-if="recordItem.length > 0" scroll-y="true" @scrolltolower="loadMore()" :style="{ height: getScrollHeight + 'rpx' }">
		<view class="record-box">
			<view v-for="(item,index) in recordItem" :key="index" class="record-item" @click="clickRecord(index)">
				<view class="column1">
					{{item.name}}
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
		</scroll-view>
		
		<uni-popup ref="popup" type="right" background-color="#ffffff" style="position: relative; ">
			<view><text style="margin-right: 20rpx; display: flex; justify-content: flex-end; color: red;padding-left: 500rpx;font-weight: bold;" @click="cancel">取消</text></view>
			<uv-divider></uv-divider>
			<view style="font-weight: bold;margin-left: 20rpx; margin-top: 30rpx;">交易日期</view>
			<view style="margin-top: 30rpx; display: flex; justify-content: space-around;">
				<button :class="selectedDate==1?'date-selected':'date-unselected'" @click="clickOneWeek">近1周</button>
				<button :class="selectedDate==2?'date-selected':'date-unselected'" @click="clickOneMonth">近1月</button>
				<button :class="selectedDate==3?'date-selected':'date-unselected'" @click="clickThreeMonth">近3月</button>
			</view>
			<view style="margin-top: 30rpx; display: flex; justify-content: space-between;">
				<view><uni-datetime-picker v-model="dateStart" type="date" @change="dateStartChange" style="margin-left: 60rpx;">{{dateStart}}</uni-datetime-picker></view>
				<view>-</view>
				<view><uni-datetime-picker v-model="dateEnd" type="date" @change="dateEndChange" style="margin-right: 60rpx;">{{dateEnd}}</uni-datetime-picker></view>
			</view>
			<uv-divider></uv-divider>
			<view style="display: flex;justify-content: space-between;">
				<view style="margin-left: 20rpx; font-weight: bold;">付款账户</view>
				<view style="display: flex;" @click="buttonCard"><view>{{cardText}}</view><uv-icon name="arrow-right"></uv-icon></view>
				<uv-picker ref="picker" :columns="cardPicker" @confirm="cardConfirm"></uv-picker>
			</view>
			<uv-divider></uv-divider>
			<view style="margin-top: 30rpx; display: flex; justify-content: space-between;">
				<view><text style="margin-left: 60rpx;" @click="inputStartMoney">{{moneyStart}}</text></view>
				<view>-</view>
				<view><text style="margin-right: 60rpx;" @click="inputEndMoney">{{moneyEnd}}</text></view>
			</view>
			<uv-divider></uv-divider>
			<view style="font-weight: bold;margin-left: 20rpx; margin-bottom: 20rpx;">收款人</view>
			<uv-input placeholder="请输入收款人姓名/账号/手机号" border="bottom" inputAlign="center" v-model="payee" clearable @input="inputPayee"></uv-input>
			<view style="font-weight: bold;margin-left: 20rpx; margin-top: 30rpx;">交易状态</view>
			<view style="display: flex;justify-content: space-between; margin-top: 30rpx;">
				<view><button  :class="selectedAll?'bottom-selected':'bottom-unselected'" @click="selectAll" style="margin-left: 20rpx;">全部</button></view>
				<view><button  :class="selectedScc?'bottom-selected':'bottom-unselected'" @click="selectScc">交易成功</button></view>
				<view><button  :class="selectedFail?'bottom-selected':'bottom-unselected'" @click="selectFail" style="margin-right: 20rpx;">交易失败</button></view>
			</view>
			<view style="position: absolute; bottom: 0; display: flex; justify-content: space-between;">
				<button  class="resetButton" @click="clickReset">重置</button>
				<button  class="confirmButton" @click="clickConfirm">确认</button>
			</view>
		</uni-popup>
		<uv-keyboard ref="keyboardStart" mode="number" :showCancel="false" :closeOnClickOverlay="false" @change="keyboardStartChange" @backspace="startBackSpace" @confirm="startMoneyNorm"></uv-keyboard>
		<uv-keyboard ref="keyboardEnd" mode="number"  :showCancel="false" :closeOnClickOverlay="false" @change="keyboardEndChange" @backspace="endBackSpace" @confirm="endMoneyNorm"></uv-keyboard>
	</view>
</template>

<script>
import { date } from '../../uni_modules/uv-ui-tools/libs/function/test';
	export default {
		data() {
			return {
				pageNum:0,
				pageSize:15,
				show: false,
				selectedDate:1, //约定1为近一周，2为一个月，3为三个月
				dateStart:"",
				dateEnd:"",
				moneyStart:"0.00",
				moneyEnd:"99999999999.99",
				cardText:"全部账户",
				cardId:0,
				payee:"",
				selectedAll: true,
				selectedScc: false,
				selectedFail:false,
				recordItem:[
					{
					id:-1,
					date:"2023/10/22 14:31:54",
					amount:"12.1",
					balance:"1002.65",
					name:"金正恩",
					account:"12346846513",
					otherName:"马化腾",
					otherAccount:"464861534165",
					class:"交易成功"
				},
				{
					id:-1,
					date:"2023/10/22",
					amount:"199999999",
					balance:"1002.65",
					name:"金正恩",
					account:"12346846513",
					otherName:"马化腾",
					otherAccount:"464861534165",
					class:"交易成功"
				}
				],
				cardItem:[{
					account:"",
					class:"全部账户",
					id:0
				}],
				cardPicker:[[]]
			};
		},
		computed:{
			currentDate: function(){
				let date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
				const [year, month, day] = date.split('-')
				const formattedMonth = month < 10 ? '0' + month : month
				const formattedDay = day < 10 ? '0' + day : day
				return `${year}-${formattedMonth}-${formattedDay}`
			},
			
			defaultDateStart: function(){
				const [year, month, day] = this.currentDate.split('-')
				const date = new Date(year, month - 1, day); // 注意月份是从0开始的，所以减1
				const oneWeekAgo = new Date(date.setDate(date.getDate() - 7));  
				//year: oneWeekAgo.getFullYear()
				//month: oneWeekAgo.getMonth() + 1 // 返回的时候记得加1  
				//day: oneWeekAgo.getDate()
				return oneWeekAgo.getFullYear() + "-" + (oneWeekAgo.getMonth() + 1) + "-" + oneWeekAgo.getDate()
			},
			
			payeeName: function(){
				return isNaN(this.payee) ? this.payee : null
			},
			payeePhone: function(){
				return isNaN(this.payee) ? null : this.payee
			},
			status: function(){
				if(selectedAll)return "2"
				else if(selectedScc) return "1"
				else return "0"
			}
		},
		methods:{
			getScrollHeight() {
			  let sys = uni.getSystemInfoSync()
			  let winWidth = sys.windowWidth
			  let winrate = 750 / winWidth
			  let winHeight = parseInt(sys.windowHeight * winrate)
			  return winHeight - 20
			},
			loadMore(){
				this.page++
				console.log(this.page)
				this.requestTransferRecord()
			},
			requestTransferRecord(){
				let that = this
				uni.getStorage({
					key: 'token',
					success: function (res) {
						console.log(res.data)
						let _token = res.data
						uni.showLoading({
							title: "",
							mask: true
						})
						uni.request({
								  url: 'http://vpqs7u.natappfree.cc/query/transferRecord?pageNum='+ that.pageNum + '&pageSize=' + that.pageSize,  
								  method: 'POST',  
								  header: {  
									'token': _token
								  },
								  data:{
									"startDate":that.dateStart,
									"endDate":that.dateEnd,
									"cardId":that.cardId,
									"miniAmount":that.moneyStart,
									"maxAmount":that.moneyEnd,
									"payeeName":that.payeeName,
									//"payeePhoneNumber":this.payeePhone,
									"status":this.status,
								  },
								  success: function (res) {
									console.log(res)
									res.data.data.list.forEach(item=>{
										let temp = {"name":"","amount":"","date":"","class":""}
										temp.name = item.payerName
										temp.amount = item.transferAmount
										temp.date = item.transferTime
										temp.class = item.statusComments
										that.recordItem.push(temp)
									})
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
			},
			requestCard(){
				let that = this
				uni.getStorage({
					key: 'token',
					success: function (res) {
						console.log(res.data)
						let _token = res.data
						uni.showLoading({
							title: "",
							mask: true
						})
						uni.request({
								  url: 'http://vpqs7u.natappfree.cc/query/bankCard',  
								  method: 'GET',
								  header: {  
									'token': _token
								  },
								  data:{
								  },
								  success: function (res) {
									console.log(res)
									res.data.data.forEach(item=>{
										let temp = {account:"",id:"",class:"借记卡"}
										temp.account = item.cardNumber
										//temp.balance = item.balance
										//temp.id = item.id
										that.cardItem.push(temp)
									})
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
			},
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
			clickOneWeek(){
				this.selectedDate = 1
				this.dateEnd = this.currentDate
				var date = new Date(this.dateEnd)
				date.setDate(date.getDate() - 7) 
				this.dateStart = date.toISOString().slice(0, 10)
			},
			clickOneMonth(){
				this.selectedDate = 2
				this.dateEnd = this.currentDate
				var date = new Date(this.dateEnd)
				date.setMonth(date.getMonth() - 1)
				this.dateStart = date.toISOString().slice(0, 10)
			},
			clickThreeMonth(){
				this.selectedDate = 3
				this.dateEnd = this.currentDate
				var date = new Date(this.dateEnd) 
				date.setMonth(date.getMonth() - 3)
				this.dateStart = date.toISOString().slice(0, 10)
			},
			buttonCard(){
				this.cardPicker = [[]]
				let index = 0
				this.cardItem.forEach(item=>{
					if(index)this.cardPicker[0].push(item.class+"("+item.account.slice(-4)+")")
					else this.cardPicker[0].push(item.class)
					index++
				})
				this.$refs.picker.open()
			},
			cardConfirm(e){
				this.cardText = e.value[0]
				this.cardId = this.cardItem[e.indexs[0]].id
			},
			dateStartChange(e){
				if(this.dateStart > this.dateEnd){
					uni.showToast({
						title:"日期范围有误",
						icon:"error"
					})
					this.dateStart = this.defaultDateStart
				}
			},
			dateEndChange(e){
				if(this.dateEnd > this.currentDate){
					uni.showToast({
						title:"超过当前日期",
						icon:"error"
					})
					this.dateEnd = this.currentDate
				}
			},
			inputStartMoney(){
				this.$refs.keyboardStart.open()
			},
			inputEndMoney(){
				this.$refs.keyboardEnd.open()
			},
			startMoneyNorm(){
				this.moneyStart = parseFloat(this.moneyStart).toFixed(2)
			},
			endMoneyNorm(){
				this.moneyEnd = parseFloat(this.moneyEnd).toFixed(2)
			},
			moneyInPut(obj){
				if(obj.s==""&&obj.val=='.'){
					obj.s = "0."
				}
				if(obj.s=="0"&&obj.val!='.'){}
				else{
					if(obj.s.includes('.')){
						var match = obj.s.match(/\.\d*$/);   
						let num = match ? match[0].length - 1 : 0; 
						if(obj.val=='.'){}
						else if(num==2){}
						else obj.s += obj.val
					}
					else obj.s += obj.val
				}
				return obj.s
			},
			keyboardStartChange(val){
				let obj = {"s":this.moneyStart,"val":val}
				this.moneyInPut(obj)
				this.moneyStart = obj.s
			},
			keyboardEndChange(val){
				let obj = {"s":this.moneyEnd,"val":val}
				this.moneyInPut(obj)
				this.moneyEnd = obj.s
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
				//日期重置
				this.dateStart = this.defaultDateStart
				this.dateEnd = this.currentDate
				//金额重置
				this.moneyStart = "0.00"
				this.moneyEnd = "99999999999.99"
				this.selectAll()
				this.selectedDate = 1
			},
			clickConfirm(){
				let that = this
				this.requestTransferRecord()
				this.$refs.popup.close();
			}
		},
		onLoad() {
			this.dateEnd = this.currentDate
			this.dateStart = this.defaultDateStart
			//查有什么卡
			this.requestCard()
			//按照默认条件查一次
			this.requestTransferRecord()
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
	.date-unselected{
		width: 170rpx;
		height: 70rpx;
		background-color: #F4F4F4;
		color: black;
		border-radius: 10rpx;
		font-size: 0.85em;
	}
	.date-selected{
		width: 170rpx;
		height: 70rpx;
		background-color: #FCECEC;
		color: red;
		border-radius: 10rpx;
		border-style: none;
		font-size: 0.85em;
		font-weight: bold;
	}
	.record-box{
		margin-top: 20rpx;
		.record-item{
			margin: 15rpx;
			height: 120rpx;
			border-radius: 10rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			display: flex;
			justify-content: space-between;
			background-color: #FFFFFF;
			// border-style: solid;
			// border-width: 2px;
			// border-color: silver;
			box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
			padding: 10rpx;
			.column1{
				margin-left: 20rpx;
			}
			.column2{
				margin-right: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
			}
		}
	}
	.bottom-unselected{
		width: 170rpx;
		height: 70rpx;
		background-color: #F4F4F4;
		color: black;
		border-radius: 10rpx;
		font-size: 0.85em;
	}
	.bottom-selected{
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

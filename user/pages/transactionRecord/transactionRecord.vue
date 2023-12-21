<template>
	<view style="display: flex; flex-direction: column; align-items: center;">
		<view class="card" @click="buttonCard">
			<view style="display: flex; height: 50%;align-items: center;">
				<uv-icon name="/static/icon/icon_card.svg" size=55 style="margin-left: 20rpx;"></uv-icon>
				<view style="display: flex;flex-direction: column;margin-left: 40rpx;">
					<view style="font-weight: bold;">{{cardAccountText}}</view>
				</view>
				<uv-icon name="arrow-right" style="margin-left: 40rpx;"></uv-icon>
			</view>
		</view>
	</view>
	<uv-picker ref="picker" :columns="cardPicker" @confirm="cardConfirm"></uv-picker>
	
	<view class="screen-button-box">
		<view class="column1">查询结果</view>
		<view class="column2" @click="openScreen">
			<text>筛选</text>
			<uv-icon name="/static/icon/icon_screen.svg" size=22></uv-icon>
		</view>
	</view>
	
	<scroll-view v-if="recordItem.length > 0" scroll-y="true" @scrolltolower="loadMore()" :style="{ height: getScrollHeight() + 'rpx' }">
	<view class="record-box">
		<view v-for="(item,index) in recordItem" :key="index" class="record-item" @click="clickRecord(index)">
			<view class="column1">
				<view>{{item.statusComments}}</view>
				<view style="margin-top: 10rpx; color: #A8A8A8; font-size: 0.8em;">余额 {{item.balance}}</view>
			</view>
			<view class="column2">
				<view style="color: #A8A8A8;">{{item.counterpartyName}}</view>
				<view style="margin-top: 10rpx; font-weight: bold; display: flex;">
					<view>人民币元</view> 
					<view :class="item.amount>=0 ? 'in' : 'out' ">{{item.amount}}</view> 
				</view>
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
		<view style="margin-top: 30rpx; display: flex; justify-content: space-between;">
			<view><text style="margin-left: 60rpx;" @click="inputStartMoney">{{moneyStart}}</text></view>
			<view>-</view>
			<view><text style="margin-right: 60rpx;" @click="inputEndMoney">{{moneyEnd}}</text></view>
		</view>
		<uv-divider></uv-divider>
		<view style="font-weight: bold;margin-left: 20rpx; margin-bottom: 20rpx;">收款人</view>
		<uv-input placeholder="请输入对方姓名/账号" border="bottom" inputAlign="center" v-model="payee" clearable @input="inputPayee"></uv-input>
		<view style="font-weight: bold;margin-left: 20rpx; margin-top: 30rpx;">交易状态</view>
        <view style="display: flex;justify-content: space-between; margin-top: 30rpx;">
        	<view><button  :class="selectedAll?'bottom-selected':'bottom-unselected'" @click="selectAll" style="margin-left: 20rpx;">全部</button></view>
        	<view><button  :class="selectedOut?'bottom-selected':'bottom-unselected'" @click="selectOut">支出</button></view>
        	<view><button  :class="selectedIn?'bottom-selected':'bottom-unselected'" @click="selectIn" style="margin-right: 20rpx;">收入</button></view>
        </view>
		
		<view style="position: absolute; bottom: 0; display: flex; justify-content: space-between;">
			<button  class="resetButton" @click="clickReset">重置</button>
			<button  class="confirmButton" @click="clickConfirm">确认</button>
		</view>
	</uni-popup>
	<uv-keyboard ref="keyboardStart" mode="number" :showCancel="false" :closeOnClickOverlay="false" @change="keyboardStartChange" @backspace="startBackSpace" @confirm="startMoneyNorm"></uv-keyboard>
	<uv-keyboard ref="keyboardEnd" mode="number"  :showCancel="false" :closeOnClickOverlay="false" @change="keyboardEndChange" @backspace="endBackSpace" @confirm="endMoneyNorm"></uv-keyboard>
	
</template>

<script>
	export default {
		data() {
			return {
				pageNum:1,
				pageSize:7,
				show: false,
				selectedDate:1, //约定1为近一周，2为一个月，3为三个月
				dateStart:"",
				dateEnd:"",
				moneyStart:"0.00",
				moneyEnd:"99999999999.99",
				cardAccountText:"",
				cardId: null,
				payee: null,
				selectedAll: true,
				selectedOut: false,
				selectedIn: false,
				cardItem:[
					// {
					// 	cardId:"",
					// 	account:"",
					//  class: "借记卡"
					// }
				],
				recordItem: [
					// {
					// 	// "transactionId": 390851114166460400,
					// 	// "counterpartyName": "邹海帆",
					// 	// "balance": null,
					// 	// "amount": -648,
					// 	// "status": 0,
					// 	// "statusComments": "转账支出"
					// }
				],
				cardPicker:[[]]
			};
		},
		computed:{
			currentDate: function(){
                return this.formattedDate(new Date().getFullYear(),new Date().getMonth() + 1,new Date().getDate())
			},
			defaultDateStart: function(){
				const [year, month, day] = this.currentDate.split('-')
				const date = new Date(year, month - 1, day)
				const oneWeekAgo = new Date(date.setDate(date.getDate() - 7)) 
				return this.formattedDate(oneWeekAgo.getFullYear(),oneWeekAgo.getMonth() + 1,oneWeekAgo.getDate())
			},
			payeeName: function(){
				return isNaN(this.payee) ? this.payee : null
			},
			payeePhone: function(){
				return isNaN(this.payee) ? null : this.payee
			},
			status: function(){
				if(this.selectedAll)return "0"
				else if(this.selectedScc) return "1"
				else return "2"
			}
		},
		methods:{
			requestTransactionRecord(){
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
								  url: 'https://120.55.37.93/query/transactionRecord?pageNum='+ that.pageNum + '&pageSize=' + that.pageSize,  
								  method: 'POST',  
								  header: {  
									'token': _token
								  },
								  data:{
									"startTime":that.dateStart + " 00:00:00",
									"endTime":that.dateEnd + " 23:59:59",
									"cardId":that.cardId,
									"miniAmount":that.moneyStart,
									"maxAmount":that.moneyEnd,
									"payeeName":that.payeeName,
									"payeePhoneNumber":this.payeePhone,
									"status":that.status,
								  },
								  success: function (res) {
									  console.log(res)
									  if(res.data.code == 200){
										  console.log(res)
										  that.totalPage = res.data.data.totalPage
										  res.data.data.list.forEach(item=>{
										  let temp = {"counterpartyName": "","transactionId": null,"balance": null,"amount": -648,"status": 0,"statusComments": "转账支出"}
										  temp.counterpartyName = item.counterpartyName
										  temp.balance = parseFloat(item.balance).toFixed(2)
										  temp.transactionId = item.transactionId
										  temp.statusComments = item.statusComments
										  temp.amount = parseFloat(item.amount).toFixed(2)
										  that.recordItem.push(temp)
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
			},
			requestCard(){
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
								  url: 'https://120.55.37.93/query/bankCard',  
								  method: 'GET',
								  header: {  
									'token': _token
								  },
								  data:{
								  },
								  success: function (res) {
									if(res.data.code ==200){
										res.data.data.forEach(item=>{
											let temp = {account:"",id:"",class:"借记卡"}
											temp.account = item.cardNumber
											temp.id = item.id
											that.cardItem.push(temp)
										})
										that.cardId = that.cardItem[0].id
										that.cardAccountText = that.cardItem[0].account
										that.requestTransactionRecord()
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
			},
			getScrollHeight() {
			  let sys = uni.getSystemInfoSync()
			  let winWidth = sys.windowWidth
			  let winrate = 750 / winWidth
			  let winHeight = parseInt(sys.windowHeight * winrate)
			  return winHeight - 20
			},
			loadMore(){
				if(this.pageNum < this.totalPage){
					this.pageNum++
					this.requestTransactionRecord()
				}
			},
			buttonCard(){
				this.cardPicker = [[]]
				let index = 0
				this.cardItem.forEach(item=>{
					this.cardPicker[0].push(item.class+"("+item.account.slice(-4)+")")
					index++
				})
				this.$refs.picker.open()
			},
			cardConfirm(e){
				this.cardId = this.cardItem[e.indexs[0]].id
				this.cardAccountText = this.cardItem[e.indexs[0]].account
			},
			clickRecord(index){
				let that = this
				uni.navigateTo({
					url:"/pages/transactionDetail/transactionDetail?transactionId=" + that.recordItem[index].transactionId,
				})
			},
			openScreen(){
				this.show = true
				this.$refs.popup.open()
			},
			cancel(){
				this.$refs.popup.close()
			},
			formattedDate(year,month,day){
				const formattedMonth = month < 10 ? '0' + month : month
				const formattedDay = day < 10 ? '0' + day : day
				return `${year}-${formattedMonth}-${formattedDay}`
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
				if(this.dateStart > this.dateEnd){
					uni.showToast({
						title:"日期范围有误",
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
				this.selectedAll=true;this.selectedOut=false;this.selectedIn=false;
			},
			selectOut(){
				this.selectedAll=false;this.selectedOut=true;this.selectedIn=false;
			},
			selectIn(){
				this.selectedAll=false;this.selectedOut=false;this.selectedIn=true;
			},
			clickReset(){
				this.dateStart = this.defaultDateStart
				this.dateEnd = this.currentDate
				this.selectedDate = 1
				this.moneyStart = "0.00"
				this.moneyEnd = "99999999999.99"
				this.payee = null
				this.selectAll()
			},
			clickConfirm(){
				let that = this
				this.pageNum = 1
				this.recordItem = []
				this.requestTransactionRecord()
				this.$refs.popup.close();
			}
		},
		onLoad() {
			this.dateEnd = this.currentDate
			this.dateStart = this.defaultDateStart
			this.requestCard()
			//this.requestTransactionRecord()
		}
	}
</script>

<style lang="scss">
	.card{
		margin-top: 20rpx;
		width: 650rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		background-color: #ffffff;
	}
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
			margin: 15rpx;
			height: 120rpx;
			border-radius: 10rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
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
				.out{
					font-weight: bold;
					margin-left: 10rpx;
					color: green;
				}
				.in{
					font-weight: bold;
					margin-left: 10rpx;
					color: red;
				}
			}
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

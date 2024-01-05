<template>
	<view class="box">
		<view v-for="(item,index) in record" :key="index" :class="itemClass(item)">
			<view class="row1">
				<text class="text1">{{item.yearMonth.split("-")[1]}}</text>
				<text>月/{{month.get(item.yearMonth.split("-")[1])}}</text>
			</view>
			<view class="row2">
				<view>
					<view>收入</view><view>￥{{parseFloat(item.income).toFixed(2)}}</view>
				</view>
				<view class="col2">
					<view>支出</view><view>￥{{parseFloat(item.outcome).toFixed(2)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				record: [
					// {
					// 	"yearMonth": "2023-2",
					// 	"outcome": "1993",
					// 	"income": "2558",
					// },
					// {
					// 	"yearMonth": "2023-3",
					// 	"outcome": "1993",
					// 	"income": "2558",
					// },
					// {
					// 	"yearMonth": "2023-4",
					// 	"outcome": "1993",
					// 	"income": "2558",
					// },
					// {
					// 	"yearMonth": "2023-5",
					// 	"outcome": "1993",
					// 	"income": "2558",
					// },
					// {
					// 	"yearMonth": "2023-6",
					// 	"outcome": "1993",
					// 	"income": "2558",
					// },
					// {
					// 	"yearMonth": "2023-7",
					// 	"outcome": "1993",
					// 	"income": "2558",
					// },
					// {
					// 	"yearMonth": "2023-8",
					// 	"outcome": "1993",
					// 	"income": "2558",
					// },
				],
				month: new Map([
					["1","Jan"],
					["2","Feb"],
					["3","Mar"],
					["4","Apr"],
					["5","May"],
					["6","Jun"],
					["7","Jul"],
					["8","Aug"],
					["9","Sept"],
					["10","Oct"],
					["11","Nov"],
					["12","Dec"]
				]) ,
			};
		},
		methods:{
			itemClass(item) {  
			  // 根据数据映射类名  
			  switch (item.yearMonth.split("-")[1]) {  
				case '01':  
				  return 'card-box01';  
				case '02':  
				  return 'card-box02';  
				case '03':  
				  return 'card-box03';
			    case '04':
				  return 'card-box04';
			    case '05':
				  return 'card-box05';
				case '06':
				  return 'card-box06';
			    case '07':
				 return 'card-box07';
				case '08':
				  return 'card-box08';
				case '09':
				  return 'card-box09';
				case '10':
				  return 'card-box10';
				case '11':
				  return 'card-box11';
				case '12':
				  return 'card-box12';
				default:  
				  return '';  
				}
			},
		},
		onLoad() {
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
							  url: 'https://120.55.37.93/query/monthlycheck',  
							  method: 'POST',
							  header: {  
								'token': _token
							  },
							  success: function (res) {
								  if(res.data.code ==200){
									  res.data.data.forEach(item=>{
									  	let temp = {yearMonth:"",outcome:"",income:""}
									  	temp.yearMonth = item.yearMonth
									  	temp.outcome = item.outcome
									  	temp.income= item.income
									  	that.record.push(temp)
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
		}
	}
</script>

<style lang="scss">
	.box{
		display: flex;
		flex-direction: column;
		align-items: center;
		.card-box01{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/1.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box01::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box02{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/2.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box02::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box03{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/3.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box03::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box04{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/4.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box04::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box05{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/5.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box05::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box06{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/6.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box06::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box07{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/7.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box07::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box08{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/8.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box08::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box09{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/9.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box09::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box10{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/10.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box10::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box11{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/11.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box11::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box12{
			margin-top: 20rpx;
			width: 680rpx;
			height: 250rpx;
			position: relative;  
			border-radius: 20upx;
			background-image: url("~@/static/image/12.png");
			background-position: center center;
		    background-size: cover;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 30rpx;
			.row1{
				position: relative;
				margin-bottom: 30rpx;
				color: #FFFFFF;
				font-weight: bold;
				.text1{
					font-size: 1.4em;
				}
			}
			.row2{
				display: flex;
				justify-content: space-between;
				position: relative;
				color: #FFFFFF;
				font-weight: bold;
				.col2{
					margin-right: 210rpx;
				}
			}
		}
		.card-box12::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
	}
</style>

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
				case '1':  
				  return 'card-box1';  
				case '2':  
				  return 'card-box2';  
				case '3':  
				  return 'card-box3';
			    case '4':
				  return 'card-box4';
			    case '5':
				  return 'card-box5';
				case '6':
				  return 'card-box6';
			    case '7':
				 return 'card-box7';
				case '8':
				  return 'card-box8';
				case '9':
				  return 'card-box9';
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
								  
								res.data.data.forEach(item=>{
									let temp = {yearMonth:"",outcome:"",income:""}
									temp.yearMonth = item.yearMonth
									temp.outcome = item.outcome
									temp.income= item.income
									that.record.push(temp)
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
		}
	}
</script>

<style lang="scss">
	.box{
		display: flex;
		flex-direction: column;
		align-items: center;
		.card-box1{
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
		.card-box1::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box2{
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
		.card-box2::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box3{
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
		.card-box3::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box4{
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
		.card-box4::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box5{
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
		.card-box5::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box6{
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
		.card-box6::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box7{
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
		.card-box7::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box8{
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
		.card-box8::before {  
		  content: '';  
		  position: absolute;  
		  top: 0;  
		  left: 0;  
		  width: 100%;  
		  height: 100%;  
		  background: inherit;  
		  filter: blur(2px);  
		}
		.card-box9{
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
		.card-box9::before {  
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

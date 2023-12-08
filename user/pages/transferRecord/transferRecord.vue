<template>
	<view>
		<view class="screen-box">
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
			<view>出淤泥而不染，濯清涟而不妖</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textScreenDate:"3个月",
				show: false,
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
				}]
			};
		},
		methods:{
			openScreen(){
				this.show = true
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="scss">
	.screen-box{
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

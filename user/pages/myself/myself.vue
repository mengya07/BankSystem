<template>
	<view>
		<view class="avatar-box">
			<view class="avatar">
				<uv-avatar src="../../static/logo.png" @click="clickAvatar"></uv-avatar>
			</view>
			<view class="text1">
				{{timePeriod}}好,name
			</view>
		</view>
		
		<uv-grid :border="false">
			<uv-grid-item v-for="(item,index) in girdList" :key="index">
				<text class="grid-text">{{item.title}}</text>
			</uv-grid-item>
		</uv-grid>
		
		<uv-list class="list" border>
		    <uv-list-item class="list-item" title="我的账户" border></uv-list-item>
		    <uv-list-item class="list-item" title="安全与设置" border></uv-list-item>
			<uv-list-item class="list-item" title="收支记录" border></uv-list-item>
			<uv-list-item class="list-item" title="关于我们" border></uv-list-item>
			<uv-list-item class="list-item" title="隐私政策" border></uv-list-item>
		</uv-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timePeriod: "下午",
				girdList:[{
					title: "账户"
				},{
					title: "交易明细"
				},{
					title: "转账"
				},{
					title: "全部"
				}]
			};
		},
		methods:{
			clickAvatar(){
				//头像设置 
			}
		}
	}
</script>

<style lang="scss">
.avatar-box{
	height: 200rpx;
	width: 100%;
	display: flex;
    align-items: center;
	justify-content: center;
	background-color: #3c9cff;
	.avatar-box.avatar{
		
	}
}
.list{
	margin-top: 60rpx;
	margin-left: 10rpx;
	margin-right: 10rpx;
	padding-left: 10rpx;
	padding-right: 10rpx;
	border-radius: 10px;
    .list-item{
		height: 120rpx;
	}
}
</style>

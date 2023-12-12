<template>
	<view>
		<uv-row class="avatar-box">
			<uv-col span="3">
				<view class="avatar">
					<uv-avatar text="狗" random-bg-color size=50></uv-avatar>
				</view>
			</uv-col>
			<uv-col span="9">
				<view class="avatar-text">
					{{timePeriod}}好，name
				</view>
			</uv-col>
		</uv-row>
		
		
		<view class="gird-box">
		<uv-grid :border="false" :col="4">
			<uv-grid-item @click="clickAccountView">
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" name="/static/icon/icon_account.svg" :size="32"></uv-icon>
				<text class="grid-text" >账户</text>
			</uv-grid-item>
			<uv-grid-item>
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" name="/static/icon/icon_record.svg" :size="32"></uv-icon>
				<text class="grid-text" >交易明细</text>
			</uv-grid-item>
			<uv-grid-item @click="clickTransferRecord">
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" name="/static/icon/icon_transfer.svg" :size="32"></uv-icon>
				<text class="grid-text" >转账记录</text>
			</uv-grid-item>
			<uv-grid-item>
				<uv-icon :customStyle="{paddingTop:20+'rpx'}" name="grid" :size="32"></uv-icon>
				<text class="grid-text" >全部</text>
			</uv-grid-item>
		</uv-grid>
		</view>
		
		<uv-list class="list" border>
		    <uv-list-item class="list-item" title="我的账户" border ></uv-list-item>
		    <uv-list-item class="list-item" title="安全与设置" border link to="/pages/securityAndSettings/securityAndSettings" @click="($event,1)"></uv-list-item>
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
			};
		},
		methods:{
			clickTransferRecord(){
				uni.navigateTo({
					url:"/pages/transferRecord/transferRecord"
				})
			},
			clickAccountView(){
				uni.navigateTo({
					url:"/pages/accountView/accountView"
				})
			}
		}
	}
</script>

<style lang="scss">
.avatar-box{
	height: 200rpx;
	width: 100%;
	background-color: #3c9cff;
	backdrop-filter: blur(16px) saturate(180%);
	-webkit-backdrop-filter: blur(16px) saturate(180%);
	border-radius: 8px;
	border: 1px solid rgba(209, 213, 219, 0.3);
	.avatar{
		margin-left: 50rpx;
	}
	.avatar-text{
		margin-left: -20rpx;
	}
}
.gird-box{
	height: 140rpx;
	margin: 10rpx;
	border-radius: 10rpx;
	background-color: #FFFFFF;
	.grid-text{
		font-size: 14px;
		color: "black";
	}
}
.list{
	margin-top: 50rpx;
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

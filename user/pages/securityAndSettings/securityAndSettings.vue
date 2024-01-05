<template>
	<view>
		<uv-list class="list" border>
		    <uv-list-item title="修改登录密码" border link to="/pages/modifyPassword/modifyPassword" @click="($event,1)"></uv-list-item>
			<uv-list-item title="安全工具" border link to="" @click="($event,1)"></uv-list-item>
		    <uv-list-item title="个人信息" border link to="/pages/personalInformation/personalInformation" @click="($event,1)"></uv-list-item>
			<uv-list-item title="修改支付密码" border link to="/pages/modifyPaymentCode/modifyPaymentCode" @click="($event,1)"></uv-list-item>
			<uv-list-item title="清除缓存" border link to="" @click="($event,1)"></uv-list-item>
		</uv-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>

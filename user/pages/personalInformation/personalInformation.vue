<template>
	<view style="margin-left: 20rpx;">
		<text>基本信息</text>
		<uv-form model="model1" :rules="rule1" ref="form" style="background: white;">
			<uv-form-item label="电子银行客户序号" label-width="100rpx" prop="userInfo.number" borderBottom="true">
				<uv-input v-model="model1.userInfo.num" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="姓名" label-width="100rpx" prop="userInfo.name" borderBottom="true">
				<uv-input v-model="model1.userInfo.name" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="英文/拼音姓名" label-width="100rpx" prop="userInfo.ename" borderBottom="true">
				<uv-input v-model="model1.userInfo.ename" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="证件类型" label-width="100rpx" prop="userInfo.cardType" borderBottom="true">
				<uv-input v-model="model1.userInfo.cardType" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="证件号码" label-width="100rpx" prop="userInfo.cardNumber" borderBottom="true">
				<uv-input v-model="model1.userInfo.cardNumber" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="国家/地区" label-width="100rpx" prop="userInfo.country" borderBottom="true">
				<uv-input v-model="model1.userInfo.country" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="民族" label-width="100rpx" prop="userInfo.nation" borderBottom="true">
				<uv-input v-model="model1.userInfo.nation" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="性别" label-width="100rpx" prop="userInfo.sex" borderBottom="true">
				<uv-input v-model="model1.userInfo.sex" border="none" style="margin-left: 20rpx;" readonly="true" @click="showSexSelect"></uv-input>
				<uv-action-sheet
					ref="sexSelect"
					:actions="actions"
					title="请选择性别"
					@select="sexSelect"
					@close="close"
				></uv-action-sheet>
			</uv-form-item>
			<uv-form-item label="出生日期" label-width="100rpx" prop="userInfo.bornTime" borderBottom="true">
				<uv-input v-model="model1.userInfo.bornTime" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="出生地" label-width="100rpx" prop="userInfo.bornPlace" borderBottom="true">
				<uv-input v-model="model1.userInfo.bornPlace" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
		</uv-form>
	</view>
	
	<view style="margin-left: 20rpx; margin-top: 20rpx;">
		<text>证件地址信息</text>
		<uv-form model="model1" :rules="rule1" ref="form" style="background: white;">
			<uv-form-item label="国家/地区" label-width="100rpx" prop="cardInfo.country" borderBottom="true">
				<uv-input v-model="model1.cardInfo.country" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="省/市/区" label-width="100rpx" prop="cardInfo.region" borderBottom="true">
				<uv-input v-model="model1.cardInfo.region" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="详细地址" label-width="100rpx" prop="cardInfo.detailAddress" borderBottom="true">
				<uv-input v-model="model1.cardInfo.detailAddress" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
		</uv-form>
	</view>
	
	<view style="margin-left: 20rpx; margin-top: 20rpx;">
		<text>本人常住地址信息</text>
		<uv-form model="model1" :rules="rule1" ref="form" style="background: white;">
			<uv-form-item label="国家/地区" label-width="100rpx" prop="addressInfo.country" borderBottom="true">
				<uv-input v-model="model1.addressInfo.country" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="省/市/区" label-width="100rpx" prop="addressInfo.region" borderBottom="true">
				<uv-input v-model="model1.addressInfo.region" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="详细地址" label-width="100rpx" prop="addressInfo.detailAddress" borderBottom="true">
				<uv-input v-model="model1.addressInfo.detailAddress" border="none" style="margin-left: 20rpx;"></uv-input>
			</uv-form-item>
			<uv-form-item label="邮编" label-width="100rpx" prop="addressInfo.zipCode" borderBottom="true">
				<uv-input v-model="model1.addressInfo.zipCode" border="none" style="margin-left: 20rpx;"></uv-input>
			</uv-form-item>
		</uv-form>
	</view>
	
	<view style="margin-left: 20rpx; margin-top: 20rpx;">
		<text>工作信息</text>
		<uv-form model="model1" :rules="rule1" ref="form" style="background: white;">
			<uv-form-item label="职业" label-width="100rpx" prop="workInfo.profession" borderBottom="true">
				<uv-input v-model="model1.workInfo.profession" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="工作单位名称" label-width="100rpx" prop="workInfo.workPlaceName" borderBottom="true">
				<uv-input v-model="model1.workInfo.workPlaceName" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="学校名称" label-width="100rpx" prop="workInfo.schoolName" borderBottom="true">
				<uv-input v-model="model1.workInfo.schoolName" border="none" style="margin-left: 20rpx;"></uv-input>
			</uv-form-item>
			<uv-form-item label="单位所属行业" label-width="100rpx" prop="workInfo.sector" borderBottom="true">
				<uv-input v-model="model1.workInfo.sector" border="none" style="margin-left: 20rpx;"></uv-input>
			</uv-form-item>
			<uv-form-item label="个人月收入区间" label-width="100rpx" prop="workInfo.salaryInterval" borderBottom="true">
				<uv-input v-model="model1.workInfo.salaryInterval" border="none" style="margin-left: 20rpx;"></uv-input>
			</uv-form-item>
		</uv-form>
	</view>
	
	<view style="margin-left: 20rpx; margin-top: 20rpx;">
		<text>联系信息</text>
		<uv-form model="model1" :rules="rule1" ref="form" style="background: white;">
			<uv-form-item label="手机号码" label-width="100rpx" prop="phonenumber" borderBottom="true">
				<uv-input v-model="model1.phonenumber" border="none" style="margin-left: 20rpx;" readonly="true"></uv-input>
			</uv-form-item>
		</uv-form>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				model1: {
					userInfo: {
						num: '123456',
						name: '张三',
						ename: 'zhangsan',
						cardType: '居民身份证',
						cardNumber: '3****************X',
						country: '中国',
						nation: '汉族',
						sex: '男',
						bornTime: '2001/01/01',
						bornPlace: '',
					},
					
					cardInfo: {
						country: '',
						region: '',
						detailAddress: '',
					},
					
					addressInfo: {
						country: '',
						region: '',
						detailAddress: '',
						zipCode: '',
					},
					
					workInfo: {
						profession: '',
						workPlaceName: '',
						schoolName: '',
						sector: '',
						salaryInterval: '0-1000',
					},
					
					phonenumber: '',
					
				},
				
				rule1: {
					'userInfo.num': {
						tpye: 'number',
						required: true,
						trigger: ['change'],
					},
					
					'userInfo.name': {
						tpye: 'string',
						required: true,
						trigger: ['change'],
						message: '姓名不能为空'
					}
				},
				
				
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '其他',
					},
				],
				
			}
		},
		methods: {
			// 性别选择
			showSexSelect() {
				this.$refs.sexSelect.open();
			},
			
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			
			close(){
					console.log('关闭');
			},
			
		}
	}
</script>

<style lang="scss">

</style>

<template>
	<view>
		<view style="background-color: white;">
			<view style="display: flex; justify-content: center;  background-color: white;" >
				<image src="../../static/success.jpg" style="justify-content: center; width: 100rpx; height: 100rpx; margin-top: 50rpx;" mode="scaleToFill"></image>
			</view>
			<view style="display: flex; justify-content: center;  margin-top: 30rpx; font-size: 120%; background-color: white;">
				<text style="margin-bottom: 40rpx;">个人信息修改完成</text>
			</view>
			<view v-show="showButton">
				<button style="color: blue; background-color: white;" @click="display">查看详情</button>
			</view>
		</view>
		<view>
			<uv-tabbar active-color="red" style="color: red;" >
				<uv-tabbar-item text="返回首页" @click="returnHome"></uv-tabbar-item>
			</uv-tabbar>
		</view>
		<view v-show="showDetail">
			<view style="margin-left: 20rpx;">
				<uv-form :model="model1" :rules="rule1" ref="form1" style="background: white; margin-right: 20rpx;">
					<uv-form-item label="电子银行客户序号" label-width="150rpx" prop="userInfo.number" :borderBottom="true">
						<uv-input v-model="model1.userInfo.num" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="姓名" label-width="150rpx" prop="userInfo.name" :borderBottom="true">
						<uv-input v-model="model1.userInfo.name" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="英文/拼音姓名" label-width="150rpx" prop="userInfo.ename" :borderBottom="true">
						<uv-input v-model="model1.userInfo.ename" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="证件号码" label-width="150rpx" prop="userInfo.cardNumber" :borderBottom="true">
						<uv-input v-model="model1.userInfo.cardNumber" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="民族" label-width="150rpx" prop="userInfo.nation" :borderBottom="true">
						<uv-input v-model="model1.userInfo.nation" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="性别" label-width="150rpx" prop="userInfo.sex" :borderBottom="true">
						<uv-input v-model="model1.userInfo.sex" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="出生日期" label-width="150rpx" prop="userInfo.bornTime" :borderBottom="true">
						<uv-input v-model="model1.userInfo.bornTime" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="出生地" label-width="150rpx" prop="userInfo.bornPlace" :borderBottom="true">
						<uv-input v-model="model1.userInfo.bornPlace" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
				</uv-form>
			</view>
			
			<view style="margin-left: 20rpx; margin-top: 20rpx;">
				<text>本人常住地址信息</text>
				<uv-form :model="model1" :rules="rule1" ref="form3" style="background: white; margin-right: 20rpx;">
					<uv-form-item label="详细地址" label-width="150rpx" prop="addressInfo.detailAddress" :borderBottom="true">
						<uv-input v-model="model1.addressInfo.detailAddress" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="邮编" label-width="150rpx" prop="addressInfo.zipCode" :borderBottom="true">
						<uv-input v-model="model1.addressInfo.zipCode" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
				</uv-form>
			</view>
			
			<view style="margin-left: 20rpx; margin-top: 20rpx;">
				<text>工作信息</text>
				<uv-form :model="model1" :rules="rule1" ref="form4" style="background: white; margin-right: 20rpx;" >
					<uv-form-item label="职业" label-width="150rpx" prop="workInfo.profession" :borderBottom="true">
						<uv-input v-model="model1.workInfo.profession" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="工作单位名称" label-width="150rpx" prop="workInfo.workPlaceName" :borderBottom="true">
						<uv-input v-model="model1.workInfo.workPlaceName" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="单位所属行业" label-width="150rpx" prop="workInfo.sector" :borderBottom="true">
						<uv-input v-model="model1.workInfo.sector" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
					<uv-form-item label="个人月收入区间" label-width="150rpx" prop="workInfo.salaryInterval" :borderBottom="true">
						<uv-input v-model="model1.workInfo.salaryInterval" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
				</uv-form>
			</view>
			
			<view style="margin-left: 20rpx; margin-top: 20rpx;">
				<text>联系信息</text>
				<uv-form :model="model1" :rules="rule1" ref="form5" style="background: white; margin-right: 20rpx;">
					<uv-form-item label="手机号码" label-width="150rpx" prop="phonenumber" :borderBottom="true">
						<uv-input v-model="model1.phonenumber" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
					</uv-form-item>
				</uv-form>
			</view>
			<view>
				
			</view>
		</view>	
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				showDetail: false,
				showButton: true,
				model1: {
					userInfo: {
						num: '',
						name: '',
						ename: '',
						cardType: '',
						cardNumber: '',
						country: '',
						nation: '',
						sex: '',
						bornTime: '',
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
						salaryInterval: '',
					},
					
					phonenumber: '',
					pickDate: '',
					
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
					},
					
					'userInfo.sex': {
						tpye: 'string',
						required: true,
						trigger: ['change'],
					},
					
					'addressInfo.zipCode': {
						tpye: 'number',
						require: true,
						trigger: ['change'],
						len: 6,
						message: '请输入6位的有效邮编'
					},
				},
			}
		},
		onReady() {
			this.$refs.form1.setRules(this.rule1)
			let that = this
			console.log(1)
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('newnewpersonalInformation', (data) => {
				console.log(data)
							that.model1.userInfo.num = data.num
							that.model1.userInfo.name = data.name
							that.model1.userInfo.ename = data.ename
							that.model1.userInfo.cardNumber = data.cardNumber
							that.model1.userInfo.nation = data.nation
							that.model1.userInfo.sex = data.sex
							that.model1.userInfo.bornTime = data.bornTime
							that.model1.userInfo.bornPlace = data.bornPlace
							that.model1.addressInfo.region = data.region
							that.model1.addressInfo.detailAddress = data.detailAddress
							that.model1.addressInfo.zipCode = data.zipCode
							that.model1.workInfo.profession = data.profession
							that.model1.workInfo.workPlaceName = data.workPlaceName
							that.model1.workInfo.sector = data.sector
							that.model1.workInfo.salaryInterval = data.salaryInterval
							that.model1.phonenumber = data.phonenumber
					
			});
		},
		methods: {
			returnHome() {
				uni.switchTab({
					url:"/pages/home/home",
					success: function(res){
						
					}
				});
			},
			
			display() {
				
				this.showDetail = true
				this.showButton = false
			},
		}
	}
</script>

<style>

</style>

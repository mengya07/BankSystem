<template>
	<view style="margin-left: 20rpx; margin-top: 20rpx;">
		<view style="margin-right: 20rpx; text-align: right;">
			<text style="margin-right: 20rpx; font-weight: bold;; text-align: right;" @click="modifyPI">修改</text>
		</view>
		<text>基本信息</text>
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
				<uv-input v-model="model1.userInfo.sex" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true" @click="showSexSelect"></uv-input>
				<uv-action-sheet
					ref="sexSelect"
					:actions="actions"
					title="请选择性别"
					@select="sexSelect"
					@close="close"
				></uv-action-sheet>
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
			<uv-form-item label="省/市/区" label-width="150rpx" prop="addressInfo.region" :borderBottom="true">
				<uv-input v-model="model1.addressInfo.region" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
			</uv-form-item>
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
	
</template>

<script>
	export default {
		data() {
			return {
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
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rule1)
			// 获取数据
			let that = this
			uni.getStorage({
				key: 'token',
				success: function (res) {
					let _token = res.data
					uni.request({
							  url: 'https://120.55.37.93/query/customerInfo',  
							  method: 'GET',  
							  header: {  
								'token': _token
							  },
							  data:{
								
							  },
							  success: function (res) {
								  console.log(res)
								that.model1.userInfo.num = res.data.data.customerId
								that.model1.userInfo.name = res.data.data.surname + res.data.data.name
								that.model1.userInfo.ename = res.data.data.spellName
								that.model1.userInfo.cardNumber = res.data.data.identityCard
								that.model1.userInfo.nation = res.data.data.nationality
								that.model1.userInfo.sex = res.data.data.sex
								that.model1.userInfo.bornTime = res.data.data.dateOfBirth
								that.model1.userInfo.bornPlace = res.data.data.placeOfBirth	
								that.model1.addressInfo.region=res.data.data.provincesCity
								that.model1.addressInfo.detailAddress = res.data.data.detailedAddress
								that.model1.addressInfo.zipCode = res.data.data.postalCode
								that.model1.workInfo.profession = res.data.data.profession
								that.model1.workInfo.workPlaceName = res.data.data.workOfUnit
								that.model1.workInfo.sector = res.data.data.industryOfTheOrganization
								that.model1.workInfo.salaryInterval = res.data.data.incomeRange
								that.model1.phonenumber = res.data.data.phoneNumber
							  },  
							  fail: function (error) {  
								console.log("寄咯");  
							  }  
							})
				},
				fail: function(error) {
				            console.log("获取token失败", error);
				        }
			});
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
			
			close() {
					console.log('关闭');
			},
			
			modifyPI() {
				let that = this
				uni.navigateTo({
					url:"/pages/modifyPersonalInformation/modifyPersonalInformation",
					success: function(res){
						res.eventChannel.emit('personalInformation',{
						'num' : that.model1.userInfo.num, 
						'name' : that.model1.userInfo.name ,
						'ename' : that.model1.userInfo.ename ,
						'cardNumber' : that.model1.userInfo.cardNumber ,
						'nation' : that.model1.userInfo.nation ,
						'sex' : that.model1.userInfo.sex ,
						'bornTime' : that.model1.userInfo.bornTime ,
						'bornPlace' : that.model1.userInfo.bornPlace ,
						'region' : that.model1.addressInfo.region ,
						'detailAddress' : that.model1.addressInfo.detailAddress ,
						'zipCode' : that.model1.addressInfo.zipCode ,
						'profession' : that.model1.workInfo.profession ,
						'workPlaceName' : that.model1.workInfo.workPlaceName ,
						'sector' : that.model1.workInfo.sector ,
						'salaryInterval' : that.model1.workInfo.salaryInterval ,
						'phonenumber' : that.model1.phonenumber,
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">

</style>

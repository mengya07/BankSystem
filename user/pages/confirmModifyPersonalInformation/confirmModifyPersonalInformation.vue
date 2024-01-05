<template>
	<view style="margin-left: 20rpx; margin-top: 20rpx;">
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
	<view>
		<button style="color: white; background-color: blue;" @click="confirmModify">确认</button>
	</view>
	
	<uni-popup ref="popup" type="center" :isMaskClick="false">
		<view style="display: flex;justify-content: flex-end;background-color: #FFFFFF;"><uv-icon name="close" size="14" style="margin-right: 5rpx;" @click="this.$refs.popup.close()"></uv-icon></view>
		<view style="width: 600rpx; height: 350rpx; display: flex; flex-direction: column; align-items: center; background-color: #FFFFFF;">
			<view>手机交易码</view>
			<uv-line margin="10rpx"></uv-line>
			<view style="margin-top: 20rpx;">正在向尾号{{phoneTail}}的手机发送验证码</view>
			<uv-code-input mode="line" size="28" @finish="codeInputFinish" style="margin-top: 40rpx;"></uv-code-input>
			<uv-code ref="uCode" @change="codeChange" seconds="60"></uv-code>
			<button @click="getCode" style="border-radius: 10rpx; width: 300rpx; height: 60rpx; font-size: 0.8em; margin-top: 40rpx; background-color: red; color: #FFFFFF;">{{codeTips}}</button>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				phoneTail: "",
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
				codeTips:"",
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
		computed: {
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rule1)
			// 获取数据
			let that = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('newpersonalInformation', (data) => {
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
			
			
			confirmModify() {
				this.$refs.popup.open()
			},
			codeInputFinish(e) {
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
								  url: 'https://120.55.37.93/edit/customerInfo',  
								  method: 'POST',  
								  header: {  
									'token': _token
								  },
								  data: {
									"pojo":{
									    "nationality": that.model1.userInfo.nation,
									    "dateOfBirth": that.model1.userInfo.bornTime,
									    "placeOfBirth": that.model1.userInfo.bornPlace,
									    "provincesCity": that.model1.addressInfo.region,
									    "detailedAddress": that.model1.addressInfo.detailAddress,
									    "postalCode": that.model1.addressInfo.zipCode,
									    "profession": that.model1.workInfo.profession,
									    "workOfUnit": that.model1.workInfo.workPlaceName,
									    "industryOfTheOrganization": that.model1.workInfo.sector,
									    "incomeRange": that.model1.workInfo.salaryInterval
									    },
									'verifyCode' : String(e)
								  },
								  success: function (res) {
									uni.hideLoading()
									console.log(res)
									if(res.data.code==200){
										console.log(1111111)
										uni.navigateTo({
											url:"/pages/modifyPersonalInformationResult/modifyPersonalInformationResult",
											success: function(res){
												res.eventChannel.emit('newnewpersonalInformation',{
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
									}
									
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
			getCode() {
				if(this.$refs.uCode.canGetCode) {
						            let that = this
						            uni.getStorage({
						            	key: 'token',
						            	success: function (res) {
						            		let _token = res.data
						            		uni.showLoading({
						            			title: "正在获取验证码",
						            			mask: true
						            		})
						            		uni.request({
						            				  url: 'http://x38h8d.natappfree.cc/sendsms/login',  
						            				  method: 'GET',  
						            				  header: {  
						            					'token': _token
						            				  },
						            				  success: function (res) {
						            					uni.hideLoading()
														that.$refs.uCode.start()
						            				  },  
						            				  fail: function (error) {
						            					uni.hideLoading()  
						            				  }  
						            				})
						            	}
						            })
									   this.$refs.uCode.start()
								} else {
									this.$u.toast('倒计时结束后再发送');
								}
			},
			codeChange(text) {
				this.codeTips = text
			},
		},
		onLoad(){
			let temp = ""
			temp = uni.getStorageSync('userName')
			temp = temp.slice(-4)
			this.phoneTail = temp
		}
	}
</script>

<style lang="scss">

</style>

<template>
	<view style="margin-left: 20rpx; margin-top: 20rpx;">
		<text>基本信息</text>
		<uv-form :model="model1" :rules="rule1" ref="form1" style="background: white; margin-right: 20rpx;">
			<uv-form-item label="电子银行客户序号" label-width="100rpx" prop="userInfo.number" :borderBottom="true">
				<uv-input v-model="model1.userInfo.num" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true" input-align="right"></uv-input>
			</uv-form-item>
			<uv-form-item label="姓名" label-width="100rpx" prop="userInfo.name" :borderBottom="true">
				<uv-input v-model="model1.userInfo.name" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true" input-align="right"></uv-input>
			</uv-form-item>
			<uv-form-item label="英文/拼音姓名" label-width="100rpx" prop="userInfo.ename" :borderBottom="true">
				<uv-input v-model="model1.userInfo.ename" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true" input-align="right"></uv-input>
			</uv-form-item>
			<uv-form-item label="证件号码" label-width="100rpx" prop="userInfo.cardNumber" :borderBottom="true">
				<uv-input v-model="model1.userInfo.cardNumber" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true" input-align="right"></uv-input>
			</uv-form-item>
			<uv-form-item label="民族" label-width="100rpx" prop="userInfo.nation" :borderBottom="true" ref="item1" @click="showNationSelect">
				<uv-input v-model="model1.userInfo.nation" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item label="性别" label-width="100rpx" prop="userInfo.sex" :borderBottom="true" @click="showSexSelect" ref="item2" >
				<uv-input v-model="model1.userInfo.sex" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" :readonly="true" input-align="right"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item label="出生日期" label-width="100rpx" prop="userInfo.bornTime" :borderBottom="true" ref="item3" @click="showBornTimeSelect">
				<uv-input v-model="model1.userInfo.bornTime" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item label="出生地" label-width="100rpx" prop="userInfo.bornPlace" :borderBottom="true">
				<uv-input v-model="model1.userInfo.bornPlace" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right"></uv-input>
			</uv-form-item>
		</uv-form>
	</view>
	
	<view style="margin-left: 20rpx; margin-top: 20rpx; margin-right: 20rpx;">
		<text>本人常住地址信息</text>
		<uv-form :model="model1" :rules="rule1" ref="form3" style="background: white;">
			<uv-form-item label="省/市/区" label-width="100rpx" prop="addressInfo.region" :borderBottom="true">
				<uv-input v-model="model1.addressInfo.region" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
			</uv-form-item>
			<uv-form-item label="详细地址" label-width="100rpx" prop="addressInfo.detailAddress" :borderBottom="true">
				<uv-input v-model="model1.addressInfo.detailAddress" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right"></uv-input>
			</uv-form-item>
			<uv-form-item label="邮编" label-width="100rpx" prop="addressInfo.zipCode" :borderBottom="true">
				<uv-input v-model="model1.addressInfo.zipCode" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right"></uv-input>
			</uv-form-item>
		</uv-form>
	</view>
	
	<view style="margin-left: 20rpx; margin-top: 20rpx;">
		<text>工作信息</text>
		<uv-form :model="model1" :rules="rule1" ref="form4" style="background: white;">
			<uv-form-item label="职业" label-width="100rpx" prop="workInfo.profession" :borderBottom="true">
				<uv-input v-model="model1.workInfo.profession" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item label="工作单位名称" label-width="100rpx" prop="workInfo.workPlaceName" :borderBottom="true">
				<uv-input v-model="model1.workInfo.workPlaceName" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right"></uv-input>
			</uv-form-item>
			<uv-form-item label="单位所属行业" label-width="100rpx" prop="workInfo.sector" :borderBottom="true">
				<uv-input v-model="model1.workInfo.sector" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item label="个人月收入区间" label-width="100rpx" prop="workInfo.salaryInterval" :borderBottom="true">
				<uv-input v-model="model1.workInfo.salaryInterval" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
		</uv-form>
	</view>
	
	<view style="margin-left: 20rpx; margin-top: 20rpx; margin-right: 20rpx;">
		<text>联系信息</text>
		<uv-form :model="model1" :rules="rule1" ref="form5" style="background: white;">
			<uv-form-item label="手机号码" label-width="100rpx" prop="phonenumber" :borderBottom="true">
				<uv-input v-model="model1.phonenumber" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
		</uv-form>
	</view>
	<view>
		<button style="color: white; background-color: blue;" @click="turnToNext">下一步</button>
	</view>
	<uv-action-sheet
		ref="sexSelect"
		:actions="sexes"
		title="请选择性别"
		@select="setSex"
	></uv-action-sheet>
	
	<uv-picker
		ref="nationPicker"
		:columns="nations"
		@confirm="setNation"
	></uv-picker>
	
	<uv-picker
		ref="countryPicker"
		:columns="countries"
		@confirm="setCountry"
	></uv-picker>
	
	<uv-picker
		ref="statePicker"
		:columns="state"
		@confirm="setState"
	></uv-picker>
	
	<uv-picker
		ref="countriPicker"
		:columns="countries"
		@confirm="setCountri"
	></uv-picker>
	
	<uv-picker
		ref="regionPicker"
		:columns="state"
		@confirm="setRegion"
	></uv-picker>
	
	<uv-datetime-picker 
		ref="BornTimePicker"
		mode="date"
		v-model="pickDate"
		@change="bornTimeChange"
		:formatter="formatter"
		@confirm="setBornTimeChange"
	></uv-datetime-picker>
</template>

<script>
import { date, number } from '../../uni_modules/uv-ui-tools/libs/function/test'
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
				
				pickDate: '',
				
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
				
				
				sexes: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '其他',
					},
				],
				
				nations: [
					[
					  '汉族',
					  '蒙古族',
					  '回族',
					  '藏族',
					  '维吾尔族',
					  '苗族',
					  '彝族',
					  '壮族',
					  '布依族',
					  '朝鲜族',
					  '满族',
					  '侗族',
					  '瑶族',
					  '白族',
					  '土家族',
					  '哈尼族',
					  '哈萨克族',
					  '傣族',
					  '黎族',
					  '傈僳族',
					  '佤族',
					  '畲族',
					  '高山族',
					  '拉祜族',
					  '水族',
					  '东乡族',
					  '纳西族',
					  '景颇族',
					  '柯尔克孜族',
					  '土族',
					  '达斡尔族',
					  '仫佬族',
					  '羌族',
					  '布朗族',
					  '撒拉族',
					  '毛南族',
					  '仡佬族',
					  '锡伯族',
					  '阿昌族',
					  '普米族',
					  '塔吉克族',
					  '怒族',
					  '乌孜别克族',
					  '俄罗斯族',
					  '鄂温克族',
					  '德昂族',
					  '保安族',
					  '裕固族',
					  '京族',
					  '塔塔尔族',
					  '独龙族',
					  '鄂伦春族',
					  '赫哲族',
					  '门巴族',
					  '珞巴族',
					  '基诺族',
					  ]
				],
				
				countries: [
					[
						'巴哈马',  
						    '巴林',  
						    '孟加拉国',  
						    '巴巴多斯',  
						    '白俄罗斯',  
						    '比利时',  
						    '伯利兹',  
						    '贝宁',  
						    '不丹',  
						    '玻利维亚',  
						    '波斯尼亚和黑塞哥维那',  
						    '博茨瓦纳',  
						    '巴西',  
						    '文莱达鲁萨兰国',  
						    '保加利亚',  
						    '布基纳法索',  
						    '布隆迪',  
						    '柬埔寨',  
						    '喀麦隆',  
						    '加拿大',  
						    '佛得角',  
						    '开曼群岛',  
						    '中非共和国',  
						    '乍得',  
						    '智利',  
						    '中国',  
						    '哥伦比亚',  
						    '科摩罗',  
						    '刚果（金）',  
						    '刚果（布）',  
						    '哥斯达黎加',  
						    '科特迪瓦',  
						    '克罗地亚',  
						    '古巴',  
						    '塞浦路斯',  
						    '捷克共和国',  
						    '丹麦',  
						    '吉布提',  
						    '多米尼克国',  
						    '多米尼加共和国',  
						    '厄瓜多尔',  
						    '埃及',  
						    '萨尔瓦多',  
						    '赤道几内亚',  
						    '厄立特里亚',  
						    '爱沙尼亚',  
						    '埃塞俄比亚',  
						    '斐济',  
						    '芬兰',  
						    '法国',  
							'加蓬',  
							'冈比亚',  
							'格鲁吉亚',  
							'德国',  
							'加纳',  
							'希腊',  
							'格林纳达',  
							'危地马拉',  
							'几内亚比绍',  
							'几内亚共和国',  
							'圭亚那合作共和国',  
							'海地共和国',  
							'洪都拉斯共和国',  
							'匈牙利共和国',  
							'冰岛共和国',  
							'印度',
							'印度尼西亚共和国',
							'伊朗伊斯兰共和国',
							'伊拉克共和国',
							'爱尔兰共和国',
							'以色列国',
							'意大利共和国',
							'牙买加共和国',
							'日本国',
							'约旦哈希姆王国',
							'哈萨克斯坦共和国',
							'肯尼亚共和国',
							'基里巴斯共和国',
							'朝鲜民主主义人民共和国',
							'大韩民国',
							'科威特国',
							'吉尔吉斯共和国',
							'老挝人民',
							'民主共和国',
							'拉脱维亚共和国',
							'黎巴嫩共和国',
							'莱索托王国',
							'列支敦士登公国',
							'立陶宛共和国',
							'卢森堡大公国',
							'马其顿王国',
							'马拉维共和国',
							'马来西亚联邦',
							'马里共和国',
							'毛里塔尼亚伊斯兰共和国',
							'毛里求斯共和国',
							'美利坚合众国',
							'蒙古国',
							'黑山共和国',
							'摩洛哥王国',
							'莫桑比克共和国',
							'缅甸联邦共和国',
							'纳米比亚共和国',
							'尼泊尔王国',
							'荷兰王国',
							'新西兰王国（包括库克群岛和纽埃）',
							'新喀里多尼亚群岛的新喀里多尼亚（法国）',
							'尼加拉瓜共和国',
							'诺福克岛（澳大利亚）',
							'挪威王国',
							'阿曼苏丹国',
							'巴基斯坦伊斯兰共和国',
							'巴拿马共和国',
							'巴布亚新几内亚独立国',
							'巴拉圭共和国',
							'秘鲁共和国',
							'菲律宾共和国（菲律宾）',
							'波兰共和国（波兰）',
							'葡萄牙共和国（葡萄牙）',
							'卡塔尔国（卡塔尔）',
							'韩国民国（韩国）',
							'大阿拉伯利比亚人民社会主义民众国（利比亚）',
							'罗马尼亚（罗马尼亚）',
							'俄罗斯联邦（俄罗斯）',
							'卢旺达共和国（卢旺达）',
							'沙特阿拉伯王国（沙特阿拉伯）',
							'塞内加尔共和国（塞内加尔）',
							'塞尔维亚共和国（塞尔维亚）',
							'塞舌尔共和国（塞舌尔）',
							'塞拉利昂共和国（塞拉利昂）',
							'新加坡共和国（新加坡）',
							'斯洛伐克共和国（斯洛伐克）',
							'斯洛文尼亚共和国（斯洛文尼亚）',
							'所罗门群岛（所罗门群岛）',
							'索马里联邦共和国（索马里）',
							'南非共和国（南非）',
							'西班牙王国（西班牙）',
							'斯里兰卡民主社会主义共和国（斯里兰卡）',
							'苏丹共和国（苏丹）',
							'苏里南共和国（苏里南）',
							'阿拉伯叙利亚人民社会主义民主国（叙利亚）',
							'塔吉克斯坦共和国（塔吉克斯坦）',
							'坦桑尼亚联合共和国（坦桑尼亚）',
							'泰国王国（泰国）',
							'前南斯拉夫的马其顿共和国（马其顿）',
					],
				],
				
				state: [
					[
						'北京市',
						  '天津市',
						  '上海市',
						  '重庆市',
						  '河北省',
						  '山西省',
						  '辽宁省',
						  '吉林省',
						  '黑龙江省',
						  '江苏省',
						  '浙江省',
						  '安徽省',
						  '福建省',
						  '江西省',
						  '山东省',
						  '河南省',
						  '湖北省',
						  '湖南省',
						  '广东省',
						  '海南省',
						  '四川省',
						  '贵州省',
						  '云南省',
						  '陕西省',
						  '甘肃省',
						  '青海省',
						  '台湾省',
						  '内蒙古自治区',
						  '广西壮族自治区',
						  '宁夏回族自治区',
						  '新疆维吾尔自治区',
						  '西藏自治区',
						  '香港特别行政区',
						  '澳门特别行政区',
					],
				],
				
				career: [
					[
						'中国共产党中央委员会和地方各级组织负责人',
						'国家机关及其工作机构负责人',
						'民主党派，社会团体及工作机构负责人',
						'事业单位负责人',
						'企业负责人',
						'科学研究人员',
						'工程技术（计算机）人员',
						'农业技术人员',
						'飞行和船舶技术等人员',
						'卫生专业技术人员',
						'经济业务人员（不含会计师）',
						'会计师',
						'金融业务人员（不含律师）',
						'律师',
						'教学人员',
						'文学艺术工作人员',
						'体育工作人员',
						'新闻出版，文化工作人员',
						'其他专业技术人员',
						'行政办公人员',
						'安全保卫和消防工作人员',
						'邮电和电信业务人员',
						'事业单位员工',
						'其他办事人员和有关人员',
						'商业，服务业人员',
						'农，林，牧，渔，水利业生产人员',
						'生产，运输设备操作人员及有关人员',
						'军人',
						'学生',
						'外交人员',
						'私营业主',
						'退休人员',
						'家庭主妇',
						'无职业活动人员（不含退休人员，家庭主妇）',
					],
				],
				
				sector: [
					[
						'农，林，牧，渔业',
						'采矿业',
						'制造业',
						'电力，热力，燃气及水生产和供应业',
						'建筑业',
						'批发和零售业（不含贸易代理）',
						'贸易代理',
						'交通运输，仓储和邮政业',
						'住宿和餐饮业',
						'信息传输，软件和信息技术服务业',
						'金融业',
						'房地产业',
						'租赁业',
						'商务服务业',
						'法律服务',
						'会计，审计及税务服务',
						'旅行社及相关服务',
						'科学研究和技术服务业',
						'水利，环境和公共设施管理业',
						'居民服务，修理和其他服务业',
						'教育',
						'卫生和社会工作',
						'文化，体育和娱乐业',
						'公共管理，社会保障和社会组织',
						'国际组织',
						'其他未包含的行业',
					]
				],
				
				incomeRage: [
					[
						'0-4999',
						'5000-19999',
						'20000-49999',
						'50000-99999',
						'100000以上',
					]
				],
				
				
			}
		},
		
		onReady() {
			let that = this
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rule1)
			// // 获取数据
			// let that = this
			// uni.getStorage({
			// 	key: 'token',
			// 	success: function (res) {
			// 		console.log(res.data)
			// 		let _token = res.data
			// 		uni.request({
			// 				  url: 'http://vpqs7u.natappfree.cc/query/transferRecord?pageNum=0&pageSize=5',  
			// 				  method: 'POST',  
			// 				  header: {  
			// 					'token': _token
			// 				  },
			// 				  data:{
								
			// 				  },
			// 				  success: function (res) {
			// 					console.log(res)
			// 					res.data.data.list.forEach(item=>{
			// 						let temp = {"tailNumber":"","transferDate":"","transferNum":"","otherAccount":""}
			// 						temp.tailNumber = item.payerName
			// 						temp.transferDate = item.transferAmount
			// 						temp.date = item.transferTime
			// 						temp.class = item.statusComments
			// 						that.transferRecodes.push(temp)
			// 					})
			// 				  },  
			// 				  fail: function (error) {  
			// 					console.log("寄咯");  
			// 				  }  
			// 				})
			// 	},
			// 	fail: function(error) {
			// 	            console.log("获取token失败", error);
			// 	        }
			// });
		},
		
		onLoad() {
			let that = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('personalInformation', (data) => {
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
				this.hideKeyboard();
			},
			
			setSex(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			
			close(){
					console.log('关闭');
			},
			
			hideKeyboard() {
				uni.hideKeyboard()
			},
			
			setNation(e) {
				this.model1.userInfo.nation = e.value[0]
				this.$refs.form1.validateField('userInfo.nation')
			},
			
			showNationSelect() {
				this.$refs.nationPicker.open();
				this.hideKeyboard();
			},
			
			setCountry(e) {
				this.model1.cardInfo.country = e.value[0]
				this.$refs.form2.validateField('cardInfo.country')
			},
			
			showCountrySelect() {
				this.$refs.countryPicker.open();
				this.hideKeyboard();
			},
			
			setState(e) {
				this.model1.cardInfo.region = e.value[0]
				this.$refs.form2.validateField('cardInfo.region')
			},
			
			showStateSelect() {
				this.$refs.statePicker.open();
				this.hideKeyboard();
			},
			
			setCountri(e) {
				this.model1.addressInfo.country = e.value[0]
				this.$refs.form2.validateField('addressInfo.country')
			},
			
			showCountriSelect() {
				this.$refs.countriPicker.open();
				this.hideKeyboard();
			},
		
			setRegion(e) {
				this.model1.addressInfo.region = e.value[0]
				this.$refs.form2.validateField('addressInfo.region')
			},
			showRegionSelect() {
				this.$refs.regionPicker.open();
				this.hideKeyboard();
			},
			
			showBornTimeSelect() {
				this.$refs.BornTimePicker.open();
				this.hideKeyboard();
			},
			
			
			bornTimeChange(e) {
				// this.model1.userInfo.bornTime = e
				// this.$refs.form1.validateField('userInfo.bornTime')
				let date = new Date(e.value).getFullYear() + "/" + (new Date(e.value).getMonth() + 1) + "/" + new Date(e.value).getDate()
				const [year, month, day] = date.split('/')
				const formattedMonth = month < 10 ? '0' + month : month
				const formattedDay = day < 10 ? '0' + day : day
				date = `${year}/${formattedMonth}/${formattedDay}`
				if(date > this.currentDate()){
					uni.showToast({
						title:"超过当前日期",
						icon:"error"
					})
					this.pickDate = this.currentDate()
				}
				console.log(this.pickDate)
				// this.model1.userInfo.bornTime = 
			},
			
			currentDate() {
				let date = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate()
				const [year, month, day] = date.split('/')
				const formattedMonth = month < 10 ? '0' + month : month
				const formattedDay = day < 10 ? '0' + day : day
				return `${year}/${formattedMonth}/${formattedDay}`
			},
			
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value 
			},	
			
			setBornTimeChange(e) {
				let date = new Date(e.value).getFullYear() + "/" + (new Date(e.value).getMonth() + 1) + "/" + new Date(e.value).getDate()
				const [year, month, day] = date.split('/')
				const formattedMonth = month < 10 ? '0' + month : month
				const formattedDay = day < 10 ? '0' + day : day
				date = `${year}/${formattedMonth}/${formattedDay}`
				
				if(date < this.currentDate()){
					this.model1.userInfo.bornTime =  date
					this.$refs.form1.validateField('userInfo.bornTime')
				}
			},
			
			turnToNext() {
				let that = this
				uni.navigateTo({
					url:"/pages/confirmModifyPersonalInformation/confirmModifyPersonalInformation",
					success: function(res){
						res.eventChannel.emit('newpersonalInformation',{
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
	},
}	
</script>

<style lang="scss">

</style>

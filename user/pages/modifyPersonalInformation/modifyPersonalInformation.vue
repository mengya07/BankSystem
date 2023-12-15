<template>
	<view style="margin-left: 20rpx;">
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
			<uv-form-item label="证件类型" label-width="100rpx" prop="userInfo.cardType" :borderBottom="true">
				<uv-input v-model="model1.userInfo.cardType" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true" input-align="right"></uv-input>
			</uv-form-item>
			<uv-form-item label="证件号码" label-width="100rpx" prop="userInfo.cardNumber" :borderBottom="true">
				<uv-input v-model="model1.userInfo.cardNumber" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true" input-align="right"></uv-input>
			</uv-form-item>
			<uv-form-item label="国家/地区" label-width="100rpx" prop="userInfo.country" :borderBottom="true">
				<uv-input v-model="model1.userInfo.country" border="none" style="margin-left: 20rpx; margin-right: 20rpx;" :readonly="true" input-align="right"></uv-input>
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
			<uv-form-item label="出生日期" label-width="100rpx" prop="userInfo.bornTime" :borderBottom="true" ref="item3">
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
		<text>证件地址信息</text>
		<uv-form :model="model1" :rules="rule1" ref="form2" style="background: white;">
			<uv-form-item label="国家/地区" label-width="100rpx" prop="cardInfo.country" :borderBottom="true" @click="showCountrySelect">
				<uv-input v-model="model1.cardInfo.country" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item label="省/市/区" label-width="100rpx" prop="cardInfo.region" :borderBottom="true">
				<uv-input v-model="model1.cardInfo.region" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item label="详细地址" label-width="100rpx" prop="cardInfo.detailAddress" :borderBottom="true">
				<uv-input v-model="model1.cardInfo.detailAddress" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
		</uv-form>
	</view>
	
	<view style="margin-left: 20rpx; margin-top: 20rpx; margin-right: 20rpx;">
		<text>本人常住地址信息</text>
		<uv-form :model="model1" :rules="rule1" ref="form3" style="background: white;">
			<uv-form-item label="国家/地区" label-width="100rpx" prop="addressInfo.country" :borderBottom="true">
				<uv-input v-model="model1.addressInfo.country" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item label="省/市/区" label-width="100rpx" prop="addressInfo.region" :borderBottom="true">
				<uv-input v-model="model1.addressInfo.region" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right" :readonly="true"></uv-input>
				<template v-slot:right>
					<uv-icon
						name="arrow-right"
					></uv-icon>
				</template>
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
			<uv-form-item label="学校名称" label-width="100rpx" prop="workInfo.schoolName" :borderBottom="true">
				<uv-input v-model="model1.workInfo.schoolName" border="none" style="margin-left: 20rpx; font-weight: bold; margin-right: 20rpx;" input-align="right"></uv-input>
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
						bornPlace: '1',
					},
					
					cardInfo: {
						country: '1',
						region: '1',
						detailAddress: '1',
					},
					
					addressInfo: {
						country: '1',
						region: '1',
						detailAddress: '1',
						zipCode: '1',
					},
					
					workInfo: {
						profession: '1',
						workPlaceName: '1',
						schoolName: '1',
						sector: '1',
						salaryInterval: '0-1000',
					},
					
					phonenumber: '1',
					
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
					]
				]
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
					console.log(res.data)
					let _token = res.data
					uni.request({
							  url: 'http://vpqs7u.natappfree.cc/query/transferRecord?pageNum=0&pageSize=5',  
							  method: 'POST',  
							  header: {  
								'token': _token
							  },
							  data:{
								
							  },
							  success: function (res) {
								console.log(res)
								res.data.data.list.forEach(item=>{
									let temp = {"tailNumber":"","transferDate":"","transferNum":"","otherAccount":""}
									temp.tailNumber = item.payerName
									temp.transferDate = item.transferAmount
									temp.date = item.transferTime
									temp.class = item.statusComments
									that.transferRecodes.push(temp)
								})
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
			
		}
	}
</script>

<style lang="scss">

</style>

<template>
	<view>
		<uni-section>
					<uni-card  :isFull="true" >
						<text>转账金额（人民币元)<br></text>
						<text>{{transferData.Amount}} <br></text>
					</uni-card>
		</uni-section>
		<uni-section>
					<uni-card :isFull="true">
						<text class="uni-body">收款人姓名</text>
						<text class="uni-ininin">{{transferData.receiverName}}<br></text>
						<text class="uni-body">收款账号</text>
						<text class="uni-ininin">{{transferData.receiverCardNumber}}<br></text>
						<text class="uni-body">收款银行</text>
						<text class="uni-ininin">天地银行<br></text>
						<text class="uni-body">转账方式</text>
						<text class="uni-ininin">实时<br></text>
						<text class="uni-body">付款账号</text>
						<text class="uni-ininin">{{transferNumberOut}}<br></text>
					</uni-card>
		</uni-section>
		<button class="button" type="primary" @click="Confirm">确认</button>
	</view>
</template>

<script>  
export default {  
    data() {  
        return {  
            transferNumberOut: '', 
			transferData: '',
			cardId: '',
             
        }  
    },  
    methods: {  
    
        getDataFromStorage() {  
           const value1 = uni.getStorageSync('transferNumberOut');  
            if (value1 !== undefined) { // 检查值是否存在  
                this.transferNumberOut = value1; // 如果存在，设置到组件的数据属性中  
            } else {  
                console.log('transferNumberOut not found in storage'); // 否则输出错误消息或进行其他处理  
            };
			
			const value2 = uni.getStorageSync('transfer');
			if (value2 !== undefined) { // 检查值是否存在  
			    this.transferData = value2; // 如果存在，设置到组件的数据属性中  
			} else {  
			    console.log('transfernot found in storage'); // 否则输出错误消息或进行其他处理  
			};
			
			 const value3 = uni.getStorageSync('tranferCardId');
			 if (value3 !== undefined) { // 检查值是否存在  
			     this.cardId = value3; // 如果存在，设置到组件的数据属性中  
			 } else {  
			     console.log('transfernot found in storage'); // 否则输出错误消息或进行其他处理  
			 };  
			
        },
		Confirm(){
			
		}
		
	},
    onLoad() { 
        this.getDataFromStorage();  
    }
} 
</script>

<style>

</style>

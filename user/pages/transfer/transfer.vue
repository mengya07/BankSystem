<template>  
  <view class="container">  
    <view class="table">  
	  <text class="table-title">可用余额</text> 
	  <button class="next-button" @click="nextStep">全部转出</button>   
      <text class="table-title">付款账户:</text>   
	  <text class="table-title">0000000000000000</text> 
      <text class="table-title">币种</text>  
      <text class="table-title">转账金额</text>  
	  <input class="row1" type="number" placeholder="请输入转账金额" />  
      <text class="table-title">收款人姓名</text>  
	  <input class="row2" type="text" placeholder="请输入收款人姓名" />
      <text class="table-title">收款账号</text>  
	  <input class="row3" type="text" placeholder="请输入收款账号" /> 
      <text class="table-title">附言</text>  
      <textarea class="row4" placeholder="请输入附言"></textarea>  
	  <button class="next-button" @click="nextStep">下一步</button> 
  </view>  
  </view>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      tableData: [{}, {}, {}] // 这里可以定义表格行数，每行数据保存在数组中  
    };  
  },  
  methods: {  
    nextStep() {  
      // 在这里处理下一步操作，例如提交表单等  
    }  
  }  
};  
</script>  
  
<style scoped>  
.container {  
  width: 100%;  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  justify-content: center;  
}   
.table-title {  
  font-size: 18px;  
  font-weight: bold;  
  margin-right: 10px;  
}  

.next-button {  
  margin-top: 10px;  
}  
</style>
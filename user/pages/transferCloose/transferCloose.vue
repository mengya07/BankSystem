


<template>  
  <view>      
       <uni-card class="card"  v-for="(card, index) in datas" :key="index"  @click="handleCardClick(index)">
	  
	   <view style="display: flex;">
		   <image src= '/static/card.png' class="icc"></image>
		   <text class="cardNumber">{{card.cardNumber}}</text>
	   </view>
       </uni-card>    
  </view>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
	  that:'',	
      datas: [{  
        balance: '',  
        cardId: '',  
        cardNumber: "",  
        isActive: '',
      }]  
    };  
  },  
  methods: {
	  handleCardClick(index) {  
	      // 在这里处理卡片点击事件，card 参数是当前点击的卡片数据 
		  uni.setStorageSync('tranferCardId',this.datas[index].cardId);
		  uni.redirectTo({
		  	url:'/pages/transfer/transfer'
		  });
	      console.log('Card clicked:'+ this.datas[index].cardId);  
	      // 你可以根据 card 参数执行特定的操作  
	    }
	  
  },
  onLoad() { 
	let that = this;
    uni.request({  
      url: 'https://120.55.37.93/query/bankCard',  
      method: 'GET',  
      data: {},  
      header: {  
        "token":  uni.getStorageSync('token'),  
      },  
      success: (res) => {  
        that.datas = res.data.data; // 修改这里的赋值方式，使用 this.datas 来引用组件的 data 属性  
        console.log(that.datas); // 使用 this.datas 来打印组件的 data 属性  
        console.log(res);  
      },  
      fail: (error) => {  
        console.log(error);  
      }  
    });  
  }  
};  
</script>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
<style scoped>  
.container {  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
}  
  
.card-container {  
  display: flex;  
  flex-wrap: wrap;  
}  
  
.card {  
  width: 375px;  
  height: 50px;  
  margin-right: 10px;  
  margin-bottom: 10px; 
} 
.icc{
  width: 50px;
  height: 30px;   
}
.cardNumber{
  text-align: center;
  margin-top: 10rpx;
  margin-left: 70rpx;
}

</style>
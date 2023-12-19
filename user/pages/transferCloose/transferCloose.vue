<template>  
  <view>      
       <uni-card class="card" v-for="(card, index) in datas" :key="index"  @click="handleCardClick(index)">  
	   <text>{{card.cardNumber}}</text>
       </uni-card>    
  </view>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      datas: [{  
        balance: '',  
        cardId: '',  
        cardNumber: "",  
        isActive: ''  
      }]  
    };  
  },  
  methods: {
	  handleCardClick(index) {  
	      // 在这里处理卡片点击事件，card 参数是当前点击的卡片数据 
		  uni.setStorageSync('tranferCardId',this.datas[index].cardId);
		  uni.navigateTo({
		  	url:'/pages/transfer/transfer'
		  });
	      console.log('Card clicked:'+ this.datas[index].cardId);  
	      // 你可以根据 card 参数执行特定的操作  
	    }
	  
  },
  onLoad() {  
    uni.request({  
      url: 'http://120.55.37.93:80/query/bankCard',  
      method: 'GET',  
      data: {},  
      header: {  
        "token": 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTE1MTEwYjc2ZDI0NDAyOGQxY2FjODc1MWM1N2FhNiIsInN1YiI6IjYiLCJpc3MiOiJwbSIsImlhdCI6MTcwMjk3Mzc1MiwiZXhwIjoxNzAzMDYwMTUyfQ.EJRhB4xFsTmUd_qTT_0BjwvMrtiHog-OLHbG71wNPHI',  
      },  
      success: (res) => {  
        this.datas = res.data.data; // 修改这里的赋值方式，使用 this.datas 来引用组件的 data 属性  
        console.log(this.datas); // 使用 this.datas 来打印组件的 data 属性  
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

</style>
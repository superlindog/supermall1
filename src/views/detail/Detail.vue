<!--  -->
<template>
  <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop:"shop"></detail-shop-info>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'

import {getDetail,Goods} from '../../network/detail'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'

export default {
name:"Detail",
components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
},
data(){
    return{
        id:null,
        topImages:[],
        goods:{},
        shop:{}
    }
},
created(){
    this.id=this.$route.params.id
    getDetail(this.id).then(res=>{
        const data=res.result;
        this.topImages=data.itemInfo.topImages
        console.log(this.goods);
       this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop=new Shop(data.shopInfo)

    })
}
}
</script>

<style  scoped>

</style>

<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
     <!--  <div>{{$store.state.cartList.length}}</div> -->
        <ul>
          <li v-for="(item,index) in $store.state.cartList" :key="index">
            {{item}}
          </li>
        </ul>
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll> 
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
     <back-top  @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import {debounce} from "../../common/utils";
import DetailBottomBar from './childComps/DetailBottomBar.vue';
import BackTop from '../../components/content/backTop/backTop.vue';
import { mapActions } from "vuex";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      currentIndex: 0,
      themeTopYs:[],
      getThemeTopY:null,
      isShowBackTop:false
    };
  },
  created() {
    this.id = this.$route.params.id;
    getDetail(this.id).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      console.log(this.goods);
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    

    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

     /* this.$nextTick(()=>{
        this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    console.log(this.themeTopYs);
     }) */

     this.getThemeTopY=debounce(()=>{
       this.themeTopYs=[]
        this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop -44);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop -44);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -44);
    console.log(this.themeTopYs);
     },100)
  },
  mounted(){
   
  },
  deactivated() {
    this.$bus.$off("itemImgeLoad", this.itemImgListener);
  },
  updated(){
      this.$refs.scroll.refresh();
  },
  methods: {
     ...mapActions({
      add: "addCart",
    }),
    imagesLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    backClick(){
       this.$refs.scroll.scrollTo(0,0)
      },
    titleClick(index) {
     /*  console.log(index); */
     this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
     addCart() {
      //1.获取购物车信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.加入购物车()
       /* this.$store.commit('addCart', product); */

      this.add(product)
        .then(res => {
          this.$toast.show(res, 2000)
          
        }).catch((e) => {
          console.log(e);
        })
     },
      
        
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // });
   contentScroll(position){
     this.isShowBackTop=(-position.y)>1000
        //1.获取y值
        const positionY = -position.y;
        //2.positionY和主题中值进行对比
        let length = this.themeTopYs.length;
        for (let i = 0; i < length-1; i++){
          // if (this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY <
          //   this.themeTopYs[i+1]) || (i === length-1 && positionY > this.themeTopYs[i]))){
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = this.currentIndex;
          // }
          //优化
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
   },
   
  },

  /* contentScroll(position){
    console.log(position);
} */
};
</script>

<style  scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 93px );
}
</style>

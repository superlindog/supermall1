<!--  -->
<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" ref="tabControl1"
    @tabClick="tabClick" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3"
     @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore"
     >
     
    <home-swiper :banners="banners" @swiperiImageLoad="swiperiImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" ref="tabControl2"
    @tabClick="tabClick" ></tab-control>
    <good-list :goods="showGoods"></good-list> 
    </scroll>
   <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'


import TabControl from '@/components/content/tabControl/TabControl.vue'
import {getHomeMultidata,getHomeGoods} from "@/network/home"
import GoodList from '@/components/content/goods/GoodsList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backTop/backTop.vue'
import {debounce} from '../../common/utils'




export default {
    name:"Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data(){
      return{
       banners:[],
       recommends:[],
       goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]}
       },
       currentType:'pop',
       isShowBackTop:false,
       tabOffsetTop:0,
       isTabFixed:false,
       saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed(){
      console.log('home destroyed');
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
     this.saveY=this.$refs.scroll.getScrollY()
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      
   
    },
    mounted(){
      const refresh=debounce(this.$refs.scroll.refresh,200)
       this.$bus.$on('itemImageLoad',()=>{
         refresh()
    })

    },
    methods:{
      tabClick(index){
        switch(index){
          case 0:
            this.currentType='pop'
            break
             case 1:
            this.currentType='new'
            break
             case 2:
            this.currentType='sell'
            break
        }
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      },
      backClick(){
       this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop=(-position.y)>1000
        //决定tabControl是否吸顶
        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperiImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
      },
      /* 网络请求方法 */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
      })
      },
       getHomeGoods(type){
         const page=this.goods[type].page+1
         getHomeGoods(type,page).then(res=>{
           this.goods[type].list.push(...res.data.list)
           this.goods[type].page+=1

         this.$refs.scroll.finishPullUp()
    })
       }
    }
}
      
</script>

<style  scoped>
#home{
  height: 100vh;
  padding-bottom: 49px;
}
.home-nav{
  background-color:var(--color-tint);
  color:#fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
 z-index: 99;
}
</style>

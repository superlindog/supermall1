<!--  -->
<template>
  <div id="detail">
      <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import {getDetail} from '../../network/detail'
export default {
name:"Detail",
components:{
    DetailNavBar
},
data(){
    return{
        id:null,
        topImages:[]
    }
},
created(){
    this.id=this.$route.params.id
    getDetail(this.id).then(res=>{
        this.topImages=res.result.itemInfo.topImages
    })
}
}
</script>

<style  scoped>

</style>

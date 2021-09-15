<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
      :isChecked="isSelectAll" 
      class="check-button"
      @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="prcie">合计: {{ totalPrice }}</div>

    <div class="calcilate" @click="calClick">
        去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
export default {
  name: "CartButtomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "¥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
        return this.$store.state.cartList
          .filter(item => item.checked).length
    },
    isSelectAll() {
    //    return  !(this.$store.state.cartList.filter(item => item.checked).length)
    if(this.$store.state.cartList.length === 0) return false
    return  !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
      checkClick() {
          if(this.isSelectAll) {
              //全部选中
              this.$store.state.cartList.forEach(item => item.checked = false)
          } else {
              //全部不选
              this.$store.state.cartList.forEach(item => item.checked = true)
          }

          //下面方法会出问题
        //   this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
      },
      calClick() {
        if(!this.checkLength) {
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
  }
};
</script>
<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 22px;
  height: 22px;
  line-height: 20px;
}

.prcie {
    margin-left: 20px;
    flex: 1;
}

.calcilate {
    width: 90px;
    text-align: center;
    background-color: rgb(72, 138, 224);
    color: #fff;
}
</style>
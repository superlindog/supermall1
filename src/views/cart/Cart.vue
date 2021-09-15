<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <cart-list></cart-list>

    <cart-buttom-bar></cart-buttom-bar>

  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";

import CartList from "./childComps/CartList.vue";
import CartButtomBar from "./childComps/CartButtomBar.vue";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartButtomBar,
  },
  computed: {
    //...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>
<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
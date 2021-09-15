export default {
    addCart(context, payload) {
        // payload新加商品
        // let oldProduct = null;
        // for(let item of state.cartList) {
        //   if (item.iid === payload.iid) {
        //     oldProduct = item;
        //   }
        // }
        return new Promise((resolve, reject) => {
          let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
          if(oldProduct) {

            // oldProduct.count += 1
            context.commit('addCounter', oldProduct)
            resolve('当前商品数量+1')
          } else {
            payload.count = 1
            context.commit('addToCart', payload)
            reject('添加了新商品')
          }
        })
      }
}
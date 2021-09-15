import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
    // document.body.appendChild(Toast.$el)
    //创建组件构造器
    const toastContrustar = Vue.extend(Toast)

    //new的方式，根据组件构造器创建对象
    const toast = new toastContrustar()

    //将组件对象手动挂载
    toast.$mount(document.createElement('div'))

    //toast.$el对应上面的div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}

export default obj
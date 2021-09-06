import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import('../views/home/Home')
const Cart = () =>
    import('../views/cart/Cart')
const Category = () =>
    import('../views/category/Category')
const Profile = () =>
    import('../views/profile/Profile')
const Detail = () =>
    import('../views/detail/Detail')

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        name:'home',
        path: '/home',
        component: Home
    }, {
        name:'cart',
        path: '/cart',
        component: Cart
    }, {
        name:'category',
        path: '/category',
        component: Category
    }, {
        name:'profile',
        path: '/profile',
        component: Profile
    }, {
        name:'detail',
        path: '/detail/:id',
        component: Detail
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router

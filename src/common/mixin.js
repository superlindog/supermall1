import { debounce } from "./utils"
import BackTop from "../components/content/backTop/BackTop.vue";

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 50);
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on("itemImgeLoad", this.itemImgListener);
        console.log("--------------------------------");
    },
    
}

export const backtopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isshowBackTop: false
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        listenShowBackTop(position) {
            this.isshowBackTop =  -position.y > 1000
        }
    },

}